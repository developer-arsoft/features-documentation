# Implementasi FCM ( Firebase Cloud Message ) menggunakan package kawankoding/laravel-fcm ke Laravel

## Konfigurasi Firebase Console

Berikut langkah-langkah konfigurasi yang diperlukan :

( Hubungi tim riset untuk memudahkan konfigurasi )

## Tabel pendukung

Untuk mendukung fitur ini, perlu ditambahkan kolom **device_token** pada table **user** untuk menyimpan token dari device masing-masing user yang ada

## Install package kawankoding/laravel-fcm

Install package

```cli
composer require kawankoding/laravel-fcm "^0.2.0"
```

Publish vendor

```cli
php artisan vendor:publish --provider="Kawankoding\Fcm\FcmServiceProvider"
```

Update server key in config/laravel-fcm.php

```php
// config/laravel-fcm.php

<?php

return [

    /**
     * Set your FCM Server Key
     * Change YOUR_KEY with your firebase key
     */

    'server_key' => env('FCM_SERVER_KEY', 'YOUR_KEY'),

];

```

## Konfigurasi **main-app** untuk menginisialisasi Firebase

Konfigurasi ini dilakukan pada halaman utama ( contoh : /layouts/app.blade.php selaku *main-app* )

1. *import* firebase sdk menggunakan script dibawah ini :

    ```html
    <!-- resources/views/layouts/app.blade.php -->

    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics.js"></script>

    ```

1. Kemudian tambahkan script berikut untuk menginisialisasi firebase :

    ```html
    <!-- resources/views/layouts/app.blade.php -->
    
    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "YOUR_APIKEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    </script>
    ```

    NB: ganti value diatas dengan data-data dari konsol firebase yang akan digunakan.

    Untuk mendapatkan data-data diatas, silahkan cek kembali konfigurasi *firebase console* yang sudah dibahas pada poin sebelumnya.

## Konfigurasi **Service Worker**

Pada direktori /public/, tambahkan sebuah file dengan nama **firebase-messaging-sw.js**. Tambahkan script dibawah ini kedalamnya :

```js
// public/firebase-messaging-sw.js 

/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
   
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebase.initializeApp({
        apiKey: "YOUR_APIKEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    });
  
/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    /* Customize notification here */
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "-",
    };
  
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
```

NB: Jangan lupa untuk merubah value API_KEY, AUTH_DOMAIN, dll sesuai dengan data yang ada ( sama dengan konfigurasi inisialisasi firebase pada point sebelumnya )

( Opsional ) Untuk mengantisipasi service-worker yang tidak terdaftar secara otomatis, tambahkan script dibawah ini ke dalam **main-app** :

```html
<!-- resources/views/layouts/app.blade.php -->

<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/firebase-messaging-sw.js');
        });
    }
</script>
```

## Fungsi **save-token**

Mekanisme ini digunakan untuk menyimpan device-token dari user ke dalam database guna memudahkan pengiriman notifikasi ke user ( berdasarkan token device yang terdaftar ).

1. Web Frontend

    Tambahkan fungsi berikut pada **main-app** untuk mendapatkan device-token dari firebase kemudian mengirimkannya ke backend untuk disimpan ke database :

    ```html
    <!-- resources/views/layouts/app.blade.php -->

    <script>
        const messaging = firebase.messaging();
    
        function initFirebaseMessagingRegistration() {
            messaging.requestPermission()
                .then(function () {
                    return messaging.getToken()
                })
                .then(function(token) {
                    console.log(token);

                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    // store token to database
                    $.ajax({
                        url: '{{ route("save-token") }}',
                        type: 'POST',
                        data: {
                            token: token
                        },
                        dataType: 'JSON',
                        success: function (response) {
                            alert('Token saved successfully.');
                        },
                        error: function (err) {
                            console.log('User Chat Token Error'+ err);
                        },
                    });
                }).catch(function (err) {
                    console.log('User Chat Token Error'+ err);
                });
        }
    </script>
    ```

    ( Opsional ) Selanjutnya, tambahkan script dibawah ini untuk *listening* notifikasi dari firebase :

    ```html
    <!-- resources/views/layouts/app.blade.php -->
    
    <script>
        messaging.onMessage(function(payload) {
            // do your things
            console.log('on-message called !', payload);

            const noteTitle = payload.data.title;
            const noteOptions = {
                body: payload.data.body,
                icon: payload.data.icon,
            };
            new Notification(noteTitle, noteOptions);
        });
    </script>
    ```

1. Backend

    Pada sisi backend, sistem akan menerima parameter token yang dikirimkan dari frontend untuk kemudian disimpan ke database sesuai dengan user yang melakukan request.

    ```php
    /** 
     * save user-device-token
     *
     * @return response()
     */
    public function saveToken(Request $request)
    {
        auth()->user()->update(['device_token'=>$request->token]);
        return response()->json(['token saved successfully.']);
    }
    ```

    NB: lokasi dan waktu pemanggilan fungsi ini dapat dirubah sesuai kebutuhan, yang jelas tujuan utamanya adalah menyimpan device-token dari user ke database.

1. Route

    Jangan lupa menambahkan route untuk **save-token** dan **send-notification**

    ```php
    Route::post('/save-token', [MasterTestController::class, 'saveToken'])->name('save-token');
    Route::post('/send-notification', [MasterTestController::class, 'sendNotification'])->name('send-notification');
    ```

## Fungsi **send-notification**

Untuk mengirimkan notifikasi ke device-token yang sudah disimpan, dapat menggunakan script berikut :

```php
    public function sendNotification(Request $request)
    {
        $userId = $request->user()->id;
        $firebaseUserToken = User::where('id', '!=', $userId)
            ->whereNotNull('device_token')
            ->pluck('device_token')
            ->all();

        // send notification
        fcm()->to($firebaseUserToken) 
            ->priority('high')
            ->timeToLive(0)
            ->data([
                'title' => 'Test FCM',
                'body' => 'This is a test of FCM',
            ])
            ->send();
            
        return redirect()->back()->with(['message sent !']);
    }
```

NB: Selain fungsi **fcm()->to()**, masih ada beberapa kustomisasi lain yang sudah disediakan oleh package **kawankoding/laravel-fcm**. Lebih lengkapnya dapat dilihat langsung pada repositori github yang bersangkutan.

### referensi

* <https://www.itsolutionstuff.com/post/laravel-firebase-push-notification-tutorialexample.html>
* <https://github.com/kawankoding/laravel-fcm>

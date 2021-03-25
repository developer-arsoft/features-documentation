# Implementasi Mail pada proyek Laravel

Untuk mengimplementasikan mail system pada proyek laravel, berikut ini langkah-langkah yang harus dilakukan :

## Mailable

Mailable ini digunakan sebagai konstruksi dasar mekanisme mail yang akan digunakan. Didalamnya, dapat dilakukan kustomisasi data mail mulai dari **from, subject, view, attach** ( dan lain-lain )

Perintah dibawah ini akan melakukan generate mailable pada direktori **App/Mail**. Sesuaikan nama mailable yang ingin dibuat dengan merubah teks **NewUser**

```composer
php artisan make:mail NewUser
```

Contoh file hasil generate :

```php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewUser extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $name, $subject;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $name)
    {
        $this->name = $name;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('rumrowi.00.alamraya@gmail.com')
            ->subject($this->subject)
            ->view('emails.new-user');
    }
}

```

* Konfigurasi fungsi *from*

  Fungsi *from* digunakan untuk mengatur email asal atau email pengirim.

* Konfigurasi fungsi *view*

  Fungsi *view* digunakan untuk mengatur tampilan email yang akan dikirim. Lokasi file yang dipanggil berada pada direktori **/resources/views**. Format pemanggilan file sama dengan format pemanggilan **blade** pada laravel, yakni **/folder-name/file-name**.

  Penjelasan lebih lanjut akan dibahas pada point yang berbeda.

* NB : selain fungsi-fungsi diatas, masih banyak fungsi lain untuk melakukan kustomisasi mail, lebih lanjut bisa di lihat di <https://laravel.com/docs/8.x/mail>

## Penyesuaian environment ( .env )

Untuk menjalankan fitur Mail ini, perlu dilakukan penyesuaian environment sesuai dengan *driver* mail yang akan digunakan.

* SMTP-Mailtrap

  Berikut contoh konfigurasi .env untuk *driver* Mailtrap

  ```env
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=8caasd210878aw
    MAIL_PASSWORD=c0f6dqw12c2weq
    MAIL_ENCRYPTION=tls
  ```

  Konfigurasi ini didapatkan dari sistem Mailtrap. Untuk mendapatkannya, bisa dengan login ke akun *Mailtrap*, kemudian pilih *Inboxes* lalu pilih inbox yang diinginkan

  Contoh :
  
  ![GitHub Logo](/Mail/images/mailtrap-1.jpg)
  ![GitHub Logo](/Mail/images/mailtrap-2.jpg)

* SMTP-Gmail

  Untuk menggunakan SMTP dari Gmail, dapat mengikuti langkah-langkah berikut :

  1. Konfigurasi .env 

      ```env
        MAIL_DRIVER=smtp
        MAIL_HOST=smtp.googlemail.com
        MAIL_PORT=465
        MAIL_USERNAME=ENTER_YOUR_EMAIL_ADDRESS(GMAIL)
        MAIL_PASSWORD=ENTER_YOUR_GMAIL_PASSWORD
        MAIL_ENCRYPTION=ssl
      ```

  1. Konfigurasi akun gmail yang akan digunakan
  
      * Login ke akun Gmail, pilih *Manage your Google Account*
      * Pilih menu *Security*
      * Scroll ke bawah untuk mencari menu *Less secure app access* dan aktifkan menu ini
      * ![GitHub Logo](/Mail/images/configure-gmail-account-2.jpg)

## Pembuatan blade / view sebagai tampilan email

Contoh file :

```html
// direkrtori : \resources\views\emails\new-user.blade.php

<div>
    Nama saya : {{ $name }}
</div>
```

## Memanggil fungsi Mail untuk mengirim pesan dari Controller

Contoh :

```php
public function testMail(Request $request)
{
    $name = "Painem";
    $subject = "test ngirim email";

    Mail::to('developer.arsoft@gmail.com')
        ->cc('cak.inem@gmail.com')
        ->bcc('pak.jayan@gmail.com')
        ->send(new NewUser($subject, $name));
    
    dd('asd');
}
```

referensi :

* <https://blog.mailtrap.io/send-email-in-laravel/#What_you_need_to_know_about_Laravel_Mail>
* <https://laravel.com/docs/8.x/mail>
* <https://www.cloudways.com/blog/send-email-in-laravel/>
* <https://medium.com/@agavitalis/how-to-send-an-email-in-laravel-using-gmail-smtp-server-53d962f01a0c>

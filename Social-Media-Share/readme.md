# Implementasi *share link* ke sosial media menggunakan Laravel 8

Package yang digunakan pada tutorial kali ini adalah <https://github.com/jorenvh/laravel-share>

Dalam package ini sudah disediakan beberapa fungsi untuk otomasi generate link / url guna membagikan suatu informasi / teks dari aplikasi laravel ke sosial media tertentu. Dalam repositori githubnya, sudah terdapat langkah-langkah implementasi packagenya dengan cukup jelas, namun akan kami tuliskan kembali pada dokumentasi ini menggunakan bahasa kami

## Layanan yang didukung

* Facebook
* Twitter
* Linkedin
* WhatsApp
* Reddit
* Telegram

## Berikut langkah-langkah implementasi package nya

1. Install package menggunakan composer

    ```cli
    composer require jorenvanhocht/laravel-share
    ```

1. Untuk laravel versi 8 ini, tidak diharuskan menambah konfigurasi pada config/app.php, dikarenakan sudah menggunakan sistem auto-discovery. Namun, apabila ternyata package belum terbaca, coba jalankan perintah berikut pada terminal :

    ```cli
    composer dump-autoload
    ```

1. Publish vendor dengan menjalankan perintah :

    ```cli
    php artisan vendor:publish --provider="Jorenvh\Share\Providers\ShareServiceProvider"
    ```

1. Generate link / url pada Controller

    * Pastikan package sudah dipanggil ke controller

      ```php
      use Jorenvh\Share\ShareFacade as Share;
      ```

    * Panggil fungsi untuk generate link

      ```php
      $links = Share::page('http://my-links.com', 'whatever text what you want')
          ->facebook()
          ->twitter()
          ->getRawLinks();
      ```

    * Contoh output

      ```json
      {
        facebook: "https://www.facebook.com/sharer/sharer.php?u=http://my-links.com",
        twitter: "https://twitter.com/intent/tweet?text=whatever+text+what+you+want&url=http://my-links.com"
      }
      ```

NB : Untuk konfigutasi dan kustomisasi fungsi lainnya, dapat dicek lebih lanjut ke link berikut <https://github.com/jorenvh/laravel-share>

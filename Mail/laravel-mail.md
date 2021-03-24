# Implementasi Mail pada proyek Laravel
<br />
Untuk mengimplementasikan mail system pada proyek laravel, berikut ini langkah-langkah yang harus dilakukan :
<br />

## 1. Mailable
<p>Mailable ini digunakan sebagai konstruksi dasar mekanisme mail yang akan digunakan. Didalamnya, dapat dilakukan kustomisasi data mail mulai dari  <b>from, subject, view, attach</b> ( dan lain-lain )</p>
<p>Perintah dibawah ini akan melakukan generate mailable pada direktori <b>App/Mail</b>. Sesuaikan nama mailable yang ingin dibuat dengan merubah teks <b>NewUser</b></p>

```
php artisan make:mail NewUser
```

Contoh :

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

### 1.1 konfigurasi fungsi <i>from</i>
<p>fungsi <i>from</i> digunakan untuk mengatur email asal atau email pengirim.</p>

### 1.2 konfigurasi fungsi <i>view</i>
<p>fungsi <i>view</i> digunakan untuk mengatur tampilan email yang akan dikirim. Lokasi file yang dipanggil berada pada direktori <b>/resources/views</b>. Format pemanggilan file sama dengan format pemanggilan <b>blade</b> pada laravel, yakni <b>/folder-name/file-name</b>.
<p>Penjelasan lebih lanjut akan dibahas pada point yang berbeda.</p>

##### NB : selain fungsi-fungsi diatas, masih banyak fungsi lain untuk melakukan kustomisasi mail, lebih lanjut bisa di lihat di <a href="https://laravel.com/docs/8.x/mail" target="_blank">sini</a>

## 2. Penyesuaian environment ( .env )
<p>Untuk menjalankan fitur Mail ini, perlu dilakukan penyesuaian environment sesuai dengan <i>driver</i> mail yang akan digunakan.</p>

### 2.1 SMTP-Mailtrap
<p>Berikut contoh konfigurasi .env untuk <i>driver</i> Mailtrap</p>

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=8caasd210878aw
MAIL_PASSWORD=c0f6dqw12c2weq
MAIL_ENCRYPTION=tls
```

<p>
Konfigurasi ini didapatkan dari sistem Mailtrap. Untuk mendapatkannya, bisa dengan login ke akun <b>Mailtrap</b>, kemudian pilih <b>Inboxes</b> lalu pilih inbox yang diinginkan
</p>

Contoh :
![GitHub Logo](/images/mailtrap-1.jpg)
Format: ![Alt Text](url)

### 2.2 SMTP-Gmail
<p>
Dalam pengembangan . . .
</p>

### 2.2 Mailgun
<p>
Dalam pengembangan . . .
</p>

### 2.2 etc
<p>
Dalam pengembangan . . .
</p>

## 3. Pembuatan blade / view sebagai tampilan email
<p></p>

Contoh :
```html
// direkrtori : \resources\views\emails\new-user.blade.php

<div>
    Nama saya : {{ $name }}
</div>
```

## 4. Memanggil fungsi Mail untuk mengirim pesan dari Controller
<p></p>

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
* https://blog.mailtrap.io/send-email-in-laravel/#What_you_need_to_know_about_Laravel_Mail 
* https://laravel.com/docs/8.x/mail
* https://www.cloudways.com/blog/send-email-in-laravel/

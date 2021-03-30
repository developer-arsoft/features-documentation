# Menampilkan *Diff for Human* menggunakan Carbon

## Controller

Untuk menampilkan *diff for human* ( misal : 3 jam yang lalu, 2 minggu yang lalu, dll ), dapat menggunakan fungsi *diffForHuman* yang sudah disediakan oleh *Carbon*.

Contoh :

```php
$timeTest = Carbon::now()->diffForHumans();
```

Outpu :

```php
5 hours ago
```

Jika ingin menggunakan format lokal, bisa menambahkan *setLocale* terlebih dahulu

Contoh :

```php
Carbon::setLocale('id_ID');
$timeTest = Carbon::now()->diffForHumans();
```

Output :

```php
5 jam yang lalu
```

Untuk mengatur waktu lokal secara *public*, dapat mengatur *locale* serta *timezone* pada /config/app.php sesuai kebutuhan

```php
// config/app.php

'timezone' => 'Asia/Jakarta',
'locale' => 'id_ID',
```

Jika ingin lebih *advance*, silahkan cek ke sini <https://carbon.nesbot.com/docs/>

# Qr-Code Generator

Package yang digunakan kali ini adalah <https://github.com/SimpleSoftwareIO/simple-qrcode>

Package ini sudah menyediakan fungsi untuk generate qr-code beserta beberapa helper untuk pembuatan qr-code dengan format tertentu.

## Instalasi

Install package menggunakan composer

```cli
composer require simplesoftwareio/simple-qrcode "~4"
```

## Penggunaan

### Blade view

Contoh generate qr-code pada blade

```html
<!-- test.blade.php -->
<div class="visible-print text-center">
    {{ QrCode::size(100)->generate(Request::url()); }}
    <p>Scan me to return to the original page.</p>
</div>
```

### Controller

Contoh implementasi pada sisi backend

```php
// masterTestController.php
use SimpleSoftwareIO\QrCode\Facades\QrCode;


QrCode::generate('Make me into a QrCode!');
```

Fungsi generate diatas, akan menghasilkan string untuk mencetak gambar qr-code.

Contoh string hasil generate :

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="#ffffff"/><g transform="scale(3.448)"><g transform="translate(0,0)"><path fill-rule="evenodd" d="M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L7 9L7 10L6 10L6 11L5 11L5 8L0 8L0 10L1 10L1 11L0 11L0 13L3 13L3 14L4 14L4 15L5 15L5 14L6 14L6 15L7 15L7 16L6 16L6 17L7 17L7 18L5 18L5 17L4 17L4 16L3 16L3 15L2 15L2 14L0 14L0 21L1 21L1 17L4 17L4 18L2 18L2 20L4 20L4 18L5 18L5 19L8 19L8 18L9 18L9 19L11 19L11 18L9 18L9 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L19 21L19 23L20 23L20 25L21 25L21 26L22 26L22 27L23 27L23 29L24 29L24 28L25 28L25 26L24 26L24 25L27 25L27 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 20L26 20L26 18L27 18L27 19L28 19L28 18L29 18L29 17L28 17L28 18L27 18L27 16L29 16L29 15L27 15L27 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 7L21 7L21 5L20 5L20 4L21 4L21 2L19 2L19 1L20 1L20 0L19 0L19 1L17 1L17 2L16 2L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L16 3L16 4L17 4L17 3L19 3L19 4L20 4L20 3L19 3L19 2L17 2L17 3L16 3L16 2ZM16 5L16 6L15 6L15 8L16 8L16 9L15 9L15 10L16 10L16 9L17 9L17 10L18 10L18 9L20 9L20 10L19 10L19 12L21 12L21 11L20 11L20 10L21 10L21 9L20 9L20 8L19 8L19 7L20 7L20 5ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM16 6L16 8L17 8L17 9L18 9L18 8L17 8L17 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L8 9L8 10L9 10L9 12L11 12L11 13L10 13L10 14L13 14L13 15L12 15L12 17L15 17L15 18L16 18L16 19L17 19L17 20L19 20L19 21L20 21L20 20L19 20L19 19L22 19L22 20L23 20L23 18L24 18L24 19L25 19L25 18L26 18L26 17L25 17L25 16L27 16L27 15L25 15L25 14L27 14L27 13L25 13L25 12L27 12L27 10L28 10L28 9L27 9L27 10L26 10L26 9L25 9L25 12L24 12L24 13L23 13L23 12L22 12L22 13L23 13L23 14L24 14L24 15L25 15L25 16L24 16L24 17L23 17L23 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L17 13L17 12L18 12L18 11L16 11L16 13L14 13L14 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM1 9L1 10L3 10L3 11L4 11L4 9ZM10 9L10 11L11 11L11 9ZM22 10L22 11L23 11L23 10ZM6 11L6 12L8 12L8 11ZM3 12L3 13L5 13L5 12ZM6 13L6 14L7 14L7 15L9 15L9 16L7 16L7 17L9 17L9 16L10 16L10 15L9 15L9 14L8 14L8 13ZM16 13L16 14L15 14L15 15L14 15L14 16L16 16L16 17L19 17L19 18L20 18L20 16L21 16L21 17L22 17L22 18L23 18L23 17L22 17L22 16L21 16L21 14L20 14L20 16L16 16L16 14L17 14L17 13ZM24 13L24 14L25 14L25 13ZM24 17L24 18L25 18L25 17ZM14 19L14 20L15 20L15 19ZM6 20L6 21L8 21L8 23L9 23L9 22L11 22L11 23L10 23L10 24L8 24L8 29L10 29L10 28L9 28L9 27L10 27L10 26L11 26L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L19 29L19 28L21 28L21 29L22 29L22 28L21 28L21 27L20 27L20 26L15 26L15 25L19 25L19 24L15 24L15 23L16 23L16 22L15 22L15 23L14 23L14 24L15 24L15 25L12 25L12 23L13 23L13 22L11 22L11 21L9 21L9 20ZM25 20L25 22L28 22L28 21L26 21L26 20ZM21 21L21 24L24 24L24 21ZM17 22L17 23L18 23L18 22ZM22 22L22 23L23 23L23 22ZM25 23L25 24L27 24L27 23ZM10 24L10 25L9 25L9 26L10 26L10 25L11 25L11 24ZM22 25L22 26L23 26L23 27L24 27L24 26L23 26L23 25ZM14 27L14 28L19 28L19 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z" fill="#000000"/></g></g></svg>

```

String di atas dapat langsung disimpan ke database, atau dapat juga langsung ditampilkan pada view/blade

Untuk dokumentasi lebih lengkapnya, bisa cek ke <https://www.simplesoftware.io/#/docs/simple-qrcode>

### referensi

* <https://www.simplesoftware.io/#/docs/simple-qrcode>
* <https://github.com/SimpleSoftwareIO/simple-qrcode>

# Export data to excel or others

Export data ini menggunakan package <https://github.com/maatwebsite/Laravel-Excel>

## Instalasi

Install package menggunakan composer

```cli
composer require maatwebsite/excel
```

Publish config dengan menjalankan perintah

```cli
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

## Mekanisme Dasar

Untuk uji coba fitur export *basic*, dapat dilakukan dengan langkah-langkah berikut ini :

1. Jalankan perintah *make:export* untuk membuat file *export*

    ```cli
    php artisan make:export UsersExport --model=User
    ```

1. Sesuaikan mekanisme file export sesuai kebutuhan

    ```php
    // app/Export/UsersExport.php
    <?php

    namespace App\Exports;

    use App\Models\User;
    use Maatwebsite\Excel\Concerns\FromCollection;

    class UsersExport implements FromCollection
    {
        public function collection()
        {
            return User::all();
        }
    }
    ```

1. Panggil fungsi export dari controller

    ```php
    // App/Http/Controllers/MasterTestController
    
    return Excel::download(new UsersExport, 'exported-users.xlsx');
    ```

## Penggunaan

1. *Export excel* dari database menggunakan *from view*

    Mekanisme ini memberikan keleluasaan dalam mengatur tampilan excel yang diinginkan menggunakan format table dari blade yang sudah disiapkan sebelumnya

    * Siapkan blade sebagai dasar export yang digunakan

        ```php
        // resources/views/exports/user-profile.blade.php

        <!-- main data -->
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th colspan="2" style="text-align: center;">Profil {{ $user->name }}</th>
                </tr>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nama : </td>
                    <td>{{ $user->name }}</td>
                </tr>
                <tr>
                    <td>Email : </td>
                    <td>{{ $user->email }}</td>
                </tr>
            </tbody>
        </table>

        <!-- footer -->
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td>Surabaya, {{ date('d M Y') }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td style="text-align: center;">ttd</td>
                </tr>
                <tr>
                    <td></td>
                    <td style="text-align: center;">( {{ $user->name }} )</td>
                </tr>
            </tbody>
        </table>
        ```

    * Update export file untuk menggunakan mekanisme *from view*

        ```php
        // app/Exports/UsersExport.php

        use Maatwebsite\Excel\Concerns\FromView;

        class UsersExport implements FromView
        {

            public function view(): View
            {
                return view('exports.user-profile', [
                    'user' => User::first()
                ]);        
            }
        }
        ```

    * Panggil fungsi export dari controller

        ```php
        return Excel::download(new UsersExport, 'exported-users.xlsx');
        ```

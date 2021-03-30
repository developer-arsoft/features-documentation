# Import excel file

Import excel ini menggunakan package <https://github.com/maatwebsite/Laravel-Excel>

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

Untuk melakukan uji coba fitur import *basic*, dapat dilakukan dengan langkah-langkah berikut ini :

1. Jalankan perintah *make:import* untuk membuat file *import*

    ```cli
    php artisan make:import UsersImport --model=User
    ```

1. Sesuaikan mekanisme file import sesuai kebutuhan

    ```php
    // app/Imports/UserImport.php
    <?php

    namespace App\Imports;

    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Maatwebsite\Excel\Concerns\ToModel;

    class UserImport implements ToModel
    {
        /**
        * @param array $row
        *
        * @return \Illuminate\Database\Eloquent\Model|null
        */
        public function model(array $row)
        {
            if (!isset($row[0]) || !isset($row[1]) || !isset($row[2])) {
                return null;
            }

            return new User([
                'name' => $row[0],
                'email' => $row[1],
                'password' => Hash::make($row[2])
            ]);
        }
    }
    ```

1. Panggil fungsi import dari controller

    ```php
    // App/Http/Controllers/MasterTestController
    
    // import excel and insert to database
    Excel::import(new UserImport, storage_path('app/public/user-import-dummy.xlsx'));
    ```

    NB :
    * proses import diatas dilakukan dengan cara memanggil file *user-import-dummy.xlsx* yang sebelumnya telah disimpan pada direktori *storage/app/public*
    * selain cara diatas, terdapat beberapa mekanisme lain yang dapat dicek ke halaman ini <https://docs.laravel-excel.com/3.1/imports/basics.html>

## Penggunaan

1. *Import excel* ke database dengan mekanisme *updateOrCreate*

    Jika ingin import menggunakan teknik *updateOrCreate*, dapat dengan menambahkan *WithUpserts* dan fungsi *uniqueBy*

    ```php
    // app/Imports/UserImport.php

    use Maatwebsite\Excel\Concerns\WithUpserts;

    class UserImport implements ToModel, WithUpserts
    {
        /**
        * @return string|array
        */
        public function uniqueBy()
        {
            return ['email'];
        }

        ...
        ...
    }
    ```

1. *Parse excel* menjadi array

    Jika ingin melakukan *parse* data dari excel menjadi *array* untuk diproses lebih lanjut pada controller, bisa dengan menggunakan script berikut :

    ```php
    // App/Http/Controllers/MasterTestController
    
    $array = Excel::toArray(new UsersImport, 'users.xlsx');
    ```

1. *Parse excel* menjadi collection

    Jika ingin melakukan *parse* data dari excel menjadi *collection* untuk diproses lebih lanjut pada controller, bisa dengan menggunakan script berikut :

    ```php
    // App/Http/Controllers/MasterTestController

    $collection = Excel::toCollection(new UsersImport, 'users.xlsx');
    ```

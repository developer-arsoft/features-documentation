# Spatie Permissions

## Konfigurasi

Untuk instalasi dan konfigurasi, dapat mengacu pada halaman ini : <https://spatie.be/docs/laravel-permission/v4/installation-laravel>

Setelah instalasi selesai, selanjutnya menyiapkan beberapa fungsi dan route untuk fitur manajemen *roles and permissions*. Pada fitur ini, terdapat beberapa aksi/tindakan, diantaranya : *create new roles-permissions*, *delete roles-permissions*, *sync permissions to a role or a user*, *assign role to a user*, dan lain sebagainya.

1. Controller

    * create new role

        ```php
        $role = Role::create(['name' => $roleName]);
        // or
        $role = Role::make(['name' => $roleName]); 
        $role->saveOrFail();
        ```

    * create new permission

        ```php
        $permission = Permission::create(['name' => $permissionName]);
        // or
        $permission = Permission::make(['name' => $permissionName]); 
        $permission->saveOrFail();
        ```

    * delete a role

        ```php
        Role::destroy($roleId);
        ```

    * delete a permission

        ```php
        Permission::destroy($permissionId);
        ```

    * sync permissions to a role

        ```php
        $permissionIds = $request->permission_ids;
        $permissions = Permission::whereIn('id', $permissionIds)->get();
        
        $role = Role::where('id', $request->role_id)->first();
        $role->syncPermissions($permissions);
        ```

    * sync permissions to a user

        ```php
        $permissionIds = $request->permission_ids;
        $permissions = Permission::whereIn('id', $permissionIds)->get();

        $user = User::where('id', $request->user_id)->first();
        $user->syncPermissions($permissions);
        ```

    * assign role to a user

        ```php
        $user->assignRole('writer');
        // You can also assign multiple roles at once
        $user->assignRole('writer', 'admin');
        // or as an array
        $user->assignRole(['writer', 'admin']);
        ```

    * etc

1. Route

    Siapkan route sesuai kebutuhan

1. View

    Siapkan view sesuai kebutuhan

more details :

* <https://spatie.be/docs/laravel-permission/v4/installation-laravel>

## Penggunaan

* Menggunakan helper *authorize()*

    ```php
    public function laporanAsetEta()
    {
        DB::beginTransaction();
        try {
            $this->authorize('finance/analysis/aset-eta');
            ...
            ...
        } catch (\Throwable $th) {
            ...
            ...
        }
    }
    ```

    Untuk informasi lebih detail, cek : <https://laravel.com/docs/8.x/authorization#authorizing-or-throwing-exceptions>

* Menggunakan helper *can()*

    Untuk informasi lebih detail, cek : <https://spatie.be/docs/laravel-permission/v4/basic-usage/blade-directives>

* Menggunakan middleware

    Untuk informasi lebih detail, cek : <https://spatie.be/docs/laravel-permission/v4/basic-usage/middleware>

more details :

* <https://spatie.be/docs/laravel-permission/v4/basic-usage/basic-usage>
* <https://spatie.be/docs/laravel-permission/v4/basic-usage/direct-permissions>

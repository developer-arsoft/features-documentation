<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class MasterTestController extends Controller
{
    public function testGenerator()
    {
        $uuid = Str::uuid();

        $generatedQrCode = [];

        $generateQr = QrCode::generate($uuid);
        $temp = [
            'uuid' => $uuid,
            'qr' => $generateQr
        ];
        array_push($generatedQrCode, $temp);

        $order = new Order();
        $order->nota = $uuid;
        $order->qr_image = $generateQr;
        $order->save();

        return view('home')->with([
            'uuid' => $uuid,
            'qr_codes' => $generatedQrCode
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function myOrders()
    {
        $orders = Auth::user()
            ->orders()
            ->with('items')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('my-orders', [
            'orders' => $orders,
        ]);
    }
}

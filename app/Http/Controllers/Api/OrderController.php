<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function myOrders(Request $request)
    {
        $user = $request->user();

        $orders = Order::with('items')
            ->where(function ($q) use ($user) {
                // Match by user_id if logged in
                $q->where('user_id', $user->id);
                // Also match by email if order was placed as guest with same email
                if ($user->email) {
                    $q->orWhere('customer_email', $user->email);
                }
            })
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    public function show(Request $request, $orderId)
    {
        $user = $request->user();

        $order = Order::with('items')
            ->where('id', $orderId)
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id);
                if ($user->email) {
                    $q->orWhere('customer_email', $user->email);
                }
            })
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items')
            ->when($request->status, fn ($q, $v) => $q->where('status', $v))
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('order_number', 'like', "%{$s}%")
                    ->orWhere('customer_name', 'like', "%{$s}%")
                    ->orWhere('customer_phone', 'like', "%{$s}%");
            }))
            ->latest()
            ->paginate(15);

        return view('admin.orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load('items.product', 'items.variant');

        return view('admin.orders.show', compact('order'));
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,confirmed,processing,shipped,delivered,cancelled'],
        ]);

        $oldStatus = $order->status;
        $order->update($validated);

        // Send push notification to customer
        if ($oldStatus !== $validated['status']) {
            $user = $order->user;
            // If no user_id, try to find user by customer_email
            if (!$user && $order->customer_email) {
                $user = \App\Models\User::where('email', $order->customer_email)->first();
            }
            if ($user) {
                NotificationService::sendOrderStatusUpdate($user, $order, $validated['status']);
            }
        }

        return redirect()->route('admin.orders.show', $order)->with('success', 'Order status updated.');
    }
}

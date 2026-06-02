@extends('admin.layouts.master')
@section('title', 'Order '.$order->order_number)
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Order: {{ $order->order_number }}</h4>
    <div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.orders.index') }}">Orders</a></li><li class="breadcrumb-item active">{{ $order->order_number }}</li></ol></div>
</div></div></div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<div class="row">
    <div class="col-md-8">
        <div class="card"><div class="card-body">
            <h5 class="card-title mb-4">Order Items</h5>
            <div class="table-responsive">
                <table class="table table-bordered align-middle">
                    <thead class="table-light"><tr><th>Product</th><th>Variant</th><th>Color</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
                    <tbody>
                        @foreach($order->items as $item)
                        <tr>
                            <td>{{ $item->product_name }}</td>
                            <td>{{ $item->variant_name ?? '—' }}</td>
                            <td>{{ $item->color_name ?? '—' }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>Rs {{ number_format($item->unit_price, 2) }}</td>
                            <td>Rs {{ number_format($item->subtotal, 2) }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr><th colspan="5" class="text-end">Subtotal</th><th>Rs {{ number_format($order->subtotal, 2) }}</th></tr>
                        <tr><th colspan="5" class="text-end">Shipping</th><th>Rs {{ number_format($order->shipping_cost, 2) }}</th></tr>
                        <tr><th colspan="5" class="text-end">Total</th><th class="fw-bold">Rs {{ number_format($order->total, 2) }}</th></tr>
                    </tfoot>
                </table>
            </div>
        </div></div>
    </div>

    <div class="col-md-4">
        <div class="card"><div class="card-body">
            <h5 class="card-title mb-4">Customer Details</h5>
            <p><strong>Name:</strong> {{ $order->customer_name }}</p>
            @if($order->customer_email)<p><strong>Email:</strong> {{ $order->customer_email }}</p>@endif
            <p><strong>Phone:</strong> {{ $order->customer_phone }}</p>
            <p><strong>Address:</strong><br>{{ $order->shipping_address }}</p>
            @if($order->notes)<p><strong>Notes:</strong><br>{{ $order->notes }}</p>@endif
        </div></div>

        <div class="card"><div class="card-body">
            <h5 class="card-title mb-4">Order Status</h5>
            <p><strong>Order #:</strong> {{ $order->order_number }}</p>
            <p><strong>Date:</strong> {{ $order->created_at->format('d M Y, h:i A') }}</p>
            <p><strong>Payment:</strong> {{ str_replace('_', ' ', ucfirst($order->payment_method)) }}</p>
            <p><strong>Payment Status:</strong> <span class="badge bg-{{ $order->payment_status === 'paid' ? 'success' : 'secondary' }}">{{ str_replace('_', ' ', ucfirst($order->payment_status)) }}</span></p>
            <p><strong>Current Status:</strong> <span class="badge bg-{{ $order->status === 'delivered' ? 'success' : ($order->status === 'cancelled' ? 'danger' : ($order->status === 'pending' ? 'warning' : 'info')) }}">{{ ucfirst($order->status) }}</span></p>

            <form action="{{ route('admin.orders.status', $order) }}" method="POST">@csrf @method('PATCH')
                <div class="mb-3">
                    <select name="status" class="form-select">
                        <option value="pending" {{ $order->status=='pending' ? 'selected' : '' }}>Pending</option>
                        <option value="confirmed" {{ $order->status=='confirmed' ? 'selected' : '' }}>Confirmed</option>
                        <option value="processing" {{ $order->status=='processing' ? 'selected' : '' }}>Processing</option>
                        <option value="shipped" {{ $order->status=='shipped' ? 'selected' : '' }}>Shipped</option>
                        <option value="delivered" {{ $order->status=='delivered' ? 'selected' : '' }}>Delivered</option>
                        <option value="cancelled" {{ $order->status=='cancelled' ? 'selected' : '' }}>Cancelled</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary w-100">Update Status</button>
            </form>
        </div></div>
    </div>
</div>
@endsection

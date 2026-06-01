@extends('admin.layouts.master')
@section('title', 'Orders')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Orders</h4>
</div></div></div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-4"><input type="text" name="search" class="form-control" placeholder="Search order #, name, phone..." value="{{ request('search') }}"></div>
        <div class="col-md-3"><select name="status" class="form-select"><option value="">All Status</option><option value="pending" {{ request('status')=='pending' ? 'selected' : '' }}>Pending</option><option value="confirmed" {{ request('status')=='confirmed' ? 'selected' : '' }}>Confirmed</option><option value="processing" {{ request('status')=='processing' ? 'selected' : '' }}>Processing</option><option value="shipped" {{ request('status')=='shipped' ? 'selected' : '' }}>Shipped</option><option value="delivered" {{ request('status')=='delivered' ? 'selected' : '' }}>Delivered</option><option value="cancelled" {{ request('status')=='cancelled' ? 'selected' : '' }}>Cancelled</option></select></div>
        <div class="col-md-2"><button type="submit" class="btn btn-primary w-100">Filter</button></div>
        <div class="col-md-2"><a href="{{ route('admin.orders.index') }}" class="btn btn-secondary w-100">Reset</a></div>
    </form>

    <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
            <thead class="table-light"><tr><th>Order #</th><th>Customer</th><th>Phone</th><th>Items</th><th>Total</th><th>Status</th><th>Payment</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($orders as $o)
                <tr>
                    <td class="fw-semibold">{{ $o->order_number }}</td>
                    <td>{{ $o->customer_name }}@if($o->customer_email)<br><small class="text-muted">{{ $o->customer_email }}</small>@endif</td>
                    <td>{{ $o->customer_phone }}</td>
                    <td>{{ $o->items->count() }}</td>
                    <td>Rs {{ number_format($o->total, 2) }}</td>
                    <td><span class="badge bg-{{ $o->status === 'delivered' ? 'success' : ($o->status === 'cancelled' ? 'danger' : ($o->status === 'pending' ? 'warning' : 'info')) }}">{{ ucfirst($o->status) }}</span></td>
                    <td><span class="badge bg-{{ $o->payment_status === 'paid' ? 'success' : 'secondary' }}">{{ str_replace('_', ' ', ucfirst($o->payment_status)) }}</span></td>
                    <td>{{ $o->created_at->format('d M Y') }}</td>
                    <td><a href="{{ route('admin.orders.show', $o) }}" class="btn btn-sm btn-soft-primary"><i class="ri-eye-line"></i></a></td>
                </tr>
                @empty
                <tr><td colspan="9" class="text-center text-muted py-4">No orders found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    {{ $orders->links() }}
</div></div></div></div>
@endsection

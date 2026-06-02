@extends('admin.layouts.master')
@section('title', 'Coupons')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Coupons</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Coupons</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Coupons</h4><a href="{{ route('admin.coupons.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Coupon</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row mb-3"><div class="col-sm-4"><input type="text" name="search" class="form-control" placeholder="Search by code..." value="{{ request('search') }}"></div><div class="col-sm-2"><button type="submit" class="btn btn-secondary">Search</button></div></form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Valid</th><th>Used</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($coupons as $c)
                <tr>
                    <td><strong>{{ $c->code }}</strong></td>
                    <td><span class="badge bg-info">{{ ucfirst(str_replace('_', ' ', $c->type)) }}</span></td>
                    <td>{{ $c->type === 'percentage' ? $c->value.'%' : ($c->value ? config('app.currency', 'Rs').' '.number_format($c->value, 2) : '—') }}</td>
                    <td>{{ $c->min_order_amount ? config('app.currency', 'Rs').' '.number_format($c->min_order_amount, 2) : '—' }}</td>
                    <td><small>{{ $c->starts_at ? $c->starts_at->format('d M') : '—' }} → {{ $c->expires_at ? $c->expires_at->format('d M Y') : '∞' }}</small></td>
                    <td>{{ $c->total_used ?? 0 }}{{ $c->usage_limit_per_coupon ? '/'.$c->usage_limit_per_coupon : '' }}</td>
                    <td><span class="badge bg-{{ $c->status ? 'success' : 'secondary' }}">{{ $c->status ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.coupons.edit', $c) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.coupons.destroy', $c) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="8" class="text-center text-muted py-4">No coupons found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $coupons->links() }}</div>
</div></div></div></div>
@endsection
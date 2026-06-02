@extends('admin.layouts.master')
@section('title', 'Inventory Logs')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Inventory Logs</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Inventory</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">Stock Movement Logs</h4><a href="{{ route('admin.inventory.adjust') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>Adjust Stock</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-4"><select name="product_id" class="form-select"><option value="">All Products</option>@foreach($products as $p)<option value="{{ $p->id }}" {{ request('product_id')==$p->id ? 'selected' : '' }}>{{ $p->title }} ({{ $p->sku ?? 'no SKU' }})</option>@endforeach</select></div>
        <div class="col-md-2"><select name="type" class="form-select"><option value="">All Types</option><option value="added" {{ request('type')=='added' ? 'selected' : '' }}>Added</option><option value="removed" {{ request('type')=='removed' ? 'selected' : '' }}>Removed</option><option value="adjusted" {{ request('type')=='adjusted' ? 'selected' : '' }}>Adjusted</option></select></div>
        <div class="col-md-2"><button type="submit" class="btn btn-secondary">Filter</button></div>
        <div class="col-md-2"><a href="{{ route('admin.inventory.index') }}" class="btn btn-soft-secondary">Clear</a></div>
    </form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Date</th><th>Product</th><th>Variant</th><th>Type</th><th>Qty</th><th>Previous</th><th>New</th><th>Notes</th></tr></thead>
            <tbody>
                @forelse($logs as $l)
                <tr>
                    <td><small>{{ $l->created_at->format('d M Y H:i') }}</small></td>
                    <td><a href="{{ route('admin.products.edit', $l->product) }}">{{ $l->product->title }}</a></td>
                    <td>{{ $l->variant?->sku ?? $l->variant?->color?->name ?? '—' }}</td>
                    <td><span class="badge bg-{{ $l->type=='added' ? 'success' : ($l->type=='removed' ? 'danger' : 'warning') }}">{{ ucfirst($l->type) }}</span></td>
                    <td><strong>{{ $l->quantity > 0 ? '+'.$l->quantity : $l->quantity }}</strong></td>
                    <td>{{ $l->previous_stock }}</td>
                    <td>{{ $l->new_stock }}</td>
                    <td>{{ $l->notes ?? '—' }}</td>
                </tr>
                @empty <tr><td colspan="8" class="text-center text-muted py-4">No inventory logs found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $logs->links() }}</div>
</div></div></div></div>
@endsection
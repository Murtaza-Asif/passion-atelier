@extends('admin.layouts.master')
@section('title', 'Low Stock Products')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Low Stock Products</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.inventory.index') }}">Inventory</a></li><li class="breadcrumb-item active">Low Stock</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <h4 class="card-title mb-4">Products with Low Stock (≤ 5)</h4>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Image</th><th>Product</th><th>SKU</th><th>Stock</th><th>Action</th></tr></thead>
            <tbody>
                @forelse($products as $p)
                <tr>
                    <td>@if($p->featured_image_url)<img src="{{ $p->featured_image_url }}" style="width:40px;height:40px;object-fit:cover" class="rounded">@else<span class="badge bg-secondary">No img</span>@endif</td>
                    <td><a href="{{ route('admin.products.edit', $p) }}">{{ $p->title }}</a></td>
                    <td>{{ $p->sku ?? '—' }}</td>
                    <td><span class="badge bg-{{ $p->total_stock > 0 ? 'danger' : 'secondary' }}">{{ $p->total_stock ?? 0 }}</span></td>
                    <td><a href="{{ route('admin.inventory.adjust') }}?product_id={{ $p->id }}" class="btn btn-sm btn-soft-primary"><i class="ri-refresh-line me-1"></i>Restock</a></td>
                </tr>
                @empty <tr><td colspan="5" class="text-center text-muted py-4">All products are well-stocked!</td></tr> @endforelse
            </tbody>
        </table>
    </div>
</div></div></div></div>
@endsection
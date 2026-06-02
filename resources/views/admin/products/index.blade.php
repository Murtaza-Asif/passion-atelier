@extends('admin.layouts.master')
@section('title', 'Products')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Products</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Products</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Products</h4><a href="{{ route('admin.products.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>Add Product</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-3"><input type="text" name="search" class="form-control" placeholder="Search title or SKU..." value="{{ request('search') }}"></div>
        <div class="col-md-2"><select name="status" class="form-select"><option value="">All Status</option><option value="draft" {{ request('status')=='draft' ? 'selected' : '' }}>Draft</option><option value="published" {{ request('status')=='published' ? 'selected' : '' }}>Published</option><option value="archived" {{ request('status')=='archived' ? 'selected' : '' }}>Archived</option></select></div>
        <div class="col-md-2"><select name="product_type_id" class="form-select"><option value="">All Types</option>@foreach($productTypes as $pt)<option value="{{ $pt->id }}" {{ request('product_type_id')==$pt->id ? 'selected' : '' }}>{{ $pt->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="category_id" class="form-select"><option value="">All Categories</option>@foreach($categories as $cat)<option value="{{ $cat->id }}" {{ request('category_id')==$cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="brand_id" class="form-select"><option value="">All Brands</option>@foreach($brands as $b)<option value="{{ $b->id }}" {{ request('brand_id')==$b->id ? 'selected' : '' }}>{{ $b->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="collection_id" class="form-select"><option value="">All Collections</option>@foreach($collections as $c)<option value="{{ $c->id }}" {{ request('collection_id')==$c->id ? 'selected' : '' }}>{{ $c->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="flag" class="form-select"><option value="">All Flags</option><option value="featured" {{ request('flag')=='featured' ? 'selected' : '' }}>Featured</option><option value="new_arrival" {{ request('flag')=='new_arrival' ? 'selected' : '' }}>New Arrival</option><option value="best_seller" {{ request('flag')=='best_seller' ? 'selected' : '' }}>Best Seller</option><option value="trending" {{ request('flag')=='trending' ? 'selected' : '' }}>Trending</option></select></div>
        <div class="col-md-2 d-flex gap-1"><button type="submit" class="btn btn-secondary w-100">Filter</button><a href="{{ route('admin.products.index') }}" class="btn btn-soft-secondary w-100">Clear</a></div>
    </form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Image</th><th>Title</th><th>Type</th><th>Category</th><th>Brand</th><th>Price</th><th>Stock</th><th>Status</th><th>Flags</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($products as $p)
                <tr>
                    <td>@if($p->featured_image_url)<img src="{{ $p->featured_image_url }}" style="width:50px;height:50px;object-fit:cover" class="rounded">@else<span class="badge bg-secondary">No img</span>@endif</td>
                    <td><h6 class="mb-0">{{ $p->title }}</h6><small class="text-muted">SKU: {{ $p->sku ?? '—' }}</small></td>
                    <td>{{ $p->productType?->name ?? '—' }}</td>
                    <td>{{ $p->category?->name ?? '—' }}</td>
                    <td>{{ $p->brand?->name ?? '—' }}</td>
                    <td>@if($p->sale_price)<span class="text-danger">{{ config('app.currency', 'Rs') }} {{ number_format($p->sale_price, 2) }}</span><br><del class="text-muted small">{{ config('app.currency', 'Rs') }} {{ number_format($p->regular_price, 2) }}</del>@elseif($p->regular_price)<span>{{ config('app.currency', 'Rs') }} {{ number_format($p->regular_price, 2) }}</span>@else—@endif</td>
                    <td><span class="badge bg-{{ $p->total_stock > 0 ? 'info' : 'secondary' }}">{{ $p->total_stock ?? 0 }}</span></td>
                    <td><span class="badge bg-{{ $p->status=='published' ? 'success' : ($p->status=='draft' ? 'warning' : 'secondary') }}">{{ ucfirst($p->status) }}</span></td>
                    <td>
                        @if($p->is_featured)<span class="badge bg-primary me-1">Featured</span>@endif
                        @if($p->is_new_arrival)<span class="badge bg-info me-1">New</span>@endif
                        @if($p->is_best_seller)<span class="badge bg-success me-1">Best</span>@endif
                        @if($p->is_trending)<span class="badge bg-danger">Trend</span>@endif
                    </td>
                    <td>
                        <a href="{{ route('admin.products.edit', $p) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.products.duplicate', $p) }}" method="POST" class="d-inline">@csrf<button type="submit" class="btn btn-sm btn-soft-info" title="Duplicate"><i class="ri-file-copy-line"></i></button></form>
                        <form action="{{ route('admin.products.destroy', $p) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete product permanently?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="10" class="text-center text-muted py-4">No products found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $products->links() }}</div>
</div></div></div></div>
@endsection
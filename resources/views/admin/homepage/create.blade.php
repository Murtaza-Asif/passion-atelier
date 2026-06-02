@extends('admin.layouts.master')
@section('title', 'Create Homepage Section')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Section</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.homepage.index') }}">Homepage</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.homepage.store') }}" method="POST">@csrf
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Section Type <span class="text-danger">*</span></label><select name="section_type" class="form-select" required><option value="">—</option><option value="featured" {{ old('section_type')=='featured' ? 'selected' : '' }}>Featured</option><option value="new_arrivals" {{ old('section_type')=='new_arrivals' ? 'selected' : '' }}>New Arrivals</option><option value="best_sellers" {{ old('section_type')=='best_sellers' ? 'selected' : '' }}>Best Sellers</option><option value="trending" {{ old('section_type')=='trending' ? 'selected' : '' }}>Trending</option><option value="recommended" {{ old('section_type')=='recommended' ? 'selected' : '' }}>Recommended</option><option value="collection_based" {{ old('section_type')=='collection_based' ? 'selected' : '' }}>Collection Based</option><option value="custom_category" {{ old('section_type')=='custom_category' ? 'selected' : '' }}>Custom Category</option><option value="custom" {{ old('section_type')=='custom' ? 'selected' : '' }}>Custom</option></select></div>
            <div class="col-md-4"><label class="form-label">Title</label><input type="text" name="title" class="form-control" value="{{ old('title') }}"></div>
            <div class="col-md-2"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0"></div>
            <div class="col-md-2"><div class="form-check mt-4"><input type="checkbox" name="is_active" class="form-check-input" value="1" checked><label class="form-check-label">Active</label></div></div>
        </div>
        <div class="mb-3"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="2" maxlength="500">{{ old('description') }}</textarea></div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Reference Type</label><select name="reference_type" class="form-select"><option value="">—</option><option value="collection" {{ old('reference_type')=='collection' ? 'selected' : '' }}>Collection</option><option value="category" {{ old('reference_type')=='category' ? 'selected' : '' }}>Category</option><option value="custom" {{ old('reference_type')=='custom' ? 'selected' : '' }}>Custom</option></select></div>
            <div class="col-md-4"><label class="form-label">Reference ID</label><input type="number" name="reference_id" class="form-control" value="{{ old('reference_id') }}" placeholder="Collection/Category ID"></div>
            <div class="col-md-4"><label class="form-label">BG Color</label><input type="text" name="bg_color" class="form-control" value="{{ old('bg_color') }}" placeholder="#f8f9fa"></div>
        </div>
        <h5 class="mb-3 mt-4">Products</h5>
        <div class="mb-3"><select name="product_ids[]" class="form-select" multiple size="8">@foreach($products as $p)<option value="{{ $p->id }}" {{ in_array($p->id, old('product_ids', [])) ? 'selected' : '' }}>{{ $p->title }} ({{ $p->sku ?? 'no SKU' }})</option>@endforeach</select><small class="text-muted">Hold Ctrl/Cmd to select multiple. They will appear in the selected order.</small></div>
        <button type="submit" class="btn btn-primary">Create Section</button>
        <a href="{{ route('admin.homepage.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
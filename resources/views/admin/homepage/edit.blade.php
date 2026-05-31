@extends('admin.layouts.master')
@section('title', 'Edit Homepage Section')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Edit Section</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.homepage.index') }}">Homepage</a></li><li class="breadcrumb-item active">Edit</li></ol></div>
</div></div></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.homepage.update', $section) }}" method="POST">@csrf @method('PUT')
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Section Type <span class="text-danger">*</span></label><select name="section_type" class="form-select" required><option value="">—</option><option value="featured" {{ old('section_type', $section->section_type)=='featured' ? 'selected' : '' }}>Featured</option><option value="new_arrivals" {{ old('section_type', $section->section_type)=='new_arrivals' ? 'selected' : '' }}>New Arrivals</option><option value="best_sellers" {{ old('section_type', $section->section_type)=='best_sellers' ? 'selected' : '' }}>Best Sellers</option><option value="trending" {{ old('section_type', $section->section_type)=='trending' ? 'selected' : '' }}>Trending</option><option value="recommended" {{ old('section_type', $section->section_type)=='recommended' ? 'selected' : '' }}>Recommended</option><option value="collection_based" {{ old('section_type', $section->section_type)=='collection_based' ? 'selected' : '' }}>Collection Based</option><option value="custom_category" {{ old('section_type', $section->section_type)=='custom_category' ? 'selected' : '' }}>Custom Category</option><option value="custom" {{ old('section_type', $section->section_type)=='custom' ? 'selected' : '' }}>Custom</option></select></div>
            <div class="col-md-4"><label class="form-label">Title</label><input type="text" name="title" class="form-control" value="{{ old('title', $section->title) }}"></div>
            <div class="col-md-2"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $section->sort_order) }}" min="0"></div>
            <div class="col-md-2"><div class="form-check mt-4"><input type="checkbox" name="is_active" class="form-check-input" value="1" {{ old('is_active', $section->is_active) ? 'checked' : '' }}><label class="form-check-label">Active</label></div></div>
        </div>
        <div class="mb-3"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="2" maxlength="500">{{ old('description', $section->description) }}</textarea></div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Reference Type</label><select name="reference_type" class="form-select"><option value="">—</option><option value="collection" {{ old('reference_type', $section->reference_type)=='collection' ? 'selected' : '' }}>Collection</option><option value="category" {{ old('reference_type', $section->reference_type)=='category' ? 'selected' : '' }}>Category</option><option value="custom" {{ old('reference_type', $section->reference_type)=='custom' ? 'selected' : '' }}>Custom</option></select></div>
            <div class="col-md-4"><label class="form-label">Reference ID</label><input type="number" name="reference_id" class="form-control" value="{{ old('reference_id', $section->reference_id) }}"></div>
            <div class="col-md-4"><label class="form-label">BG Color</label><input type="text" name="bg_color" class="form-control" value="{{ old('bg_color', $section->bg_color) }}"></div>
        </div>
        <h5 class="mb-3 mt-4">Products</h5>
        <div class="mb-3"><select name="product_ids[]" class="form-select" multiple size="8">@foreach($products as $p)<option value="{{ $p->id }}" {{ in_array($p->id, old('product_ids', $section->products->pluck('id')->toArray())) ? 'selected' : '' }}>{{ $p->title }} ({{ $p->sku ?? 'no SKU' }})</option>@endforeach</select><small class="text-muted">Hold Ctrl/Cmd to select multiple.</small></div>
        <button type="submit" class="btn btn-primary">Update Section</button>
        <a href="{{ route('admin.homepage.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
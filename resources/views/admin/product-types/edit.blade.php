@extends('admin.layouts.master')
@section('title', 'Edit Product Type')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Edit Product Type</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.product-types.index') }}">Product Types</a></li><li class="breadcrumb-item active">Edit</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.product-types.update', $productType) }}" method="POST">@csrf @method('PUT')
        <div class="mb-3"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $productType->name) }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="mb-3"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug', $productType->slug) }}"></div>
        <div class="mb-3"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="3">{{ old('description', $productType->description) }}</textarea></div>
        <div class="row mb-3"><div class="col-sm-6"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $productType->sort_order) }}" min="0"></div></div>
        <div class="form-check mb-3"><input type="checkbox" name="is_active" class="form-check-input" value="1" {{ old('is_active', $productType->is_active) ? 'checked' : '' }}><label class="form-check-label">Active</label></div>
        <button type="submit" class="btn btn-primary">Update</button><a href="{{ route('admin.product-types.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection

@extends('admin.layouts.master')
@section('title', 'Edit Category')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Edit Category</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li><li class="breadcrumb-item active">Edit</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.categories.update', $category) }}" method="POST" enctype="multipart/form-data">@csrf @method('PUT')
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $category->name) }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-6"><label class="form-label">Parent Category</label><select name="parent_id" class="form-select"><option value="">None</option>@foreach($parentCategories as $p)<option value="{{ $p->id }}" {{ old('parent_id', $category->parent_id) == $p->id ? 'selected' : '' }}>{{ $p->name }}</option>@endforeach</select></div>
        </div>
        <div class="mb-3"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug', $category->slug) }}"></div>
        <div class="mb-3"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="3">{{ old('description', $category->description) }}</textarea></div>
        <div class="row mb-3"><div class="col-md-6"><label class="form-label">Image</label><input type="file" name="image" class="form-control">@if($category->image_url)<div class="mt-1"><img src="{{ $category->image_url }}" style="max-height:60px" class="rounded"></div>@endif</div><div class="col-md-6"><label class="form-label">Banner</label><input type="file" name="banner" class="form-control">@if($category->banner_url)<div class="mt-1"><img src="{{ $category->banner_url }}" style="max-height:60px" class="rounded"></div>@endif</div></div>
        <div class="row mb-3"><div class="col-md-6"><label class="form-label">Meta Title</label><input type="text" name="meta_title" class="form-control" value="{{ old('meta_title', $category->meta_title) }}"></div><div class="col-md-6"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $category->sort_order) }}" min="0"></div></div>
        <div class="mb-3"><label class="form-label">Meta Description</label><textarea name="meta_description" class="form-control" rows="2">{{ old('meta_description', $category->meta_description) }}</textarea></div>
        <div class="mb-3"><label class="form-label">Meta Keywords</label><input type="text" name="meta_keywords" class="form-control" value="{{ old('meta_keywords', $category->meta_keywords) }}"></div>
        <div class="form-check mb-3"><input type="checkbox" name="status" class="form-check-input" value="1" {{ old('status', $category->status) ? 'checked' : '' }}><label class="form-check-label">Active</label></div>
        <button type="submit" class="btn btn-primary">Update</button><a href="{{ route('admin.categories.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection

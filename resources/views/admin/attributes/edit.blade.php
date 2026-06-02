@extends('admin.layouts.master')
@section('title', 'Edit Attribute')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Edit Attribute</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.attributes.index') }}">Attributes</a></li><li class="breadcrumb-item active">Edit</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.attributes.update', $attribute) }}" method="POST">@csrf @method('PUT')
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $attribute->name) }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-6"><label class="form-label">Attribute Group</label><select name="attribute_group_id" class="form-select"><option value="">None</option>@foreach($groups as $g)<option value="{{ $g->id }}" {{ old('attribute_group_id', $attribute->attribute_group_id) == $g->id ? 'selected' : '' }}>{{ $g->name }}</option>@endforeach</select></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug', $attribute->slug) }}"></div>
            <div class="col-md-6"><label class="form-label">Input Type</label><select name="input_type" class="form-select"><option value="select" {{ (old('input_type',$attribute->input_type))=='select'?'selected':'' }}>Select</option><option value="multiselect" {{ (old('input_type',$attribute->input_type))=='multiselect'?'selected':'' }}>Multi Select</option><option value="text" {{ (old('input_type',$attribute->input_type))=='text'?'selected':'' }}>Text</option><option value="color" {{ (old('input_type',$attribute->input_type))=='color'?'selected':'' }}>Color</option></select></div>
        </div>
        <div class="mb-3"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="2">{{ old('description', $attribute->description) }}</textarea></div>
        <div class="row mb-3">
            <div class="col-md-4"><div class="form-check mt-3"><input type="checkbox" name="is_filterable" class="form-check-input" value="1" {{ old('is_filterable', $attribute->is_filterable) ? 'checked' : '' }}><label>Show in Filters</label></div></div>
            <div class="col-md-4"><div class="form-check mt-3"><input type="checkbox" name="is_visible_on_front" class="form-check-input" value="1" {{ old('is_visible_on_front', $attribute->is_visible_on_front) ? 'checked' : '' }}><label>Visible on Frontend</label></div></div>
            <div class="col-md-4"><div class="form-check mt-3"><input type="checkbox" name="is_specification" class="form-check-input" value="1" {{ old('is_specification', $attribute->is_specification) ? 'checked' : '' }}><label>Show as Specification</label></div></div>
        </div>
        <div class="row mb-3"><div class="col-md-4"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $attribute->sort_order) }}" min="0"></div></div>
        <div class="form-check mb-3"><input type="checkbox" name="status" class="form-check-input" value="1" {{ old('status', $attribute->status) ? 'checked' : '' }}><label class="form-check-label">Active</label></div>
        <button type="submit" class="btn btn-primary">Update</button><a href="{{ route('admin.attributes.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection

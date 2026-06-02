@extends('admin.layouts.master')
@section('title', 'Create Color')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Color</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.colors.index') }}">Colors</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.colors.store') }}" method="POST" enctype="multipart/form-data">@csrf
        <div class="mb-3"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">HEX Code</label><div class="input-group"><input type="color" name="hex_code_swatch" class="form-control form-control-color" value="#000000"><input type="text" name="hex_code" class="form-control" value="{{ old('hex_code') }}" placeholder="#000000" maxlength="9"></div></div>
            <div class="col-md-6"><label class="form-label">Image</label><input type="file" name="image" class="form-control"></div>
        </div>
        <div class="row mb-3"><div class="col-md-6"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0"></div></div>
        <div class="form-check mb-3"><input type="checkbox" name="status" class="form-check-input" value="1" checked><label class="form-check-label">Active</label></div>
        <button type="submit" class="btn btn-primary">Create</button><a href="{{ route('admin.colors.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
<script>document.querySelector('input[name="hex_code_swatch"]')?.addEventListener('input', function(){document.querySelector('input[name="hex_code"]').value=this.value});document.querySelector('input[name="hex_code"]')?.addEventListener('input', function(){document.querySelector('input[name="hex_code_swatch"]').value=this.value});</script>
@endsection

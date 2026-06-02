@extends('admin.layouts.master')
@section('title', 'Create Tag')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Tag</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.tags.index') }}">Tags</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.tags.store') }}" method="POST">@csrf
        <div class="mb-3"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="mb-3"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="Auto"></div>
        <button type="submit" class="btn btn-primary">Create</button><a href="{{ route('admin.tags.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection

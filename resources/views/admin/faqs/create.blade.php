@extends('admin.layouts.master')
@section('title', 'Create FAQ')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create FAQ</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.faqs.index') }}">FAQs</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.faqs.store') }}" method="POST">@csrf
        <div class="mb-3"><label class="form-label">Product <span class="text-danger">*</span></label><select name="product_id" class="form-select @error('product_id') is-invalid @enderror" required><option value="">—</option>@foreach($products as $p)<option value="{{ $p->id }}" {{ old('product_id')==$p->id ? 'selected' : '' }}>{{ $p->title }}</option>@endforeach</select>@error('product_id')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="mb-3"><label class="form-label">Question <span class="text-danger">*</span></label><input type="text" name="question" class="form-control @error('question') is-invalid @enderror" value="{{ old('question') }}" required>@error('question')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="mb-3"><label class="form-label">Answer <span class="text-danger">*</span></label><textarea name="answer" class="form-control @error('answer') is-invalid @enderror" rows="4" required>{{ old('answer') }}</textarea>@error('answer')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0"></div>
            <div class="col-md-4"><div class="form-check mt-4"><input type="checkbox" name="status" class="form-check-input" value="1" checked><label class="form-check-label">Active</label></div></div>
        </div>
        <button type="submit" class="btn btn-primary">Create FAQ</button>
        <a href="{{ route('admin.faqs.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
@extends('admin.layouts.master')
@section('title', 'Create Offer')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Offer</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.offers.index') }}">Offers</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.offers.store') }}" method="POST">@csrf
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">Name <span class="text-danger">*</span></label><input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}" required>@error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-3"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="Auto"></div>
            <div class="col-md-3"><label class="form-label">Type <span class="text-danger">*</span></label><select name="type" class="form-select" required><option value="">—</option><option value="percentage" {{ old('type')=='percentage' ? 'selected' : '' }}>Percentage</option><option value="fixed" {{ old('type')=='fixed' ? 'selected' : '' }}>Fixed</option><option value="bxgy" {{ old('type')=='bxgy' ? 'selected' : '' }}>Buy X Get Y</option></select></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Value</label><input type="number" step="0.01" name="value" class="form-control" value="{{ old('value') }}"></div>
            <div class="col-md-2"><label class="form-label">Buy Qty</label><input type="number" name="buy_qty" class="form-control" value="{{ old('buy_qty') }}" min="1"></div>
            <div class="col-md-2"><label class="form-label">Get Qty</label><input type="number" name="get_qty" class="form-control" value="{{ old('get_qty') }}" min="1"></div>
            <div class="col-md-3"><label class="form-label">Get Product</label><select name="get_product_id" class="form-select"><option value="">—</option>@foreach($products as $p)<option value="{{ $p->id }}" {{ old('get_product_id')==$p->id ? 'selected' : '' }}>{{ $p->title }}</option>@endforeach</select></div>
            <div class="col-md-2"><div class="form-check mt-4"><input type="checkbox" name="status" class="form-check-input" value="1" checked><label class="form-check-label">Active</label></div></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Min Order Amount</label><input type="number" step="0.01" name="min_order_amount" class="form-control" value="{{ old('min_order_amount') }}"></div>
            <div class="col-md-4"><label class="form-label">Max Discount Amount</label><input type="number" step="0.01" name="max_discount_amount" class="form-control" value="{{ old('max_discount_amount') }}"></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Starts At</label><input type="datetime-local" name="starts_at" class="form-control" value="{{ old('starts_at') }}"></div>
            <div class="col-md-4"><label class="form-label">Expires At</label><input type="datetime-local" name="expires_at" class="form-control" value="{{ old('expires_at') }}"></div>
        </div>
        <h5 class="mb-3 mt-4">Applicable Products</h5>
        <div class="mb-3"><select name="product_ids[]" class="form-select" multiple size="6">@foreach($products as $p)<option value="{{ $p->id }}" {{ in_array($p->id, old('product_ids', [])) ? 'selected' : '' }}>{{ $p->title }} ({{ $p->sku ?? 'no SKU' }})</option>@endforeach</select><small class="text-muted">Leave empty to apply to all products. Hold Ctrl/Cmd for multiple.</small></div>
        <button type="submit" class="btn btn-primary">Create Offer</button>
        <a href="{{ route('admin.offers.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
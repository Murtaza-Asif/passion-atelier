@extends('admin.layouts.master')
@section('title', 'Create Coupon')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Coupon</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.coupons.index') }}">Coupons</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.coupons.store') }}" method="POST">@csrf
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Code <span class="text-danger">*</span></label><input type="text" name="code" class="form-control @error('code') is-invalid @enderror" value="{{ old('code') }}" required>@error('code')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-4"><label class="form-label">Type <span class="text-danger">*</span></label><select name="type" class="form-select" required><option value="">—</option><option value="percentage" {{ old('type')=='percentage' ? 'selected' : '' }}>Percentage</option><option value="fixed" {{ old('type')=='fixed' ? 'selected' : '' }}>Fixed</option><option value="free_shipping" {{ old('type')=='free_shipping' ? 'selected' : '' }}>Free Shipping</option><option value="bxgy" {{ old('type')=='bxgy' ? 'selected' : '' }}>Buy X Get Y</option></select></div>
            <div class="col-md-4"><div class="form-check mt-4"><input type="checkbox" name="status" class="form-check-input" value="1" checked><label class="form-check-label">Active</label></div></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Value</label><input type="number" step="0.01" name="value" class="form-control" value="{{ old('value') }}"></div>
            <div class="col-md-3"><label class="form-label">Min Order Amount</label><input type="number" step="0.01" name="min_order_amount" class="form-control" value="{{ old('min_order_amount') }}"></div>
            <div class="col-md-3"><label class="form-label">Max Discount Amount</label><input type="number" step="0.01" name="max_discount_amount" class="form-control" value="{{ old('max_discount_amount') }}"></div>
            <div class="col-md-3"><div class="form-check mt-4"><input type="checkbox" name="is_stackable" class="form-check-input" value="1" {{ old('is_stackable') ? 'checked' : '' }}><label class="form-check-label">Stackable with other coupons</label></div></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Usage Limit (per coupon)</label><input type="number" name="usage_limit_per_coupon" class="form-control" value="{{ old('usage_limit_per_coupon') }}" min="1"></div>
            <div class="col-md-4"><label class="form-label">Usage Limit (per user)</label><input type="number" name="usage_limit_per_user" class="form-control" value="{{ old('usage_limit_per_user') }}" min="1"></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Starts At</label><input type="datetime-local" name="starts_at" class="form-control" value="{{ old('starts_at') }}"></div>
            <div class="col-md-4"><label class="form-label">Expires At</label><input type="datetime-local" name="expires_at" class="form-control" value="{{ old('expires_at') }}"></div>
        </div>
        <h5 class="mb-3 mt-4">Applicable Products</h5>
        <div class="mb-3"><select name="product_ids[]" class="form-select" multiple size="6">@foreach($products as $p)<option value="{{ $p->id }}" {{ in_array($p->id, old('product_ids', [])) ? 'selected' : '' }}>{{ $p->title }} ({{ $p->sku ?? 'no SKU' }})</option>@endforeach</select><small class="text-muted">Leave empty to apply to all products. Hold Ctrl/Cmd for multiple.</small></div>
        <h5 class="mb-3 mt-4">Applicable Categories</h5>
        <div class="mb-3"><select name="category_ids[]" class="form-select" multiple size="5">@foreach($categories as $cat)<option value="{{ $cat->id }}" {{ in_array($cat->id, old('category_ids', [])) ? 'selected' : '' }}>{{ $cat->name }}</option>@endforeach</select><small class="text-muted">Leave empty to apply to all categories.</small></div>
        <button type="submit" class="btn btn-primary">Create Coupon</button>
        <a href="{{ route('admin.coupons.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
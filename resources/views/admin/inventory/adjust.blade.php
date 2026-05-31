@extends('admin.layouts.master')
@section('title', 'Adjust Stock')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Adjust Stock</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.inventory.index') }}">Inventory</a></li><li class="breadcrumb-item active">Adjust</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.inventory.adjust.store') }}" method="POST">@csrf
        <div class="mb-3"><label class="form-label">Product <span class="text-danger">*</span></label><select name="product_id" id="product-select" class="form-select" required><option value="">Select Product</option>@foreach($products as $p)<option value="{{ $p->id }}" {{ old('product_id')==$p->id ? 'selected' : '' }}>{{ $p->title }} (SKU: {{ $p->sku ?? 'N/A' }}) — Stock: {{ $p->total_stock }}</option>@endforeach</select></div>
        <div class="mb-3"><label class="form-label">Variant (optional)</label><select name="product_variant_id" id="variant-select" class="form-select"><option value="">Main Product (no variant)</option></select><small class="text-muted">Select a product first to load its variants.</small></div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Quantity <span class="text-danger">*</span></label><input type="number" name="quantity" class="form-control @error('quantity') is-invalid @enderror" value="{{ old('quantity') }}" required>@error('quantity')<div class="invalid-feedback">{{ $message }}</div>@enderror<small class="text-muted">Use positive for addition, negative for removal.</small></div>
            <div class="col-md-4"><label class="form-label">Type <span class="text-danger">*</span></label><select name="type" class="form-select" required><option value="added" {{ old('type')=='added' ? 'selected' : '' }}>Added (Stock In)</option><option value="removed" {{ old('type')=='removed' ? 'selected' : '' }}>Removed (Stock Out)</option><option value="adjusted" {{ old('type')=='adjusted' ? 'selected' : '' }}>Adjusted (Manual)</option></select></div>
        </div>
        <div class="mb-3"><label class="form-label">Notes</label><textarea name="notes" class="form-control" rows="2" maxlength="500">{{ old('notes') }}</textarea></div>
        <button type="submit" class="btn btn-primary">Adjust Stock</button>
        <a href="{{ route('admin.inventory.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection

@push('scripts')
<script>
document.getElementById('product-select')?.addEventListener('change', function() {
    const productId = this.value;
    const variantSelect = document.getElementById('variant-select');
    variantSelect.innerHTML = '<option value="">Main Product (no variant)</option>';
    if (!productId) return;
    @json($products).forEach(function(p) {
        if (p.id == productId && p.variants && p.variants.length) {
            p.variants.forEach(function(v) {
                const opt = document.createElement('option');
                opt.value = v.id;
                opt.textContent = (v.sku || 'No SKU') + ' — ' + (v.color ? v.color.name : 'No color') + ' (Stock: ' + (v.stock || 0) + ')';
                variantSelect.appendChild(opt);
            });
        }
    });
});
</script>
@endpush
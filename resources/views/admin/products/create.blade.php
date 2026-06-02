@extends('admin.layouts.master')
@section('title', 'Create Product')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Create Product</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li><li class="breadcrumb-item active">Create</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">@csrf
        <div class="row mb-3">
            <div class="col-md-8"><label class="form-label">Title <span class="text-danger">*</span></label><input type="text" name="title" class="form-control @error('title') is-invalid @enderror" value="{{ old('title') }}" required>@error('title')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-2"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="Auto"></div>
            <div class="col-md-2"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', 0) }}" min="0"></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">SKU</label><input type="text" name="sku" class="form-control @error('sku') is-invalid @enderror" value="{{ old('sku') }}">@error('sku')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
            <div class="col-md-4"><label class="form-label">Barcode</label><input type="text" name="barcode" class="form-control" value="{{ old('barcode') }}"></div>
            <div class="col-md-2"><label class="form-label">Unit</label><input type="text" name="unit" class="form-control" value="{{ old('unit') }}" placeholder="pcs, meter"></div>
            <div class="col-md-2"><label class="form-label">Status</label><select name="status" class="form-select"><option value="draft" {{ old('status')=='draft' ? 'selected' : '' }}>Draft</option><option value="published" {{ old('status')=='published' ? 'selected' : '' }}>Published</option><option value="archived" {{ old('status')=='archived' ? 'selected' : '' }}>Archived</option></select></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Product Type</label><select name="product_type_id" class="form-select"><option value="">—</option>@foreach($productTypes as $pt)<option value="{{ $pt->id }}" {{ old('product_type_id')==$pt->id ? 'selected' : '' }}>{{ $pt->name }}</option>@endforeach</select></div>
            <div class="col-md-3"><label class="form-label">Category</label><select name="category_id" class="form-select"><option value="">—</option>@foreach($categories as $cat)<option value="{{ $cat->id }}" {{ old('category_id')==$cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>@endforeach</select></div>
            <div class="col-md-3"><label class="form-label">Brand</label><select name="brand_id" class="form-select"><option value="">—</option>@foreach($brands as $b)<option value="{{ $b->id }}" {{ old('brand_id')==$b->id ? 'selected' : '' }}>{{ $b->name }}</option>@endforeach</select></div>
            <div class="col-md-3"><label class="form-label">Collection</label><select name="collection_id" class="form-select"><option value="">—</option>@foreach($collections as $c)<option value="{{ $c->id }}" {{ old('collection_id')==$c->id ? 'selected' : '' }}>{{ $c->name }}</option>@endforeach</select></div>
        </div>
        <div class="mb-3"><label class="form-label">Short Description</label><textarea name="short_description" class="form-control" rows="2" maxlength="500">{{ old('short_description') }}</textarea></div>
        <div class="mb-3"><label class="form-label">Full Description</label><textarea name="full_description" class="form-control" rows="5">{{ old('full_description') }}</textarea></div>
        <div class="mb-3"><label class="form-label">Season Label</label><input type="text" name="season_label" class="form-control" value="{{ old('season_label') }}" placeholder="e.g. All-season, Spring/Summer, Winter"></div>

        <h5 class="mb-3 mt-4">Pricing & Tax</h5>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Cost Price</label><input type="number" step="0.01" name="cost_price" class="form-control" value="{{ old('cost_price') }}"></div>
            <div class="col-md-3"><label class="form-label">Regular Price</label><input type="number" step="0.01" name="regular_price" class="form-control" value="{{ old('regular_price') }}"></div>
            <div class="col-md-3"><label class="form-label">Sale Price</label><input type="number" step="0.01" name="sale_price" class="form-control" value="{{ old('sale_price') }}"></div>
            <div class="col-md-3"><label class="form-label">Discount %</label><input type="number" step="0.01" name="discount_percent" class="form-control" value="{{ old('discount_percent') }}" min="0" max="100"></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Discount Amount</label><input type="number" step="0.01" name="discount_amount" class="form-control" value="{{ old('discount_amount') }}"></div>
            <div class="col-md-3"><label class="form-label">Tax Type</label><select name="tax_type" class="form-select"><option value="">None</option><option value="percentage" {{ old('tax_type')=='percentage' ? 'selected' : '' }}>Percentage</option><option value="fixed" {{ old('tax_type')=='fixed' ? 'selected' : '' }}>Fixed</option></select></div>
            <div class="col-md-3"><label class="form-label">Tax Value</label><input type="number" step="0.01" name="tax_value" class="form-control" value="{{ old('tax_value') }}"></div>
            <div class="col-md-3"><label class="form-label">Video URL</label><input type="url" name="video_url" class="form-control" value="{{ old('video_url') }}" placeholder="https://..."></div>
        </div>

        <h5 class="mb-3 mt-4">Flags</h5>
        <div class="row mb-3">
            <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_featured" class="form-check-input" value="1" {{ old('is_featured') ? 'checked' : '' }}><label class="form-check-label">Featured</label></div></div>
            <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_new_arrival" class="form-check-input" value="1" {{ old('is_new_arrival') ? 'checked' : '' }}><label class="form-check-label">New Arrival</label></div></div>
            <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_best_seller" class="form-check-input" value="1" {{ old('is_best_seller') ? 'checked' : '' }}><label class="form-check-label">Best Seller</label></div></div>
            <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_trending" class="form-check-input" value="1" {{ old('is_trending') ? 'checked' : '' }}><label class="form-check-label">Trending</label></div></div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3"><label class="form-label">Min Order Qty</label><input type="number" name="min_order_qty" class="form-control" value="{{ old('min_order_qty', 1) }}" min="1"></div>
            <div class="col-md-3"><label class="form-label">Max Order Qty</label><input type="number" name="max_order_qty" class="form-control" value="{{ old('max_order_qty') }}" min="1"></div>
        </div>

        <h5 class="mb-3 mt-4">Media</h5>
        <div class="row mb-3">
            <div class="col-md-4"><label class="form-label">Featured Image</label><input type="file" name="featured_image" class="form-control" accept="image/*"></div>
            <div class="col-md-4"><label class="form-label">OG Image (SEO)</label><input type="file" name="og_image" class="form-control" accept="image/*"></div>
            <div class="col-md-4"><label class="form-label">Gallery Images</label><input type="file" name="gallery_images[]" class="form-control" accept="image/*" multiple></div>
        </div>

        <h5 class="mb-3 mt-4">SEO</h5>
        <div class="row mb-3">
            <div class="col-md-6"><label class="form-label">Meta Title</label><input type="text" name="meta_title" class="form-control" value="{{ old('meta_title') }}"></div>
            <div class="col-md-6"><label class="form-label">Meta Keywords</label><input type="text" name="meta_keywords" class="form-control" value="{{ old('meta_keywords') }}"></div>
        </div>
        <div class="mb-3"><label class="form-label">Meta Description</label><textarea name="meta_description" class="form-control" rows="2">{{ old('meta_description') }}</textarea></div>

        <h5 class="mb-3 mt-4">Tags</h5>
        <div class="mb-3">
            <select name="tags[]" class="form-select" multiple size="5">
                @foreach($tags as $t)
                <option value="{{ $t->id }}" {{ in_array($t->id, old('tags', [])) ? 'selected' : '' }}>{{ $t->name }}</option>
                @endforeach
            </select>
            <small class="text-muted">Hold Ctrl/Cmd to select multiple</small>
        </div>

        <button type="submit" class="btn btn-primary">Create Product</button>
        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div></div></div></div>
@endsection
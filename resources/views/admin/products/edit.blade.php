@extends('admin.layouts.master')
@section('title', 'Edit Product')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Edit Product: {{ $product->title }}</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li><li class="breadcrumb-item active">Edit</li></ol></div>
</div></div></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

{{-- Hidden variant-add form (outside main form to avoid nesting) --}}
<form id="variant-form" action="{{ route('admin.products.variants.store', $product) }}" method="POST" enctype="multipart/form-data">@csrf</form>

<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <ul class="nav nav-tabs nav-justified mb-4" role="tablist">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#basic">Basic Info</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#pricing">Pricing & Tax</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#media">Media</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#seo">SEO</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#variants">Variants</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#attr">Attributes</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tags">Tags</a></li>
    </ul>

    <form action="{{ route('admin.products.update', $product) }}" method="POST" enctype="multipart/form-data">@csrf @method('PUT')
        <div class="tab-content">
            {{-- Basic Info --}}
            <div class="tab-pane active" id="basic">
                <div class="row mb-3">
                    <div class="col-md-8"><label class="form-label">Title <span class="text-danger">*</span></label><input type="text" name="title" class="form-control @error('title') is-invalid @enderror" value="{{ old('title', $product->title) }}" required>@error('title')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
                    <div class="col-md-2"><label class="form-label">Slug</label><input type="text" name="slug" class="form-control" value="{{ old('slug', $product->slug) }}"></div>
                    <div class="col-md-2"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $product->sort_order) }}" min="0"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-4"><label class="form-label">SKU</label><input type="text" name="sku" class="form-control @error('sku') is-invalid @enderror" value="{{ old('sku', $product->sku) }}">@error('sku')<div class="invalid-feedback">{{ $message }}</div>@enderror</div>
                    <div class="col-md-4"><label class="form-label">Barcode</label><input type="text" name="barcode" class="form-control" value="{{ old('barcode', $product->barcode) }}"></div>
                    <div class="col-md-2"><label class="form-label">Unit</label><input type="text" name="unit" class="form-control" value="{{ old('unit', $product->unit) }}"></div>
                    <div class="col-md-2"><label class="form-label">Status</label><select name="status" class="form-select"><option value="draft" {{ old('status', $product->status)=='draft' ? 'selected' : '' }}>Draft</option><option value="published" {{ old('status', $product->status)=='published' ? 'selected' : '' }}>Published</option><option value="archived" {{ old('status', $product->status)=='archived' ? 'selected' : '' }}>Archived</option></select></div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3"><label class="form-label">Product Type</label><select name="product_type_id" class="form-select"><option value="">—</option>@foreach($productTypes as $pt)<option value="{{ $pt->id }}" {{ old('product_type_id', $product->product_type_id)==$pt->id ? 'selected' : '' }}>{{ $pt->name }}</option>@endforeach</select></div>
                    <div class="col-md-3"><label class="form-label">Category</label><select name="category_id" class="form-select"><option value="">—</option>@foreach($categories as $cat)<option value="{{ $cat->id }}" {{ old('category_id', $product->category_id)==$cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>@endforeach</select></div>
                    <div class="col-md-3"><label class="form-label">Brand</label><select name="brand_id" class="form-select"><option value="">—</option>@foreach($brands as $b)<option value="{{ $b->id }}" {{ old('brand_id', $product->brand_id)==$b->id ? 'selected' : '' }}>{{ $b->name }}</option>@endforeach</select></div>
                    <div class="col-md-3"><label class="form-label">Collection</label><select name="collection_id" class="form-select"><option value="">—</option>@foreach($collections as $c)<option value="{{ $c->id }}" {{ old('collection_id', $product->collection_id)==$c->id ? 'selected' : '' }}>{{ $c->name }}</option>@endforeach</select></div>
                </div>
                <div class="mb-3"><label class="form-label">Short Description</label><textarea name="short_description" class="form-control" rows="2" maxlength="500">{{ old('short_description', $product->short_description) }}</textarea></div>
                <div class="mb-3"><label class="form-label">Full Description</label><textarea name="full_description" class="form-control" rows="5">{{ old('full_description', $product->full_description) }}</textarea></div>
                <div class="mb-3"><label class="form-label">Season Label</label><input type="text" name="season_label" class="form-control" value="{{ old('season_label', $product->season_label) }}" placeholder="e.g. All-season, Spring/Summer, Winter"></div>
            </div>

            {{-- Pricing & Tax --}}
            <div class="tab-pane" id="pricing">
                <div class="row mb-3">
                    <div class="col-md-3"><label class="form-label">Cost Price</label><input type="number" step="0.01" name="cost_price" class="form-control" value="{{ old('cost_price', $product->cost_price) }}"></div>
                    <div class="col-md-3"><label class="form-label">Regular Price</label><input type="number" step="0.01" name="regular_price" class="form-control" value="{{ old('regular_price', $product->regular_price) }}"></div>
                    <div class="col-md-3"><label class="form-label">Sale Price</label><input type="number" step="0.01" name="sale_price" class="form-control" value="{{ old('sale_price', $product->sale_price) }}"></div>
                    <div class="col-md-3"><label class="form-label">Discount %</label><input type="number" step="0.01" name="discount_percent" class="form-control" value="{{ old('discount_percent', $product->discount_percent) }}" min="0" max="100"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3"><label class="form-label">Discount Amount</label><input type="number" step="0.01" name="discount_amount" class="form-control" value="{{ old('discount_amount', $product->discount_amount) }}"></div>
                    <div class="col-md-3"><label class="form-label">Tax Type</label><select name="tax_type" class="form-select"><option value="">None</option><option value="percentage" {{ old('tax_type', $product->tax_type)=='percentage' ? 'selected' : '' }}>Percentage</option><option value="fixed" {{ old('tax_type', $product->tax_type)=='fixed' ? 'selected' : '' }}>Fixed</option></select></div>
                    <div class="col-md-3"><label class="form-label">Tax Value</label><input type="number" step="0.01" name="tax_value" class="form-control" value="{{ old('tax_value', $product->tax_value) }}"></div>
                    <div class="col-md-3"><label class="form-label">Video URL</label><input type="url" name="video_url" class="form-control" value="{{ old('video_url', $product->video_url) }}"></div>
                </div>
                <h5 class="mb-3">Flags</h5>
                <div class="row mb-3">
                    <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_featured" class="form-check-input" value="1" {{ old('is_featured', $product->is_featured) ? 'checked' : '' }}><label class="form-check-label">Featured</label></div></div>
                    <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_new_arrival" class="form-check-input" value="1" {{ old('is_new_arrival', $product->is_new_arrival) ? 'checked' : '' }}><label class="form-check-label">New Arrival</label></div></div>
                    <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_best_seller" class="form-check-input" value="1" {{ old('is_best_seller', $product->is_best_seller) ? 'checked' : '' }}><label class="form-check-label">Best Seller</label></div></div>
                    <div class="col-md-3"><div class="form-check"><input type="checkbox" name="is_trending" class="form-check-input" value="1" {{ old('is_trending', $product->is_trending) ? 'checked' : '' }}><label class="form-check-label">Trending</label></div></div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3"><label class="form-label">Min Order Qty</label><input type="number" name="min_order_qty" class="form-control" value="{{ old('min_order_qty', $product->min_order_qty ?? 1) }}" min="1"></div>
                    <div class="col-md-3"><label class="form-label">Max Order Qty</label><input type="number" name="max_order_qty" class="form-control" value="{{ old('max_order_qty', $product->max_order_qty) }}" min="1"></div>
                </div>
            </div>

            {{-- Media --}}
            <div class="tab-pane" id="media">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Featured Image</label><input type="file" name="featured_image" class="form-control" accept="image/*">
                        @if($product->featured_image_url)<div class="mt-2"><img src="{{ $product->featured_image_url }}" style="max-height:120px" class="rounded border"></div>@endif
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">OG Image (SEO)</label><input type="file" name="og_image" class="form-control" accept="image/*">
                        @if($product->og_image_url)<div class="mt-2"><img src="{{ $product->og_image_url }}" style="max-height:120px" class="rounded border"></div>@endif
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Gallery Images</label><input type="file" name="gallery_images[]" class="form-control" accept="image/*" multiple>
                    @if($product->gallery_images)
                    <div class="row mt-2">
                        @foreach($product->gallery_images as $gi => $galleryImage)
                        <div class="col-md-2 col-4 mb-2">
                            <div class="position-relative">
                                <img src="{{ asset('storage/'.$galleryImage) }}" style="width:100%;height:80px;object-fit:cover" class="rounded border">
                                <button type="button" class="position-absolute top-0 end-0 btn btn-sm btn-danger rounded-circle p-0" style="width:20px;height:20px;font-size:12px;line-height:20px;text-align:center" onclick="if(confirm('Remove this image?')) document.getElementById('gallery-{{ $gi }}').submit();">&times;</button>
                            </div>
                        </div>
                        @endforeach
                    </div>
                    @endif
                </div>
            </div>

            {{-- SEO --}}
            <div class="tab-pane" id="seo">
                <div class="row mb-3">
                    <div class="col-md-6"><label class="form-label">Meta Title</label><input type="text" name="meta_title" class="form-control" value="{{ old('meta_title', $product->meta_title) }}"></div>
                    <div class="col-md-6"><label class="form-label">Meta Keywords</label><input type="text" name="meta_keywords" class="form-control" value="{{ old('meta_keywords', $product->meta_keywords) }}"></div>
                </div>
                <div class="mb-3"><label class="form-label">Meta Description</label><textarea name="meta_description" class="form-control" rows="3">{{ old('meta_description', $product->meta_description) }}</textarea></div>
            </div>

            {{-- Variants --}}
            <div class="tab-pane" id="variants">
                @if($product->variants->count())
                <div class="table-responsive mb-4">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light"><tr><th>Image</th><th>Name</th><th>Color</th><th>SKU</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                        <tbody>
                            @foreach($product->variants as $v)
                            <tr>
                                <td>@if($v->image_url)<img src="{{ $v->image_url }}" style="width:40px;height:40px;object-fit:cover" class="rounded">@else<span class="badge bg-secondary">—</span>@endif</td>
                                <td>{{ $v->name ?? '—' }}</td>
                                <td>@if($v->color)<span class="badge" style="background:{{ $v->color->hex_code }}">{{ $v->color->name }}</span>@else—@endif</td>
                                <td>{{ $v->sku ?? '—' }}</td>
                                <td>{{ config('app.currency', 'Rs') }} {{ number_format($v->price ?? $product->regular_price, 2) }}</td>
                                <td><span class="badge bg-{{ $v->stock > 0 ? 'info' : 'secondary' }}">{{ $v->stock ?? 0 }}</span></td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-soft-danger" onclick="if(confirm('Delete variant?')) document.getElementById('delete-variant-{{ $v->id }}').submit();"><i class="ri-delete-bin-line"></i></button>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                @else
                <div class="alert alert-info">No variants yet. Add one below.</div>
                @endif

                <h6 class="fw-bold mb-3">Add Variant</h6>
                <div class="border rounded p-3 bg-light">
                    <div class="row g-2 align-items-end">
                        <div class="col-md-2"><input type="text" name="name" form="variant-form" class="form-control" placeholder="Name (e.g. Superior 80s)"></div>
                        <div class="col-md-2"><select name="color_id" form="variant-form" class="form-select"><option value="">Color</option>@foreach($colors as $col)<option value="{{ $col->id }}">{{ $col->name }}</option>@endforeach</select></div>
                        <div class="col-md-2"><input type="text" name="sku" form="variant-form" class="form-control" placeholder="SKU"></div>
                        <div class="col-md-2"><input type="number" step="0.01" name="price" form="variant-form" class="form-control" placeholder="Price"></div>
                        <div class="col-md-1"><input type="number" name="stock" form="variant-form" class="form-control" placeholder="Stock" value="0"></div>
                        <div class="col-md-2"><input type="file" name="image" form="variant-form" class="form-control form-control-sm" accept="image/*"></div>
                        <div class="col-md-1"><input type="number" name="sort_order" form="variant-form" class="form-control" placeholder="Sort" value="0"></div>
                        <div class="col-md-2"><button type="submit" form="variant-form" class="btn btn-success w-100"><i class="ri-add-line me-1"></i>Add</button></div>
                    </div>
                </div>
            </div>

            {{-- Attributes --}}
            <div class="tab-pane" id="attr">
                @php $assignedIds = $product->attributes->pluck('attribute_id')->toArray(); @endphp
                <div class="alert alert-info">Assign dynamic attributes and their values to this product.</div>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-light"><tr><th>Attribute</th><th>Value</th><th>Custom Value</th></tr></thead>
                        <tbody>
                            @forelse($attributes as $attr)
                            <tr>
                                <td>{{ $attr->name }} <small class="text-muted">({{ $attr->group?->name ?? 'Ungrouped' }})</small></td>
                                <td>
                                    <select name="attributes[{{ $attr->id }}][attribute_value_id]" class="form-select form-select-sm" style="min-width:150px">
                                        <option value="">—</option>
                                        @foreach($attr->values as $val)
                                        <option value="{{ $val->id }}" {{ in_array($val->id, $product->attributes->where('attribute_id', $attr->id)->pluck('attribute_value_id')->toArray()) ? 'selected' : '' }}>{{ $val->value }}</option>
                                        @endforeach
                                    </select>
                                </td>
                                <td><input type="text" name="attributes[{{ $attr->id }}][custom_value]" class="form-control form-control-sm" value="{{ $product->attributes->where('attribute_id', $attr->id)->first()?->custom_value }}"></td>
                            </tr>
                            @empty
                            <tr><td colspan="3" class="text-center text-muted py-3">No attributes defined. <a href="{{ route('admin.attributes.create') }}">Create attributes</a> first.</td></tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
                @foreach($attributes as $attr)
                <input type="hidden" name="attributes[{{ $attr->id }}][attribute_id]" value="{{ $attr->id }}">
                @endforeach
            </div>

            {{-- Tags --}}
            <div class="tab-pane" id="tags">
                <div class="mb-3">
                    <select name="tags[]" class="form-select" multiple size="10">
                        @foreach($tags as $t)
                        <option value="{{ $t->id }}" {{ in_array($t->id, $product->tags->pluck('id')->toArray()) ? 'selected' : '' }}>{{ $t->name }}</option>
                        @endforeach
                    </select>
                    <small class="text-muted">Hold Ctrl/Cmd to select multiple</small>
                </div>
            </div>
        </div>

        <div class="border-top pt-3 mt-3 d-flex justify-content-between">
            <div>
                <button type="submit" class="btn btn-primary"><i class="ri-save-line me-1"></i>Update Product</button>
                <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
            <div>
                <a href="{{ route('admin.products.create') }}" class="btn btn-soft-primary"><i class="ri-add-line me-1"></i>New</a>
                <button type="button" class="btn btn-soft-info" onclick="document.getElementById('duplicate-product').submit();"><i class="ri-file-copy-line me-1"></i>Duplicate</button>
            </div>
        </div>
    </form>

    {{-- Hidden forms for variant delete, gallery delete, and duplicate (outside main form) --}}
    @foreach($product->variants as $v)
    <form id="delete-variant-{{ $v->id }}" action="{{ route('admin.products.variants.destroy', [$product, $v]) }}" method="POST" class="d-none">@csrf @method('DELETE')</form>
    @endforeach
    @if($product->gallery_images)
        @foreach($product->gallery_images as $gi => $galleryImage)
        <form id="gallery-{{ $gi }}" action="{{ route('admin.products.gallery.destroy', [$product, $gi]) }}" method="POST" class="d-none">@csrf @method('DELETE')</form>
        @endforeach
    @endif
    <form id="duplicate-product" action="{{ route('admin.products.duplicate', $product) }}" method="POST" class="d-none">@csrf</form>

</div></div></div></div>
@endsection

@extends('admin.layouts.master')

@section('title', 'Edit Service')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Edit Service</h4>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li>
                    <li class="breadcrumb-item"><a href="{{ route('admin.services.index') }}">Services</a></li>
                    <li class="breadcrumb-item active">{{ $service->name }}</li>
                </ol>
            </div>
        </div>
    </div>
</div>

@if (session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

<div class="row">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Service Details</h4>
                <form action="{{ route('admin.services.update', $service) }}" method="POST" enctype="multipart/form-data">
                    @csrf @method('PUT')

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                            <input type="text" id="name" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $service->name) }}" required>
                            @error('name') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>
                        <div class="col-md-6">
                            <label for="slug" class="form-label">Slug</label>
                            <input type="text" id="slug" name="slug" class="form-control @error('slug') is-invalid @enderror" value="{{ old('slug', $service->slug) }}">
                            @error('slug') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="collection_id" class="form-label">Collection</label>
                            <select id="collection_id" name="collection_id" class="form-select @error('collection_id') is-invalid @enderror">
                                <option value="">None</option>
                                @foreach ($collections as $c)
                                    <option value="{{ $c->id }}" {{ old('collection_id', $service->collection_id) == $c->id ? 'selected' : '' }}>{{ $c->name }}</option>
                                @endforeach
                            </select>
                            @error('collection_id') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>
                        <div class="col-md-6">
                            <label for="category_id" class="form-label">Category</label>
                            <select id="category_id" name="category_id" class="form-select @error('category_id') is-invalid @enderror">
                                <option value="">None</option>
                                @foreach ($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ old('category_id', $service->category_id) == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="short_description" class="form-label">Short Description</label>
                        <input type="text" id="short_description" name="short_description" class="form-control @error('short_description') is-invalid @enderror" value="{{ old('short_description', $service->short_description) }}" maxlength="500">
                        @error('short_description') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="mb-3">
                        <label for="long_description" class="form-label">Long Description</label>
                        <textarea id="long_description" name="long_description" class="form-control @error('long_description') is-invalid @enderror" rows="4">{{ old('long_description', $service->long_description) }}</textarea>
                        @error('long_description') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="accent" class="form-label">Accent / Tagline</label>
                            <input type="text" id="accent" name="accent" class="form-control" value="{{ old('accent', $service->accent) }}">
                        </div>
                        <div class="col-md-4">
                            <label for="season" class="form-label">Season</label>
                            <input type="text" id="season" name="season" class="form-control" value="{{ old('season', $service->season) }}">
                        </div>
                        <div class="col-md-4">
                            <label for="sort_order" class="form-label">Sort Order</label>
                            <input type="number" id="sort_order" name="sort_order" class="form-control" value="{{ old('sort_order', $service->sort_order) }}" min="0">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="hero_slide" class="form-label">Hero Slide Text</label>
                        <input type="text" id="hero_slide" name="hero_slide" class="form-control" value="{{ old('hero_slide', $service->hero_slide) }}" maxlength="500">
                    </div>

                    <div class="mb-3">
                        <label for="image" class="form-label">Main Image</label>
                        <input type="file" id="image" name="image" class="form-control @error('image') is-invalid @enderror" accept="image/jpeg,image/png,image/webp">
                        @error('image') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        @if ($service->image)
                            <div class="mt-2">
                                <img src="{{ $service->image_url }}" alt="{{ $service->name }}" class="rounded" style="max-height: 100px;">
                                <small class="text-muted d-block">Current image. Upload a new one to replace.</small>
                            </div>
                        @endif
                    </div>

                    <div class="form-check mb-3">
                        <input type="checkbox" id="is_active" name="is_active" class="form-check-input" value="1" {{ old('is_active', $service->is_active) ? 'checked' : '' }}>
                        <label for="is_active" class="form-check-label">Active</label>
                    </div>

                    <button type="submit" class="btn btn-primary waves-effect waves-light">Update Service</button>
                </form>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Variations</h4>
                <form action="{{ route('admin.services.variations.store', $service) }}" method="POST" class="mb-3">
                    @csrf
                    <div class="mb-2">
                        <input type="text" name="name" class="form-control form-control-sm mb-1" placeholder="Name (e.g. Premium 100s)" required>
                    </div>
                    <div class="mb-2">
                        <input type="text" name="description" class="form-control form-control-sm mb-1" placeholder="Description">
                    </div>
                    <div class="row g-1 mb-2">
                        <div class="col-6">
                            <input type="number" name="price" class="form-control form-control-sm" placeholder="Price" step="0.01" required>
                        </div>
                        <div class="col-6">
                            <input type="number" name="original_price" class="form-control form-control-sm" placeholder="Original price (optional)" step="0.01">
                        </div>
                    </div>
                    <input type="hidden" name="sort_order" value="{{ $service->variations->count() }}">
                    <button type="submit" class="btn btn-sm btn-success waves-effect"><i class="ri-add-line me-1"></i>Add</button>
                </form>

                @if ($service->variations->isEmpty())
                    <p class="text-muted text-center">No variations yet.</p>
                @else
                    <div class="list-group">
                        @foreach ($service->variations as $v)
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{{ $v->name }}</strong>
                                    <br><small class="text-muted">PKR {{ number_format($v->price) }}</small>
                                    @if ($v->original_price)
                                        <br><small class="text-danger"><s>PKR {{ number_format($v->original_price) }}</s></small>
                                    @endif
                                </div>
                                <form action="{{ route('admin.services.variations.destroy', [$service, $v]) }}" method="POST" onsubmit="return confirm('Delete this variation?')">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button>
                                </form>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Colors</h4>
                <form action="{{ route('admin.services.colors.store', $service) }}" method="POST" enctype="multipart/form-data" class="mb-3">
                    @csrf
                    <div class="mb-2">
                        <input type="text" name="name" class="form-control form-control-sm mb-1" placeholder="Color name" required>
                    </div>
                    <div class="mb-2">
                        <div class="input-group input-group-sm">
                            <input type="color" name="hex_code" class="form-control form-control-color" value="#000000" title="Hex color">
                            <input type="text" name="hex_code_text" class="form-control form-control-sm" placeholder="#000000" maxlength="9" oninput="this.form.hex_code.value=this.value;this.form.hex_code_text.value=this.value">
                        </div>
                    </div>
                    <div class="mb-2">
                        <input type="file" name="image" class="form-control form-control-sm" accept="image/jpeg,image/png,image/webp">
                    </div>
                    <input type="hidden" name="sort_order" value="{{ $service->colors->count() }}">
                    <button type="submit" class="btn btn-sm btn-success waves-effect"><i class="ri-add-line me-1"></i>Add</button>
                </form>

                @if ($service->colors->isEmpty())
                    <p class="text-muted text-center">No colors yet.</p>
                @else
                    <div class="list-group">
                        @foreach ($service->colors as $c)
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center gap-2">
                                    <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:{{ $c->hex_code ?? '#ccc' }};border:1px solid #ddd;"></span>
                                    <span>{{ $c->name }}</span>
                                </div>
                                <form action="{{ route('admin.services.colors.destroy', [$service, $c]) }}" method="POST" onsubmit="return confirm('Delete this color?')">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button>
                                </form>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

@push('page-scripts')
<script>
document.querySelectorAll('input[name="hex_code_text"]').forEach(el => {
    el.addEventListener('input', function() {
        const colorInput = this.closest('form').querySelector('input[name="hex_code"]');
        if (colorInput) colorInput.value = this.value;
    });
    el.addEventListener('change', function() {
        const colorInput = this.closest('form').querySelector('input[name="hex_code"]');
        if (colorInput) colorInput.value = this.value;
    });
});
</script>
@endpush

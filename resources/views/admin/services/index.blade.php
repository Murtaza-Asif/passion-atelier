@extends('admin.layouts.master')

@section('title', 'Services')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">Services</h4>
            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li>
                    <li class="breadcrumb-item active">Services</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="card-title">All Services</h4>
                    <a href="{{ route('admin.services.create') }}" class="btn btn-primary waves-effect waves-light">
                        <i class="ri-add-line align-middle me-1"></i> New Service
                    </a>
                </div>

                @if (session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <form method="GET" class="row mb-3 g-2">
                    <div class="col-sm-4">
                        <input type="text" name="search" class="form-control" placeholder="Search services..." value="{{ request('search') }}">
                    </div>
                    <div class="col-sm-3">
                        <select name="collection_id" class="form-select">
                            <option value="">All Collections</option>
                            @foreach ($collections as $c)
                                <option value="{{ $c->id }}" {{ request('collection_id') == $c->id ? 'selected' : '' }}>{{ $c->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-3">
                        <select name="category_id" class="form-select">
                            <option value="">All Categories</option>
                            @foreach ($categories as $cat)
                                <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <button type="submit" class="btn btn-secondary waves-effect w-100">Filter</button>
                    </div>
                </form>

                <div class="table-responsive">
                    <table class="table table-centered mb-0 align-middle table-hover table-nowrap">
                        <thead class="table-light">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Collection</th>
                                <th>Category</th>
                                <th>Variations</th>
                                <th>Status</th>
                                <th style="width: 140px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($services as $service)
                            <tr>
                                <td>
                                    @if ($service->image_url)
                                        <img src="{{ $service->image_url }}" alt="{{ $service->name }}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;">
                                    @else
                                        <span class="badge bg-secondary">No image</span>
                                    @endif
                                </td>
                                <td>
                                    <h6 class="mb-0">{{ $service->name }}</h6>
                                    <small class="text-muted"><code>{{ $service->slug }}</code></small>
                                </td>
                                <td>{{ $service->collection?->name ?? '—' }}</td>
                                <td>{{ $service->category?->name ?? '—' }}</td>
                                <td>{{ $service->variations_count ?? $service->variations->count() }}</td>
                                <td>
                                    <span class="badge bg-{{ $service->is_active ? 'success' : 'secondary' }}">
                                        {{ $service->is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td>
                                    <a href="{{ route('admin.services.edit', $service) }}" class="btn btn-sm btn-soft-primary waves-effect" title="Edit">
                                        <i class="ri-pencil-line"></i>
                                    </a>
                                    <form action="{{ route('admin.services.duplicate', $service) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn btn-sm btn-soft-info waves-effect" title="Duplicate">
                                            <i class="ri-file-copy-line"></i>
                                        </button>
                                    </form>
                                    <form action="{{ route('admin.services.destroy', $service) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete this service permanently?')">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-soft-danger waves-effect" title="Delete">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr><td colspan="7" class="text-center text-muted py-4">No services found.</td></tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="mt-3">{{ $services->links() }}</div>
            </div>
        </div>
    </div>
</div>
@endsection

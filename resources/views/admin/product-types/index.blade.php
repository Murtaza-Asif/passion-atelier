@extends('admin.layouts.master')
@section('title', 'Product Types')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Product Types</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Product Types</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Product Types</h4><a href="{{ route('admin.product-types.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Type</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Name</th><th>Slug</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($productTypes as $pt)
                <tr>
                    <td><h6 class="mb-0">{{ $pt->name }}</h6></td>
                    <td><code>{{ $pt->slug }}</code></td>
                    <td>{{ Str::limit($pt->description, 60) }}</td>
                    <td><span class="badge bg-{{ $pt->is_active ? 'success' : 'secondary' }}">{{ $pt->is_active ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.product-types.edit', $pt) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.product-types.destroy', $pt) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="5" class="text-center text-muted py-4">No product types found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $productTypes->links() }}</div>
</div></div></div></div>
@endsection

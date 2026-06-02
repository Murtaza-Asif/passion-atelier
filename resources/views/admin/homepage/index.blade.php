@extends('admin.layouts.master')
@section('title', 'Homepage Sections')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Homepage Sections</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Homepage</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Sections</h4><a href="{{ route('admin.homepage.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Section</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Type</th><th>Title</th><th>Products</th><th>Sort</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($sections as $s)
                <tr>
                    <td><span class="badge bg-info">{{ ucfirst(str_replace('_', ' ', $s->section_type)) }}</span></td>
                    <td>{{ $s->title ?? '—' }}</td>
                    <td>{{ $s->products_count }} product(s)</td>
                    <td>{{ $s->sort_order }}</td>
                    <td><span class="badge bg-{{ $s->is_active ? 'success' : 'secondary' }}">{{ $s->is_active ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.homepage.edit', $s) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.homepage.destroy', $s) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete section?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="6" class="text-center text-muted py-4">No sections found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $sections->links() }}</div>
</div></div></div></div>
@endsection
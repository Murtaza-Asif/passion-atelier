@extends('admin.layouts.master')
@section('title', 'Attributes')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Attributes</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Attributes</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Attributes</h4><a href="{{ route('admin.attributes.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Attribute</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row mb-3"><div class="col-sm-4"><input type="text" name="search" class="form-control" placeholder="Search..." value="{{ request('search') }}"></div><div class="col-sm-2"><button type="submit" class="btn btn-secondary">Search</button></div></form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Name</th><th>Group</th><th>Type</th><th>Filterable</th><th>Specification</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($attributes as $a)
                <tr>
                    <td><h6 class="mb-0">{{ $a->name }}</h6><small class="text-muted"><code>{{ $a->slug }}</code></small></td>
                    <td>{{ $a->group?->name ?? '—' }}</td>
                    <td><span class="badge bg-info">{{ $a->input_type }}</span></td>
                    <td>@if($a->is_filterable)<span class="badge bg-success">Yes</span>@else<span class="badge bg-secondary">No</span>@endif</td>
                    <td>@if($a->is_specification)<span class="badge bg-success">Yes</span>@else<span class="badge bg-secondary">No</span>@endif</td>
                    <td><span class="badge bg-{{ $a->status ? 'success' : 'secondary' }}">{{ $a->status ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.attributes.values', $a) }}" class="btn btn-sm btn-soft-info" title="Manage Values"><i class="ri-list-settings-line"></i></a>
                        <a href="{{ route('admin.attributes.edit', $a) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.attributes.destroy', $a) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="7" class="text-center text-muted py-4">No attributes found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $attributes->links() }}</div>
</div></div></div></div>
@endsection

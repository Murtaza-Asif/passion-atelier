@extends('admin.layouts.master')
@section('title', 'Attribute Groups')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Attribute Groups</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Attribute Groups</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Groups</h4><a href="{{ route('admin.attribute-groups.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Group</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Name</th><th>Slug</th><th>Attributes</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($groups as $g)
                <tr><td><h6 class="mb-0">{{ $g->name }}</h6></td><td><code>{{ $g->slug }}</code></td><td>{{ $g->attributes_count ?? $g->attributes?->count() ?? 0 }}</td>
                    <td>
                        <a href="{{ route('admin.attribute-groups.edit', $g) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.attribute-groups.destroy', $g) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="4" class="text-center text-muted py-4">No groups found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $groups->links() }}</div>
</div></div></div></div>
@endsection

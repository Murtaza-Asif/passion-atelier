@extends('admin.layouts.master')
@section('title', 'Tags')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Tags</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Tags</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Tags</h4><a href="{{ route('admin.tags.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Tag</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Name</th><th>Slug</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($tags as $t)
                <tr><td><h6 class="mb-0">{{ $t->name }}</h6></td><td><code>{{ $t->slug }}</code></td>
                    <td>
                        <a href="{{ route('admin.tags.edit', $t) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.tags.destroy', $t) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="3" class="text-center text-muted py-4">No tags found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $tags->links() }}</div>
</div></div></div></div>
@endsection

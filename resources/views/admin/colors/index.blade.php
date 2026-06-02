@extends('admin.layouts.master')
@section('title', 'Colors')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Colors</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Colors</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Colors</h4><a href="{{ route('admin.colors.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Color</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row mb-3"><div class="col-sm-4"><input type="text" name="search" class="form-control" placeholder="Search..." value="{{ request('search') }}"></div><div class="col-sm-2"><button type="submit" class="btn btn-secondary">Search</button></div></form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Swatch</th><th>Name</th><th>HEX Code</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($colors as $c)
                <tr>
                    <td><span style="display:inline-block;width:32px;height:32px;border-radius:50%;background:{{ $c->hex_code ?? '#ccc' }};border:1px solid #ddd;"></span></td>
                    <td><h6 class="mb-0">{{ $c->name }}</h6></td>
                    <td><code>{{ $c->hex_code }}</code></td>
                    <td><span class="badge bg-{{ $c->status ? 'success' : 'secondary' }}">{{ $c->status ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.colors.edit', $c) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.colors.destroy', $c) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="5" class="text-center text-muted py-4">No colors found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $colors->links() }}</div>
</div></div></div></div>
@endsection

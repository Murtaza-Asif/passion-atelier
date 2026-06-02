@extends('admin.layouts.master')
@section('title', 'Offers')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Offers</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Offers</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Offers</h4><a href="{{ route('admin.offers.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New Offer</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row mb-3"><div class="col-sm-4"><input type="text" name="search" class="form-control" placeholder="Search by name..." value="{{ request('search') }}"></div><div class="col-sm-2"><button type="submit" class="btn btn-secondary">Search</button></div></form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Name</th><th>Type</th><th>Value</th><th>Buy Qty</th><th>Get Qty</th><th>Valid</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($offers as $o)
                <tr>
                    <td><strong>{{ $o->name }}</strong></td>
                    <td><span class="badge bg-info">{{ ucfirst($o->type) }}</span></td>
                    <td>{{ $o->type === 'percentage' ? $o->value.'%' : ($o->value ? config('app.currency', 'Rs').' '.number_format($o->value, 2) : '—') }}</td>
                    <td>{{ $o->buy_qty ?? '—' }}</td>
                    <td>{{ $o->get_qty ?? '—' }}</td>
                    <td><small>{{ $o->starts_at ? $o->starts_at->format('d M') : '—' }} → {{ $o->expires_at ? $o->expires_at->format('d M Y') : '∞' }}</small></td>
                    <td><span class="badge bg-{{ $o->status ? 'success' : 'secondary' }}">{{ $o->status ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.offers.edit', $o) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.offers.destroy', $o) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="8" class="text-center text-muted py-4">No offers found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $offers->links() }}</div>
</div></div></div></div>
@endsection
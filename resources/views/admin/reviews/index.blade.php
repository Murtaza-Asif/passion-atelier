@extends('admin.layouts.master')
@section('title', 'Reviews')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Reviews</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Reviews</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <h4 class="card-title mb-4">All Reviews</h4>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-4"><select name="is_approved" class="form-select"><option value="">All Status</option><option value="1" {{ request('is_approved')==='1' ? 'selected' : '' }}>Approved</option><option value="0" {{ request('is_approved')==='0' ? 'selected' : '' }}>Pending</option></select></div>
        <div class="col-md-2"><button type="submit" class="btn btn-secondary">Filter</button></div>
        <div class="col-md-2"><a href="{{ route('admin.reviews.index') }}" class="btn btn-soft-secondary">Clear</a></div>
    </form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Product</th><th>User</th><th>Rating</th><th>Title</th><th>Review</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($reviews as $r)
                <tr>
                    <td><a href="{{ route('admin.products.edit', $r->product) }}" class="text-primary">{{ Str::limit($r->product->title, 30) }}</a></td>
                    <td>{{ $r->user?->name ?? 'Guest' }}</td>
                    <td>@for($i=1;$i<=5;$i++)<i class="ri-star{{ $i<=$r->rating ? '-fill text-warning' : '-line text-muted' }}"></i>@endfor</td>
                    <td>{{ $r->title ?? '—' }}</td>
                    <td>{{ Str::limit($r->body, 60) }}</td>
                    <td><span class="badge bg-{{ $r->is_approved ? 'success' : 'warning' }}">{{ $r->is_approved ? 'Approved' : 'Pending' }}</span></td>
                    <td><small>{{ $r->created_at->format('d M Y') }}</small></td>
                    <td>
                        @if(!$r->is_approved)
                        <form action="{{ route('admin.reviews.approve', $r) }}" method="POST" class="d-inline">@csrf<button type="submit" class="btn btn-sm btn-soft-success"><i class="ri-check-line"></i></button></form>
                        @endif
                        <form action="{{ route('admin.reviews.destroy', $r) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete review?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="8" class="text-center text-muted py-4">No reviews found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $reviews->links() }}</div>
</div></div></div></div>
@endsection
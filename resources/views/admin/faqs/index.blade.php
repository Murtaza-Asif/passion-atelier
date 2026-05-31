@extends('admin.layouts.master')
@section('title', 'FAQs')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">FAQs</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">FAQs</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">Product FAQs</h4><a href="{{ route('admin.faqs.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>New FAQ</a></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-4"><select name="product_id" class="form-select"><option value="">Select Product</option>@foreach($products as $p)<option value="{{ $p->id }}" {{ request('product_id')==$p->id ? 'selected' : '' }}>{{ $p->title }}</option>@endforeach</select></div>
        <div class="col-md-2"><button type="submit" class="btn btn-secondary">View FAQs</button></div>
    </form>
    @if(request('product_id'))
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Question</th><th>Answer</th><th>Sort</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($faqs as $f)
                <tr>
                    <td>{{ Str::limit($f->question, 60) }}</td>
                    <td>{{ Str::limit($f->answer, 80) }}</td>
                    <td>{{ $f->sort_order }}</td>
                    <td><span class="badge bg-{{ $f->status ? 'success' : 'secondary' }}">{{ $f->status ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                        <a href="{{ route('admin.faqs.edit', $f) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <form action="{{ route('admin.faqs.destroy', $f) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="5" class="text-center text-muted py-4">No FAQs for this product.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    @else
    <div class="text-center text-muted py-4">Select a product to view its FAQs.</div>
    @endif
</div></div></div></div>
@endsection
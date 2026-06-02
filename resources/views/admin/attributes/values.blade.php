@extends('admin.layouts.master')
@section('title', 'Attribute Values')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Values for: {{ $attribute->name }}</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item"><a href="{{ route('admin.attributes.index') }}">Attributes</a></li><li class="breadcrumb-item active">Values</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <form action="{{ route('admin.attributes.values.store', $attribute) }}" method="POST" class="row g-2 mb-4">@csrf
        <div class="col-sm-4"><input type="text" name="value" class="form-control" placeholder="Value" required></div>
        <div class="col-sm-4"><input type="text" name="slug" class="form-control" placeholder="Slug (auto)"></div>
        <div class="col-sm-2"><input type="text" name="swatch_value" class="form-control" placeholder="Swatch (hex/img)"></div>
        <div class="col-sm-2"><button type="submit" class="btn btn-success w-100"><i class="ri-add-line me-1"></i>Add</button></div>
    </form>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Value</th><th>Slug</th><th>Swatch</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($attribute->values as $v)
                <tr>
                    <td>{{ $v->value }}</td><td><code>{{ $v->slug }}</code></td>
                    <td>@if($v->swatch_value)<span class="badge" style="background:{{ $v->swatch_value }}">{{ $v->swatch_value }}</span>@else—@endif</td>
                    <td>{{ $v->sort_order }}</td>
                    <td>
                        <form action="#" method="POST" class="d-inline">
                            @csrf @method('PUT')
                            <input type="hidden" name="value" value="{{ $v->value }}">
                            <button type="submit" class="btn btn-sm btn-soft-primary">Edit</button>
                        </form>
                        <form action="{{ route('admin.attributes.values.destroy', [$attribute, $v]) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="5" class="text-center text-muted py-4">No values. Add one above.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <a href="{{ route('admin.attributes.index') }}" class="btn btn-secondary mt-3">← Back</a>
</div></div></div></div>
@endsection

@extends('admin.layouts.master')

@section('title', 'Users')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-flex align-items-center justify-content-between">
            <h4 class="mb-0 font-size-18">Users</h4>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Google Auth</th>
                                <th>Joined</th>
                                <th>Verified</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($users as $user)
                            <tr id="user-{{ $user->id }}" class="{{ request('highlight') == $user->id ? 'table-primary' : '' }}">
                                <td>{{ $user->id }}</td>
                                <td class="d-flex align-items-center gap-2">
                                    <div class="avatar-xs">
                                        <span class="avatar-title rounded-circle bg-soft-primary text-primary font-size-14">
                                            {{ substr($user->name, 0, 1) }}
                                        </span>
                                    </div>
                                    <div>
                                        <h6 class="mb-0">{{ $user->name }}</h6>
                                        @if($user->is_admin)
                                            <span class="badge bg-soft-danger text-danger">Admin</span>
                                        @endif
                                    </div>
                                </td>
                                <td>{{ $user->email }}</td>
                                <td>
                                    @if($user->google_id)
                                        <span class="badge bg-soft-success text-success">Yes</span>
                                    @else
                                        <span class="badge bg-soft-secondary text-secondary">No</span>
                                    @endif
                                </td>
                                <td>{{ $user->created_at->format('d M Y') }}</td>
                                <td>
                                    @if($user->email_verified_at)
                                        <span class="badge bg-soft-success text-success">Verified</span>
                                    @else
                                        <span class="badge bg-soft-warning text-warning">Unverified</span>
                                    @endif
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="6" class="text-center text-muted py-4">No users found.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="mt-3">
                    {{ $users->links('pagination::bootstrap-5') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
@if(request('highlight'))
<script>
    setTimeout(function() {
        document.getElementById('user-{{ request('highlight') }}')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
</script>
@endif
@endpush
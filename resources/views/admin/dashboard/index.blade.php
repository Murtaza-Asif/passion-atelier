@extends('admin.layouts.master')

@section('title', 'Dashboard')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">Dashboard</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <p class="text-truncate font-size-14 mb-2">Total Sales</p>
                            <h4 class="mb-2">{{ number_format($stats['totalSales']) }}</h4>
                            <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>9.23%</span>from previous period</p>
                        </div>
                        <div class="avatar-sm">
                            <span class="avatar-title bg-light text-primary rounded-3">
                                <i class="ri-shopping-cart-2-line font-size-24"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <p class="text-truncate font-size-14 mb-2">New Orders</p>
                            <h4 class="mb-2">{{ number_format($stats['newOrders']) }}</h4>
                            <p class="text-muted mb-0"><span class="text-danger fw-bold font-size-12 me-2"><i class="ri-arrow-right-down-line me-1 align-middle"></i>1.09%</span>from previous period</p>
                        </div>
                        <div class="avatar-sm">
                            <span class="avatar-title bg-light text-success rounded-3">
                                <i class="mdi mdi-currency-usd font-size-24"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <p class="text-truncate font-size-14 mb-2">New Users</p>
                            <h4 class="mb-2">{{ number_format($stats['newUsers']) }}</h4>
                            <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>16.2%</span>from previous period</p>
                        </div>
                        <div class="avatar-sm">
                            <span class="avatar-title bg-light text-primary rounded-3">
                                <i class="ri-user-3-line font-size-24"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <p class="text-truncate font-size-14 mb-2">Unique Visitors</p>
                            <h4 class="mb-2">{{ number_format($stats['uniqueVisitors']) }}</h4>
                            <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>11.7%</span>from previous period</p>
                        </div>
                        <div class="avatar-sm">
                            <span class="avatar-title bg-light text-success rounded-3">
                                <i class="mdi mdi-currency-btc font-size-24"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="card-title mb-4">Email Sent</h4>
                    <div class="text-center pt-3">
                        <div class="row">
                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="d-inline-flex">
                                    <h5 class="me-2">{{ number_format($emailSent['marketplace']) }}</h5>
                                    <div class="text-success font-size-12"><i class="mdi mdi-menu-up font-size-14"></i> 2.2 %</div>
                                </div>
                                <p class="text-muted text-truncate mb-0">Marketplace</p>
                            </div>
                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div class="d-inline-flex">
                                    <h5 class="me-2">${{ number_format($emailSent['lastWeek']) }}</h5>
                                    <div class="text-success font-size-12"><i class="mdi mdi-menu-up font-size-14"></i> 1.2 %</div>
                                </div>
                                <p class="text-muted text-truncate mb-0">Last Week</p>
                            </div>
                            <div class="col-sm-4">
                                <div class="d-inline-flex">
                                    <h5 class="me-2">${{ number_format($emailSent['lastMonth']) }}</h5>
                                    <div class="text-success font-size-12"><i class="mdi mdi-menu-up font-size-14"></i> 1.7 %</div>
                                </div>
                                <p class="text-muted text-truncate mb-0">Last Month</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body py-0 px-2">
                    <div id="area_chart" class="apex-charts" dir="ltr"></div>
                </div>
            </div>
        </div>

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body pb-0">
                    <h4 class="card-title mb-4">Revenue</h4>
                    <div class="text-center pt-3">
                        <div class="row">
                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div><h5>17,493</h5><p class="text-muted text-truncate mb-0">Marketplace</p></div>
                            </div>
                            <div class="col-sm-4 mb-3 mb-sm-0">
                                <div><h5>$44,960</h5><p class="text-muted text-truncate mb-0">Last Week</p></div>
                            </div>
                            <div class="col-sm-4">
                                <div><h5>$29,142</h5><p class="text-muted text-truncate mb-0">Last Month</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body py-0 px-2">
                    <div id="column_line_chart" class="apex-charts" dir="ltr"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4">Latest Transactions</h4>
                    <div class="table-responsive">
                        <table class="table table-centered mb-0 align-middle table-hover table-nowrap">
                            <thead class="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th style="width: 120px;">Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($transactions as $t)
                                <tr>
                                    <td><h6 class="mb-0">{{ $t['name'] }}</h6></td>
                                    <td>{{ $t['position'] }}</td>
                                    <td>
                                        @php $isActive = $t['status'] === 'Active'; @endphp
                                        <div class="font-size-13">
                                            <i class="ri-checkbox-blank-circle-fill font-size-10 {{ $isActive ? 'text-success' : 'text-warning' }} align-middle me-2"></i>{{ $t['status'] }}
                                        </div>
                                    </td>
                                    <td>{{ $t['age'] }}</td>
                                    <td>{{ $t['startDate'] }}</td>
                                    <td>{{ $t['salary'] }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4">Monthly Earnings</h4>
                    <div class="row">
                        <div class="col-4">
                            <div class="text-center mt-4">
                                <h5>{{ number_format($monthlyEarnings['marketplace']) }}</h5>
                                <p class="mb-2 text-truncate">Market Place</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center mt-4">
                                <h5>{{ number_format($monthlyEarnings['lastWeek']) }}</h5>
                                <p class="mb-2 text-truncate">Last Week</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center mt-4">
                                <h5>{{ number_format($monthlyEarnings['lastMonth']) }}</h5>
                                <p class="mb-2 text-truncate">Last Month</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div id="donut-chart" class="apex-charts"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
<style>
    .rightbar-overlay, #preloader, .modal-backdrop {
        display: none !important;
    }
</style>
@endpush

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.remove('right-bar-enabled', 'sidebar-enable', 'fullscreen-enable');
    });
</script>
@endpush

@push('page-scripts')
<script src="{{ asset('assets/libs/apexcharts/apexcharts.min.js') }}"></script>
<script src="{{ asset('assets/js/pages/dashboard.init.js') }}"></script>
@endpush

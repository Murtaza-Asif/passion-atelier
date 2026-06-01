<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
            <div class="navbar-brand-box">
                <a href="{{ route('admin.dashboard') }}" class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="{{ asset('assets/images/logo-sm.png') }}" alt="logo-sm" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('assets/images/logo-dark.png') }}" alt="logo-dark" height="20">
                    </span>
                </a>
                <a href="{{ route('admin.dashboard') }}" class="logo logo-light">
                    <span class="logo-sm">
                        <img src="{{ asset('assets/images/logo-sm.png') }}" alt="logo-sm-light" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('assets/images/logo-light.png') }}" alt="logo-light" height="20">
                    </span>
                </a>
            </div>

            <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                <i class="ri-menu-2-line align-middle"></i>
            </button>

            <form class="app-search d-none d-lg-block">
                <div class="position-relative">
                    <input type="text" class="form-control" placeholder="Search...">
                    <span class="ri-search-line"></span>
                </div>
            </form>

            <div class="dropdown dropdown-mega d-none d-lg-block ms-2">
                <button type="button" class="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                    Mega Menu
                    <i class="mdi mdi-chevron-down"></i>
                </button>
                <div class="dropdown-menu dropdown-megamenu">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="row">
                                <div class="col-md-4">
                                    <h5 class="font-size-14">UI Components</h5>
                                    <ul class="list-unstyled megamenu-list">
                                        <li><a href="javascript:void(0);">Lightbox</a></li>
                                        <li><a href="javascript:void(0);">Range Slider</a></li>
                                        <li><a href="javascript:void(0);">Sweet Alert</a></li>
                                        <li><a href="javascript:void(0);">Rating</a></li>
                                        <li><a href="javascript:void(0);">Forms</a></li>
                                        <li><a href="javascript:void(0);">Tables</a></li>
                                        <li><a href="javascript:void(0);">Charts</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h5 class="font-size-14">Applications</h5>
                                    <ul class="list-unstyled megamenu-list">
                                        <li><a href="javascript:void(0);">Ecommerce</a></li>
                                        <li><a href="javascript:void(0);">Calendar</a></li>
                                        <li><a href="javascript:void(0);">Email</a></li>
                                        <li><a href="javascript:void(0);">Projects</a></li>
                                        <li><a href="javascript:void(0);">Tasks</a></li>
                                        <li><a href="javascript:void(0);">Contacts</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h5 class="font-size-14">Extra Pages</h5>
                                    <ul class="list-unstyled megamenu-list">
                                        <li><a href="javascript:void(0);">Light Sidebar</a></li>
                                        <li><a href="javascript:void(0);">Compact Sidebar</a></li>
                                        <li><a href="javascript:void(0);">Horizontal layout</a></li>
                                        <li><a href="javascript:void(0);">Maintenance</a></li>
                                        <li><a href="javascript:void(0);">Coming Soon</a></li>
                                        <li><a href="javascript:void(0);">Timeline</a></li>
                                        <li><a href="javascript:void(0);">FAQs</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5 class="font-size-14">UI Components</h5>
                                    <ul class="list-unstyled megamenu-list">
                                        <li><a href="javascript:void(0);">Lightbox</a></li>
                                        <li><a href="javascript:void(0);">Range Slider</a></li>
                                        <li><a href="javascript:void(0);">Sweet Alert</a></li>
                                        <li><a href="javascript:void(0);">Rating</a></li>
                                        <li><a href="javascript:void(0);">Forms</a></li>
                                        <li><a href="javascript:void(0);">Tables</a></li>
                                        <li><a href="javascript:void(0);">Charts</a></li>
                                    </ul>
                                </div>
                                <div class="col-sm-5">
                                    <div>
                                        <img src="{{ asset('assets/images/megamenu-img.png') }}" alt="megamenu-img" class="img-fluid mx-auto d-block">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex">
            <div class="dropdown d-inline-block d-lg-none ms-2">
                <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-search-line"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                    <form class="p-3">
                        <div class="mb-3 m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search ...">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit"><i class="ri-search-line"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="dropdown d-none d-sm-inline-block">
                <button type="button" class="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="" src="{{ asset('assets/images/flags/us.jpg') }}" alt="Header Language" height="16">
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="{{ asset('assets/images/flags/spain.jpg') }}" class="me-1" height="12"> <span class="align-middle">Spanish</span>
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="{{ asset('assets/images/flags/germany.jpg') }}" class="me-1" height="12"> <span class="align-middle">German</span>
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="{{ asset('assets/images/flags/italy.jpg') }}" class="me-1" height="12"> <span class="align-middle">Italian</span>
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <img src="{{ asset('assets/images/flags/russia.jpg') }}" class="me-1" height="12"> <span class="align-middle">Russian</span>
                    </a>
                </div>
            </div>

            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-apps-2-line"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                    <div class="px-lg-2">
                        <div class="row g-0">
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/github.png') }}" alt="Github"><span>GitHub</span></a></div>
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/bitbucket.png') }}" alt="bitbucket"><span>Bitbucket</span></a></div>
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/dribbble.png') }}" alt="dribbble"><span>Dribbble</span></a></div>
                        </div>
                        <div class="row g-0">
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/dropbox.png') }}" alt="dropbox"><span>Dropbox</span></a></div>
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/mail_chimp.png') }}" alt="mail_chimp"><span>Mail Chimp</span></a></div>
                            <div class="col"><a class="dropdown-icon-item" href="#"><img src="{{ asset('assets/images/brands/slack.png') }}" alt="slack"><span>Slack</span></a></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                    <i class="ri-fullscreen-line"></i>
                </button>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ri-notification-3-line"></i>
                    @php $unreadCount = Auth::user()->unreadNotifications->count(); @endphp
                    @if($unreadCount > 0)
                        <span class="badge bg-danger rounded-pill" style="position:absolute;top:8px;right:6px;font-size:9px;min-width:16px;height:16px;line-height:10px;">{{ $unreadCount > 9 ? '9+' : $unreadCount }}</span>
                    @endif
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col"><h6 class="m-0">Notifications</h6></div>
                            @if($unreadCount > 0)
                            <div class="col-auto">
                                <form action="{{ route('admin.notifications.read-all') }}" method="POST" class="d-inline">
                                    @csrf
                                    <button type="submit" class="btn btn-sm btn-link text-decoration-none p-0">Mark all read</button>
                                </form>
                            </div>
                            @endif
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 300px;">
                        @forelse(Auth::user()->notifications->take(10) as $notification)
                        @php $data = $notification->data; @endphp
                        <a href="{{ route('admin.notifications.read', $notification->id) }}" class="text-reset notification-item {{ $notification->read_at ? '' : 'bg-soft-primary' }}">
                            <div class="d-flex">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title bg-success rounded-circle font-size-16">
                                        <i class="ri-user-add-line"></i>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <h6 class="mb-1">New User Registered</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1"><a href="{{ route('admin.users.index', ['highlight' => $data['user_id']]) }}" class="text-reset fw-medium">{{ $data['user_name'] }}</a> joined PASSION</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> {{ $notification->created_at->diffForHumans() }}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        @empty
                        <div class="text-center text-muted py-4">
                            <p class="mb-0 font-size-13">No notifications yet</p>
                        </div>
                        @endforelse
                    </div>
                    <div class="p-2 border-top">
                        <div class="d-grid">
                            <a href="{{ route('admin.users.index') }}" class="btn btn-sm btn-link font-size-14 text-center">
                                <i class="mdi mdi-arrow-right-circle me-1"></i> View All Users
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown d-inline-block user-dropdown">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user" src="{{ asset('assets/images/users/avatar-1.jpg') }}" alt="Header Avatar">
                    <span class="d-none d-xl-inline-block ms-1">{{ Auth::user()->name ?? 'Admin' }}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="{{ route('profile.edit') }}"><i class="ri-user-line align-middle me-1"></i> Profile</a>
                    <div class="dropdown-divider"></div>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" class="dropdown-item text-danger">
                            <i class="ri-shut-down-line align-middle me-1 text-danger"></i> Logout
                        </button>
                    </form>
                </div>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect">
                    <i class="ri-settings-2-line"></i>
                </button>
            </div>
        </div>
    </div>
</header>

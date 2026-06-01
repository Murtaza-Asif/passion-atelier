<div class="vertical-menu">
    <div data-simplebar class="h-100">

        <div class="user-profile text-center mt-3">
            <div class="">
                <img src="{{ asset('assets/images/users/avatar-1.jpg') }}" alt="" class="avatar-md rounded-circle">
            </div>
            <div class="mt-3">
                <h4 class="font-size-16 mb-1">{{ Auth::user()->name ?? 'Admin' }}</h4>
                <span class="text-muted"><i class="ri-record-circle-line align-middle font-size-14 text-success"></i> Online</span>
            </div>
        </div>

        <div id="sidebar-menu">
            <ul class="metismenu list-unstyled" id="side-menu">
                <li class="menu-title">Menu</li>

                <li>
                    <a href="{{ route('admin.dashboard') }}" class="waves-effect {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                        <i class="ri-dashboard-line"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">
                        <i class="ri-shopping-bag-3-line"></i>
                        <span>Products</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.products.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.products.index') }}" class="{{ request()->routeIs('admin.products.index') ? 'active' : '' }}">All Products</a></li>
                        <li><a href="{{ route('admin.products.create') }}" class="{{ request()->routeIs('admin.products.create') ? 'active' : '' }}">Add Product</a></li>
                        <li><a href="{{ route('admin.product-types.index') }}" class="{{ request()->routeIs('admin.product-types.*') ? 'active' : '' }}">Product Types</a></li>
                        <li><a href="{{ route('admin.brands.index') }}" class="{{ request()->routeIs('admin.brands.*') ? 'active' : '' }}">Brands</a></li>
                        <li><a href="{{ route('admin.colors.index') }}" class="{{ request()->routeIs('admin.colors.*') ? 'active' : '' }}">Colors</a></li>
                        <li><a href="{{ route('admin.tags.index') }}" class="{{ request()->routeIs('admin.tags.*') ? 'active' : '' }}">Tags</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.categories.*') || request()->routeIs('admin.collections.*') ? 'active' : '' }}">
                        <i class="ri-stack-line"></i>
                        <span>Catalog</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.categories.*') || request()->routeIs('admin.collections.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.categories.index') }}" class="{{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">Categories</a></li>
                        <li><a href="{{ route('admin.collections.index') }}" class="{{ request()->routeIs('admin.collections.*') ? 'active' : '' }}">Collections</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.attributes.*') || request()->routeIs('admin.attribute-groups.*') ? 'active' : '' }}">
                        <i class="ri-list-check"></i>
                        <span>Attributes</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.attributes.*') || request()->routeIs('admin.attribute-groups.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.attributes.index') }}" class="{{ request()->routeIs('admin.attributes.*') ? 'active' : '' }}">All Attributes</a></li>
                        <li><a href="{{ route('admin.attribute-groups.index') }}" class="{{ request()->routeIs('admin.attribute-groups.*') ? 'active' : '' }}">Attribute Groups</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.inventory.*') ? 'active' : '' }}">
                        <i class="ri-bar-chart-box-line"></i>
                        <span>Inventory</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.inventory.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.inventory.index') }}" class="{{ request()->routeIs('admin.inventory.index') ? 'active' : '' }}">Stock Logs</a></li>
                        <li><a href="{{ route('admin.inventory.adjust') }}" class="{{ request()->routeIs('admin.inventory.adjust*') ? 'active' : '' }}">Adjust Stock</a></li>
                        <li><a href="{{ route('admin.inventory.low-stock') }}" class="{{ request()->routeIs('admin.inventory.low-stock') ? 'active' : '' }}">Low Stock</a></li>
                    </ul>
                </li>

                <li>
                    <a href="{{ route('admin.orders.index') }}" class="waves-effect {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">
                        <i class="ri-shopping-cart-2-line"></i>
                        <span>Orders</span>
                    </a>
                </li>

                <li>
                    <a href="{{ route('admin.users.index') }}" class="waves-effect {{ request()->routeIs('admin.users.*') ? 'active' : '' }}">
                        <i class="ri-user-line"></i>
                        <span>Users</span>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.coupons.*') || request()->routeIs('admin.offers.*') ? 'active' : '' }}">
                        <i class="ri-percent-line"></i>
                        <span>Marketing</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.coupons.*') || request()->routeIs('admin.offers.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.coupons.index') }}" class="{{ request()->routeIs('admin.coupons.*') ? 'active' : '' }}">Coupons</a></li>
                        <li><a href="{{ route('admin.offers.index') }}" class="{{ request()->routeIs('admin.offers.*') ? 'active' : '' }}">Offers</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript:void(0);" class="has-arrow waves-effect {{ request()->routeIs('admin.reviews.*') || request()->routeIs('admin.faqs.*') ? 'active' : '' }}">
                        <i class="ri-chat-3-line"></i>
                        <span>Engagement</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="{{ request()->routeIs('admin.reviews.*') || request()->routeIs('admin.faqs.*') ? 'true' : 'false' }}">
                        <li><a href="{{ route('admin.reviews.index') }}" class="{{ request()->routeIs('admin.reviews.*') ? 'active' : '' }}">Reviews</a></li>
                        <li><a href="{{ route('admin.faqs.index') }}" class="{{ request()->routeIs('admin.faqs.*') ? 'active' : '' }}">FAQs</a></li>
                    </ul>
                </li>

                <li>
                    <a href="{{ route('admin.homepage.index') }}" class="waves-effect {{ request()->routeIs('admin.homepage.*') ? 'active' : '' }}">
                        <i class="ri-layout-line"></i>
                        <span>Homepage</span>
                    </a>
                </li>

                <li class="menu-title">Pages</li>

                <li>
                    <a href="{{ route('home') }}" class="waves-effect" target="_blank">
                        <i class="ri-external-link-line"></i>
                        <span>View Site</span>
                    </a>
                </li>

                <li>
                    <a href="{{ route('admin.login') }}" class="waves-effect" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="ri-shut-down-line"></i>
                        <span>Logout</span>
                    </a>
                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" class="d-none">@csrf</form>
                </li>
            </ul>
        </div>
    </div>
</div>

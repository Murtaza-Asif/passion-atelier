@extends('admin.layouts.master')
@section('title', 'Products')
@section('content')
<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 class="mb-sm-0">Products</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Admin</a></li><li class="breadcrumb-item active">Products</li></ol></div>
</div></div></div>
<div class="row"><div class="col-12"><div class="card"><div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-4"><h4 class="card-title">All Products</h4><div class="d-flex gap-2"><button type="button" class="btn btn-success" onclick="openBatchQR()"><i class="ri-qr-code-line me-1"></i>Print QR Codes</button><a href="{{ route('admin.products.create') }}" class="btn btn-primary"><i class="ri-add-line me-1"></i>Add Product</a></div></div>
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    <form method="GET" class="row g-2 mb-3">
        <div class="col-md-3"><input type="text" name="search" class="form-control" placeholder="Search title or SKU..." value="{{ request('search') }}"></div>
        <div class="col-md-2"><select name="status" class="form-select"><option value="">All Status</option><option value="draft" {{ request('status')=='draft' ? 'selected' : '' }}>Draft</option><option value="published" {{ request('status')=='published' ? 'selected' : '' }}>Published</option><option value="archived" {{ request('status')=='archived' ? 'selected' : '' }}>Archived</option></select></div>
        <div class="col-md-2"><select name="product_type_id" class="form-select"><option value="">All Types</option>@foreach($productTypes as $pt)<option value="{{ $pt->id }}" {{ request('product_type_id')==$pt->id ? 'selected' : '' }}>{{ $pt->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="category_id" class="form-select"><option value="">All Categories</option>@foreach($categories as $cat)<option value="{{ $cat->id }}" {{ request('category_id')==$cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="brand_id" class="form-select"><option value="">All Brands</option>@foreach($brands as $b)<option value="{{ $b->id }}" {{ request('brand_id')==$b->id ? 'selected' : '' }}>{{ $b->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="collection_id" class="form-select"><option value="">All Collections</option>@foreach($collections as $c)<option value="{{ $c->id }}" {{ request('collection_id')==$c->id ? 'selected' : '' }}>{{ $c->name }}</option>@endforeach</select></div>
        <div class="col-md-2"><select name="flag" class="form-select"><option value="">All Flags</option><option value="featured" {{ request('flag')=='featured' ? 'selected' : '' }}>Featured</option><option value="new_arrival" {{ request('flag')=='new_arrival' ? 'selected' : '' }}>New Arrival</option><option value="best_seller" {{ request('flag')=='best_seller' ? 'selected' : '' }}>Best Seller</option><option value="trending" {{ request('flag')=='trending' ? 'selected' : '' }}>Trending</option></select></div>
        <div class="col-md-2 d-flex gap-1"><button type="submit" class="btn btn-secondary w-100">Filter</button><a href="{{ route('admin.products.index') }}" class="btn btn-soft-secondary w-100">Clear</a></div>
    </form>
    <div class="table-responsive">
        <table class="table table-centered table-hover mb-0 align-middle">
            <thead class="table-light"><tr><th>Image</th><th>Title</th><th>Type</th><th>Category</th><th>Brand</th><th>Price</th><th>Stock</th><th>Status</th><th>In Stock</th><th>Flags</th><th>Actions</th></tr></thead>
            <tbody>
                @forelse($products as $p)
                <tr>
                    <td>@if($p->featured_image_url)<img src="{{ $p->featured_image_url }}" style="width:50px;height:50px;object-fit:cover" class="rounded">@else<span class="badge bg-secondary">No img</span>@endif</td>
                    <td><h6 class="mb-0">{{ $p->title }}</h6><small class="text-muted">SKU: {{ $p->sku ?? '—' }}</small></td>
                    <td>{{ $p->productType?->name ?? '—' }}</td>
                    <td>{{ $p->category?->name ?? '—' }}</td>
                    <td>{{ $p->brand?->name ?? '—' }}</td>
                    <td>@if($p->sale_price)<span class="text-danger">{{ config('app.currency', 'Rs') }} {{ number_format($p->sale_price, 2) }}</span><br><del class="text-muted small">{{ config('app.currency', 'Rs') }} {{ number_format($p->regular_price, 2) }}</del>@elseif($p->regular_price)<span>{{ config('app.currency', 'Rs') }} {{ number_format($p->regular_price, 2) }}</span>@else—@endif</td>
                    <td><span class="badge bg-{{ $p->total_stock > 0 ? 'info' : 'secondary' }}">{{ $p->total_stock ?? 0 }}</span></td>
                    <td><span class="badge bg-{{ $p->status=='published' ? 'success' : ($p->status=='draft' ? 'warning' : 'secondary') }}">{{ ucfirst($p->status) }}</span></td>
                    <td>
                        <form action="{{ route('admin.products.toggle-stock', $p) }}" method="POST" class="d-inline">
                            @csrf @method('PATCH')
                            <button type="submit" class="btn btn-sm rounded-pill px-3 {{ $p->in_stock ? 'btn-outline-success' : 'btn-outline-danger' }}" title="Click to toggle">
                                @if($p->in_stock)
                                    <i class="ri-lock-unlock-line me-1"></i>In Stock
                                @else
                                    <i class="ri-lock-line me-1"></i>Out of Stock
                                @endif
                            </button>
                        </form>
                    </td>
                    <td>
                        @if($p->is_featured)<span class="badge bg-primary me-1">Featured</span>@endif
                        @if($p->is_new_arrival)<span class="badge bg-info me-1">New</span>@endif
                        @if($p->is_best_seller)<span class="badge bg-success me-1">Best</span>@endif
                        @if($p->is_trending)<span class="badge bg-danger">Trend</span>@endif
                    </td>
                    <td>
                        <a href="{{ route('admin.products.edit', $p) }}" class="btn btn-sm btn-soft-primary"><i class="ri-pencil-line"></i></a>
                        <button type="button" class="btn btn-sm btn-soft-success" title="QR Code" onclick="showQR('{{ url('/services/' . $p->slug) }}', '{{ addslashes($p->title) }}')"><i class="ri-qr-code-line"></i></button>
                        <form action="{{ route('admin.products.duplicate', $p) }}" method="POST" class="d-inline">@csrf<button type="submit" class="btn btn-sm btn-soft-info" title="Duplicate"><i class="ri-file-copy-line"></i></button></form>
                        <form action="{{ route('admin.products.destroy', $p) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete product permanently?')">@csrf @method('DELETE')<button type="submit" class="btn btn-sm btn-soft-danger"><i class="ri-delete-bin-line"></i></button></form>
                    </td>
                </tr>
                @empty <tr><td colspan="11" class="text-center text-muted py-4">No products found.</td></tr> @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-3">{{ $products->links() }}</div>
</div></div></div></div>

<!-- QR Code Modal -->
<div class="modal fade" id="qrModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-body text-center p-4">
                <div id="qrPreview" class="d-inline-block"></div>
            </div>
            <div class="modal-footer border-0 justify-content-center pt-0 pb-4">
                <button type="button" class="btn btn-sm btn-outline-secondary me-2" onclick="downloadQR()"><i class="ri-download-2-line me-1"></i>Download</button>
                <button type="button" class="btn btn-sm btn-primary" onclick="printQR()"><i class="ri-printer-line me-1"></i>Print</button>
            </div>
        </div>
    </div>
</div>

<!-- Batch QR Print Modal -->
<div class="modal fade" id="batchQRModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="ri-qr-code-line me-2"></i>Print QR Codes</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p class="text-muted small mb-3">Select products and set quantity of QR codes for each. They will be printed on A4 pages.</p>
                <div class="table-responsive">
                    <table class="table table-sm align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th width="40"><input type="checkbox" id="selectAllQR" class="form-check-input" onclick="toggleAllQR(this)"></th>
                                <th>Product</th>
                                <th width="130" class="text-center">QR Quantity</th>
                            </tr>
                        </thead>
                        <tbody id="batchQRList"></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <span id="batchQRSummary" class="text-muted me-auto small"></span>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="generateBatchPrint()"><i class="ri-printer-line me-1"></i>Generate & Print</button>
            </div>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
<script>
var PA_QR = {
    fg: '#2d1b69',
    bg: '#ffffff',
    size: 320,
    dotScale: 0.42,
    logoSize: 62,
    logo: '{{ asset("assets/images/pa-logo2.png") }}'
};

var productsData = [
    @foreach($products as $p)
    { id: {{ $p->id }}, title: @json($p->title), slug: @json($p->slug), url: '{{ url("/services/" . $p->slug) }}' }{{ $loop->last ? '' : ',' }}
    @endforeach
];

function renderDotQR(url) {
    var qr = qrcode(0, 'H');
    qr.addData(url);
    qr.make();
    var mod = qr.getModuleCount();
    var S = PA_QR.size;
    var pad = 20;
    var qrArea = S - pad * 2;
    var cell = qrArea / mod;
    var dot = cell * PA_QR.dotScale;

    var c = document.createElement('canvas');
    c.width = S;
    c.height = S;
    var ctx = c.getContext('2d');

    ctx.fillStyle = PA_QR.bg;
    ctx.fillRect(0, 0, S, S);

    ctx.fillStyle = PA_QR.fg;
    for (var r = 0; r < mod; r++) {
        for (var col = 0; col < mod; col++) {
            if (qr.isDark(r, col)) {
                ctx.beginPath();
                ctx.arc(pad + col * cell + cell / 2, pad + r * cell + cell / 2, dot, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    return new Promise(function (res) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            var lz = PA_QR.logoSize;
            var cx = S / 2, cy = S / 2;

            ctx.fillStyle = PA_QR.bg;
            ctx.beginPath();
            ctx.arc(cx, cy, lz / 2 + 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = PA_QR.fg;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(cx, cy, lz / 2 + 4, 0, Math.PI * 2);
            ctx.stroke();

            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, lz / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, cx - lz / 2, cy - lz / 2, lz, lz);
            ctx.restore();
            res(c);
        };
        img.onerror = function () { res(c); };
        img.src = PA_QR.logo;
    });
}

async function showQR(url, title) {
    var c = await renderDotQR(url);
    c.id = 'qrCanvas';
    c.style.width = '280px';
    c.style.height = '280px';
    c.style.borderRadius = '12px';
    var box = document.getElementById('qrPreview');
    box.innerHTML = '';
    box.appendChild(c);
    new bootstrap.Modal(document.getElementById('qrModal')).show();
}

function downloadQR() {
    var c = document.getElementById('qrCanvas');
    if (!c) return;
    var a = document.createElement('a');
    a.download = 'qr-code.png';
    a.href = c.toDataURL('image/png');
    a.click();
}

function printQR() {
    var c = document.getElementById('qrCanvas');
    if (!c) return;
    var d = c.toDataURL('image/png');
    var w = window.open('', '_blank', 'width=420,height=480');
    w.document.write('<!DOCTYPE html><html><head><title>QR Code</title>' +
        '<style>@page{margin:20mm}body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh}img{width:300px}</style></head>' +
        '<body><img src="' + d + '" onload="setTimeout(function(){window.print();window.close()},300)"></body></html>');
    w.document.close();
}

/* ===== BATCH QR PRINT ===== */

function openBatchQR() {
    var tbody = document.getElementById('batchQRList');
    tbody.innerHTML = '';
    productsData.forEach(function (p) {
        tbody.innerHTML += '<tr>' +
            '<td><input type="checkbox" class="form-check-input qr-check" value="' + p.id + '" onchange="updateBatchSummary()"></td>' +
            '<td><span class="fw-medium">' + p.title + '</span><br><small class="text-muted">' + p.slug + '</small></td>' +
            '<td><input type="number" class="form-control form-control-sm text-center qr-qty" data-id="' + p.id + '" value="1" min="1" max="50" onchange="updateBatchSummary()"></td>' +
            '</tr>';
    });
    document.getElementById('selectAllQR').checked = false;
    updateBatchSummary();
    new bootstrap.Modal(document.getElementById('batchQRModal')).show();
}

function toggleAllQR(el) {
    document.querySelectorAll('.qr-check').forEach(function (cb) { cb.checked = el.checked; });
    updateBatchSummary();
}

function updateBatchSummary() {
    var total = 0;
    document.querySelectorAll('.qr-check:checked').forEach(function (cb) {
        var qty = parseInt(document.querySelector('.qr-qty[data-id="' + cb.value + '"]').value) || 1;
        total += qty;
    });
    var sel = document.querySelectorAll('.qr-check:checked').length;
    document.getElementById('batchQRSummary').textContent = sel + ' product' + (sel !== 1 ? 's' : '') + ' · ' + total + ' QR codes';
}

async function generateBatchPrint() {
    var selected = [];
    document.querySelectorAll('.qr-check:checked').forEach(function (cb) {
        var id = cb.value;
        var qty = parseInt(document.querySelector('.qr-qty[data-id="' + id + '"]').value) || 1;
        var p = productsData.find(function (x) { return x.id == id; });
        if (p) selected.push({ title: p.title, url: p.url, qty: qty });
    });

    if (selected.length === 0) { alert('Select at least one product.'); return; }

    var loading = document.createElement('div');
    loading.innerHTML = '<div class="text-center py-3"><div class="spinner-border text-primary"></div><p class="mt-2 small">Generating QR codes...</p></div>';
    document.querySelector('#batchQRModal .modal-body').appendChild(loading);

    var allQRs = [];
    for (var i = 0; i < selected.length; i++) {
        for (var q = 0; q < selected[i].qty; q++) {
            var c = await renderDotQR(selected[i].url);
            allQRs.push({ title: selected[i].title, dataUrl: c.toDataURL('image/png') });
        }
    }

    var COLS = 5, QR_W = 30, GAP = 3, CELL_H = 36;
    var ROWS = 7;
    var html = '<!DOCTYPE html><html><head><title>Print QR Codes</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700&display=swap" rel="stylesheet">' +
        '<style>' +
        '@page{size:A4;margin:8mm}' +
        '*{margin:0;padding:0;box-sizing:border-box}' +
        'body{font-family:"Epilogue",sans-serif;color:#2d1b69}' +
        '.page{width:194mm;height:281mm;display:grid;grid-template-columns:repeat(' + COLS + ',1fr);grid-auto-rows:' + CELL_H + 'mm;gap:' + GAP + 'mm ' + GAP + 'mm;page-break-after:always}' +
        '.page:last-child{page-break-after:auto}' +
        '.qr-cell{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}' +
        '.qr-cell img{width:' + QR_W + 'mm;height:' + QR_W + 'mm;border-radius:2px}' +
        '.qr-cell .name{font-size:5.5pt;font-weight:600;margin-top:1.5mm;max-width:' + (QR_W + 4) + 'mm;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#2d1b69}' +
        '</style></head><body>';

    var perPage = COLS * ROWS;
    for (var i = 0; i < allQRs.length; i += perPage) {
        html += '<div class="page">';
        var end = Math.min(i + perPage, allQRs.length);
        for (var j = i; j < end; j++) {
            html += '<div class="qr-cell"><img src="' + allQRs[j].dataUrl + '"><div class="name">' + allQRs[j].title + '</div></div>';
        }
        html += '</div>';
    }

    html += '</body></html>';

    loading.remove();
    bootstrap.Modal.getInstance(document.getElementById('batchQRModal')).hide();

    var w = window.open('', '_blank', 'width=800,height=600');
    w.document.write(html);
    w.document.close();
    w.onload = function () { setTimeout(function () { w.print(); }, 500); };
}
</script>
@endpush
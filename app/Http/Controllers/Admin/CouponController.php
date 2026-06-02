<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCouponRequest;
use App\Http\Requests\Admin\UpdateCouponRequest;
use App\Models\Coupon;
use App\Services\Admin\CategoryService;
use App\Services\Admin\CouponService;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function __construct(protected CouponService $couponService, protected ProductService $productService, protected CategoryService $categoryService) {}

    public function index(Request $request)
    {
        return view('admin.coupons.index', ['coupons' => $this->couponService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.coupons.create', [
            'products' => $this->productService->paginate(['per_page' => 1000]),
            'categories' => $this->categoryService->getAll(),
        ]);
    }

    public function store(StoreCouponRequest $request)
    {
        $data = $request->validated();
        $this->couponService->create($data, $data['product_ids'] ?? [], $data['category_ids'] ?? []);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created.');
    }

    public function edit(Coupon $coupon)
    {
        return view('admin.coupons.edit', [
            'coupon' => $this->couponService->find($coupon->id),
            'products' => $this->productService->paginate(['per_page' => 1000]),
            'categories' => $this->categoryService->getAll(),
        ]);
    }

    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        $data = $request->validated();
        $this->couponService->update($coupon, $data, $data['product_ids'] ?? [], $data['category_ids'] ?? []);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated.');
    }

    public function destroy(Coupon $coupon)
    {
        $this->couponService->delete($coupon);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted.');
    }
}

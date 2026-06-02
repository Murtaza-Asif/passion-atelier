<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfferRequest;
use App\Http\Requests\Admin\UpdateOfferRequest;
use App\Models\Offer;
use App\Services\Admin\OfferService;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function __construct(
        protected OfferService $offerService,
        protected ProductService $productService
    ) {}

    public function index(Request $request)
    {
        return view('admin.offers.index', ['offers' => $this->offerService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.offers.create', ['products' => $this->productService->paginate(['per_page' => 1000])]);
    }

    public function store(StoreOfferRequest $request)
    {
        $data = $request->validated();
        $this->offerService->create($data, $data['product_ids'] ?? []);

        return redirect()->route('admin.offers.index')->with('success', 'Offer created.');
    }

    public function edit(Offer $offer)
    {
        return view('admin.offers.edit', ['offer' => $this->offerService->find($offer->id),
            'products' => $this->productService->paginate(['per_page' => 1000]),
        ]);
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        $data = $request->validated();
        $this->offerService->update($offer, $data, $data['product_ids'] ?? []);

        return redirect()->route('admin.offers.index')->with('success', 'Offer updated.');
    }

    public function destroy(Offer $offer)
    {
        $this->offerService->delete($offer);

        return redirect()->route('admin.offers.index')->with('success', 'Offer deleted.');
    }
}

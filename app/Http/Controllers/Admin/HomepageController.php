<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomepageSectionRequest;
use App\Http\Requests\Admin\UpdateHomepageSectionRequest;
use App\Models\HomepageSection;
use App\Services\Admin\HomepageService;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
class HomepageController extends Controller {
    public function __construct(protected HomepageService $homepageService, protected ProductService $productService) {}
    public function index() { return view('admin.homepage.index', ['sections' => $this->homepageService->paginate()]); }
    public function create() { return view('admin.homepage.create', ['products' => \App\Models\Product::ordered()->get()]); }
    public function store(StoreHomepageSectionRequest $request) { $data = $request->validated(); $this->homepageService->create($data, $data['product_ids'] ?? []); return redirect()->route('admin.homepage.index')->with('success', 'Section created.'); }
    public function edit(HomepageSection $homepageSection) { return view('admin.homepage.edit', ['section' => $this->homepageService->find($homepageSection->id), 'products' => \App\Models\Product::ordered()->get()]); }
    public function update(UpdateHomepageSectionRequest $request, HomepageSection $homepageSection) { $data = $request->validated(); $this->homepageService->update($homepageSection, $data, $data['product_ids'] ?? []); return redirect()->route('admin.homepage.index')->with('success', 'Section updated.'); }
    public function destroy(HomepageSection $homepageSection) { $this->homepageService->delete($homepageSection); return redirect()->route('admin.homepage.index')->with('success', 'Section deleted.'); }
}

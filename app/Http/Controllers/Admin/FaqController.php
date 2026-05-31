<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqRequest;
use App\Models\Product;
use App\Models\ProductFaq;
use App\Services\Admin\FaqService;
use Illuminate\Http\Request;
class FaqController extends Controller {
    public function __construct(protected FaqService $faqService) {}
    public function index(Request $request) { $productId = $request->get('product_id'); return view('admin.faqs.index', ['faqs' => $productId ? $this->faqService->getByProduct($productId) : collect(), 'products' => \App\Models\Product::ordered()->get()]); }
    public function create() { return view('admin.faqs.create', ['products' => \App\Models\Product::ordered()->get()]); }
    public function store(StoreFaqRequest $request) { $this->faqService->create($request->validated()); return redirect()->route('admin.faqs.index')->with('success', 'FAQ created.'); }
    public function edit(ProductFaq $faq) { return view('admin.faqs.edit', ['faq' => $faq, 'products' => \App\Models\Product::ordered()->get()]); }
    public function update(Request $request, ProductFaq $faq) { $this->faqService->update($faq, $request->validate(['product_id' => 'required|integer|exists:products,id', 'question' => 'required|string|max:500', 'answer' => 'required|string', 'sort_order' => 'nullable|integer|min:0', 'status' => 'nullable|boolean'])); return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated.'); }
    public function destroy(ProductFaq $faq) { $this->faqService->delete($faq); return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted.'); }
}

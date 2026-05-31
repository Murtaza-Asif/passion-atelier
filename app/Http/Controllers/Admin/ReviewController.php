<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Services\Admin\ReviewService;
use Illuminate\Http\Request;
class ReviewController extends Controller {
    public function __construct(protected ReviewService $reviewService) {}
    public function index(Request $request) { return view('admin.reviews.index', ['reviews' => $this->reviewService->paginate($request->only('product_id', 'is_approved'))]); }
    public function approve(Review $review) { $this->reviewService->approve($review); return redirect()->route('admin.reviews.index')->with('success', 'Review approved.'); }
    public function destroy(Review $review) { $this->reviewService->delete($review); return redirect()->route('admin.reviews.index')->with('success', 'Review deleted.'); }
}

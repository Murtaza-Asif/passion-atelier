<?php

namespace App\Services\Admin;

use App\Models\ProductFaq;

class FaqService
{
    public function getByProduct(int $productId)
    {
        return ProductFaq::where('product_id', $productId)->ordered()->get();
    }

    public function create(array $data): ProductFaq
    {
        return ProductFaq::create($data);
    }

    public function update(ProductFaq $faq, array $data): ProductFaq
    {
        $faq->update($data);

        return $faq->fresh();
    }

    public function delete(ProductFaq $faq): void
    {
        $faq->delete();
    }
}

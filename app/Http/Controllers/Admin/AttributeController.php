<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAttributeRequest;
use App\Http\Requests\Admin\StoreAttributeValueRequest;
use App\Http\Requests\Admin\UpdateAttributeRequest;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Services\Admin\AttributeGroupService;
use App\Services\Admin\AttributeService;
use App\Services\Admin\AttributeValueService;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function __construct(
        protected AttributeService $attributeService,
        protected AttributeGroupService $attributeGroupService,
        protected AttributeValueService $attributeValueService
    ) {}

    public function index(Request $request)
    {
        return view('admin.attributes.index', ['attributes' => $this->attributeService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.attributes.create', ['groups' => $this->attributeGroupService->getAll()]);
    }

    public function store(StoreAttributeRequest $request)
    {
        $this->attributeService->create($request->validated());

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute created.');
    }

    public function edit(Attribute $attribute)
    {
        return view('admin.attributes.edit', ['attribute' => $this->attributeService->find($attribute->id), 'groups' => $this->attributeGroupService->getAll()]);
    }

    public function update(UpdateAttributeRequest $request, Attribute $attribute)
    {
        $this->attributeService->update($attribute, $request->validated());

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute updated.');
    }

    public function destroy(Attribute $attribute)
    {
        $this->attributeService->delete($attribute);

        return redirect()->route('admin.attributes.index')->with('success', 'Attribute deleted.');
    }

    public function values(Attribute $attribute)
    {
        return view('admin.attributes.values', ['attribute' => $this->attributeService->find($attribute->id)]);
    }

    public function storeValue(StoreAttributeValueRequest $request, Attribute $attribute)
    {
        $data = $request->validated();
        $data['attribute_id'] = $attribute->id;
        $this->attributeValueService->create($data);

        return redirect()->route('admin.attributes.values', $attribute)->with('success', 'Value added.');
    }

    public function destroyValue(Attribute $attribute, AttributeValue $value)
    {
        $this->attributeValueService->delete($value);

        return redirect()->route('admin.attributes.values', $attribute)->with('success', 'Value deleted.');
    }
}

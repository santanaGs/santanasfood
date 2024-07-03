<?php

namespace App\Http\Controllers;

use App\Http\Requests\FoodStoreRequest;
use App\Http\Requests\FoodUpdateRequest;
use App\Models\Category;
use App\Models\Food;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::query()
            ->with('categoryFood')
            ->orderBy('id')
            ->filter(Request::only('search', 'trashed'))
            ->paginate(10)
            ->withQueryString()
            ->through(function ($food) {
                return [
                    'id' => $food->id,
                    'name' => $food->name,
                    'description' => $food->description,
                    'price' => 'R$ ' . number_format($food->price, 2, ',', '.'),
                    'category_name' => $food->categoryFood ? $food->categoryFood->name : null,
                    'image' => $food->image ? $food->image : '',
                ];
            });

        return Inertia::render('Foods/Index', [
            'filters' => Request::only('search', 'trashed'),
            'foods' => $foods,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        //
        return Inertia::render('Foods/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FoodStoreRequest $request): RedirectResponse
    {

        //
        if ($request->file('photo_path')) {


            $file = $request->file('photo_path');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('public/uploads/foods/', $filename);

            $fileShowPath = '/storage/uploads/foods/' . $filename;

            $food = Food::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'image' => $fileShowPath,
                'category_id' => $request->input('category_id'),
            ]);

        }

        if ($food) {
            return Redirect::route('foods.index')->with('success', 'Lanche criado com sucesso.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Food $food)
    {
        $categories = Category::all();
        return Inertia::render('Foods/Edit', [
            'food' => $food,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FoodUpdateRequest $request, Food $food): RedirectResponse
    {
        //

        $food->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Lanche atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food): RedirectResponse
    {
        $food->delete();

        return Redirect::back()->with('success', 'Lanche deletada.');
    }

    public function restore(Food $food): RedirectResponse
    {
        $food->restore();

        return Redirect::back()->with('success', 'Lanche restaurada.');
    }
}

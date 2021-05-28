<?php

namespace App\Http\Controllers\api\v1;
use App\Http\Controllers\Controller;


use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products=Product::all();
        return [
            'products'=>$products
        ];
    }

 
}

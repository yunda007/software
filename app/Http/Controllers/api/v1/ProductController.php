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

    public function store(Request $request ){
        $messages=[
            'nombre.unique'=>"Este producto ya se encuentra registrado"
        ];

        $this->validate(request(),[
            'nombre'=>['required'],
            'precio'=>['required', 'max:100', 'unique:nombre'],
            'img'=>['required'],
        ], $messages);

        $products= new Product();
        $products->nombre= $request->nombre;
        $products->precio= $request->precio;
        $products->img= $request->img;
        $products->save();
        return response()->json(['product'=>$products],200);
    }


    public function update(Request $request ){
        $messages=[
            'nombre.unique'=>"El producto ya se encuentra registrado."
        ];

        //para poder dejar el mismo email pero que no se repita
        //tabla(unique:users),campo(email),id(.$request->id)


        $products= Product::findOrFail($request->id);
        $products->nombre= $request->nombre;
        $products->precio= $request->precio;
        $products->img= $request->img;
        $products->save();
        return response()->json(['product'=>$products],200);
    }
 
}

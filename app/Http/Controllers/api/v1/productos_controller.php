<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Productos;
use Illuminate\Http\Request;

class productos_controller extends Controller
{
    public function index()
    {
        $productos = Productos::all();
        return [ 'productos'=>$productos ];
    }

    public function insert(Request $request)
    {
        $productos = new Productos();
        $productos->nombre = $request->nombre;
        $productos->img = $request->imagen;
        $productos->precio = $request->precio;
        
        $productos->active = $request->activate;
        $productos->save();

        return response()->json(['producto' => $productos], 200);
    }

    public function update(Request $request)
    {
        $productos = Productos::findOrFail($request->id);
        $productos->nombre = $request->nombre;
        $productos->img = $request->imagen;
        $productos->precio = $request->precio;
        $productos->active = $request->activate;
        $productos->save();

        return response()->json(['producto' => $productos], 200);
    }

    public function updateStatus(Request $request)
    {
        $productos = Productos::findOrFail($request->id);
        $productos->active = $request->activate;
        $productos->save();

        return response()->json(['producto' => $productos], 200);
    }
}

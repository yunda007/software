<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'nombre',
        'img',
        'precio_actual',
        'precio_anterior',
        'cantidad',
        'active',
        'eliminado',
    ];

}

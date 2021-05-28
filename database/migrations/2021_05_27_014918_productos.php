<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Productos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('img');
            $table->double('precio');
            $table->double('cantidad');
            $table->string('active');
            $table->integer('eliminado');
            /* $table->unsignedBigInteger('line_id');
            $table->unsignedBigInteger('brand_id'); */
            $table->timestamps();            

            /* $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('line_id')->references('id')->on('lines'); */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
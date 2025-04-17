<?php

use App\Http\Controllers\Api\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RBCAnalysisController;

Route::get('/items', [ItemController::class, 'index']);
Route::post('/rbc/analyze', [RBCAnalysisController::class, 'analyze']);
Route::get('/rbc/result/{analysisId}', [RBCAnalysisController::class, 'getResult']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
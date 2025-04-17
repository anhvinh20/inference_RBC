<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;

class RBCAnalysisController extends Controller
{
    public function analyze(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:tif,tiff|max:10240'
        ]);

        $imagePath = $request->file('image')->store('uploads');
        $fullPath = storage_path('app/' . $imagePath);
        
        $analysisId = uniqid('analysis_');
        
        $this->runInference($fullPath, $analysisId);
        
        return response()->json([
            'status' => 'processing',
            'analysis_id' => $analysisId
        ]);
    }
    
    public function getResult($analysisId)
    {
        $resultPath = storage_path("app/results/{$analysisId}.json");
        
        if (!file_exists($resultPath)) {
            return response()->json([
                'status' => 'processing'
            ]);
        }
        
        $result = json_decode(file_get_contents($resultPath), true);
        
        return response()->json([
            'status' => 'completed',
            'result' => $result
        ]);
    }
    
    private function runInference($imagePath, $analysisId)
    {
        $scriptPath = base_path('python/rbc_inference.py');
        
        $process = new Process([
            'python',
            $scriptPath,
            $imagePath,
            '--output',
            storage_path("app/results/{$analysisId}.json"),
            '--yolo-model',
            base_path('python/models/yolo_best.pt'),
            '--resnet-model',
            base_path('python/models/resnet_best.pt')
        ]);
        
        $process->start();
    }
}

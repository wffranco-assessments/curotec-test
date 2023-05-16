<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskCreate;
use App\Http\Requests\TaskUpdate;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Task::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskCreate $request)
    {
        return Task::create([
            'title' => $request->title,
            'status' => $request->status,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Task::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdate $request, string $id)
    {
        $task = Task::find($id);
        $task->fill(['status' => $request->status])->save();

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Task::destroy(+$id);
    }
}

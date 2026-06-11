function TaskCard({
  task,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="font-bold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-600">
        {task.description}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() =>
            onStatusChange(task)
          }
          className={`px-3 py-1 rounded text-white ${
            task.status === "Completed"
              ? "bg-green-600"
              : "bg-yellow-500"
          }`}
        >
          {task.status}
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
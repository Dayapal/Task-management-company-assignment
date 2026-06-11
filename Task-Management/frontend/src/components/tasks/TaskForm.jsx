import { useState } from "react";

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow mb-6"
    >
      <input
        type="text"
        placeholder="Task Title"
        className="w-full border p-3 rounded mb-3"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded mb-3"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
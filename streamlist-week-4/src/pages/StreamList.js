import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");

  // Load items safely from localStorage
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("streamItems");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Failed to load items from localStorage:", error);
      return [];
    }
  });

  // Store item ID instead of array index
  const [editId, setEditId] = useState(null);

  // Save items to localStorage
  useEffect(() => {
    localStorage.setItem("streamItems", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();

    // Prevent empty input
    if (trimmedInput === "") return;

    // duplicate prevention
    const duplicateExists = items.some(
      (item) =>
        item.text.toLowerCase() === trimmedInput.toLowerCase() &&
        item.id !== editId
    );

    if (duplicateExists) {
      alert("This movie or show already exists.");
      return;
    }

    // Update existing item
    if (editId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editId
          ? { ...item, text: trimmedInput }
          : item
      );

      setItems(updatedItems);
      setEditId(null);
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        text: trimmedInput,
        completed: false,
      };

      setItems([...items, newItem]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);

    // Reset edit mode
    if (editId === id) {
      setEditId(null);
      setInput("");
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);

    if (!itemToEdit) return;

    setInput(itemToEdit.text);
    setEditId(id);
  };

  const handleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setItems(updatedItems);
  };

  return (
    <div className="container">
      <h1>🍿 Create Your StreamList</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a movie or show..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">
          {editId !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Empty state message */}
      {items.length === 0 && (
        <p className="empty-message">
          No movies or shows added yet.
        </p>
      )}

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={item.completed ? "completed" : ""}
          >
            <span>{item.text}</span>

            <div className="actions">
              <button
                onClick={() => handleComplete(item.id)}
                aria-label="Mark as completed"
                title="Complete"
              >
                <FaCheck />
              </button>

              <button
                onClick={() => handleEdit(item.id)}
                aria-label="Edit item"
                title="Edit"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                aria-label="Delete item"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
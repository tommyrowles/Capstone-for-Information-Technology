import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("streamItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("streamItems", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex].text = input;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, { text: input, completed: false }]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  const handleEdit = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
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
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <span>{item.text}</span>

            <div className="actions">
              <FaCheck onClick={() => handleComplete(index)} />
              <FaEdit onClick={() => handleEdit(index)} />
              <FaTrash onClick={() => handleDelete(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
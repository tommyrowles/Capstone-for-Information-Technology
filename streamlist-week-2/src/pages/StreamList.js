import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  const handleEdit = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updated = [...items];
    updated[index].completed = !updated[index].completed;
    setItems(updated);
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
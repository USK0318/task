import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import axios from "axios"; // Import axios for HTTP requests
import "./Favorite.css";

export const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite items from API when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/favaourite")
      .then((response) => {
        setFavorites(response.data); // Set the favorites with data from API
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setError("Error fetching favorites");
        setLoading(false);
      });
  }, []);

  // Handle input changes while adding a new favorite
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFavorite({ ...newFavorite, [name]: value });
  };

  // Add a new favorite to the list and send a POST request to the backend
  const addFavorite = () => {
    if (newFavorite.name && newFavorite.description) {
      axios
        .post("http://localhost:3000/favaourite", newFavorite)
        .then((response) => {
          setFavorites([...favorites, response.data]); // Add the new item from server response
          setNewFavorite({ name: "", description: "" }); // Reset form
        })
        .catch((error) => {
          console.error("Error adding favorite", error);
          setError("Error adding favorite");
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete a favorite and send a DELETE request to the backend
  const deleteFavorite = (id) => {
    // First, remove it from local state to update UI immediately
    const updatedFavorites = favorites.filter((item) => item._id !== id);
    setFavorites(updatedFavorites);

    // Now, send the DELETE request to the backend
    axios
      .delete(`http://localhost:3000/favaourite/${id}`)
      .then((response) => {
        console.log("Deleted successfully", response);
      })
      .catch((error) => {
        console.error("Error deleting favorite", error);
        setError("Error deleting favorite");
      });
  };

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="favorite-container">
      <h1 className="favorite-heading">Favorite Items</h1>

      {/* Add Favorite Form */}
      <div className="favorite-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newFavorite.name}
          onChange={handleInputChange}
          className="favorite-input"
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={newFavorite.description}
          onChange={handleInputChange}
          className="favorite-textarea"
        ></textarea>
        <button onClick={addFavorite} className="favorite-add-btn">
          Add Item
        </button>
      </div>

      {/* Favorite List */}
      <ul className="favorite-list">
        {favorites.map((item) => (
          <li key={item._id} className="favorite-item">
            <div className="favorite-content">
              <h3 className="favorite-name">{item.name}</h3>
              <p className="favorite-description">{item.description}</p>
            </div>
            {/* Delete button with FaTrash icon */}
            <button
              onClick={() => deleteFavorite(item._id)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FaTrash size={20} color="#ff4d4d" /> {/* Icon */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;

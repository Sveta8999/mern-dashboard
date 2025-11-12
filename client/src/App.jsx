import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/items`);
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!name || !price) return;
    try {
      await axios.post(`${API_BASE_URL}/api/items`, {
        name,
        price: Number(price),
      });
      setName("");
      setPrice("");
      fetchItems();
    } catch (err) {
      setError("Failed to add item");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/items/${id}`);
      fetchItems();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">MERN Dashboard</h1>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <input
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <input
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {error && (
        <div className="mb-4 text-center text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

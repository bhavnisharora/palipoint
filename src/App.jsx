import React, { useState } from "react";
import logo from "./assets/logo.webp";
const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedRecords = records.map((record, index) =>
        index === editIndex ? formData : record
      );
      setRecords(updatedRecords);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setRecords([...records, formData]);
    }

    setFormData({ name: "", email: "" });
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleUpdate = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(records[index]);
  };

  return (
    <div className="App">
      <div className="content">
        <img src={logo} alt="" />
        <h1>Assignment</h1>
      </div>
      <h2>Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>

      <h2>Records</h2>
      {records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>
                  <button onClick={() => handleUpdate(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
};

export default App;

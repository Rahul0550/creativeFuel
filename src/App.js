import React, { useState } from "react";
import "./App.css";
import Form from "./form-1/Form";
import TestTable from "./form-2/TestTable";

function App() {
  const [selectedType, setSelectedType] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleCreateTest = () => {
    if (selectedType === currentType) {
      alert("You are already on the same page!");
    } else {
      setShowCreateForm(true);
      setCurrentType(selectedType);
    }
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleFormSubmit = (newData) => {
    if (editingId !== null) {
      const updatedSubmissions = formSubmissions.map((data) =>
        data.id === editingId ? newData : data
      );
      setFormSubmissions(updatedSubmissions);
      setEditingId(null);
    } else {
      setFormSubmissions([...formSubmissions, newData]);
    }

    console.log("Form data submitted:", newData);
  };

  const handleEditForm = (id) => {
    setEditingId(id);
    setShowCreateForm(true);
  };

  const handleDeleteForm = (id) => {
    const updatedSubmissions = formSubmissions.filter((data) => data.id !== id);
    setFormSubmissions(updatedSubmissions);
    setEditingId(null);
    setShowTable(false); // Add this line to hide the table after deletion
  };

  return (
    <div className="App">
      <div className="table-head">
        <div>
          <label>Test Name:-</label>
          <br />
          <input placeholder="Test Name" type="text" />
        </div>

        <div>
          <label> Test Type:- </label>
          <select onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Select Test Type</option>
            <option>PHP</option>
            <option>NodeJS</option>
            <option>ReactJS</option>
          </select>
          <button onClick={handleCreateTest}>Create Test</button>
        </div>

        {showCreateForm && selectedType && (
          <Form
            selectedType={selectedType}
            setShowTable={handleShowTable}
            onSubmit={handleFormSubmit}
            editingId={editingId}
            formSubmissions={formSubmissions}
          />
        )}

        {showTable && (
          <div>
            <h3>Form Submissions:</h3>
            <TestTable
              data={formSubmissions}
              onEdit={handleEditForm}
              onDelete={handleDeleteForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

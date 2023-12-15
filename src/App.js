// App.js
import React, { useState } from "react";
import "./App.css";
import TestTable from "./components/TestTable";
import TestTypesTable from "./components/TestTypesTable";

function App() {
  const [testType, setTestType] = useState("");
  const [newTestField, setNewTestField] = useState("");
  const [testTypesList, setTestTypesList] = useState([
    "PHP",
    "NodeJS",
    "ReactJS"
  ]);
  const [tests, setTests] = useState([]);

  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
  };

  const handleNewTestFieldChange = (e) => {
    setNewTestField(e.target.value);
  };

  const handleCreateTest = (e) => {
    e.preventDefault();

    if (newTestField.trim() === "") {
      alert("Please enter a value for the new test field.");
      return;
    }

    if (testTypesList.includes(newTestField)) {
      alert("Test type already exists.");
      return;
    }

    setTestTypesList((prevList) => [...prevList, newTestField]);
    setTestType(newTestField);
    setNewTestField("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newTest = {
      testName: e.target.elements.testName.value,
      testType,
      testerEmail: e.target.elements.testerEmail.value,
      testerMobileNo: e.target.elements.contactNo.value,
      alternateNo: e.target.elements.alternateNo.value,
      creationDate: new Date().toLocaleDateString(),
      updationDate: new Date().toLocaleDateString(),
    };

    setTests((prevTests) => [...prevTests, newTest]);
  };

  const handleDelete = (index) => {
    setTests((prevTests) => prevTests.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    // You can add edit functionality if needed
    console.log(`Edit button clicked for index ${index}`);
  };

  const handleSaveEdit = (index, updatedTest) => {
    setTests((prevTests) => {
      const newTests = [...prevTests];
      newTests[index] = updatedTest;
      return newTests;
    });
    console.log(`Save button clicked for index ${index}`, updatedTest);
  };

  const handleCancelEdit = () => {
    // You can add cancel edit functionality if needed
    console.log("Cancel button clicked");
  };

  return (
    <div className="App">
      <div>
        <h2>This is a form</h2>
        <form onSubmit={handleSave}>
          <div>
            <label>Test Name :-</label>
            <input type="text" name="testName" />
          </div>

          <div>
            <label> Test Type:- </label>
            <select value={testType} onChange={handleTestTypeChange}>
              <option value="">Select Test Type</option>
              {testTypesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              placeholder="Enter New Field"
              value={newTestField}
              onChange={handleNewTestFieldChange}
            />
            <button onClick={handleCreateTest}>Create Test</button>
          </div>

          <div>
            <label>Tester Email :-</label>
            <input type="email" name="testerEmail" />
          </div>
          <div>
            <label>Tester Mobile No. :-</label>
            <input
              type="text"
              placeholder="Enter your 10-digit contact no"
              pattern="[0-9]{10}"
              name="contactNo"
              required
            />
          </div>

          <div>
            <label>Alternate Mobile No. :-</label>
            <input type="text" name="alternateNo" />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>

      {/* Display the TestTable */}
      <TestTable
        tests={tests}
        onEdit={handleEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDelete}
      />

      {/* Display the TestTypesTable */}
      <TestTypesTable tests={tests} />
    </div>
  );
}

export default App;

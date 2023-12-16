import React, { useState } from "react";
import "./App.css";
import TestTable from "./components/TestTable";
import TestTypesTable from "./components/TestTypesTable";

const initialTests = [
  {
    testName: "Tester-1",
    testType: "PHP",
    testerEmail: "rahul@hotmail.com",
    testerMobileNo: "1234567890",
    alternateNo: "9876543210",
    creationDate: "15/12/2023",
    updationDate: "15/12/2023",
  },
  {
    testName: "Tester-2",
    testType: "NodeJS",
    testerEmail: "rahul@gmail.com",
    testerMobileNo: "1234567895",
    alternateNo: "9876543333",
    creationDate: "15/12/2023",
    updationDate: "16/12/2023",
  },
  {
    testName: "Tester-3",
    testType: "ReactJS",
    testerEmail: "rahul@yahoo.com",
    testerMobileNo: "4564567895",
    alternateNo: "9876545678",
    creationDate: "16/12/2023",
    updationDate: "16/12/2023",
  },
];

const initialTestTypesList = ["PHP", "NodeJS"];

function App() {
  const [testType, setTestType] = useState("");
  const [newTestField, setNewTestField] = useState("");
  const [testTypesList, setTestTypesList] = useState(initialTestTypesList);
  const [tests, setTests] = useState(initialTests);

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

    setTestType("");
    setNewTestField("");
    e.target.elements.testName.value = "";
    e.target.elements.testerEmail.value = "";
    e.target.elements.contactNo.value = "";
    e.target.elements.alternateNo.value = "";
  };

  const handleDelete = (index) => {
    setTests((prevTests) => prevTests.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {

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

    console.log("Cancel button clicked");
  };

  return (
    <div className="App">
      <div className="form-outline">
        <h2>Form</h2>
        <form onSubmit={handleSave}>
          <div>
            <label><b>Test Name :-</b></label>
            <input type="text" name="testName" placeholder="Enter Name" />
          </div>

          <div>
            <label> <b>Test Type:- </b></label>
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
            <button onClick={handleCreateTest}><b>Create Test</b></button>
          </div>

          <div>
            <label><b>Tester Email :- </b></label>
            <input type="email" name="testerEmail" placeholder="Enter Email" />
          </div>
          <div>
            <label><b>Tester Mobile No. :- </b></label>
            <input
              type="text"
              placeholder="Enter 10-digit Mobile no"
              pattern="[0-9]{10}"
              name="contactNo"
              required
            />
          </div>

          <div>
            <label><b>Alternate Mobile No. :- </b></label>
            <input type="text" name="alternateNo" placeholder="Enter Alternate Mobile No" />
          </div>
          <button type="submit"><b>Save</b></button>
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

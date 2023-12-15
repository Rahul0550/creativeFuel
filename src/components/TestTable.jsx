import React, { useState } from "react";
import "./TestTable.css";

export default function TestTable({
  tests,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  const [editMode, setEditMode] = useState(null);
  const [updatedTest, setUpdatedTest] = useState({});

  const handleEdit = (index) => {
    setEditMode(index);
    setUpdatedTest({ ...tests[index] });
    onEdit(index);
  };

  const handleSaveEdit = (index) => {
    onSaveEdit(index, updatedTest);
    setEditMode(null);
    setUpdatedTest({});
  };

  const handleCancelEdit = () => {
    onCancelEdit();
    setEditMode(null);
    setUpdatedTest({});
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleFieldChange = (field, value) => {
    setUpdatedTest((prevTest) => ({ ...prevTest, [field]: value }));
  };

  return (
    <div>
      <h2>Test Table</h2>
      <table>
        <thead>
          <tr>
            <th>Test Id</th>
            <th>Test Name</th>
            <th>Test Type</th>
            <th>Tester Email</th>
            <th>Tester Mobile No.</th>
            <th>Alternate No.</th>
            <th>Creation Date</th>
            <th>Updation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr
              key={index}
              className={
                test.testType === "PHP"
                  ? "green-row"
                  : test.testType === "NodeJS"
                  ? "yellow-row"
                  : "orange-row"
              }
            >
              <td>{index + 1}</td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={updatedTest.testName}
                    onChange={(e) =>
                      handleFieldChange("testName", e.target.value)
                    }
                  />
                ) : (
                  test.testName
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={updatedTest.testType}
                    onChange={(e) =>
                      handleFieldChange("testType", e.target.value)
                    }
                  />
                ) : (
                  test.testType
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={updatedTest.testerEmail}
                    onChange={(e) =>
                      handleFieldChange("testerEmail", e.target.value)
                    }
                  />
                ) : (
                  test.testerEmail
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={updatedTest.testerMobileNo}
                    onChange={(e) =>
                      handleFieldChange("testerMobileNo", e.target.value)
                    }
                  />
                ) : (
                  test.testerMobileNo
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="text"
                    value={updatedTest.alternateNo}
                    onChange={(e) =>
                      handleFieldChange("alternateNo", e.target.value)
                    }
                  />
                ) : (
                  test.alternateNo
                )}
              </td>
              <td>{test.creationDate}</td>
              <td>{test.updationDate}</td>
              <td>
                {editMode === index ? (
                  <>
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";
import "./TestTable.css"; // Import the CSS file

const TestTable = ({ data, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(id);
    setEditingId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Mobile</th>
          <th>Alternative Mobile</th>
          <th>Creation Date</th>
          <th>Update Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className={item.testType === "PHP" ? "green" : item.testType === "NodeJS" ? "yellow" : "orange"}>
            <td>{item.testerEmail}</td>
            <td>{item.testerMobile}</td>
            <td>{item.alternativeMobile}</td>
            <td>{item.creationDate}</td>
            <td>{item.lastUpdateDate}</td>
            <td>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestTable;

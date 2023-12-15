import React, { useState, useEffect } from "react";
import TestTable from "../form-2/TestTable";

const Form = ({ selectedType, setShowTable, onSubmit, editingId, formSubmissions }) => {
  const [formData, setFormData] = useState({
    testerEmail: "",
    testerMobile: "",
    alternativeMobile: "",
    creationDate: "",
    lastUpdateDate: "",
  });

  const [showTableLocal, setShowTableLocal] = useState(false);

  useEffect(() => {
    if (editingId !== null) {
      const formDataToEdit = formSubmissions.find((data) => data.id === editingId);
      setFormData(formDataToEdit);
    }
  }, [editingId, formSubmissions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      testType: selectedType,
      id: editingId !== null ? editingId : new Date().getTime(),
    };
    onSubmit(newData);
    setShowTableLocal(true);

    if (editingId === null) {
      setFormData({
        testerEmail: "",
        testerMobile: "",
        alternativeMobile: "",
        creationDate: "",
        lastUpdateDate: "",
      });
    }
  };

  return (
    <>
      <div className="table-2">
        <form onSubmit={handleSubmit}>
          <p>-----------------------------------------</p>
          <h4>{selectedType} Tester Mast</h4>

          <div>
            <div>
              <label>Tester Email:</label>
              <input
                placeholder="Enter Email"
                type="email"
                name="testerEmail"
                value={formData.testerEmail}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Tester Mobile Number:</label>
              <input
                placeholder="Mobile Number"
                type="number"
                name="testerMobile"
                value={formData.testerMobile}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Tester Alternative Mobile Number:</label>
              <input
                placeholder="Mobile Number"
                type="number"
                name="alternativeMobile"
                value={formData.alternativeMobile}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Creation Date:</label>
              <input
                type="date"
                name="creationDate"
                value={formData.creationDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Last Update Date:</label>
              <input
                type="date"
                name="lastUpdateDate"
                value={formData.lastUpdateDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <button type="button" onClick={() => setShowTableLocal(true)}>
              Show table
            </button>
          </div>
        </form>
        {showTableLocal && <TestTable data={formSubmissions} onEdit={() => {}} onDelete={() => {}} />}
      </div>
    </>
  );
};

export default Form;

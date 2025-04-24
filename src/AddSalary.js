import React, { useState } from "react";

const AddSalaryForm = () => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    basicSalary: "",
    totalDays: "",
    monthRange: "",
    workingDays: "",
    dr: "",
    pf: "",
    specialAllowance: "",
    professionalTax: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salaryPayload = {
      empId: formData.empId,
      name: formData.name,
      basicSalary: parseFloat(formData.basicSalary),
      totalDays: parseInt(formData.totalDays),
      month: formData.monthRange, // Store as string like '10/05/2025 to 10/06/2025'
      workingDays: parseInt(formData.workingDays),
      dr: parseFloat(formData.dr),
      pf: parseFloat(formData.pf),
      specialAllowance: parseFloat(formData.specialAllowance),
      professionalTax: parseFloat(formData.professionalTax),
    };

    try {
      const res = await fetch("http://localhost:8080/api/salaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salaryPayload),
      });

      if (res.ok) {
        alert("Salary record added successfully!");
        setFormData({
          empId: "",
          name: "",
          basicSalary: "",
          totalDays: "",
          monthRange: "",
          workingDays: "",
          dr: "",
          pf: "",
          specialAllowance: "",
          professionalTax: "",
        });
      } else {
        alert("Failed to add salary.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Salary</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="empId" value={formData.empId} onChange={handleChange} type="text" placeholder="Employee ID" className="input" required />
        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Employee Name" className="input" required />
        <input name="basicSalary" value={formData.basicSalary} onChange={handleChange} type="number" step="0.01" placeholder="Basic Salary" className="input" required />
        <input name="totalDays" value={formData.totalDays} onChange={handleChange} type="number" placeholder="Total Days in Month" className="input" required />
        <input name="monthRange" value={formData.monthRange} onChange={handleChange} type="text" placeholder="Month Range (e.g., 10/05/2025 to 10/06/2025)" className="input" required />
        <input name="workingDays" value={formData.workingDays} onChange={handleChange} type="number" placeholder="Total Working Days" className="input" required />
        <input name="dr" value={formData.dr} onChange={handleChange} type="number" step="0.01" placeholder="DR (Deduction)" className="input" />
        <input name="pf" value={formData.pf} onChange={handleChange} type="number" step="0.01" placeholder="PF" className="input" />
        <input name="specialAllowance" value={formData.specialAllowance} onChange={handleChange} type="number" step="0.01" placeholder="Special Allowance" className="input" />
        <input name="professionalTax" value={formData.professionalTax} onChange={handleChange} type="number" step="0.01" placeholder="Professional Tax" className="input" />
        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Add Salary</button>
        </div>
      </form>
    </div>
  );
};

export default AddSalaryForm;


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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload matching server fields
    const salaryPayload = {
      empId: formData.empId,
      name: formData.name,
      basicSalary: parseFloat(formData.basicSalary) || 0,
      totalDays: parseInt(formData.totalDays, 10) || 0,
      monthRange: formData.monthRange,
      workingDays: parseInt(formData.workingDays, 10) || 0,
      dr: parseFloat(formData.dr) || 0,
      pf: parseFloat(formData.pf) || 0,
      specialAllowance: parseFloat(formData.specialAllowance) || 0,
      professionalTax: parseFloat(formData.professionalTax) || 0,
    };

    console.log("📝 Sending salaryPayload:", salaryPayload);

    try {
      const res = await fetch("http://localhost:8081/api/salaries", {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salaryPayload),
      });

      console.log("⚡️ Response status:", res.status);
      const text = await res.text();
      console.log("⚡️ Response body:", text);

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
        alert(`Failed to add salary (status ${res.status}): ${text}`);
      }
    } catch (err) {
      console.error("💥 Fetch error:", err);
      alert(`Network error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Salary</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          type="text"
          placeholder="Employee ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Employee Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="basicSalary"
          value={formData.basicSalary}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="Basic Salary"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="totalDays"
          value={formData.totalDays}
          onChange={handleChange}
          type="number"
          placeholder="Total Days in Month"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="monthRange"
          value={formData.monthRange}
          onChange={handleChange}
          type="text"
          placeholder="Month Range (e.g., 10/05/2025 to 10/06/2025)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="workingDays"
          value={formData.workingDays}
          onChange={handleChange}
          type="number"
          placeholder="Total Working Days"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          name="dr"
          value={formData.dr}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="DR (Deduction)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="pf"
          value={formData.pf}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="PF"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="specialAllowance"
          value={formData.specialAllowance}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="Special Allowance"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="professionalTax"
          value={formData.professionalTax}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="Professional Tax"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 shadow hover:shadow-lg transition"
          >
            Add Salary
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalaryForm;

import React, { useEffect, useState } from "react";

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSalary, setEditingSalary] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/salaries/getall");
        const data = await res.json();
        setSalaries(data);
      } catch (err) {
        console.error("Error fetching salaries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  const handleEditClick = (salary) => {
    setEditingSalary(salary);
    setEditAmount(salary.amount); // Pre-fill amount
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/salaries/update/${editingSalary.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: editAmount,
        }),
      });
  
      if (res.ok) {
        // Safely update amount only
        setSalaries((prev) =>
          prev.map((s) =>
            s.id === editingSalary.id ? { ...s, amount: editAmount } : s
          )
        );
        setEditingSalary(null);
      } else {
        console.error("Failed to update salary");
      }
    } catch (err) {
      console.error("Error updating salary:", err);
    }
  };
  
  const handleCancel = () => {
    setEditingSalary(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">All Salaries</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Employee ID</th>
                <th className="py-3 px-4 border-b">Month</th>
                <th className="py-3 px-4 border-b">Amount</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{salary.id}</td>
                  <td className="py-2 px-4 border-b">{salary.empId}</td>
                  <td className="py-2 px-4 border-b">{salary.month}</td>
                  <td className="py-2 px-4 border-b">
                    {editingSalary?.id === salary.id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="border rounded p-1 w-24"
                      />
                    ) : (
                      salary.amount
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingSalary?.id === salary.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditClick(salary)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalaryTable;

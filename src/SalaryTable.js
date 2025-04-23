import React, { useEffect, useState } from "react";

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

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
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{salary.id}</td>
                  <td className="py-2 px-4 border-b">{salary.empId}</td>
                  <td className="py-2 px-4 border-b">{salary.month}</td>
                  <td className="py-2 px-4 border-b">{salary.amount}</td>
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

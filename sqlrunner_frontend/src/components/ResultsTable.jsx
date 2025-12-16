const ResultsTable = ({ result }) => {
  if (result && result.error)
    return (
      <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4">
        ❌ {result.error}
      </div>
    );

  if (!result) return null;

  if (result.message)
    return (
      <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4">
        {result.message}
      </div>
    );

  const rows = Array.isArray(result.results) ? result.results : [];

  if (rows.length > 0) {
    const columns = Object.keys(rows[0]);

    return (
      <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="border px-3 py-2 text-left font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="border px-3 py-2">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-4 text-gray-500 italic">
      (Query executed successfully — no rows returned.)
    </div>
  );
};

export default ResultsTable;

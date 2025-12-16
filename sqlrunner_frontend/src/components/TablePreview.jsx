const TablePreview = ({ details }) => {
  if (!details) return null;

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Schema</h2>
      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Column Name</th>
            <th className="border px-3 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {details.columns.map((col, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">{col.name}</td>
              <td className="border px-3 py-2">{col.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-2">Sample Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {details.columns.map((col) => (
                <th key={col.name} className="border px-3 py-2 text-left font-medium">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {details.sample_data.map((row, idx) => (
              <tr key={idx}>
                {details.columns.map((col) => (
                  <td key={col.name} className="border px-3 py-2">
                    {row[col.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePreview;

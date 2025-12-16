const QueryHistory = ({ queries, onSelectQuery }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 border-b pb-2">Recent Queries</h2>
      <span className="text-sm text-gray-500">Click to use query again</span>
      <ul className="space-y-2 mt-2">
        {queries.map((query, index) => (
          <li
            key={index}
            onClick={() => onSelectQuery(query)}
            className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm"
            title={query}
          >
            {query.length > 50 ? `${query.substring(0, 50)}...` : query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;
import { useState } from "react";

const QueryInput = ({ onRunQuery }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRunQuery(query);
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your SQL query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Run Query
        </button>
      </form>
    </div>
  );
};

export default QueryInput;

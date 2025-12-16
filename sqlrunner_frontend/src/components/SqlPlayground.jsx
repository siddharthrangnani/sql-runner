import { useEffect, useState } from "react";
import { fetchTables, fetchTableDetails, runSqlQuery } from "../api/apiClient";
import QueryInput from "../components/QueryInput";
import Resultstable from "../components/ResultsTable";
import TablesPanel from "../components/TablesPanel";
import TablePreview from "../components/TablePreview";
const SqlPlayground = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableDetails, setTableDetails] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    const savedQueries = localStorage.getItem('sqlQueries');
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  useEffect(() => {
    fetchTables().then(setTables).catch(console.error);
  }, []);

  const handleSelectTable = async (table) => {
    setSelectedTable(table);
    try {
      const details = await fetchTableDetails(table);
      setTableDetails(details);
    } catch (err) {
      setError(`Failed to load table details. ${err}`);
    }
  };

const handleRunQuery = async (query) => {
  setLoading(true);
  setError("");
  setQueryResult(null);
  try {
    const result = await runSqlQuery(query);
    setQueryResult(result);
    const updatedTables = await fetchTables();
    setTables(updatedTables);
    
    const updatedQueries = [query, ...recentQueries.filter(q => q !== query)].slice(0, 10);
    setRecentQueries(updatedQueries);
    localStorage.setItem('sqlQueries', JSON.stringify(updatedQueries));
  } catch (err) {
    console.error(err);

    const detail = err.response?.data?.detail;
    if (typeof detail === "string") {
      setError(detail);
    } else if (Array.isArray(detail) && detail[0]?.msg) {
      setError(detail[0].msg);
    } else {
      setError("Something went wrong while running the query.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 min-h-screen">
  
      <div className="col-span-1">
        <TablesPanel
          tables={tables}
          onSelectTable={handleSelectTable}
          selectedTable={selectedTable}
          recentQueries={recentQueries}
          onSelectQuery={(query) => {
            const queryInputElement = document.querySelector('textarea');
            if (queryInputElement) {
              queryInputElement.value = query;
            }
          }}
        />
      </div>

      <div className="col-span-3">
        <QueryInput onRunQuery={handleRunQuery} loading={loading} />
<h2>Output:-</h2>
        <Resultstable result={queryResult} error={error} />
      </div>
      {tableDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          onClick={() => setTableDetails(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[85vh] overflow-auto relative pointer-events-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Table preview"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <button
              onClick={() => setTableDetails(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close preview"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Preview: {selectedTable || tableDetails.name}
              </h2>
              <TablePreview details={tableDetails} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SqlPlayground;

import React, { useState } from "react";
import { Badge } from "flowbite-react";
import { motion } from "framer-motion";
import useCrudLogs from "../hooks/useCrudLogs";
import moment from "moment";

const SystemLogsComponent = () => {
  const { data: logs } = useCrudLogs();
  const [sortedLogs, setSortedLogs] = useState(logs || []);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  // Function to sort logs by createdAt
  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedLogs].sort((a, b) => {
      if (newSortOrder === "asc") {
        return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
      } else {
        return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
      }
    });
    setSortedLogs(sorted);
    setSortOrder(newSortOrder);
  };

  // Sync logs from the hook when it updates
  React.useEffect(() => {
    setSortedLogs(logs);
  }, [logs]);

  return (
    <motion.div
      className="container mx-auto mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold">System Logs</h3>
          <button
            onClick={handleSort}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Sort by Date (
            {sortOrder === "asc" ? "Oldest First" : "Newest First"})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-md shadow-md">
            <thead>
              <tr className="text-white bg-gray-700">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Action</th>
                <th className="py-3 px-6 text-left">User</th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-white hover:bg-gray-700"
                >
                  <td className="py-3 px-6">
                    {moment(log.createdAt.toDate()).format("LLL")}
                  </td>
                  <td className="py-3 px-6">{log.label}</td>
                  <td className="py-3 px-6">{log.user.fullName}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemLogsComponent;

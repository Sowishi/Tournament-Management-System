import React from "react";
import { Badge } from "flowbite-react";
import { motion } from "framer-motion";
import useCrudLogs from "../hooks/useCrudLogs";
import moment from "moment";

// Dummy data for the logs

const SystemLogsComponent = () => {
  const { data: logs } = useCrudLogs();

  return (
    <motion.div
      className="container mx-auto mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold mb-4">System Logs</h3>

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
              {logs.map((log, index) => (
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

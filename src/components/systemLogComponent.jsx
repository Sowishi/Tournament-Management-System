import React, { useState } from "react";
import { Badge } from "flowbite-react";
import { motion } from "framer-motion";
import useCrudLogs from "../hooks/useCrudLogs";
import moment from "moment";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const SystemLogsComponent = () => {
  const { data: logs } = useCrudLogs();
  const [sortedLogs, setSortedLogs] = useState(logs || []);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync logs from the hook when it updates
  React.useEffect(() => {
    setSortedLogs(logs);
  }, [logs]);

  // Handle search
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setSortedLogs(logs);
    } else {
      const filteredLogs = logs.filter(
        (log) =>
          log.label.toLowerCase().includes(term) ||
          log.user.fullName.toLowerCase().includes(term) ||
          moment(log.createdAt.toDate())
            .format("LLL")
            .toLowerCase()
            .includes(term)
      );
      setSortedLogs(filteredLogs);
    }
  };

  // Define PDF document structure
  const LogsPDFDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>System Logs Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.header]}>Date</Text>
            <Text style={[styles.tableCol, styles.header]}>Action</Text>
            <Text style={[styles.tableCol, styles.header]}>User</Text>
          </View>
          {sortedLogs.map((log, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>
                {moment(log.createdAt.toDate()).format("LLL")}
              </Text>
              <Text style={styles.tableCol}>{log.label}</Text>
              <Text style={styles.tableCol}>{log.user.fullName}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

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
          <div className="flex space-x-4">
            <PDFDownloadLink
              document={<LogsPDFDocument />}
              fileName="system_logs_report.pdf"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Export PDF")}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
          />
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

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  tableCol: {
    flex: 1,
    paddingHorizontal: 5,
  },
  header: {
    fontWeight: "bold",
  },
});

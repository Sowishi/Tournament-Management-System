import SystemLogsComponent from "../components/systemLogComponent";
import useCrudLogs from "../hooks/useCrudLogs";
import AdminLayout from "../layout/adminLayout";

const SystemLog = () => {
  return (
    <AdminLayout>
      <SystemLogsComponent />
    </AdminLayout>
  );
};

export default SystemLog;

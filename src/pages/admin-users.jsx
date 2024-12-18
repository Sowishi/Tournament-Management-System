import { UsersTable } from "../components/usersTable";
import AdminLayout from "../layout/adminLayout";
import { useStore } from "../zustand/store";

const AdminUsers = () => {
  const { currentEvent } = useStore();
  return (
    <AdminLayout>
      <div className="container mx-auto p-5 mt-10 ">
        <h1 className="text-white text-4xl font-bold">
          All Users of{" "}
          <span className="text-blue-500 font-bold">
            {currentEvent?.eventName}
          </span>
        </h1>
        <UsersTable />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

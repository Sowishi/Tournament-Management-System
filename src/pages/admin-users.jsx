import { UsersTable } from "../components/usersTable";
import AdminLayout from "../layout/adminLayout";

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto p-5 mt-10 ">
        <h1 className="text-white text-4xl font-bold">All Users</h1>
        <UsersTable />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

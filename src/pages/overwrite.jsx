import AdminLayout from "../layout/adminLayout";
import Title from "../components/title";
import { TallyTable } from "../components/tallyTable";
import { TallyTableAdmin } from "../components/tallyTableAdmin";

const Tally = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-10 p-5">
        <h1 className="text-white font-bold text-4xl mb-5">System Overwrite</h1>

        <TallyTableAdmin />
      </div>
    </AdminLayout>
  );
};

export default Tally;

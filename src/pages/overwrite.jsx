import React, { useState } from "react";
import AdminLayout from "../layout/adminLayout";
import { Button, Modal, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

const Overwrite = () => {
  // State for managing tally items
  const [tally, setTally] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", value: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update tally item
  const handleSubmit = () => {
    if (isEditing) {
      setTally(
        tally.map((item) =>
          item.id === formData.id ? { ...item, ...formData } : item
        )
      );
      toast.success("Tally updated successfully!");
    } else {
      setTally([...tally, { ...formData, id: Date.now() }]);
      toast.success("Tally added successfully!");
    }
    setFormData({ id: null, name: "", value: "" });
    setIsModalOpen(false);
    setIsEditing(false);
  };

  // Open modal for editing
  const handleEdit = (id) => {
    const item = tally.find((item) => item.id === id);
    setFormData(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Delete tally item
  const handleDelete = (id) => {
    setTally(tally.filter((item) => item.id !== id));
    toast.success("Tally deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">System Overwriting</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Tally</Button>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tally.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.value}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    size="xs"
                    className="mr-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <Modal.Header>
          {isEditing ? "Edit Tally" : "Add New Tally"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Add"}</Button>
          <Button color="light" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Overwrite;

import React, { useState } from "react";

const AddServiceModal = ({ isOpen, onClose, onAddService }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddService = () => {
    // Add your logic to send the service data to your API or update the state
    const newService = {
      serviceName,
      description,
    };

    onAddService(newService);

    // Clear the input fields and close the modal
    setServiceName("");
    setDescription("");
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Service Name
          </label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
           Image
          </label>
          <input
            type="file"
            className="w-full border rounded p-2"
            accept="image*"
            
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2 h-20 resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAddService}
          >
            Add
          </button>
          <button
            className="ml-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;

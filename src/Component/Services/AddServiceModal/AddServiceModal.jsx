import React, { useState } from "react";
import uploadImage from "../../../utils/UploadImage";

const AddServiceModal = ({ isOpen, onClose }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // // Optionally, you can display a preview of the selected image
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   // Set a preview image if needed
    //   // setPreviewImage(reader.result);
    // };
    // reader.readAsDataURL(file);
  };
  const handleAdd = async () => {
    setLoading(true);
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const imageUrl = await uploadImage(image);

      fetch(`${import.meta.env.VITE_SERVER_KEY}/service/add`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ serviceName, description, image: imageUrl }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            alert("Success");
            onClose()
           
            setLoading(false);
          }
        });
    } catch (error) {
      // Handle the error as needed
      console.error("Error in handleImageUpload:", error);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center`}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">+Add New Service</h2>
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
            onChange={handleImageChange}
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
            onClick={handleAdd}
          >
           {Loading ?"Loading...":"Add"}
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

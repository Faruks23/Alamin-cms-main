import React, { useState } from "react";
import uploadImage from "../../../utils/UploadImage";
import { CgLaptop } from "react-icons/cg";

const AddAccount = ({ isAddModal, setIsAddModal, setUpdated }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleAdd = async () => {
    setLoading(true);
    

    try {
      

      fetch(`${import.meta.env.VITE_SERVER_KEY}/Social/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, link, }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            alert("Success");
            setIsAddModal(false);
            setUpdated(data.insertedId);
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
        isAddModal ? "block" : "hidden"
      } fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center`}
    >
      {/* Add your modal content here */}
      <div className="bg-gray-800 rounded-md p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Add Social Account</h2>
        <label className="block mb-2">Name:</label>
        <input
          className="w-full bg-gray-700 p-2 shadow-md rounded-md mb-4"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block mb-2">Link:</label>
        <input
          className="w-full p-2 shadow-md bg-gray-700 rounded-md mb-4"
          type="text"
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleAdd()}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsAddModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;

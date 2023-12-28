import React, { useState } from "react";
import uploadImage from "../../../utils/UploadImage";
import { CgLaptop } from "react-icons/cg";

const AddMember = ({ isAddModal, setIsAddModal, setUpdated }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
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
  console.log(name, link, image);

  const handleAdd = async () => {
    setLoading(true);
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const imageUrl = await uploadImage(image);

      fetch(`${import.meta.env.VITE_URL_KEY}/Social/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, link, image: imageUrl }),
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
        <label className="block mb-2">Image:</label>
        <input
          className="w-full bg-gray-700 p-2 shadow-md rounded-md mb-4"
          type="file"
          onChange={handleImageChange}
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

export default AddMember;

import React, { useState } from "react";
import uploadImage from "../../../utils/UploadImage";

const UpdateProject = ({ isOpen, service, closeModal, PrevData, setData }) => {
  const [name, setName] = useState(service?.ProjectName);
  const [description, setDescription] = useState(service?.description);
  const [image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSave = async () => {


    try {
       

    setLoading(true);
    const id = service._id;
    let imageUrl;
    if (image) {
      imageUrl = await uploadImage(image);
    }
    let imageLink = imageUrl ? imageUrl : service?.image;

    const newService = { name, description, image: imageLink };

    fetch(`${import.meta.env.VITE_SERVER_KEY}/Project/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const remaining = PrevData.filter((item) => item._id !== id);
        setData(remaining);
        alert("updated service", data);
        setLoading(false);
        closeModal();
      });
      
     } catch (error) {
       setLoading(false)
     }

  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className=" bg-gray-900 text-white rounded-lg p-4 max-w-md w-full  shadow-xl">
          <h2 className="text-2xl font-bold mb-4 uppercase">Update Project</h2>
          <label htmlFor="" className="font-bold  my-2">
            Name:
          </label>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 bg-gray-800 p-2  shadow-md rounded mb-2"
          />
          <label htmlFor="" className="font-bold  my-2">
            Description:
          </label>
          <textarea
            placeholder="Service Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-2 shadow-md bg-gray-800 rounded mb-2"
          />
          <label htmlFor="" className="font-bold  my-4">
            Image Link:
          </label>
          <input
            type="file"
            className="w-full shadow-md bg-gray-800 p-2  rounded mb-4"
            onChange={handleImageChange}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
            { Loading ?"Loading...":'Save'}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;

import React, { useEffect, useState } from "react";
import uploadImage from "../../utils/UploadImage";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import AddMember from "./AddMember/AddMember";

const Team = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);


  const fetchTeamMembers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_KEY}/team/members`
    );
    const data = await response.json();
    console.log(data);
    setMembers(data);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);


  console.log(members);







  const handleEditClick = (account) => {
    setEditData(account);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const imageUrl = await uploadImage(image);
    if (editData && imageUrl) {
      fetch(`${import.meta.env.VITE_URL_KEY}/Social/update/${editData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ editData, images: imageUrl }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Close the modal
          setIsModalOpen(false);
          fetchSocialAccounts();
          setLoading(false);
          console.log(data);
        });
    }
  };

  const handleDeleteClick = (id) => {
    setAccountId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    //  handle delete account
    setLoading(true);
    if (id) {
      fetch(`${import.meta.env.VITE_URL_KEY}/Social/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          setIsDeleteModalOpen(false);
          const remaining = socialAccounts.filter((item) => item._id !== id);
          setSocialAccounts(remaining);
        });
    }

    // Optionally, you can fetch the updated social accounts after deletion
    // and update the state to reflect the changes
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
  };

  // add new account to the

  const handleAddAccount = () => {
    setIsAddModal(true);
  };

  return (
    <div className="text-white">
      <div className="flex items-center  justify-between my-5 font-bold ">
        <h1 className=" text-2xl">Team</h1>
        <h1
          onClick={handleAddAccount}
          className=" hover:text-green-500  hover:underline cursor-pointer text-xl uppercase"
        >
          Add Member
        </h1>
      </div>

      <div className="flex justify-center">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {members.map((member) => {
            return (
              <div
                key={member._id}
                className=" bg-gray-900 w-full p-4 rounded-md shadow-md"
              >
                <div className="imag my-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={member?.image}
                    alt=""
                  />
                </div>
                <div className="info mt-3 text-sm">
                  <h1 className="mt-1">Name:{member.name}</h1>
                  <h1 className="">Email:{member.email}</h1>
                  <h1 className="my-1">Role:{member.role}</h1>
                </div>

                <div className=" mt-5 flex  justify-between">
                  <button
                    className=" btn btn-sm"
                    onClick={() => handleEditClick(member)}
                  >
                    <FaUserEdit></FaUserEdit>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDeleteClick(member._id)}
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {
        <AddMember
        
          isAddModal={isAddModal}
          setIsAddModal={setIsAddModal}
        ></AddMember>
      }
      {/* update modal */}
      {isModalOpen && (
        <div
          className={`${
            isModalOpen ? "block" : "hidden"
          } fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center`}
        >
          {/* Add your modal content here */}
          <div className="bg-gray-800 rounded-md p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Edit Social Account</h2>
            <label className="block mb-2">Name:</label>
            <input
              className="w-full bg-gray-700 p-2 shadow-md rounded-md mb-4"
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <label className="block mb-2">Image:</label>
            <input
              className="w-full bg-gray-700 p-2 shadow-md rounded-md mb-4"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="block mb-2">Link:</label>
            <input
              className="w-full p-2 shadow-md bg-gray-700 rounded-md mb-4"
              type="text"
              value={editData.link}
              onChange={(e) =>
                setEditData({ ...editData, link: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleUpdate(editData)}
              >
                {loading ? "Updating...." : "Update"}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* delete confirm modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          {/* Delete Confirmation Modal */}
          <div className="bg-gray-800 rounded-md p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the account?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleConfirmDelete}
              >
                {loading ? "Loading..." : " Confirm"}
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;

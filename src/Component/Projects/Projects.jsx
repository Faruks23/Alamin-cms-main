import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FiEdit } from "react-icons/fi";
import AddProjectModal from "./AddProject/AddProject";
import UpdateProject from "./UpdateProject/UpdateProject";
const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [selectedService, setSelectedService] = useState([]);
  const [deleteService, setDeleteService] = useState([]);

  const openModal = (id) => {
    const service = data.find((item) => item._id === id);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Project = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_KEY}/Project`);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    Project();
  }, []);

  // console.log(import.meta.env.VITE_URL_KEY);
  // console.log(data);
  // console.log(data);
  // update services
  // const [edit,setEdit]=useState(false)
  // const handleEdit = (id) => {
  //     setIsModalOpen(true);

  //  }
  //

  console.log(data);
  const handleSelected = (id) => {
    if (deleteService.includes(id)) {
      const select = deleteService.filter((serviceId) => serviceId !== id);
      setDeleteService(select);
    } else {
      const newService = [...deleteService, id];
      setDeleteService(newService);
    }
  };

  // unselect all services

  const handleUnselectAll = () => {
    setDeleteService([]);
  };

  const deleteSelectedServices = () => {
    if (deleteService.length > 0) {
      const serviceIds = deleteService;
      const service = { selectedService: serviceIds };

      fetch(`${import.meta.env.VITE_SERVER_KEY}/project/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("respons", response);
          if (response.deletedCount > 0) {
            setData((prevState) =>
              prevState.filter((service) => !serviceIds.includes(service._id))
            );
            setDeleteService([]);
          }
        });
    }
  };

  // add service functionality

  const [isServiceModalOpen, setServiceModalOpen] = useState(false);

  const isOpenModal = () => {
    setServiceModalOpen(true);
  };

  const isCloseModal = () => {
    setServiceModalOpen(false);
  };

  return (
    <div className="container mx-auto py-10 relative ">
      <div className=" z-10 fixed  flex justify-between items-center  mb-5   h-[40px] right-2  w-full">
        <h1 className="text-2xl font-bold font-serif pl-3 md:pl-[310px] text-white">
          {deleteService.length > 0 ? (
            <>
              <input
                className="w-5 h-5"
                type="checkbox"
                checked={deleteService.length > 0}
                name=""
                id=""
                onChange={handleUnselectAll}
              />{" "}
              <span>{deleteService.length}</span> Projects Selected
            </>
          ) : (
            <>Projects</>
          )}
        </h1>
        <div className="flex gap-4">
          {deleteService.length > 0 && (
            <>
              <button
                onClick={deleteSelectedServices}
                className="btn btn-sm bg-red-600"
              >
                Delete
              </button>
            </>
          )}
          <button onClick={isOpenModal} className=" btn btn-sm bg-blue-500">
            + Add Project
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        {loading ? (
          <>
            <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
              {load.map((item, index) => {
                return (
                  <>
                    <Loader key={index}></Loader>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
              {data.map((Project) => {
                return (
                  <>
                    <div
                      key={Project._id}
                      className={`md:w-[350px] ${
                        deleteService.includes(Project._id)
                          ? "border-red-500  bg-gray-100 text-black"
                          : ""
                      } bg-gray-900 text-white  w-full h-[200px] shadow-lg flex  rounded-md relative`}
                    >
                      <div className=" p-4 ">
                        <img
                          src={Project.image}
                          alt="image"
                          loading="lazy"
                          className="w-16 h-16 border rounded-full"
                        />
                      </div>

                      <div className=" px-4">
                        <h2 className={` font-bold p-2 `}>
                          {Project?.ProjectName}
                        </h2>
                        <p className={` p-2 `}>
                          {Project.description.slice(0, 50)}....
                        </p>
                        <div className=" mt-5   absolute bottom-3 right-2 ">
                          <button
                            onClick={() => openModal(Project._id)}
                            className="btn btn-sm bg-blue-500"
                          >
                            <FiEdit></FiEdit>
                          </button>
                        </div>
                      </div>

                      <div className=" absolute right-3 top-2">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer"
                          name=""
                          id=""
                          checked={deleteService.includes(Project._id)}
                          onChange={() => handleSelected(Project._id)}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <UpdateProject
          isOpen={isModalOpen}
          // onClose={() => setIsModalOpen(true)}
          service={selectedService}
          PrevData={data}
          setData={setData}
          closeModal={closeModal}
        
        />
      )}

      {isServiceModalOpen && (
        <>
          <AddProjectModal
            Project={Project}
            isOpen={isOpenModal}
            onClose={isCloseModal}
          />
        </>
      )}
    </div>
  );
};

export default Project;

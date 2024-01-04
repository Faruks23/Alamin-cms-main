import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FiEdit } from "react-icons/fi";
import ServiceModal from "./ServicesUPdateModal/ServiceUpdateModal";
import axios from "axios";
import AddServiceModal from "./AddServiceModal/AddServiceModal";
const Services = () => {
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

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_KEY}/services`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  console.log(data);

  // console.log(import.meta.env.VITE_URL_KEY);
  // console.log(data);
  // console.log(data);
  // update services
  // const [edit,setEdit]=useState(false)
  // const handleEdit = (id) => {
  //     setIsModalOpen(true);

  //  }
  //

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
    setDeleteService([])
  }


  const deleteSelectedServices = () => {
    if (deleteService.length > 0) {
      const serviceIds = deleteService;
      const service = { selectedService: serviceIds };

      fetch(`${import.meta.env.VITE_SERVER_KEY}/service/delete`, {
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
   const [services, setServices] = useState([]); // Your services state

   const isOpenModal = () => {
     setServiceModalOpen(true);
   };

   const isCloseModal = () => {
     setServiceModalOpen(false);
   };

   const addService = (newService) => {
     // Add your logic to update the services state or send the data to your API
     setServices([...services, newService]);
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
              <span >{deleteService.length}</span> Services Selected
            </>
          ) : (
            <>Services</>
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
            Add Services
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
                    <Loader key={item}></Loader>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
              {data.map((item) => {
                return (
                  <>
                    <div
                      key={item._id}
                      className={`md:w-[350px] ${
                        deleteService.includes(item._id)
                          ? "border-red-500  bg-gray-100 text-black"
                          : ""
                      } bg-gray-900 text-white  w-full h-[200px] shadow-lg flex  rounded-md relative`}
                    >
                      <div className=" p-4 ">
                        <img
                          src={item?.imageLink}
                          alt="image"
                          loading="lazy"
                          className="w-full h-16 border"
                        />
                      </div>

                      <div className=" px-4">
                        <h2 className={` font-bold p-2 `}>
                          {item?.service}
                        </h2>
                        <p className={` p-2 `}>
                          {item.description.slice(0, 50)}....
                        </p>
                        <div className=" mt-5  relative">
                          <button
                            onClick={() => openModal(item._id)}
                            className="btn btn-sm absolute bottom-[-40px] right-0 bg-blue-500"
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
                          checked={deleteService.includes(item._id)}
                          onChange={() => handleSelected(item._id)}
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
        <ServiceModal
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
          <AddServiceModal
            isOpen={isOpenModal}
            onClose={isCloseModal}
            onAddService={addService}
          />
        </>
      )}
    </div>
  );
};

export default Services;

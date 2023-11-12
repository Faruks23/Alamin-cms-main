import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import useUser from "../Hooks/useUser";
const MenageUser = () => {
   const [users, loading, refetch]=useUser()
  // const [users, setUsers] = useState([])
  


  // /users/admin
  const handleMakeAdmin = (id) => {
    console.log(id);
    fetch(
      `https://b7a12-summer-camp-server-side-faruks23.vercel.app/users/admin/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Make Admin  successfully");
        refetch();
      });
  };


  // Delete the user from  db
  const handleDelete = (id) => {
    // DeleteUsers
    fetch(
      `https://b7a12-summer-camp-server-side-faruks23.vercel.app/users/DeleteUsers/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User Delete successfully");
        refetch();
      });
  };

  return (
    <div className="h-[100vh] ">
     
      <div className="">
        <div className="overflow-x-auto">
          <table className="table border shadow-xl w-full">
            {/* head */}
            <thead>
              <tr>
                <th>NO:</th>
                <th>Name</th>
                <th>Email</th>
                <td>Promote: admin</td>

                <th>Role</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="font-serif">
              {/* row 2 */}
              {users.map((user, index) => {
                return (
                  <tr key={user._id} className="hover">
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {" "}
                   
                      <button
                        disabled={user?.disabled}
                        onClick={() => handleMakeAdmin(user._id)}
                        className={` ${
                          user.disabled ? "bg-slate-300" : " bg-blue-500"
                        }
                               p-1 shadow-md  rounded-md cursor-pointer text-white`}
                      >
                        {" "}
                        Make Admin
                      </button>
                    </td>
                    <td>{user?.role ? <p>{user.role}</p> : "Student"}</td>
                    <td>
                      {" "}
                      <span onClick={() => handleDelete(user._id)}>
                        <FaTrashAlt className="text-blue-500 w-6 h-6 cursor-pointer"></FaTrashAlt>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenageUser;

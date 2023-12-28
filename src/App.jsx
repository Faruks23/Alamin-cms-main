import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { AiOutlineMenuUnfold, AiFillCloseSquare } from "react-icons/ai";
import { FaHome, FaTeamspeak, FaUserEdit } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { MdNoAccounts, MdReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
function App() {
  const [open, setOpen] = useState(false)
 
  const handleMenuOpen = () => {
    setOpen(true)
  }

  const handleCloseMenu = () => {
     setOpen(false)
   }

  return (
    <>
      {" "}
      <div className="min-h-screen bg-black  flex relative">
        {/* Sidebar */}
        <div
          className={`md:w-64 w-[170px]  rounded-tr-md  p-3 fixed left-0 top-[60px] ${
            open ? "flex transition-all duration-500" : "hidden"
          }   md:flex bg-black  shadow h-[100vh]  z-20`}
        >
          {/* Your sidebar content goes here */}
          <ul className="text-white capitalize font-semibold flex flex-col gap-3  mt-5">
            <li className="flex  items-center gap-2">
              <FaHome className="w-5 h-5"></FaHome> <Link to={"/"}> Home</Link>
            </li>
            
            <li className="flex  items-center gap-2">
              <GoProjectSymlink className="w-5 h-5"></GoProjectSymlink>
              <Link to={"/projects"}>Project</Link>
            </li>
            <li className="flex  items-center gap-2">
              <GoProjectSymlink className="w-5 h-5"></GoProjectSymlink>
              <Link to={"/services"}>Services</Link>
            </li>
            <li className="flex  items-center gap-2">
              <MdReviews className="w-5 h-5"></MdReviews>
              <Link to={"/review"}>Review</Link>
            </li>
            <li className="flex  items-center gap-2">
              <MdNoAccounts className="w-5 h-5"></MdNoAccounts>
              <Link to={"/social"}>Social</Link>
            </li>
            <li className="flex  items-center gap-2">
              <FaTeamspeak className="w-5 h-5"></FaTeamspeak>
              <Link to={"/Team"}>Team</Link>
            </li>
          </ul>

          <ul className="text-white capitalize font-semibold flex flex-col gap-3 absolute bottom-20  ">
            <li className="flex  items-center gap-2">
              <CgProfile className="w-5 h-5"></CgProfile>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li className="flex  items-center gap-2">
              <BiLogOutCircle className="w-5 h-5"></BiLogOutCircle>
              <Link to={"/logout"}>LogOut</Link>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}

          <header className="w-full fixed top-0 z-20  shadow-md  bg-[#1F2937] h-[60px] text-white flex items-center  justify-between cursor-pointer px-[3%]">
            <div className="content  ">
              {open ? (
                <>
                  <div onClick={handleCloseMenu} className="close md:hidden">
                    <AiFillCloseSquare className="w-10 h-10"></AiFillCloseSquare>
                  </div>
                </>
              ) : (
                <>
                  <div onClick={handleMenuOpen} className="open md:hidden ">
                    <AiOutlineMenuUnfold className="w-10 h-10"></AiOutlineMenuUnfold>
                  </div>
                </>
              )}
            </div>
            <div className=" flex  justify-end">
              <ul className="text-white capitalize font-semibold flex   gap-3     ">
                <li className="flex  items-center gap-2">
                  <CgProfile className="w-5 h-5"></CgProfile>
                  <Link>Profile</Link>
                </li>
                <li className="flex  items-center gap-2">
                  <BiLogOutCircle className="w-5 h-5"></BiLogOutCircle>
                  <Link>LogOut</Link>
                </li>
              </ul>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-5 md:ml-[255px] shadow-md bg-gray-800  mt-11">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  );
}

export default App

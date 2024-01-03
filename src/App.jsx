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
  


  const link = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "project",
      path: "/projects",
      icon: GoProjectSymlink,
    },
    {
      name: "Services",
      path: "/services",
      icon: GoProjectSymlink,
    },
    {
      name: "Review",
      path: "/review",
      icon: MdReviews,
    },
    {
      name: "Social",
      path: "/social",
      icon: MdNoAccounts,
    },
    {
      name: "Teams",
      path: "/Team",
      icon: FaTeamspeak,
    },
  ];

  return (
    <>
      {" "}
      <div className="min-h-screen  bg-[#111827] flex relative">
        {/* Sidebar */}

        <div
          className={`md:w-64 w-[170px]   rounded-tr-md  p-5 fixed left-0 top-[60px] ${
            open
              ? "flex transition-all duration-500"
              : "w-0 opacity-0 md:opacity-100  transition-all duration-500 "
          }   md:flex w-[300px] bg-[#111827] shadow h-[100vh]  z-20`}
        >
          {/* Your sidebar content goes here */}
          <ul className="text-white capitalize font-serif font-bold flex flex-col gap-3  mt-5 w-full">
            {link.map((item) => {
              return (
                <>
                  <Link to={item.path}>
                    <li className="flex bg-slate-800  items-center gap-2 p-2 w-full rounded-lg shadow-lg hover:bg-slate-950 hover:ml-2 transition-all duration-500 ">
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </li>
                  </Link>
                </>
              );
            })}
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
            <div className="content flex items-center ga-5  ">
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

              <Link to={"https://alaminislam.netlify.app/"}>

              <h1 className=" font-bold underline text-white hover:text-blue-400 hover:underline-offset-4 text-2xl md:ml-0 ml-10">
                Live Preview
              </h1>
              </Link>
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

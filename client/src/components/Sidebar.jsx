import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {
  FiUser,

} from 'react-icons/fi';

import {FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../data/Surge-logos_transparent.png';

import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 transition duration-300 ease-in-out';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/feed"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mr-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={logo} alt="logo" />
            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10 ">
            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Social {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/feed"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                // backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize text-gray-900 dark:text-gray-200">Main Feed</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/feed"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                // backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaRegMoneyBillAlt /> {/*  icon  */}
              <span className="capitalize text-gray-900 dark:text-gray-200">Find People</span> {/*  link name  */}
            </NavLink>

            {/*  menu ---------------------------------------------------------------------------------- menu  */}
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Marketplace {/*  menu name  */}
            </p>
            
            <NavLink
              to="/feed"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaRegMoneyBillAlt /> {/*  icon  */}
              <span className="capitalize ">Upgrade to Premium</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/#"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaRegMoneyBillAlt /> {/*  icon  */}
              <span className="capitalize ">Social Market</span> {/*  link name  */}
            </NavLink>
          </div>

          <div id="dropdown-cta" class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900 mr-4" role="alert">
         <div class="flex items-center mb-3">
            <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
         </div>
         <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
            This web application acts as a prototype for the assessment required by Surge Global. Created by Devindu Samarasinghe
         </p>
         <a class="text-sm text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="https://www.linkedin.com/in/devindusamarasinghe/">Contact</a>
      </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

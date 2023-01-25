import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {
  FiUser,
  FiCalendar,
  FiBarChart,
  FiUsers,
  FiFileText,
  FiTool,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiGift,
} from 'react-icons/fi';
import { GiSewingMachine, GiSteeringWheel } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import {
  TbBuildingWarehouse,
  TbTruckDelivery,
  TbReportMoney,
  TbBuildingFactory2,
} from 'react-icons/tb';
import { FaHouseDamage, FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import logo from '../data/Surge-logos.jpeg';

import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };


  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-700"
            >
              <img  className=" rounded-full h-40 w-30 bg-clip-padding m-8 " src={logo} alt="logo " />
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
            <p screenSize className="text-gray-400 dark:text-gray-400 uppercase cent bg-clip-padding m-8 align-super text-opacity-50 text-xs 10px">
              Prototype by Devindu Samarasinghe {/*  menu name  */}
            </p>

            {/*  links ---------------------------------------------------------------------------------- links  */}

           
            {/*  done ---------------------------------------------------------------------------------- done  */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

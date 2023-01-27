import React, {useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import KG from '../data/KG.png';
import jwtDecode from "jwt-decode";

let logUser;
if(localStorage.token){
    //console.log("Do we have the data?")
    const jwt = JSON.parse(localStorage.getItem('token'));
    logUser = jwtDecode(jwt);
    
}

const UserProfile = () => {
  const { currentColor } = useStateContext();

  //const navigate = useNavigate();


  const [user,setUser] = useState(logUser);
  //console.log("Value :" + JSON.stringify(user.username));
  let value = JSON.stringify(user.username);
  value = value.replace(/"/g,'');
  const username = value;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location("/");
  };

  //const user = JSON.parse(localStorage.getItem('token'));
  //console.log(JSON.stringify(user));

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={KG}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200 text-transform: capitalize">
            {user.username}
            {/* Michael Roberts */}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.name}
            {/* Administrator */}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user.email}
            {/* admin@lmc.lk */}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <button
          className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import jwtDecode from "jwt-decode";

let logUser;
if(localStorage.token){
    //console.log("Do we have the data?")
    const jwt = JSON.parse(localStorage.getItem('token'));
    logUser = jwtDecode(jwt);
    
}

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, themeSetting,setThemeSettings } = useStateContext();

  
  //const [username, setUsername] = useState();
  const [title,setTitle] = useState();
  const [beforePost,setPost] = useState({myFile:""});

  const [user,setUser] = useState(logUser);
  //console.log("Value :" + JSON.stringify(user.username));
  let value = JSON.stringify(user.username);
  value = value.replace(/"/g,'');
  const username = value;

  //console.log("Passed Down Value " + username);
  

  const likes = 0;
  const postedDate = new Date().toISOString().split('T')[0];

  const navigate = useNavigate(); //cerating navigation methods

  useEffect(()=>{

  },[]);

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="overflow-auto float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-94">
        <div className="flex justify-between items-center p-5">
          <p className="items-centerfont-semibold text-lg">Upload Photo and Preferences</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>

        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === 'Light'}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              className="cursor-pointer"
              checked={currentMode === 'Dark'}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Upload Photo</p>
          <div className="flex gap-3">

          <div>
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                            {/* <Header category="" title="Create Your Post" /> */}
                            
                            <div className=" flex items-center justify-center">
                                <form onSubmit={async(e)=>{
                                    e.preventDefault();
                                    const post = await convertToBase64(beforePost);
                                    const newPost = {
                                        title,
                                        post,
                                        username,
                                        postedDate,
                                        likes
                                    }
                                    //console.log(newPost)
                                    await axios.post("http://localhost:8060/createPost",newPost).then((res)=>{
                                        alert("Data Saved Successfully!");
                                        window.location("/feed");
                                    }).catch((err)=>{
                                        console.log(err);
                                        alert(err);
                                    })
                                }}>


                                
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" onChange={async (e)=>{
                                        setPost(e.target.files[0]);
                                        //console.log(beforePost);
                                    }}/>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label for="message" class="block w-800 mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a caption</label>
                                        <textarea id="message" 
                                        rows="4" 
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Write your thoughts here."
                                        onChange={async (e)=>{
                                            setTitle(e.target.value);
                                            }}>
                                        </textarea>
                                </div>
                                <button type="submit" className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600">Upload Post</button>
                            </form>
                            </div>
                        </div>
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

function convertToBase64(file){
  return new Promise((resolve,reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
          resolve(fileReader.result)
      };
      fileReader.onerror = (error)=>{
          reject(error);
      }
  })
}

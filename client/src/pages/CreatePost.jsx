import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
//most of the contexts are yet to come into the template here 

//Dark mode  || Light mode settings 

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import {Header,Footer,ThemeSettings,Sidebar} from "../components";
import { useNavigate } from 'react-router-dom';
import add from "../data/add.png";


const UploadPost = () =>{
    const {setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor,themeSettings, setThemeSettings} = useStateContext();
  //  const [Post,setPost] = useState([]);

    //react hook useState for each variable 

    const [username, setUsername] = useState();
    const [title,setTitle] = useState();
    const [beforePost,setPost] = useState({myFile:""});


    

    const likes = 0;
    const postedDate = new Date().toISOString().split('T')[0];

    const navigate = useNavigate(); //cerating navigation methods

    useEffect(()=>{

        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if(currentThemeColor && currentThemeMode){
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    },[]);

    return (
        <div>
            <div className={currentMode === 'Dark' ? 'dark' : ''}>
                <div className='flex relative dark:bg-main-dark-bg'>

                    {/* Theme Sttings Button */}
                    <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
                        <TooltipComponent content="Settings" position="Bottom">
                            <button
                                type='button' onClick={()=>setThemeSettings(true)}
                                style={{ background: currentColor, borderRadius: '50%' }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                {/* Applying Emoji */}
                                <FiSettings/>   
                            </button>
                        </TooltipComponent>
                    </div>
                    {activeMenu ? ( // SIDEBAR IMPLEMENTATION
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}
                    {/* Main Background Implementation */}

                    <div className= {
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }>

                        {/* Navbar Implementation has to be redone  */}

                        {/* Complete your Content */}
                        <div>
                            {themeSettings && <ThemeSettings />}
                            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                            <Header category="" title="Create Your Post" />
                            
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
                                    console.log(newPost)
                                    await axios.post("http://localhost:8060/feed/createPost",newPost).then((res)=>{
                                        alert("Data Saved Successfully!");
                                        navigate("/");
                                    }).catch((err)=>{
                                        console.log(err);
                                        alert(err);
                                    })
                                }}>

                                <div className="mb-3">
                                    <label for="employeeNumber" className="form-label">Username(Tentative):</label>
                                    <input type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                    id="username" placeholder="Enter the Username" 
                                    title= {"The Employee Number requires a 4 digit number"} value={username} required 
                                    onChange={(e)=>{
                                    setUsername(e.target.value);
                                    }}/>
                                </div>
                                
                                <div className="mb-3">
                                <label htmlFor='picture' >
                                    <img className='rounded-full h-24 w-24' src={add}>
                                    </img>
                                </label>
                               
                                    <label for="picture" className="form-label">Post</label>
                                    <input type="file"  
                                    id='picture'
                                    className=' align-middle'
                                    name='newPost'
                                    accept='.jpeg, .png, .jpg' hidden onChange={async (e)=>{
                                        setPost(e.target.files[0]);
                                        console.log(beforePost);
                                    }}/>

                                </div>

                                <div className="mb-3">
                                    <label for="caption" className="form-label">Caption:</label>
                                    <textarea type="text" className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black" 
                                    id="title" placeholder="Enter the caption" 
                                    title= {"The Employee Number requires a 4 digit number"}  required 
                                    onChange={async (e)=>{
                                    setTitle(e.target.value);
                                   // console.log(base64);
                                    }}/>
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
    )
}

export default UploadPost;

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

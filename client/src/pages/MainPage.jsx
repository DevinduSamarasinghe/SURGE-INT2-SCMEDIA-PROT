import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
//most of the contexts are yet to come into the template here 

//Dark mode  || Light mode settings 

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import {Header,Sidebar,ThemeSettings} from "../components";


const MainPage = () =>{
    const {setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor,themeSettings, setThemeSettings} = useStateContext();
    const [Post,setPost] = useState([]);


    // Calling Axios

     const getPosts = async()=>{
        await axios.get('http://localhost:8060/feed').then((res)=>{
            setPost(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    useEffect(()=>{
        getPosts();

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
                             <Header category="Hello" title="Main Feed" />
                            {Post.map((data,key)=>{
                                return(
                                    <div key={key}>
                                    <div className='bg-main-bg dark:bg-main-dark-bg rounded-3xl p-5 m-5'>
                                        <h1 className="text-2xl font-bold" >{Post.username}</h1>
                                        <div className="text-md ml-12 pt-5">
                                            <div className='p-1'><span className='font-bold'>Username: </span> :{data.username} </div>
                                            <div className='p-1'><span className='font-bold'>Title:</span> :{data.title} </div>
                                            <div className='p-1'>
                                                <img className= ' rounded-full h-40 w-30 bg-clip-padding m-8 ' src={data.post}></img>
                                                <span className='font-bold'>post:</span> :{data.post} </div>
                                            <div className='p-1'><span className='font-bold'>PostedDate: </span> :{data.postedDate} </div>
                                            <div className='p-1'><span className='font-bold'>likes: </span> :{data.likes} </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;


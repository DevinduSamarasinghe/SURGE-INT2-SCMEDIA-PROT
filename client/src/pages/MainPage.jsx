import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {BiLike} from 'react-icons/bi';
import {RiImageAddLine} from 'react-icons/ri';
import {Header,Sidebar,ThemeSettings,Navbar,Footer} from "../components";
import jwtDecode from "jwt-decode";


let logUser;
if(localStorage.token){
    console.log("Do we have the data?")
    const jwt = JSON.parse(localStorage.getItem('token'));
    logUser = jwtDecode(jwt);
    
}

const MainPage = () =>{
    const {setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor,themeSettings, setThemeSettings} = useStateContext();
    const [Post,setPost] = useState([]);

    const [user,setUser] = useState(logUser);
    let username = JSON.stringify(user.username);
    username = username.replace(/"/g,'');
    
    useEffect(()=>{

    })

    // Calling Axios
     const getPosts = async()=>{
        await axios.get('http://localhost:8060/feed').then((res)=>{
            setPost(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    
    const postSorter = (post)=>{    //This methods sorts first by recent date and then highest likes
        post.sort(
            function(a, b) {          
               if (a.postedDate == b.postedDate) {
                  return b.likes - a.likes;
               }
               return b.postedDate > a.postedDate ? 1 : -1;
            });
        // console.log(post);
    }

    const likePost = async(id)=>{
        await axios.patch(`http://localhost:8060/likePost/${id}`).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [count,setCount] = useState(0);
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
                    <div className='fixed right-5 bottom-4' style={{ zIndex: '1000' }}>
                        <TooltipComponent content="Change Theme and Post" position="Bottom">
                            <button 
                                type='button' onClick={()=>setThemeSettings(true)}
                                style={{ background: currentColor, borderRadius: '30%' }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                {/* Applying Emoji */}
                                <RiImageAddLine/>   
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
                                                {/* NAVBAR IMPLEMENTATION */}
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>

                        {/* Navbar Implementation has to be redone  */}
                        <div>
                            
                            {themeSettings && <ThemeSettings />}
                            <div className='m-1 md:m-5  p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white '>
                             <Header category={`Hello ${username}`} title="Main Feed" />
                            {Post.map((data,key)=>{
                                postSorter(Post);
                                return(
                                    <div className="relative content-center "key={key}>
                                        <div className="p-1 content-center">
                                            <div class="p- flex justify-center items-start space-x-20">
                                                <figure class="h-auto dark:bg-main-dark-bg bg-gray-200 rounded-lg drop-shadow-2xl">
                                                <figcaption class="px-5 py-3 text-left text-xl font-normal text-gray-400" >{data.username}</figcaption>
                                                <figcaption class="px-5 py-1 text-right text-xs font-normal" >{data.postedDate}</figcaption>
                                                    <img  class="h-auto w-full object-cover "
                                                        src={data.post} />
                                                    <button onClick={()=>{
                                                        setCount(data.likes + 1);
                                                    }}className='ml-5 mt-2'>
                                                            <BiLike className=" h-8 w-8 ml-2 mt-2" />Likes {data.likes}
                                                        </button>
                                                    <figcaption class="px-5 py-3 text-left text-s font-normal" >    
                                                        {data.title}
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        </div>
                                        
                                </div>
                                )
                            })}
                        </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;


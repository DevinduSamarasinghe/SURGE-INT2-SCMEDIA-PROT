import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import TableHeader from "../components/Table/TableHeader";
import TableData from  '../components/Table/TableData';
import { useStateContext } from '../contexts/ContextProvider';
import { FiUser } from 'react-icons/fi';
import { DashTopBox, DashTopButton,  } from '../components';
import { FiSettings } from 'react-icons/fi';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';



/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const PageTemplate = () => { // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, } = useStateContext();
  const [post,setPost] = useState([]);

  /* 
  ------------------------------------------------
  YOUR AXIOS CALLS AND USE STATES GOES  ABOVE HERE 
  ------------------------------------------------
  */
  async function getPosts(){
    await axios.get('http://localhost:8070/feed/').then((res)=>{
        setPost(res.data);
    }).catch((err)=>{
        alert(err.message);
    })
    }

    useEffect(() => {
        getPosts();
        const currentThemeColor = localStorage.getItem('colorMode'); // KEEP THESE LINES
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);
  return (
    <div>

      {/* DON'T CHANGE ANYTHING HERE */}

        <div className={currentMode === 'Dark' ? 'dark' : ''}>

            <div className="flex relative dark:bg-main-dark-bg">

                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* THEME SETTINGS BUTTON */}
                    <TooltipComponent content="Settings" position="Top">
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
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

                <div
                    className={ // MAIN BACKGROUND IMPLEMENTATION
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    
                    {/* NAVBAR IMPLEMENTATION */}
                    {/* <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div> */}

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <div>
                           {/* Paste your content Here */}
                           <div >
                                <table className="w-full rounded-lg">
                                    <thead>
                                        <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                                        <TableHeader value ="Title"></TableHeader>
                                        <TableHeader value ="Product"></TableHeader>
                                        <TableHeader value ="Quantity"></TableHeader>
                                        <TableHeader value ="Costed Date"></TableHeader>
                                        <TableHeader value ="Budgeted Total Cost"></TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {post.map((data,key)=>{
                                            return ( 
                                                <tr className="text-sm h-10 border dark:border-slate-600" key={key}>
                                                    <TableData value={data.title}/>
                                                    <TableData value={data.post}/>
                                                    <TableData value={data.username}/>
                                                    <TableData value={data.postedDate}/>
                                                    <TableData value={data.likes}/>
                                                </tr>         
                                                )
                                            })}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                        <Footer />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default PageTemplate;

import React from "react";
import MainPage from "./pages/MainPage";
import PostCreate from "./components/PostCreate";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
//import MainPage from "./pages/MainPage";


const App = function(){ 
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    {/* <Route path="/create" element={<PostCreate/>}/> */}
                </Routes>
            </BrowserRouter>

        </div>
    )   
}

export default App;
import React from "react";
import MainPage from "./pages/MainPage";
import CreatePost from "./pages/CreatePost";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
//import MainPage from "./pages/MainPage";


const App = function(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/create" element={<CreatePost/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )   
}

export default App;
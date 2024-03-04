import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import Login from './login';
import Flights from './flights';
import Users from './users'
import { useAuth } from "./auth";

function Main() {
    const { isLoggedIn  } = useAuth();
    return (
        <Routes>
            <Route path="/" element={isLoggedIn?<Flights/>:<Login/>}/>
            <Route path="*" element={isLoggedIn?<Flights/>:<Login/>}/>
            <Route path="/flights" element={isLoggedIn?<Flights/>:<Login/>}/>
            <Route path="/users" element={isLoggedIn?<Users/>:<Login/>}/>
        </Routes>
        // if login already default to flights else login
    )
}

export default Main
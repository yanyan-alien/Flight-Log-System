import { useState } from "react";
import {Route, Routes} from "react-router-dom";
import Login from './login';
import Flights from './flights';
import Users from './users'

function Main() {
    const [login, setlogin] = useState(false);
    return (
        <Routes>
            <Route path="/" element={<Login login={login} setlogin={setlogin}/>}/>
            <Route path="*" element={<Login login={login} setlogin={setlogin}/>}/>
            <Route path="/flights" element={<Flights login={login} setlogin={setlogin}/>}/>
            <Route path="/users" element={<Users login={login} setlogin={setlogin}/>}/>
        </Routes>
        // if login already default to flights else login
    )
}

export default Main
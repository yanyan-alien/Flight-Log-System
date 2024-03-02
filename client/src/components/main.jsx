import {Route, Routes} from "react-router-dom";
import Login from './login';
import Flights from './flights';
import Users from './users'

function Main() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<Login/>}/>
            <Route path="/flights" element={<Flights/>}/>
            <Route path="/flights/:id" element={<Flights/>}/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
        // if login already default to flights else login
    )
}

export default Main
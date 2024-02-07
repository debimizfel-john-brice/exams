import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../Home/Home";
import RouteNotFound from "../RouteNotFound/RouteNotFound";
import Add from "../Add/Add";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="*" element={<RouteNotFound />} />
        </Routes>
    );
}

export default Routing;

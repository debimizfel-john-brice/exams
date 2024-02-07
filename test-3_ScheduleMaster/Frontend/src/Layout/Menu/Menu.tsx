import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <ul className="Menu">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/add">Add</NavLink></li>
        </ul>
    );
}

export default Menu;

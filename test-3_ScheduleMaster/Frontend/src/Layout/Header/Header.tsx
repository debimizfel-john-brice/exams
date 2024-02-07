import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            <nav>
                <ul>
                    <li><strong>ScheduleMaster</strong></li>
                </ul>
                <Menu />
            </nav>
        </header>

    );
}

export default Header;

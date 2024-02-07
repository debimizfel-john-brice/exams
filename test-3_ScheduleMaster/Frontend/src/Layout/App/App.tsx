import Header from "../Header/Header";
import Routing from "../../Pages/Routing/Routing";
import "./App.css";
import "@picocss/pico";
import 'react-notifications-component/dist/theme.css'

function App(): JSX.Element {
    return (
        <div className="App container" >
            <Header />
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default App;

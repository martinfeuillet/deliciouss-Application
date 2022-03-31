import Category from "./Components/Category";
import Pages from "./Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./Components/Search";
import {Logo,Nav} from './Components/styledComponents';
import {GiKnifeFork} from 'react-icons/gi';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Nav>
                <GiKnifeFork />
                <Logo to={"/"}>
                    Deliciouss
                </Logo>
            </Nav>
                <Search />
                <Category />
                <Pages />
            </BrowserRouter>
        </div>
    );
}

export default App;

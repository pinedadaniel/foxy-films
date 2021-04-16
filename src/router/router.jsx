import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Details from "../containers/Details/index.jsx";
import Home from "../containers/Home/index.jsx";
import Dashboard from "../containers/Dashboard/index.jsx"

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
            <Route exact path="/dashboard/:tab">
                    <Dashboard />
                </Route>
                <Route exact path="/details">
                   <Details />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                    <div >Esta pagina no existe</div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

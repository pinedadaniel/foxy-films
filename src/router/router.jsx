import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import Home from "../containers/Home/index.jsx";
import Dashboard from "../containers/Dashboard/index.jsx"

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
            <Route exact path="/dashboard/:tab">
                    <Dashboard />
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

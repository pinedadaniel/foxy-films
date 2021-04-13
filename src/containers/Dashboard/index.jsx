import "./index.scss";
import {useParams, Redirect} from "react-router-dom";
import { useState } from "react";
import Menu from "../../components/dashboard/menu/index.jsx"
import BankMovie from "../../components/dashboard/bankMovie/index.jsx"

export default function DashboardContainer() {

    const [tab, setTab] = useState(useParams().tab);
    const [notFound, setNotFound] = useState(false);

    function validNotFound() {
        if(tab !== 'bankMovie' && tab !== 'registerMovie' )  {
           return <Redirect push to="/*" />
        }else {
            return (<Menu tab={tab}></Menu> )
        }
    }


    function validCase() {
        switch (tab) {
            case "bankMovie":
                return(
                    <BankMovie />
                )
                break;
                case "registerMovie":
                return(
                    <div className={tab === 'registerMovie' ? 'active' : ''}>registerMovie</div>
                )
                break;
                case "myMovie":
                return(
                    <div className={tab === 'myMovie' ? 'active' : ''}>myMovie</div>
                )
                break;
                break;
        
            default:
                return <span> no exite </span>
                break;
        }
    }

    return(
       <div className="containerDashboard bg-blue">
           {
              validNotFound()
           }
           {
              validCase()
           }
       </div>
    )
}
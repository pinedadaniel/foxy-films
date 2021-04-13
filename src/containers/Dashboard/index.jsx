import "./index.scss";
import {useParams, Redirect} from "react-router-dom";
import { useState } from "react";
import Menu from "../../components/dashboard/menu/index.jsx"
import BankMovie from "../../components/dashboard/bankMovie/index.jsx"

export default function DashboardContainer() {

    const [tab] = useState(useParams().tab);
    const [notFound, setNotFound] = useState(false);

    function validNotFound() {
        if(tab !== 'bankMovie' && tab !== 'registerMovie' && tab !== "myMovie" && tab !== "profile" )  {
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
                case "profile":
                    return(
                        <div className={tab === 'profile' ? 'active' : ''}>profile</div>
                    )
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
import "./index.scss";
import {useParams, Redirect} from "react-router-dom";
import { useState } from "react";
import Menu from "../../components/dashboard/menu/index.jsx";
import BankMovie from "../../components/dashboard/bankMovie/index.jsx";
import RegisterMovie from '../../components/dashboard/bankMovie/index';

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
            
                case "registerMovie":
                return(
                    <RegisterMovie/>
                )
                
                case "myMovie":
                return(
                    <div className={tab === 'myMovie' ? 'active' : ''}>myMovie</div>
                )

            default:
                return <span> no exite </span>
                
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
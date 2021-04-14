import "./index.scss";
import {useParams, Redirect} from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "../../components/dashboard/menu/index.jsx"
import BankMovie from "../../components/dashboard/bankMovie/index.jsx"
import MyMovie from "../../components/dashboard/myMovie/index.jsx"
import EditUser from "../../components/dashboard/editUser/index.jsx"
import EditMovie from "../../components/dashboard/editMovie/index.jsx"

export default function DashboardContainer() {

    const {tab} = useParams();
    console.log(tab);
    function validNotFound() {
        if(tab !== 'bankMovie' && tab !== 'registerMovie' && tab !== "myMovie" && tab !== "editMovie" && tab !== "editUser" )  {
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
                    <MyMovie className={tab === 'myMovie' ? 'active' : ''}/>
                )
                break;
                case "editMovie":
                    return(
                        <EditMovie className={tab === 'editMovie' ? 'active' : ''}/>
                    )
                    break;
                case "editUser":
                    return(
                        <EditUser className={tab === 'editUser' ? 'active' : ''}/>
                    )
                    break;
        
            default:
                return <span> no exite </span>
                break;
        }
    }

    useEffect(() => {

    }, [tab]);

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
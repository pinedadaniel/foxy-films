import "./index.scss";
import {useParams, Redirect} from "react-router-dom";
import Menu from "../../components/dashboard/menu/index.jsx";
import BankMovie from "../../components/dashboard/bankMovie/index.jsx";
import RegisterMovie from '../../components/dashboard/registerMovie/index';
import { useEffect } from "react";
import MyMovie from "../../components/dashboard/myMovie/index.jsx";
import EditUser from "../../components/dashboard/editUser/index.jsx";
import EditMovie from "../../components/dashboard/editMovie/index.jsx";

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
            
                case "registerMovie":
                return(
                    <RegisterMovie className={tab === 'registerMovie' ? 'active' : ''}/>
                )
                
                case "myMovie":
                return(
                    <MyMovie className={tab === 'myMovie' ? 'active' : ''}/>
                )
              
                case "editMovie":
                    return(
                        <EditMovie className={tab === 'editMovie' ? 'active' : ''}/>
                    )
                
                case "editUser":
                    return(
                        <EditUser className={tab === 'editUser' ? 'active' : ''}/>
                    )
                
        
            default:
                return <span> no exite </span>
                
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
import React from 'react';
import Body from '../../components/home/body/index';
import Footer from '../../components/home/footer/index';
import './index.scss';
export default function HomeContainer() {
    return(
       <div className="containerMainHome bg-blue p-absolute d-flex align-items-center justify-center">
           <Body></Body>
           <Footer></Footer>

       </div>
    )
}

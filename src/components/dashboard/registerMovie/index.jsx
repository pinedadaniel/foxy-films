import "./index.scss";
export default function RegisterMovieComponent(props) {
    return(
       <div className="d-flex  bg-white">
           <div className="cont">
               <input placeholder="Buscar Peliculas" className="searchBankMovie" type="search"/>
           </div>
       </div>
    )
}
import "./index.scss";
export default function EditMovieComponent(props) {
    return(
       <div className="containerBankMovie  bg-white">
           <div className="cont">
               <input placeholder="Buscar Peliculas" className="searchBankMovie" type="search"/>
           </div>
       </div>
    )
}
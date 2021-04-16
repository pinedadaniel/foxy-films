import './index.scss';
import favorite from "../../icons/favorite.svg"
import views from "../../icons/views.svg"
import naruto from "../../img/naruto.jpg"
export default function DetailsComponent() {
    return(
       <div className="containerDetailsComponent bg-blue">
          <div className="containerDetailsLeft">
              <div className="infoLeft">
                  <img className="detailsImg" width="180px" height="180px" src={naruto} alt=""/>
                  <h1 className="detailsTitulo">Naruto</h1>
                  <div className="contVotesViews">
                      <span className="contVotes">
                          <img src={favorite} alt=""/>
                          <h2 className="numVotes">431</h2>
                          </span>
                      <span className="contViews">
                          <img src={views} alt=""/>
                          <h2 className="numViews">785</h2>
                          </span>
                  </div>
                  <div className="detailsCategorias">
                      <h2 className="tituloCategorias">categorias</h2>
                      <div className="contCategorias">
                          <span className="categoria">accion</span>
                          <span className="categoria">misterio</span>
                          <span className="categoria">animacion</span>
                          <span className="categoria">aventura</span>
                          <span className="categoria">accion</span>
                          <span className="categoria">misterio</span>
                          <span className="categoria">animacion</span>
                          <span className="categoria">aventura</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="containerDetailsRight"></div>
       </div>
       )
       }
import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Carrousel from './carrousel/carrousel';
//import Salvarfavorito from "./components/Salvarfavoritos";

function App() {

// Hago un state de personajes, arranco con un objeto vacío
// porque los datos vienen como objeto JSON desde la API

const [personajes, setPersonajes] = useState({});
const [mostrar, setmostrar] = useState({});

// Consultar la API y traerla

  const consultarAPI = async () => {
        try{
        const api = await fetch('https://hp-api.herokuapp.com/api/characters');
        const personajes = await api.json();
        var min = 0;
        var max = 24;
        var ran = Math.floor(Math.random() * (max - min)) + min;
        setPersonajes(personajes[ran]);
        console.log(personajes[ran]);
        console.log(ran);
        setmostrar(mostrar);
        var mostrar = true;
        } catch (error) {
          console.log(error);
        }
};
//Con esta funcion, damos la opcion de agregar el personaje a una lista de favoritos.
  const agregarFavoritosArray = (personaje) => {

    const existeFav = favoritos.find(
      (favorito) => favorito.name === personaje.name)
      if (!existeFav){
        const nuevoFav = [...favoritos,personaje]
        setFavorito(nuevoFav)
        setLocalStorage(nuevoFav)
        console.log(nuevoFav)
      }

  };

  //Con esta funcion guardamos en el local storage los favoritos.
  const setLocalStorage = (nuevoFavorito) => {

    localStorage.setItem('API-Harry-Potter',JSON.stringify(nuevoFavorito))

  };

  //usamos hooks para actualizar el estado de nuevoFav
  const [favoritos,setFavorito] = useState([]);

  //Funcion para cuando inicia la pagina, pasa del local storage a favoritos.
  useEffect(()=> {
    const listaDeFav=JSON.parse(localStorage.getItem('API-Harry-Potter'))
    if(listaDeFav){
      setFavorito(listaDeFav)
    }
  },[]);

  //Con esta funcionborramos el array creado con los personajes seleccionados
  const borrarFavoritosArray=() =>{

    const nuevoFav=[]
    setFavorito(nuevoFav)
    localStorage.clear()
    
  }

return (
    <Fragment>
    <Container>
      <div>
        <div>
          <Carrousel /> 
        </div>
      <div style={
        {
          paddingTop:"10px",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
        }
      }>
        { mostrar ? <p></p> :
        <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card">
              <img className="card-img-top" src={personajes.image}/>
                  <div className="card-block">
                    <h4 className="card-title">{personajes.name}</h4>
                      <div className="meta">
                        <a href="#">Lineage: {personajes.ancestry}</a><br></br>
                        <a>House: {personajes.house}</a>
                      </div>
                        <div className="card-text">
                        </div>
                  </div>
                    <div className="card-footer">
                      <span className="float-left">Birth: {personajes.dateOfBirth}</span>
                      <span><i className=""></i>Power: {personajes.patronus}</span>
                    </div>
                  </div>
          </div>
}
      <Row>
        <Col>
        <div
            style={
              {
                paddingTop:"10px",
                display:"flex",
                margin: "13px",
              }}>
            <button type="button" className="btn btn-dark"
              onClick={consultarAPI}>
              Character of the day!!!
            </button>
            <div class="col-sm-1 col-xs-1 col-md-1 col-lg-1"></div>
            <button type="button" className="btn btn-light"
              onClick={()=> agregarFavoritosArray(personajes)}>
              Save to favorite
            </button>
            
        </div>
        </Col>
      </Row>
      <Row>
        {favoritos.map((personajes) => (
        
        <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
          <div className="card">
            <img className="card-img-top" src={personajes.image}/>
              <div className="card-block">
                <h4 className="card-title">{personajes.name}</h4>
                  <div className="meta">
                    <a href="#">Lineage: {personajes.ancestry}</a><br></br>
                    <a>House: {personajes.house}</a>
                  </div>
                  <div className="card-text">
                  </div>
                </div>
                <div className="card-footer">
                  <span className="float-left">Birth: {personajes.dateOfBirth}</span>
                  <span><i className=""></i>Power: {personajes.patronus}</span>
                </div>
              </div>
        </div>))
        }

      </Row>
      <Row>
        <div>
        <button type="button" className="btn btn-danger"
              onClick={()=> borrarFavoritosArray()}>
              Delete favorites
            </button>
            <br></br>
        </div>
      </Row>
      </div>
    </div>
    </Container>
    </Fragment>
  );
}

export default App;
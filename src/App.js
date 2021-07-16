import { Fragment, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import HPLogo from './pngwing.com.png';


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
return (
    <Fragment>
    <Container>
      <div>
        <div>
          <img src={HPLogo} className="mx-auto d-block"></img>
        </div>
      <div
       style={
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
                flexDirection:"column",
                alignItems:"center",
              }}>
            <button type="button" className="btn btn-outline-primary"
            onClick={consultarAPI}>
              Character of the day!!!
            </button>
          </div>
        </Col>
      </Row>
      </div>
    </div>
    </Container>
    </Fragment>
  );
}

export default App;
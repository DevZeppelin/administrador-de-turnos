import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formularios";
import Cita from "./components/Cita";
import PropTypes from 'prop-types';

function App() {

  //LOCAL STORAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect/cada vez que cambie el estado de citas se ejecutara este useEffect
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }   
  }, [citas]);

  //Funcion que agrega las citas
  //Para comprobar que los componentes se están comunicando, en el <Formulario /> agrego la prop crearCita={crearCita} recordando que los datos fluyen desde los padres hacia los hijos por los props
  //En el Formulario.js extraigo con destructuring como prop la funcion ({crearCita})
  //En el submitCita agrego: crearCita(cita)

  const crearCita = (cita) => {
    console.log(cita); //con este log verifico q se comunican bien los componenetes
    guardarCitas([...citas, cita]);
  };

  //En filter para eliminar uso el !== para que me pase los otros sin el que elimine
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  console.log(citas.length);
  const titulo =
    citas.length === 0 ? "No hay citas cargadas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Adminsitrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;

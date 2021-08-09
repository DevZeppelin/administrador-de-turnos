import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    //State para manejar el error en la validacion

    const [error, actualizarError] = useState(false)

    //en javascript: eventLsitener, onChange o input
    //en React: onChange. Le agrego este evento a cada input. En la documnetacion dice que debe llamarse handleChange

    //Función IMPORTANTISIMA
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
      e.preventDefault()
      
      //Validar (puedo usar los valores que ya extraje)
      //trim elimina los espacios en blanco al principio o al final.
      //tengo que crear un nuevo state para manejar el error
      //el actualziar cita utilizaba llaves ({}) porque es un objeto. el state de error empieza como un booleano por eso lleva solo(). Si fuera un array cambia la sintaxis a ([])
      if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
        actualizarError(true)
        return
      }
      //una vez pasada la validación
      actualizarError(false)

      //Asignar un ID
      cita.id = uuidv4()
      console.log(cita)
      
      //Crear la cita
      crearCita(cita)

      //Reiniciar el Form
      //Una vez se agrego la cita al state ppal, lo reiniciamos porque al colocarle los values, y como tenemos asignadas las variables a los values detecta q son string vacios y react recarga esa parte del componente reiniciando el formulario
      actualizarCita ({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
      })

    }

  return (
    <Fragment>
      <h2>Crear cita</h2>

    { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de Mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input type="date" name="fecha" className="u-full-width"
        onChange={actualizarState}
        value={fecha} />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"   
          onChange={actualizarState} 
          value={hora}      
        />

<label>Síntomas</label>
        <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            value={sintomas}
        ></textarea>

        <button
            type="submit"
            className="u-full-width button-primary"    
        >Agregar Cita</button>


      </form>
    </Fragment>
  );
};

export default Formulario;

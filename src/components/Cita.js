import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) =>  ( 
    <div className="cita">
        <p>paciente: <span>{cita.paciente}</span></p>
        <p>Responsable: <span>{cita.responsable}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Descripción/detalles: <span>{cita.detalles}</span></p>

        <button
            className="button eliminar u-full-width"
            onClick={ () => eliminarCita(cita.id) }
        >
            Eliminar &times;
        </button>
    </div>
);

Cita.propTypes = {
    //el key no se documenta
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
} 

export default Cita;
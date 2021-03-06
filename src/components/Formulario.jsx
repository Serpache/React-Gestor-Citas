import React , { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //state de citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        propietario:"",
        fecha: "",
        hora: "",
        sintomas: ""
    })

    //state de errores
    const [ error, actualizarError] = useState(false)

    //Función para rellenar la cita 
    const actualizarState = (event) => {
        actualizarCita({
            ...cita,
            [event.target.name]: event.target.value
        })
    }

    //Extraer valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Agregar cita
    const submitCita = (event) => {
        event.preventDefault();

        //Validar campos
        if (
          mascota.trim() === "" ||
          propietario.trim() === "" ||
          fecha.trim() === "" ||
          hora.trim() === "" ||
          sintomas.trim() === ""
        ) {
          actualizarError(true);
          return;
        }

        //Eliminar mensaje de error precio
        actualizarError(false);

        //Asignar un ID con uuid(libreria de id largas, hay un shortid)
        /*actualizarCita({
            ...cita, 
            id: uuidv4()
        });*/
        //investigar por qué no funciona el de arriba
        cita.id = uuidv4()
        console.log(cita);

        //Crear la cita
        crearCita(cita);

        //Reiniciar el formulario
        actualizarCita({
          mascota: "",
          propietario: "",
          fecha: "",
          hora: "",
          sintomas: ""
        });
    }

    return (
      <Fragment>
        <h2>Crear Cita</h2>

        {error ? (
          <p className="alerta-error">Todos los campos son obligatorios</p>
        ) : null}

        <form onSubmit={submitCita}>
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
            placeholder="Nombre Dueño"
            onChange={actualizarState}
            value={propietario}
          />
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            value={fecha}
          />
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
          <button type="submit" className="u-full-width button-primary">
            Agregar Cita
          </button>
        </form>
      </Fragment>
    );
}
 
//Documentación para los props aclarando su tipo y si son necesarios
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
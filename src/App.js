

import React, { useState, useEffect } from 'react';
import './App.css';

const URL = 'https://playground.4geeks.com/apis/fake/todos/user/nilsonmarenco';

function Tarea() {
  const [input, setInput] = useState('');
  const [tareas, setTareas] = useState([]);

  const manejarCambioInput = (e) => {
    setInput(e.target.value);
  };

  const manejarAgregarTarea = async (e) => {
    e.preventDefault();

    await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify([
        ...tareas,
        { id: Math.random(), label: input, done: false },
      ]),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setInput('');
  };

  const manejarEliminarTarea = async (taskIndex) => {
    const tareasFiltradas = tareas.filter((_, index) => index !== taskIndex);

    await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(tareasFiltradas),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTareas(tareasFiltradas);
    console.log('Updated API y updated local todolist');
  };

  const obtenerTareas = async () => {
    const tareasRespuesta = await fetch(URL);
    const tareasResueltas = await tareasRespuesta.json();
    setTareas(tareasResueltas);
  };

  useEffect(() => {
    obtenerTareas();
  }, [tareas]);

  return (
    <>
      <div className="app__container">
        <h1>To-Do List</h1>
        <div className="main-lista__container">
          <form onSubmit={manejarAgregarTarea}>
            <input
              className="tarea-input"
              type="text"
              placeholder="Escribe tarea"
              onChange={manejarCambioInput}
              value={input}
            />
          </form>
          <div className="lista__container">
            <ul>
              {'Tareas Agregadas'}
              {tareas.length > 0 &&
                tareas.map((tarea, index) => (
                  <li key={index}>
                    <p>{tarea.label}</p>
                    <button onClick={() => manejarEliminarTarea(index)}>
                      ✖️
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tarea;

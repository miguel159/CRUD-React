import React, { useState } from 'react';
import { isElementOfType } from 'react-dom/test-utils';
import shortid from 'shortid';

function App() {

  /*----- guarda la tarea ingresada en setTarea en el evento onChange -----*/
  const [tarea, setTarea] = useState ('')
  const [tareas, setTareas] = useState ([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)


  const agregarTarea = e => {
    e.preventDefault()

    /*----- valida el campo vacio  -----*/
    if (!tarea.trim()){ 
      console.log('Elemento Vacio')
      setError('Escriba algo por favor')
      return
    } 
    console.log(tarea)


    /*----- propiedad/valor  y shortid(libreria de id aleatorio) -----*/
    setTareas ([
      ...tareas,
      { id: shortid.generate() , nombreTarea:tarea}   
    ]) 

    /*----- Limpia el campo del formulario-----*/
    setTarea ('') 

    setError(null)
  }

  /*----- Funcion eliminar -----*/
  const eliminarTarea = id => {
    //console.log(id)
    /*------ Si item.id es igual de nuestro id, se quedara fuera 
    y lo que son compatibles se guarda
    en setTareas en arrayFiltrado -----*/
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()){ 
      console.log('Elemento Vacio')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id, nombreTarea:tarea}: item
      )

      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
      setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>      
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de Tareas</h4>
          <ul className="list-group">
            {
               tareas.length === 0 ? (
                <div className="list-group-item">No hay tareas</div>
               ) :  (
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>
  
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
  
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
               )             
            }

            

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center"> 
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingresar Tarea"
              onChange={ e => setTarea (e.target.value)}
              /*----- limpiar campo de formularios -----*/
              value={tarea} 
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>  //V
                ) : (
                  <button className="btn btn-dark btn-block" type="submit">Agregar</button>  //F
                )
              }
          </form>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="row-8">
          <h4 className="text-center">Listar</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <button
                className="btn btn-danger btn-sm float-right mx-2"
              >
                Eliminar
              </button>

              <button
                className="btn btn-warning btn-sm float-right"
              >
                Editar
              </button>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Agregaaar</h4>
        </div>
      </div>

    </div>
  );
}

export default App;

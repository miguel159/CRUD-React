import React, { useEffect, useState } from "react";
import shortid from "shortid";

function App() {
  const [homeWork, setHomeWork] = useState("");
  const [listHomeWork, setListHomeWork] = useState([]);
  const [listEditWork, setListEditWork] = useState([]);
  const [error, setError] = useState(null);

  const createItem = (e) => {
    if (!homeWork.trim()) {
      setError("Escriba algo por favor");
      return;
    }
    setListHomeWork([
      ...listHomeWork,
      { id: shortid.generate(), name: homeWork, type: "show" },
    ]);
    setHomeWork("");
    setError(null);
  };

  const deleteHomeWork = (id) => {
    const data = listHomeWork.filter((item) => item.id !== id);
    setListHomeWork(data);
  };

  const editHomeWork = (item, index) => {
    const data = [...listHomeWork];
    data[index].type = "edit";
    setListHomeWork([...data]);
  };

  const saveHomeWork = (item, index, value) => {
    const data = [...listEditWork];
    const dataHomeWork = [...listHomeWork];

    if (!data[index].value.trim()) {
      return;
    }
    dataHomeWork[index].type = "show";
    dataHomeWork[index].name = data[index].value;
    setListHomeWork([...dataHomeWork]);
  };

  const cancelEdit = (item, index) => {
    const data = [...listHomeWork];
    data[index].type = "show";
    setListHomeWork([...data]);
  };

  useEffect(() => {
    if (listHomeWork.length > 0) {
      const data = listHomeWork.map((el) => ({ value: el.name }));
      setListEditWork([...data]);
    }
  }, [listHomeWork]);

  const actionHomeWork = (item, index) => {
    if (item.type === "show") deleteHomeWork(item.id);
    else cancelEdit(item.id, index);
  };
  const changeListHomeWorkEdit = (item, index, value) => {
    const data = [...listEditWork];
    data[index].value = value;
    setListEditWork([...data]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center"> Lista de Tareas</h4>
          <ul className="list-group">
            {listHomeWork.length === 0 && (
              <div className="list-group-item">No hay tareas</div>
            )}
            {listHomeWork.map((item, index) => (
              <li className="list-group-item" key={item.id}>
                {item.type === "show" && (
                  <span className="lead">{item.name}</span>
                )}
                {item.type === "edit" && (
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingresar Tarea"
                    onChange={(e) =>
                      changeListHomeWorkEdit(item, index, e.target.value)
                    }
                    value={listEditWork[index].value}
                  />
                )}
                <button
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => actionHomeWork(item, index)}
                >
                  {item.type === "show" ? "Eliminar" : "Cancelar"}
                </button>
                <button
                  className="btn btn-warning btn-sm float-right"
                  onClick={() =>
                    item.type === "show"
                      ? editHomeWork(item.id, index)
                      : saveHomeWork(item, index)
                  }
                >
                  {item.type === "show" ? "Editar" : "Guardar"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Agregar Tarea</h4>
          <div>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresar Tarea"
              onChange={(e) => setHomeWork(e.target.value)}
              value={homeWork}
            />
            <button
              className="btn btn-dark btn-block"
              type="submit"
              onClick={createItem}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

function App() {
  const [listaPastillas, setListaPastillas] = useState([]);

  const listaPastillasLocalStorage = localStorage.getItem("listaPastillas");

  const leerPastillas = () => {
    if (listaPastillasLocalStorage) {
      setListaPastillas(JSON.parse(listaPastillasLocalStorage));
    }
  };

  useEffect(() => {
    leerPastillas();
  }, []);

  const handleListaPastillas = () => {
    const fecha = new Date();
    const fechaFormatted = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
    setListaPastillas([
      ...listaPastillas,
      { id: listaPastillas.length, fecha: fechaFormatted },
    ]);
    localStorage.setItem(
      "listaPastillas",
      JSON.stringify([
        ...listaPastillas,
        { id: listaPastillas.length, fecha: fechaFormatted },
      ])
    );
  };

  return (
    <div className="h-screen w-screen bg-[#212121] flex items-center justify-center flex-col">
      <div className="flex items-center justify-start gap-16 flex-col">
        <h1 className="text-4xl font-bold font-mono text-yellow-400">Tomé la pastilla?</h1>
        <div className="px-4 flex items-center justify-start flex-col max-h-48 overflow-auto w-96 ">
          {listaPastillas.length > 0 ? listaPastillas.map((pastilla) => {
            return (
              <div key={pastilla.id} className="bg-white p-2 rounded-md my-2">
                {pastilla.fecha}
              </div>
            );
          })
        : 
          <h2 className="font-bold text-xl text-slate-50">No tomaste pastillas todavía 💩</h2>
        }
        </div>

        <button
          onClick={handleListaPastillas}
          className="px-3 py-1 bg-white rounded-md font-bold text-xl"
        >
          Tomé la pastilla
        </button>
        <button 
        onClick={() => {
          setListaPastillas([]);
          localStorage.removeItem("listaPastillas");
        }}
        className="bg-red-500 px-3 py-2 rounded-xl text-white font-semibold">
          Borrar lista
        </button>
      </div>
    </div>
  );
}

export default App;

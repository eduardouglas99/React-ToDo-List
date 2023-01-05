import { useState } from "react";
import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

function App() {

  const [listaTarefas, setListaTarefas] = useState<string[]>([]);

  function handleSubmit(valor: string) {
    if(valor !== "") {
      setListaTarefas([...listaTarefas, valor]);
    } else {
      alert("Por favor, digite uma tarefa.")
    }
  }
  
  return (
    <div className="App">
      <div className="modal-center container flex">
        <h1>ToDo List</h1>
        <FormTask handleSubmit={handleSubmit} />
        <ListTask ListTask={listaTarefas}/>
      </div>
    </div>
  )
}

export default App

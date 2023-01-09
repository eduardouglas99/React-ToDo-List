import { useState } from "react";
import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";
import { Tarefa } from "./models/Tarefa";

function App() {

  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
  const [feedback, setFeedback] = useState<boolean>(false);

  function handleSubmit(valor: string) {
    const temItemNoArray = listaTarefas.length;
    const temItemIgualNoArray = listaTarefas.filter((item) => item.titulo === valor).length;
    const valorLimpo = valor.trim();

    const tarefa: Tarefa = {
      id: listaTarefas.length ++,
      titulo: valorLimpo,
      concluido: false
    }
    
    if(valorLimpo !== "") {
      if(temItemNoArray && temItemIgualNoArray) {
        setFeedback(true);
        return;
      }
      setListaTarefas([...listaTarefas, tarefa]);
      setFeedback(false);
      return;
    } 
    setFeedback(true);
  }

  function handleTarefaConcluida(id: number, titulo: string, concluido: boolean) {
    const novoArray = listaTarefas.filter(item => item.id !== id);
    const novaTarefa: Tarefa = {
      id: id,
      titulo: titulo,
      concluido: !concluido
    }
    novoArray.splice(id, 0, novaTarefa);
    setListaTarefas([...novoArray]);
  }

  function clearTask(id: number) {
      const novoArray = listaTarefas.filter(item => item.id !== id);
      // listaTarefas.splice(id, 1);
      setListaTarefas([...novoArray]);
    
  }

  function clearAllTasks() {
    setListaTarefas([]);
    setFeedback(false)
  }

  return (
    <div className="App">
      <div className="modal-center container flex">
        <h1>ToDo List</h1>
        <FormTask handleSubmit={handleSubmit} />
        {feedback && (
          <p className={`feedback-error`}>Por favor, digite uma {listaTarefas.length > 0 ? `nova tarefa.` : `tarefa.`}</p>
        )}
        <ListTask 
          ListTask={listaTarefas} 
          clearTask={clearTask}
          clearAllTasks={clearAllTasks}
          handleTarefaConcluida={handleTarefaConcluida}
          />
      </div>
    </div>
  )
}

export default App

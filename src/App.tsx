import { useState } from "react";
import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

function App() {

  const [listaTarefas, setListaTarefas] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<boolean>(false);
  const [value, setValue] = useState<string>("")

  function handleSubmit(valor: string) {
    const temItemNoArray = listaTarefas.length;
    const temItemIgualNoArray = listaTarefas.filter((item) => item === valor).length;
    const valorLimpo = valor.trim();

    if(valorLimpo !== "") {
      if(temItemNoArray && temItemIgualNoArray) {
        setFeedback(true);
        return;
      }
      setListaTarefas([...listaTarefas, valor]);
      setFeedback(false);
      return;
    } 
    setFeedback(true);
  }

  // function taskCheckedRearrange(item: string, index: number) {
  //   listaTarefas.splice(index, 1);
  //   setListaTarefas([...listaTarefas, item]);
  //   console.log(listaTarefas)
  // }

  function clearTask(index: number) {
    listaTarefas.splice(index, 1);
    setListaTarefas([...listaTarefas]);
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
          // taskCheckedRearrange={taskCheckedRearrange}
          />
      </div>
    </div>
  )
}

export default App

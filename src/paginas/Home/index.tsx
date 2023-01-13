import { useEffect, useState } from "react";
import FormTask from "../../components/FormTask";
import ListTask from "../../components/ListTask";
import { Tarefa } from "../../models/Tarefa";
import styles from "./Home.module.scss";
import logoHome from "../../assets/images/logo-todo-list.jpg";

const Home = () => {
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
    const [feedback, setFeedback] = useState<boolean>(false);
    const [cont, setCont] = useState<number>(0);
  
    function handleSubmit(valor: string) {
      const temItemNoArray = listaTarefas.length;
      const temItemIgualNoArray = listaTarefas.filter((item) => item.titulo === valor).length;
      const valorLimpo = valor.trim();
  
      setCont(cont + 1);
  
      const tarefa: Tarefa = {
        id: cont,
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
        titulo: titulo,
        id: id,
        concluido: !concluido
      }
      novoArray.splice(id, 0, novaTarefa);
      novoArray.sort((a: Tarefa, b: Tarefa) => a.id - b.id);
      setListaTarefas([...novoArray]);
    }

    function clearTask(item: Tarefa) {
      const itemUndoAction: Tarefa = {
        id: item.id,
        titulo: item.titulo,
        concluido: item.concluido   
      }
      const novoArray = listaTarefas.filter(item => item.id !== itemUndoAction.id);
      setListaTarefas([...novoArray]);
    }

    function undoAction(itemSalvo: Tarefa) {
      if(itemSalvo) {
        listaTarefas.sort((a: Tarefa, b: Tarefa) => a.id - b.id);
        setListaTarefas([...listaTarefas, itemSalvo]);
      }
    }

    function clearAllTasks() {
      setListaTarefas([]);
      setFeedback(false)
    }
  
    return (
      <div className="App">
        <div className={`${styles.container} container flex`}>
          <div className={`${styles.container__modalCenter} flex`} >
            <img src={logoHome} alt="Todo list" title="Todo list" width={180} height={140} />
            <FormTask handleSubmit={handleSubmit} />
            {feedback && (
              <p className={`${styles.container__modalCenter__feedbackError}`}>Por favor, digite uma {listaTarefas.length > 0 ? `nova tarefa.` : `tarefa.`}</p>
            )}
            <ListTask 
              ListTask={listaTarefas} 
              clearTask={clearTask}
              clearAllTasks={clearAllTasks}
              handleTarefaConcluida={handleTarefaConcluida}
              undoAction={undoAction}
              />
          </div>
        </div>
      </div>
    )
}

export default Home;
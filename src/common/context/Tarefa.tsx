import { createContext, useContext, useMemo, useState } from "react";
import { Tarefa } from "../../models/Tarefa";

interface TarefaProviderProps {
  children: React.ReactNode;
}

type TarefaContextProp = {
  listTaks: Tarefa[];
  setListTaks: React.Dispatch<React.SetStateAction<Tarefa[]>>;
  feedback: boolean;
  setFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  cont: number;
  setCont: React.Dispatch<React.SetStateAction<number>>;
  addTask: (item: string) => void;
  handleCompletedTask: (id: number, title: string, concluded: boolean) => void;
  clearTask: (item: Tarefa) => void;
  clearAllTasks: () => void;
  undoAction: (savedItem: Tarefa) => void;
  itemParaExcluir: Tarefa | undefined;
  setItemParaExcluir: React.Dispatch<React.SetStateAction<Tarefa | undefined>>;
  openModalLimpar: boolean;
  setOpenModalLimpar: React.Dispatch<React.SetStateAction<boolean>>;
  handleItemForExclude: (item: Tarefa) => void;
};

const TarefaContext = createContext<TarefaContextProp>({} as TarefaContextProp);
TarefaContext.displayName = "Task";

export const TarefaProvider = ({ children }: TarefaProviderProps) => {
  const [listTaks, setListTaks] = useState<Tarefa[]>([]);
  const [feedback, setFeedback] = useState<boolean>(false);
  const [cont, setCont] = useState<number>(0);
  const [itemParaExcluir, setItemParaExcluir] = useState<Tarefa>();
  const [openModalLimpar, setOpenModalLimpar] = useState<boolean>(false);

  function addTask(item: string) {
    const temItemNoArray = listTaks.length;
    const temItemigualNoArray = listTaks.filter((tarefa) => tarefa.titulo === item).length;
    const valorLimpo = item.trim();

    setCont(cont + 1);
    const newTask: Tarefa = {
      id: cont,
      titulo: valorLimpo,
      concluido: false,
    };

    if (valorLimpo !== "") {
      if (temItemNoArray && temItemigualNoArray) {
        setFeedback(true);
        return;
      }
      setListTaks([...listTaks, newTask]);
      setFeedback(false);
      return;
    }
    setFeedback(true);
  }

  function handleCompletedTask(id: number, title: string, concluded: boolean) {
    const novoArray = listTaks.filter((item) => item.id !== id);
    const novaTarefa: Tarefa = {
      titulo: title,
      id: id,
      concluido: !concluded,
    };
    novoArray.splice(id, 0, novaTarefa);
    novoArray.sort((a: Tarefa, b: Tarefa) => a.id - b.id);
    setListTaks([...novoArray]);
  }

  function clearTask(item: Tarefa) {
    const itemUndoAction: Tarefa = {
      id: item.id,
      titulo: item.titulo,
      concluido: item.concluido,
    };
    const novoArray = listTaks.filter((item) => item.id !== itemUndoAction.id);
    setListTaks([...novoArray]);
  }

  function clearAllTasks() {
    setListTaks([]);
    setFeedback(false);
  }

  function undoAction(savedItem: Tarefa) {
    const temItemIgualNoArray = listTaks.filter((item) => item.titulo === savedItem.titulo).length;
    if (temItemIgualNoArray) {
      setFeedback(true);
      return;
    }
    listTaks.sort((a: Tarefa, b: Tarefa) => a.id - b.id);
    setListTaks([...listTaks, savedItem]);
  }

  function handleItemForExclude(item: Tarefa) {
    setItemParaExcluir(item);
    setOpenModalLimpar(true);
  }

  const value = useMemo(
    () => ({
      listTaks, setListTaks, feedback, setFeedback, cont, setCont,
      addTask, handleCompletedTask, clearTask, clearAllTasks, undoAction,
      itemParaExcluir, setItemParaExcluir, handleItemForExclude, openModalLimpar, setOpenModalLimpar,
    }),
    [
      listTaks, setListTaks, feedback, setFeedback, cont, setCont,
      addTask, handleCompletedTask, clearTask, clearAllTasks, undoAction,
      itemParaExcluir, setItemParaExcluir, handleItemForExclude, openModalLimpar, setOpenModalLimpar,
    ]
  );

  return (
    <TarefaContext.Provider value={value}>{children}</TarefaContext.Provider>
  );
};

export const useTarefaContext = () => useContext(TarefaContext);
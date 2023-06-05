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
};

const TarefaContext = createContext<TarefaContextProp>({} as TarefaContextProp);
TarefaContext.displayName = "Task";

export const TarefaProvider = ({ children }: TarefaProviderProps) => {
  const [listTaks, setListTaks] = useState<Tarefa[]>([]);
  const [feedback, setFeedback] = useState<boolean>(false);
  const [cont, setCont] = useState<number>(0);

  function addTask(item: string) {
    const temItemNoArray = listTaks.length;
    const temItemigualNoArray = listTaks.filter(
      (tarefa) => tarefa.titulo === item
    ).length;
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

  const value = useMemo(
    () => ({
      listTaks,
      setListTaks,
      feedback,
      setFeedback,
      cont,
      setCont,
      addTask,
    }),
    [listTaks, setListTaks, feedback, setFeedback, cont, setCont, addTask]
  );

  return (
    <TarefaContext.Provider value={value}>{children}</TarefaContext.Provider>
  );
};

export const useTarefaContext = () => useContext(TarefaContext);

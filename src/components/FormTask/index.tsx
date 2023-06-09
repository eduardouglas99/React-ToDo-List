import { useRef } from "react";
import styles from "./FormTasks.module.scss";
import { AiOutlinePlus } from 'react-icons/ai';
import { useTarefaContext } from "../../common/context/Tarefa";

export default function FormTask() {
    const { addTask } = useTarefaContext();
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className={`${styles.formTask} flex`}>
            <input 
                type="text" name="nameTask" id="nameTask"
                placeholder="Digite suas tarefas" 
                ref={inputRef}
                className={`${styles.formTask__input}`}
            />
            <button 
                type="button" 
                onClick={() => {
                    addTask(inputRef.current?.value || "")
                    if(inputRef.current) {
                        inputRef.current.value = "";
                    }
                }}
                className={`${styles.formTask__button} flex`}>
                    <AiOutlinePlus />
            </button>     
        </div>
    )
}
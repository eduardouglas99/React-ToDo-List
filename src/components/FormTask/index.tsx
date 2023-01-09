import { useRef } from "react";
import styles from "./FormTasks.module.scss";
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Tarefa } from "../../models/Tarefa";

type FormTaskProps = {
    handleSubmit: (valor: string) => void;
}

export default function FormTask({handleSubmit} : FormTaskProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={`${styles.formTask} flex`}>
            <input 
                type="text" name="nameTask" id="nameTask"
                placeholder="Digite a tarefa" 
                ref={inputRef}
                className={`${styles.formTask__input}`}
            />
            <button 
                type="button" 
                onClick={() => {
                    handleSubmit(inputRef.current?.value || "");
                    if(inputRef.current) {
                        inputRef.current.value = "";
                    }
                }}
                className={`${styles.formTask__button} flex`}>
                    <IoMdAddCircleOutline />
            </button>     
        </div>
    )
}
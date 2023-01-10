import { useRef } from "react";
import styles from "./FormTasks.module.scss";
import { AiOutlinePlus } from 'react-icons/ai';
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
                    <AiOutlinePlus />
            </button>     
        </div>
    )
}
import styles from './ListTask.module.scss';
import { FaTrash } from 'react-icons/fa';

type ListTaskProps = {
    ListTask: string[];
    clearTask: (index: number) => void;
    clearAllTasks: () => void;
}

export default function ListTask({ListTask, clearTask, clearAllTasks} :ListTaskProps) {
    return (
        <>
            <ul className={`${styles.listaItem} flex`}>
                {ListTask.map((item, index) => (
                    <li key={index} className={`flex`}>
                        {item}
                        <button type='button' className={`flex`} onClick={() => clearTask(index)}>
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
            <div className={`${styles.buttonLimpar} flex`}>
                <p>Você possui {ListTask.length === 1 ? `${ListTask.length} tarefa` : `${ListTask.length} tarefas`}</p>
                <button type='button' onClick={() => clearAllTasks()}>Limpar</button>
            </div>
        </>
    )
}
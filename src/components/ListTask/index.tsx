import styles from './ListTask.module.scss';

type ListTaskProps = {
    ListTask: string[];
}

export default function ListTask({ListTask} :ListTaskProps) {
    return (
        <>
            <ul className={`${styles.listaItem} flex`}>
                {ListTask.map((item, index) => (
                    <li key={index} className={`flex`}>
                        {item}
                        <button>X</button>
                    </li>
                ))}
            </ul>
            <p>Você possui {ListTask.length === 1 ? `${ListTask.length} tarefa` : `${ListTask.length} tarefas`}</p>
        </>
    )
}
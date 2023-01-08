import styles from './ListTask.module.scss';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';

type ListTaskProps = {
    ListTask: string[];
    clearTask: (index: number) => void;
    clearAllTasks: () => void;
    // taskCheckedRearrange: (item: string, index: number) => void;
}

export default function ListTask({ListTask, clearTask, clearAllTasks} :ListTaskProps) {
    const [itemParaExcluir, setItemParaExcluir] = useState<number>();
    const [openModalLimpar, setOpenModalLimpar] = useState<boolean>(false);

    function taskChecked(index: number) {
        const item = document.querySelectorAll("li.item-list");
        item[index].classList.toggle(`${styles.itemCheck}`)
    }

    return (
        <>
            {(typeof itemParaExcluir == "number" || (openModalLimpar && ListTask)) && (
                <div className={`${styles.modalConfirmClearTask}`}>
                    <h2>Aviso</h2>
                    <p>
                        {!openModalLimpar ? `Realmente deseja excluir essa tarefa?` : `Realmente deseja excluir todos as tarefas?`}
                    </p>
                    <div className={`${styles.modalConfirmClearTask__buttons} flex`}>
                        <button type='button' onClick={() => {
                            if(!openModalLimpar && typeof itemParaExcluir == "number") {
                                clearTask(itemParaExcluir);
                                setItemParaExcluir(undefined);
                                return;
                            }
                            clearAllTasks();
                            setOpenModalLimpar(false)
                        }}>
                            Sim
                        </button>
                        <button type='button' onClick={() => {
                            setItemParaExcluir(undefined);
                            setOpenModalLimpar(false)
                        }}>
                            Não
                        </button>
                    </div>
                </div>
            )}
            <ul className={`${styles.listaItem} flex`}>
                {ListTask.map((item, index) => (
                    <li key={index} className={`flex item-list`}>
                        <input type="checkbox" name="checkTask" id="checkTask" onClick={() => {
                            taskChecked(index);
                            // taskCheckedRearrange(item, index);
                        }}/>
                        {item}
                        <button type='button' className={`flex`} onClick={() => {
                            setItemParaExcluir(index);
                        }}>
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
            <div className={`${styles.buttonLimpar} flex`}>
                <p>Você possui {ListTask.length === 1 ? `${ListTask.length} tarefa` : `${ListTask.length} tarefas`}</p>
                <button type='button' onClick={() => {
                    if(ListTask.length > 0) {
                        setOpenModalLimpar(true);
                        return;
                    }
                    alert("Você não possui tarefas para excluir :/");
                }}>Limpar</button>
            </div>
        </>
    )
}
import styles from './ListTask.module.scss';
import { useState } from 'react';
import ListItem from '../ListItem';
import { Tarefa } from '../../models/Tarefa';

type ListTaskProps = {
    ListTask: Tarefa[];
    clearTask: (index: number) => void;
    clearAllTasks: () => void;
    handleTarefaConcluida: (id: number, titulo: string, concluido: boolean) => void;
}

export default function ListTask({ListTask, clearTask, clearAllTasks, handleTarefaConcluida} :ListTaskProps) {
    const [itemParaExcluir, setItemParaExcluir] = useState<number>();
    const [openModalLimpar, setOpenModalLimpar] = useState<boolean>(false);

    function handleItemParaExcluir(id: number) {
        setItemParaExcluir(id)
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
            <ul className={`${styles.listTask} flex`}>
                {ListTask.map((item, index) => (
                    <ListItem
                        key={index}
                        item={item}
                        setItemParaExcluir={handleItemParaExcluir}
                        handleTarefaConcluida={handleTarefaConcluida}
                    />
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
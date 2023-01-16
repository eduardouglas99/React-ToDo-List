import styles from './ListTask.module.scss';
import { useState } from 'react';
import ListItem from '../ListItem';
import { Tarefa } from '../../models/Tarefa';

type ListTaskProps = {
    ListTask: Tarefa[];
    clearTask: (item: Tarefa) => void;
    clearAllTasks: () => void;
    handleTarefaConcluida: (id: number, titulo: string, concluido: boolean) => void;
    undoAction: (itemSalvo: Tarefa) => void;
}

export default function ListTask({ListTask, clearTask, clearAllTasks, handleTarefaConcluida, undoAction} :ListTaskProps) {
    const [itemParaExcluir, setItemParaExcluir] = useState<Tarefa>();
    const [openModalLimpar, setOpenModalLimpar] = useState<boolean>(false);

    const temTarefasAFazer = ListTask.find(tarefa => !tarefa.concluido) !== undefined;
    const temTarefasConcluidas = ListTask.find(tarefa => tarefa.concluido) !== undefined;

    const desfazerOpen = !openModalLimpar && itemParaExcluir != undefined;

    function handleItemParaExcluir(item: Tarefa) {
        setItemParaExcluir(item);
    }

    return (
        <>
            {openModalLimpar && (
                <div className={`${styles.containerModal} flex container`}>
                    <div className={`${styles.containerModal__modalConfirmClearTask} flex`}>
                        <h2>Aviso</h2>
                        <p>
                            {itemParaExcluir != undefined ? `Realmente deseja excluir essa tarefa?` : `Realmente deseja excluir todos as tarefas?`}
                        </p>
                        <div className={`${styles.containerModal__modalConfirmClearTask__buttons} flex`}>
                            <button type='button' onClick={() => {
                                if(itemParaExcluir != undefined) {
                                    clearTask(itemParaExcluir);
                                    setOpenModalLimpar(false);
                                    setTimeout(() => {
                                        setItemParaExcluir(undefined);
                                    }, 5000)
                                    return;
                                }
                                clearAllTasks();
                                setOpenModalLimpar(false);
                            }}>
                                Sim
                            </button>
                            <button type='button' onClick={() => {
                                setItemParaExcluir(undefined);
                                setOpenModalLimpar(false);
                            }}>
                                Não
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {desfazerOpen ? (
                <div className={`${styles.containerUndoAction} ${styles.efeitoAtivo}  flex`}>
                    <button type='button' onClick={() => {
                        undoAction(itemParaExcluir);
                        setItemParaExcluir(undefined);
                    }}>
                        Desfazer ação
                    </button>
                </div>
            ): null}
            {ListTask.length > 0 && (
                <>
                    {temTarefasAFazer ? (
                        <ul className={`${styles.listTask} flex`}>
                            {ListTask.map((item) => {
                                if(!item.concluido) {
                                    return (
                                        <ListItem
                                            key={item.id}
                                            item={item}
                                            setItemParaExcluir={item => {
                                                handleItemParaExcluir(item);
                                                setOpenModalLimpar(true);
                                            }}
                                            handleTarefaConcluida={handleTarefaConcluida}
                                        />
                                    );
                                }
                            })}
                        </ul>
                    ) : null }
                    {temTarefasConcluidas ? (
                        <ul className={`${styles.listTask} flex`}>
                            {ListTask.map((item, index) => {
                                if(item.concluido){
                                    return(                            
                                        <ListItem
                                            key={index}
                                            item={item}
                                            setItemParaExcluir={item => {
                                                handleItemParaExcluir(item);
                                                setOpenModalLimpar(true);
                                            }}
                                            handleTarefaConcluida={handleTarefaConcluida}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    ) : null }
                    <div className={`${styles.buttonLimpar} flex`}>
                        <p>Você possui {ListTask.length === 1 ? `${ListTask.length} tarefa` : `${ListTask.length} tarefas`}</p>
                        <button type='button' onClick={() => {
                            if(ListTask.length > 0) {
                                setOpenModalLimpar(true);
                                return;
                            }   
                        }}>Limpar</button>
                        
                    </div>
                </>
            )}
        </>
    )
}
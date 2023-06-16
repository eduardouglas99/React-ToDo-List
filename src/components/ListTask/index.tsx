import styles from "./ListTask.module.scss";
import ListItem from "../ListItem";
import { useTarefaContext } from "../../common/context/Tarefa";

export default function ListTask() {
  const { listTaks, clearTask, clearAllTasks, undoAction, itemParaExcluir, setItemParaExcluir, 
  openModalLimpar, setOpenModalLimpar} = useTarefaContext();

  const temTarefasAFazer = listTaks.find((tarefa) => !tarefa.concluido) !== undefined;
  const temTarefasConcluidas = listTaks.find((tarefa) => tarefa.concluido) !== undefined;
  const desfazerOpen = !openModalLimpar && itemParaExcluir != undefined;

  return (
    <>
      {openModalLimpar && (
        <div className={`${styles.containerModal} flex container`}>
          <div
            className={`${styles.containerModal__modalConfirmClearTask} flex`}
          >
            <h2>Aviso</h2>
            <p>
              {itemParaExcluir != undefined
                ? `Realmente deseja excluir essa tarefa?`
                : `Realmente deseja excluir todos as tarefas?`}
            </p>
            <div
              className={`${styles.containerModal__modalConfirmClearTask__buttons} flex`}
            >
              <button
                type="button"
                onClick={() => {
                  if (itemParaExcluir != undefined) {
                    clearTask(itemParaExcluir);
                    setOpenModalLimpar(false);
                    setTimeout(() => {
                      setItemParaExcluir(undefined);
                    }, 5000);
                    return;
                  }
                  clearAllTasks();
                  setOpenModalLimpar(false);
                }}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => {
                  setItemParaExcluir(undefined);
                  setOpenModalLimpar(false);
                }}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      {desfazerOpen ? (
        <div
          className={`${styles.containerUndoAction} ${styles.efeitoAtivo}  flex`}
        >
          <button
            type="button"
            onClick={() => {
              undoAction(itemParaExcluir);
              setItemParaExcluir(undefined);
            }}
          >
            Desfazer ação
          </button>
        </div>
      ) : null}
      <>
        {temTarefasAFazer ? (
          <ul className={`${styles.listTask} flex`}>
            {listTaks.map((item) => {
              if (!item.concluido) {
                return <ListItem key={item.id} item={item} />;
              }
            })}
          </ul>
        ) : null}
        {temTarefasConcluidas ? (
          <ul className={`${styles.listTask} flex`}>
            {listTaks.map((item, index) => {
              if (item.concluido) {
                return <ListItem key={index} item={item} />;
              }
            })}
          </ul>
        ) : null}
        <div className={`${styles.buttonLimpar} flex`}>
          <p>
            Você possui{" "}
            {listTaks.length === 1
              ? `${listTaks.length} tarefa`
              : `${listTaks.length} tarefas`}
          </p>
          <button
            type="button"
            disabled={listTaks.length <= 0}
            onClick={() => {
              if (listTaks.length > 0) {
                setOpenModalLimpar(true);
                return;
              }
            }}
          >
            Limpar
          </button>
        </div>
      </>
    </>
  );
}

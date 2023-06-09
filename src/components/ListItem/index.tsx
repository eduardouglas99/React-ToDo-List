import {FaTrash} from 'react-icons/fa';
import { Tarefa } from '../../models/Tarefa';
import styles from "./ListItem.module.scss";
import { TbCheck } from 'react-icons/tb';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useTarefaContext } from '../../common/context/Tarefa';

type ListProps = {
    item: Tarefa;
    setItemParaExcluir: (item: Tarefa) => void;
}

export default function ListItem({item, setItemParaExcluir} : ListProps) {
    const { handleCompletedTask  } = useTarefaContext();

    return (
        <li className={`flex ${styles.listTaskItem} ${item.concluido ? `${styles.itemActive}` : ``}`}>
            {item.concluido ? (
                <TbCheck className={`${styles.iconCheckTask}`} onClick={() => {
                    handleCompletedTask(item.id, item.titulo, item.concluido);
                }}/>
            ) : (
                <ImCheckboxUnchecked className={`${styles.iconUncheckTask}`} onClick={() => {
                    handleCompletedTask(item.id, item.titulo, item.concluido);
                }}/>
            )}
            {item.titulo}
            <button type='button' className={`flex`} onClick={() => setItemParaExcluir(item)}>
                <FaTrash />
            </button>
        </li>
    )
}
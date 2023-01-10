import {FaTrash} from 'react-icons/fa';
import { Tarefa } from '../../models/Tarefa';
import styles from "./ListItem.module.scss";
import { TbCheck } from 'react-icons/tb';
import { ImCheckboxUnchecked } from 'react-icons/im';

type ListProps = {
    item: Tarefa;
    setItemParaExcluir: (id: number) => void;
    handleTarefaConcluida: (id: number, titulo: string, concluido: boolean) => void;
}

export default function ListItem({item, setItemParaExcluir, handleTarefaConcluida} : ListProps) {

    return (
        <li className={`flex ${styles.listTaskItem} ${item.concluido ? `${styles.itemActive}` : ``}`}>
            {item.concluido ? (
                <TbCheck className={`${styles.iconCheckTask}`} onClick={() => {
                    handleTarefaConcluida(item.id, item.titulo, item.concluido);
                }}/>
            ) : (
                <ImCheckboxUnchecked className={`${styles.iconUncheckTask}`} onClick={() => {
                    handleTarefaConcluida(item.id, item.titulo, item.concluido);
                }}/>
            )}
            {item.titulo}
            <button type='button' className={`flex`} onClick={() => { setItemParaExcluir(item.id) }}>
                <FaTrash />
            </button>
        </li>
    )
}
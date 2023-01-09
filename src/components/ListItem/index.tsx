import {FaTrash} from 'react-icons/fa';
import { Tarefa } from '../../models/Tarefa';
import styles from "./ListItem.module.scss";

type ListProps = {
    item: Tarefa;
    setItemParaExcluir: (id: number) => void;
    handleTarefaConcluida: (id: number, titulo: string, concluido: boolean) => void;
}

export default function ListItem({item, setItemParaExcluir, handleTarefaConcluida} : ListProps) {
    return (
        <li className={`flex item-list ${item.concluido ? `${styles.itemActive}` : ``}`}>
            <input type="checkbox" name="checkTask" id="checkTask" onClick={() => {
                handleTarefaConcluida(item.id, item.titulo, item.concluido);
            }}/>
            {item.titulo}
            <button type='button' className={`flex`} onClick={() => { setItemParaExcluir(item.id) }}>
                <FaTrash />
            </button>
        </li>
    )
}
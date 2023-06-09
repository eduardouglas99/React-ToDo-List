import FormTask from "../../components/FormTask";
import ListTask from "../../components/ListTask";
import styles from "./Home.module.scss";
import logoHome from "../../assets/images/logo-todo-list.png";
import { TarefaProvider, useTarefaContext } from "../../common/context/Tarefa";

const Home = () => {
  const { listTaks, feedback } = useTarefaContext();

  return (
    <div className="App">
      <div className={`${styles.container} container flex`}>
        <div className={`${styles.container__modalCenter} flex`}>
          <img
            src={logoHome}
            alt="Todo list"
            title="Todo list"
            width={180}
            height={140}
          />
          <FormTask />
            {feedback && (
              <p className={`${styles.container__modalCenter__feedbackError}`}>
                Por favor, digite uma{" "}
                {listTaks.length > 0 ? `nova tarefa.` : `tarefa.`}
              </p>
            )}
          <ListTask />
        </div>
      </div>
    </div>
  );
};

export default Home;

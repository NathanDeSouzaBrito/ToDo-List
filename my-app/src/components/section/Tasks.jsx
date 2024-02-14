import React, { useReducer } from "react";
import style from "./Tasks.module.css";
import Notice from "./Notice.jsx";
import { v4 as uuidv4 } from "uuid";
import NoticeEdit from "./NoticeEdit.jsx";

const initialState = {
  tasks: [],
  taskToDelete: null,
  taskToEdit: null,
  isModalOpen: false,
  isEditModalOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return { ...state, taskToEdit: action.payload, isEditModalOpen: true };
    case "DELETE_TASK":
      return { ...state, taskToDelete: action.payload, isModalOpen: true };
    case "CONFIRM_DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.taskToDelete.id),
        isModalOpen: false,
        taskToDelete: null,
      };
    case "CANCEL_DELETE_TASK":
      return { ...state, isModalOpen: false };
    case "CONFIRM_EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.taskToEdit.id ? { ...task, editing: true } : task
        ),
        isEditModalOpen: false,
        taskToEdit: null,
      };
    case "CANCEL_EDIT_TASK":
      return { ...state, isEditModalOpen: false };
    case "UPDATE_TASK_TEXT":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
      };
    case "COMPLETE_EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, editing: false } : task
        ),
      };
    default:
      throw new Error();
  }
}

function Tasks() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTasks = () => {
    const text = prompt("Digite a nova tarefa:");
    if (text === null || text.trim() === "") {
      return;
    }
    const id = uuidv4();
    dispatch({ type: "ADD_TASK", payload: { id, text, editing: false } });
  };

  const handleEdit = (id) => {
    const task = state.tasks.find((task) => task.id === id);
    dispatch({ type: "EDIT_TASK", payload: task });
  };

  const handleDelete = (id) => {
    const task = state.tasks.find((task) => task.id === id);
    dispatch({ type: "DELETE_TASK", payload: task });
  };

  const handleConfirm = () => {
    dispatch({ type: "CONFIRM_DELETE_TASK" });
  };

  const handleCancel = () => {
    dispatch({ type: "CANCEL_DELETE_TASK" });
  };

  const handleEditConfirm = () => {
    dispatch({ type: "CONFIRM_EDIT_TASK" });
  };

  const handleEditCancel = () => {
    dispatch({ type: "CANCEL_EDIT_TASK" });
  };

  return (
    <main className={style.main}>
      <div className={style.title}>
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      </div>
      {!state.isModalOpen && !state.isEditModalOpen && (
        <article className={style.article}>
          <ol className={style.ol}>
            <li>Tarefas</li>
            <li>Status</li>
            <li>Opções</li>
          </ol>

          {/* DIVIDER BAR */}
          <div className={style.dividerBar}></div>
          {/* LINE OF TASK "LIMPAR A CASA" */}
          <div className={style.lineOfTasks}>
            <p title="Tarefa" className={style.p}>
              Limpar a casa
            </p>
            {/* BOX */}
            <div className={style.box}>
              <input id={style.box} type="checkbox" />
            </div>

            {/* BUTTONS */}
            <div className={style.svg}>
              {/* BUTTON OF EDIT */}
              <button
                title="Editar"
                className={style.btn}
                onClick={() => handleEdit(task.id)}
              >
                <svg
                  id={style.svg}
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.1458 11.1562L21.9479 5.90625L23.9896 4.15625C24.5486 3.67708 25.2355 3.4375 26.0502 3.4375C26.8649 3.4375 27.5513 3.67708 28.1094 4.15625L30.151 5.90625C30.7101 6.38542 31.0017 6.96375 31.026 7.64125C31.0503 8.31875 30.783 8.89667 30.224 9.375L28.1458 11.1562ZM26.0312 13L10.5729 26.25H4.375V20.9375L19.8333 7.6875L26.0312 13Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* BUTTON OF DELETE */}
              <button
                title="Deletar"
                className={style.btn}
                onClick={() => handleDelete(task.id)}
              >
                <svg
                  id={style.svg}
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74999 23.75C8.74999 25.125 10.0625 26.25 11.6667 26.25H23.3333C24.9375 26.25 26.25 25.125 26.25 23.75V11.25C26.25 9.875 24.9375 8.75 23.3333 8.75H11.6667C10.0625 8.75 8.74999 9.875 8.74999 11.25V23.75ZM26.25 5H22.6042L21.5687 4.1125C21.3062 3.8875 20.9271 3.75 20.5479 3.75H14.4521C14.0729 3.75 13.6937 3.8875 13.4312 4.1125L12.3958 5H8.74999C7.94791 5 7.29166 5.5625 7.29166 6.25C7.29166 6.9375 7.94791 7.5 8.74999 7.5H26.25C27.0521 7.5 27.7083 6.9375 27.7083 6.25C27.7083 5.5625 27.0521 5 26.25 5Z"
                    fill="white"
                  />
                </svg>
                ;
              </button>
            </div>
          </div>

          {/* LINE OF TASK "RESPONDER E-MAILS" */}
          <div className={style.lineOfTasks}>
            <p title="Tarefa" className={style.p}>
              Responder e-mails
            </p>
            {/* BOX */}
            <div className={style.box}>
              <input id={style.box} type="checkbox" />
            </div>

            {/* BUTTONS */}
            <div className={style.svg}>
              {/* BUTTON OF EDIT */}
              <button
                title="Editar"
                className={style.btn}
                onClick={() => handleEdit(task.id)}
              >
                <svg
                  id={style.svg}
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.1458 11.1562L21.9479 5.90625L23.9896 4.15625C24.5486 3.67708 25.2355 3.4375 26.0502 3.4375C26.8649 3.4375 27.5513 3.67708 28.1094 4.15625L30.151 5.90625C30.7101 6.38542 31.0017 6.96375 31.026 7.64125C31.0503 8.31875 30.783 8.89667 30.224 9.375L28.1458 11.1562ZM26.0312 13L10.5729 26.25H4.375V20.9375L19.8333 7.6875L26.0312 13Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* BUTTON OF DELETE */}
              <button
                title="Deletar"
                className={style.btn}
                onClick={() => handleDelete(task.id)}
              >
                <svg
                  id={style.svg}
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74999 23.75C8.74999 25.125 10.0625 26.25 11.6667 26.25H23.3333C24.9375 26.25 26.25 25.125 26.25 23.75V11.25C26.25 9.875 24.9375 8.75 23.3333 8.75H11.6667C10.0625 8.75 8.74999 9.875 8.74999 11.25V23.75ZM26.25 5H22.6042L21.5687 4.1125C21.3062 3.8875 20.9271 3.75 20.5479 3.75H14.4521C14.0729 3.75 13.6937 3.8875 13.4312 4.1125L12.3958 5H8.74999C7.94791 5 7.29166 5.5625 7.29166 6.25C7.29166 6.9375 7.94791 7.5 8.74999 7.5H26.25C27.0521 7.5 27.7083 6.9375 27.7083 6.25C27.7083 5.5625 27.0521 5 26.25 5Z"
                    fill="white"
                  />
                </svg>
                ;
              </button>
            </div>
          </div>
          {state.tasks.map((task) => (
            <div id={style.list} className={style.lineOfTasks} key={task.id}>
              {/* LINE OF ADD TASK */}
              {task.editing ? (
                <input
                  id={style.editing}
                  value={task.text}
                  onChange={(e) => {
                    const text = e.target.value;
                    dispatch({
                      type: "UPDATE_TASK_TEXT",
                      payload: { ...task, text },
                    });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      dispatch({ type: "COMPLETE_EDIT_TASK", payload: task });
                    }
                  }}
                  onBlur={() => {
                    dispatch({ type: "COMPLETE_EDIT_TASK", payload: task });
                  }}
                />
              ) : (
                <p title="Tarefa" className={style.p}>
                  {task.text}
                </p>
              )}

              {/* BOX */}
              <div className={style.box}>
                <input id={style.box} type="checkbox" />
              </div>

              {/* BUTTONS */}
              <div className={style.svg}>
                {/* BUTTON OF EDIT */}
                <button
                  title="Editar"
                  className={style.btn}
                  onClick={() => handleEdit(task.id)}
                >
                  <svg
                    id={style.svg}
                    width="35"
                    height="30"
                    viewBox="0 0 35 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.1458 11.1562L21.9479 5.90625L23.9896 4.15625C24.5486 3.67708 25.2355 3.4375 26.0502 3.4375C26.8649 3.4375 27.5513 3.67708 28.1094 4.15625L30.151 5.90625C30.7101 6.38542 31.0017 6.96375 31.026 7.64125C31.0503 8.31875 30.783 8.89667 30.224 9.375L28.1458 11.1562ZM26.0312 13L10.5729 26.25H4.375V20.9375L19.8333 7.6875L26.0312 13Z"
                      fill="white"
                    />
                  </svg>
                </button>

                {/* BUTTON OF DELETE */}
                <button
                  title="Deletar"
                  className={style.btn}
                  onClick={() => handleDelete(task.id)}
                >
                  <svg
                    id={style.svg}
                    width="35"
                    height="30"
                    viewBox="0 0 35 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.74999 23.75C8.74999 25.125 10.0625 26.25 11.6667 26.25H23.3333C24.9375 26.25 26.25 25.125 26.25 23.75V11.25C26.25 9.875 24.9375 8.75 23.3333 8.75H11.6667C10.0625 8.75 8.74999 9.875 8.74999 11.25V23.75ZM26.25 5H22.6042L21.5687 4.1125C21.3062 3.8875 20.9271 3.75 20.5479 3.75H14.4521C14.0729 3.75 13.6937 3.8875 13.4312 4.1125L12.3958 5H8.74999C7.94791 5 7.29166 5.5625 7.29166 6.25C7.29166 6.9375 7.94791 7.5 8.74999 7.5H26.25C27.0521 7.5 27.7083 6.9375 27.7083 6.25C27.7083 5.5625 27.0521 5 26.25 5Z"
                      fill="white"
                    />
                  </svg>
                  ;
                </button>
              </div>
            </div>
          ))}

          {/* LINE OF ADD TASKS */}
          <div className={style.lineOfAddTasks}>
            <p className={style.p}>Nova tarefa...</p>

            {/* BUTTON OF ADD TASK */}
            <button
              className={style.btn}
              onClick={addTasks}
              title="Adicionar tarefa"
            >
              <svg
                id={style.more}
                width="30"
                height="25"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2688 5.446V7.574H7.55681V12.704H5.16281V7.574H0.450813V5.446H5.16281V0.316H7.55681V5.446H12.2688Z"
                  fill="white"
                />
              </svg>
              ;
            </button>
          </div>
        </article>
      )}
      <Notice
        isOpen={state.isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        taskName={state.taskToDelete ? state.taskToDelete.text : ""}
      />
      <NoticeEdit
        isOpen={state.isEditModalOpen}
        onConfirm={handleEditConfirm}
        onCancel={handleEditCancel}
        taskName={state.taskToEdit ? state.taskToEdit.text : ""}
      />
    </main>
  );
}

export default Tasks;

import style from "./Notice.module.css";

const Notice = ({ isOpen, onConfirm, onCancel, taskName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.noticeGeneral}>
      {/* NOTICE FOR REMOVE */}

      <div className={style.notice}>
        <div className={style.div}>
          <h1 className={style.question}>Deseja excluir esse item?</h1>
        </div>
        <div className={style.div}>
          <p className={style.description}>{taskName}</p>
        </div>
        <div className={style.divBtn}>
          <button onClick={onCancel} className={style.btnN}>
            Não
          </button>
          <button onClick={onConfirm} className={style.btnS}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;

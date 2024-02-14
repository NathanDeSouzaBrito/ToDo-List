import style from "./Notice.module.css";

const NoticeEdit = ({ isOpen, onConfirm, onCancel, taskName }) => {
  if (!isOpen) {
    return null;
  }

  // NOTICE FOR EDIT
  return (
    <div className={style.noticeGeneral}>
      <div>
        <div className={style.notice}>
          <div className={style.div}>
            <h1 className={style.question}>Deseja editar esse item?</h1>
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
    </div>
  );
};

export default NoticeEdit;

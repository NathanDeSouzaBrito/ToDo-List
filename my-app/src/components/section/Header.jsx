import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.organization}>Organização</h1>
      <h1 className={style.tasks}>Tarefas</h1>
    </header>
  );
};

export default Header;

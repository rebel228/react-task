import styles from './loader.module.scss';

export default function Loader(props: { big?: boolean }) {
  return (
    <div
      className={props.big ? `${styles.wrapper} ${styles.big}` : styles.wrapper}
    >
      <div className={styles.loader}></div>
    </div>
  );
}

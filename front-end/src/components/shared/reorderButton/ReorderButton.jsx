import styles from './ReorderButton.module.css';

function ReorderButton({ onMoveLeft, onMoveRight, disableLeft, disableRight }) {
  return (
    <div className={styles.reorderButtonCont}>
      <button
        className={styles.leftButton}
        onClick={onMoveLeft}
        disabled={disableLeft}
      >
        &larr;  {/* This shows a left arrow emoji */}
      </button>

      <button
        className={styles.rightButton}
        onClick={onMoveRight}
        disabled={disableRight}
      >
        &rarr; {/* This shows a right arrow emoji */}
      </button>
    </div>
  );
}

export default ReorderButton;
import styles from './ReorderButton.module.css';

function ReorderButton({ onMoveLeft, onMoveRight, disableLeft, disableRight }) {
  return (
    <div className="reorderButtonCont">
      <button
        className="leftButton"
        onClick={onMoveLeft}
        disabled={disableLeft}
      >
        &larr;  {/* This shows a left arrow emoji */}
      </button>
      
      <button
        className="rightButton"
        onClick={onMoveRight}
        disabled={disableRight}
      >
        &rarr; {/* This shows a right arrow emoji */}
      </button>
    </div>
  );
}

export default ReorderButton;
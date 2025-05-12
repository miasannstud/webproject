import styles from './ThankYou.module.css';

function ThankYou() {
  return (
    <div className={styles.thankYouContainer}>
      <h1>Thank you for your participation!</h1>
      <p>Your responses have been recorded successfully.</p>
    </div>
  );
}

export default ThankYou;
import styles from './ExpireCard.module.css';

const ExpireDate = ({ expirationDate, onChange }) => {
  return (
    <div className={styles.expireContainer}>
      <div className={styles.expireCard}>
      <h2>Expiration Date</h2>
      <label htmlFor="expirationDate">
        Select Expiration Date:
      </label>
      <input
        id="expirationDate"
        type="date"
        value={expirationDate ? expirationDate.split('T')[0] : ''}
        onChange={e => onChange(e.target.value)}
      /></div>
    </div>
  );
};

export default ExpireDate;
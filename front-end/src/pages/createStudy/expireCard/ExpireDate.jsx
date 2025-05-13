const ExpireDate = ({ expirationDate, onChange }) => {
  return (
    <div>
      <label htmlFor="expirationDate">
        Expiration Date
      </label>
      <input
        id="expirationDate"
        type="date"
        value={expirationDate ? expirationDate.split('T')[0] : ''}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default ExpireDate;
import styles from './DemographicsForm.module.css';

function DemographicsForm({ demographics, onChange, onSubmit }) {
  const handleAgeChange = (e) => {
    onChange({ ...demographics, age: e.target.value });
  };

  const handleGenderChange = (e) => {
    onChange({ ...demographics, gender: e.target.value });
  };

  return (
    <div className={styles.demographicsContainer}>
      <h2>Please Provide Your Demographics</h2>
      <div className={styles.formGroup}>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={demographics.age}
          onChange={handleAgeChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={demographics.gender}
          onChange={handleGenderChange}
        >
          <option value="" disabled>Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>
      {/* Next button specific to demographics step */}
      <button className={styles.submitButton} onClick={onSubmit}>
        Next
      </button>
    </div>
  );
}

export default DemographicsForm;

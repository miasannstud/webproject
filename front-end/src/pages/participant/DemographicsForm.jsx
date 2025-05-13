import styles from './DemographicsForm.module.css';
import { getNames } from 'country-list';

const countries = getNames();

const demographicOptions = {
  age: {
    label: "Age",
    render: (value, onChange) => (
      <input
        id="age"
        type="number"
        value={value || ""}
        onChange={e => onChange("age", e.target.value)}
      />
    ),
  },
  gender: {
    label: "Gender",
    render: (value, onChange) => (
      <select
        id="gender"
        value={value || ""}
        onChange={e => onChange("gender", e.target.value)}
      >
        <option value="" disabled>Select...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Prefer not to say</option>
      </select>
    ),
  },
  education: {
    label: "Education",
    render: (value, onChange) => (
      <select
        id="education"
        value={value || ""}
        onChange={e => onChange("education", e.target.value)}
      >
        <option value="" disabled>Select...</option>
        <option value="High school">High school</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        <option value="PhD">PhD</option>
        <option value="Other">Other</option>
      </select>
    ),
  },
  country: {
    label: "Country",
    render: (value, onChange) => (
      <select
        id="country"
        value={value || ""}
        onChange={e => onChange("country", e.target.value)}
      >
        <option value="" disabled>Select...</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    ),
  },
};

function DemographicsForm({ demographicsList, demographics, onChange, onSubmit }) {

  const handleFieldChange = (key, value) => {
    onChange({ ...demographics, [key]: value });
  };

  return (
    <div className={styles.demographicsContainer}>
      <h2>Please Provide Your Demographics</h2>
      {demographicsList.map(key => {
        const option = demographicOptions[key];
        if (!option) return null;
        return (
          <div className={styles.formGroup} key={key}>
            <label htmlFor={key}>{option.label}:</label>
            {option.render(demographics[key], handleFieldChange)}
          </div>
        );
      })}
      <button className={styles.submitButton} onClick={onSubmit}>
        Next
      </button>
    </div>
  );
}

export default DemographicsForm;

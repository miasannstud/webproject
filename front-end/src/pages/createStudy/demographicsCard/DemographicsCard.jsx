import styles from "./DemographicsCard.module.css";
import { getNames } from 'country-list';

const countries = getNames();

const demographic_options = [
    { key: "age", label: "Age", type: "number" },
    { key: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { key: "education", label: "Education", type: "select", options: ["High school", "Bachelor's", "Master's", "PhD", "Other"] },
    { key: "country", label: "Country", type: "select", options: countries },
];

export default function DemographicsCard({ demographics, setDemographics }) {
    function toggleDemographic(key) {
        setDemographics(prev =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : [...prev, key]
        );
    }

    return (
        <div className={styles.artifactContainer}>
            <div className={styles.artifactCard}>
                <h2 className={styles.title}>Add Demographics</h2>
                <ul className={styles.optionsList}>
                    {demographic_options.map((q) => (
                        <li key={q.key} className={styles.optionItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={demographics.includes(q.key)}
                                    onChange={() => toggleDemographic(q.key)}
                                    className={styles.input}
                                />
                                {q.label}
                            </label>
                        </li>
                    ))}
                </ul>
                <h3 className={styles.subtitle}>Selected Demographic Questions:</h3>
                <ul className={styles.selectedList}>
                    {demographics.map((key) => {
                        const q = demographic_options.find((q) => q.key === key);
                        return <li key={key} className={styles.selectedItem}>{q?.label}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

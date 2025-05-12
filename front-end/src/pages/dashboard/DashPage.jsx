// this is my “parent” or “container” component for the dashboard
// Why Start in the “Container” Page?
// It’s easier to outline your interface when you have the main page’s skeleton in place.
// You see the data flow from the service/hook into child components right away.
// You can progressively refine child components without breaking the overall page structure.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchStudies from "../../hooks/useFetchStudies";
import DashCard from "./DashCard";
import styles from "./DashPage.module.css";

function DashPage() {
  const { studies, loading, error } = useFetchStudies();
  const [myStudies, setMyStudies] = useState([]);
  const navigate = useNavigate();

  const firstName = localStorage.getItem("firstName");
  const researcherId = localStorage.getItem('researcherId');

  useEffect(() => {
    if (!loading && !error) {
      setMyStudies(studies.filter(s => s.createdBy === researcherId));
    }
  }, [studies, loading, error, researcherId]);

  // remove a study from myStudies when the child signals it was deleted
  function handleStudyDeleted(deletedId) {
    setMyStudies(prev => prev.filter(s => s._id !== deletedId));
  }

  function handleCreateStudy() {
    navigate("/createStudy");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading studies</div>;

  return (
    <div className={styles.dashboardContainer}>
      {/* <h1>Hello {firstname}</h1> */}
      <h1>Hello, {firstName}!</h1>
      <div className={styles.createStudyContainer}>
        <p className={styles.createStudyText}>Create Study</p>
        <button data-testid="create-study-button" className={styles.createStudyButton} onClick={handleCreateStudy}>
          +
        </button>
      </div>

      <div className={styles.cardsContainer}>
        {myStudies.length > 0 ? (
          myStudies.map((study) => (
            <DashCard key={study._id} study={study} onStudyDeleted={handleStudyDeleted}/>
          ))
        ) : (
          <p>No studies found.</p>
        )}
      </div>
    </div>
  );
}

export default DashPage;

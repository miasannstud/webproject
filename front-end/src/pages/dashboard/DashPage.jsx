// this is my “parent” or “container” component for the dashboard
// Why Start in the “Container” Page?
// It’s easier to outline your interface when you have the main page’s skeleton in place.
// You see the data flow from the service/hook into child components right away.
// You can progressively refine child components without breaking the overall page structure.

import React from "react";
import useFetchStudies from "../../hooks/useFetchStudies";
import DashCard from "./DashCard";
import styles from "./DashPage.module.css";

function DashPage() {
  const { studies, loading, error } = useFetchStudies();

  console.log("Dashboard studies:", studies);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading studies</div>;

  return (
    <div className={styles.dashboardContainer}>
      {/* <h1>Hello {firstname}</h1> */}
      <h1>Hello</h1>
      <div className={styles.cardsContainer}>
        {studies && studies.length > 0 ? (
          studies.map((study) => <DashCard key={study._id} study={study} />)
        ) : (
          <p>No studies found.</p>
        )}
      </div>
    </div>
  );
}

export default DashPage;

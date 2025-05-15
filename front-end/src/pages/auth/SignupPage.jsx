
import SignupForm from "./forms/SignUpForm";
import styles from "./authPage.module.css"
import waveImg from "../../assets/wave.svg";

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <section className={styles.sections}>
        <img className={styles.waveImg} src={waveImg} alt="illustration of some waves" />
      </section>
      <section className={styles.sections}>
        <SignupForm />
      </section>
    </main>
  );
}
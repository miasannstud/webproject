import LoginForm from "./forms/LoginForm";
import styles from "./authPage.module.css";
import waveImg from "../../assets/wave.svg";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.sections}>
        <LoginForm />
      </section>

      <section className={styles.sections}>
        <img
          className={styles.waveImg}
          src={waveImg}
          alt="illustration of some waves"
        />
      </section>
    </main>
  );
}

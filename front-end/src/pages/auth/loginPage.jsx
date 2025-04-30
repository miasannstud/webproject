import LoginForm from "./LoginForm";

export default function LoginPage() {
  console.log("LoginPage rendered");
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
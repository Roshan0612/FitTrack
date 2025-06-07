const ForgotPassword = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <input type="email" placeholder="Enter your email" /><br />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

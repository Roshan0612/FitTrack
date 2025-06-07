const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Full Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <input type="password" placeholder="Confirm Password" /><br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { useFirebase } from "./context/Firebase";

export default function App() {
  const { user, signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, logoutUser, putData } = useFirebase();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignUp = () => {
    signupUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(() => {
        putData("users/akshay", { email: signUpEmail, password: signUpPassword });
        console.log("User signed up and data stored successfully");
      })
      .catch(error => {
        console.error("Error signing up:", error);
      });
  };

  const handleLogin = () => {
    loginUserWithEmailAndPassword(loginEmail, loginPassword)
      .then(() => {
        console.log("User logged in successfully");
      })
      .catch(error => {
        console.error("Error logging in:", error);
      });
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch(error => {
        console.error("Error logging out:", error);
      });
  };

  if (user === null) {
    return (
      <div>
        <div>
          <p>Sign Up</p>
          <label>Email: </label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={signUpEmail} 
            onChange={e => setSignUpEmail(e.target.value)} 
          />
          <label>Password: </label>
          <input 
            type="password" 
            placeholder="Enter your password"  
            value={signUpPassword} 
            onChange={e => setSignUpPassword(e.target.value)} 
          />
          <button onClick={handleSignUp}>Submit</button>
        </div>
  
        <div>
          <p>Login</p>
          <label>Email: </label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={loginEmail} 
            onChange={e => setLoginEmail(e.target.value)} 
          />
          <label>Password: </label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={loginPassword} 
            onChange={e => setLoginPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome, {user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}

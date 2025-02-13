import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/auth.css";

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

return (
    <div className="auth-container">
        <h2 className="auth-title">Restaurant Queueing System</h2>
        <div className="auth-box">
            <h3 className="auth-heading">{isLogin ? "Login" : "Sign Up"}</h3>
            <div className="auth-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
                <button onClick={handleAuth} className="auth-button" disabled={loading}>
                    {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                </button>
                <button onClick={() => setIsLogin(!isLogin)} className="switch-button">
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    </div>
);
};

export default Auth;

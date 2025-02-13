import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/Auth";
import RestaurantQueue from "./components/RestaurantQueue";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!user ? <Auth setUser={setUser} /> : <RestaurantQueue user={user} />}
    </div>
  );
};

export default App;

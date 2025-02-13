import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, where, getDocs, deleteDoc } from "firebase/firestore";
import "../styles/global.css";

const QueueSelection = ({ selectedHotel, role, user }) => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(localStorage.getItem("userId") || Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    localStorage.setItem("userId", userId);
    const q = query(collection(db, "queues"), where("hotelName", "==", selectedHotel), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQueue(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); 
    });
    return () => unsubscribe();
  }, [selectedHotel, userId]);

  const joinQueue = async () => {
    setLoading(true);
    const exists = queue.find(entry => entry.userId === userId && entry.hotelName === selectedHotel);
    if (exists) {
      alert("You are already in the queue for this hotel.");
      setLoading(false);
      return;
    }
    try {
      await addDoc(collection(db, "queues"), {
        hotelName: selectedHotel,
        status: "waiting",
        createdAt: new Date().toISOString(),
        userId,
      });
    } catch (error) {
      console.error("Error adding to queue:", error);
    }
    setLoading(false);
  };

  const cancelQueue = async () => {
    try {
      const q = query(
        collection(db, "queues"),
        where("hotelName", "==", selectedHotel),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const userEntry = snapshot.docs[0];
        await deleteDoc(doc(db, "queues", userEntry.id));
        alert("You have successfully canceled your queue entry.");
      } else {
        alert("You are not in the queue.");
      }
    } catch (error) {
      console.error("Error canceling queue:", error);
    }
  };

  const callNext = async () => {
    try {
      const q = query(
        collection(db, "queues"),
        where("hotelName", "==", selectedHotel),
        where("status", "==", "waiting"),
        orderBy("createdAt")
      );
  
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        const nextEntry = snapshot.docs[0];
        await updateDoc(doc(db, "queues", nextEntry.id), {
          status: "called",
        });
      } else {
        alert("No more customers in the queue.");
      }
    } catch (error) {
      console.error("Error calling next customer:", error);
    }
  };

  const clearQueue = async () => {
    try {
      const q = query(collection(db, "queues"), where("hotelName", "==", selectedHotel));
      const snapshot = await getDocs(q);
  
      const batchDelete = snapshot.docs.map(docItem => deleteDoc(doc(db, "queues", docItem.id)));
      await Promise.all(batchDelete);
      alert("Queue cleared successfully.");
    } catch (error) {
      console.error("Error clearing queue:", error);
    }
  };

  return (
    <div>
      <div className="queue-section">
        <h2>Queue for {selectedHotel}</h2>
        {role === "customer" && (
          <>
            <button className="button" onClick={joinQueue} disabled={loading}>Join Queue</button>
            <button className="button cancel" onClick={cancelQueue}>Cancel Queue</button>
          </>
        )}
        {role === "owner" && (
          <>
            <button className="button call-next" onClick={callNext}>Call Next</button>
            <button className="button clear" onClick={clearQueue}>Clear Queue</button>
          </>
        )}
        <ul className="queue-list">
          {queue
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((entry, index) => (
              <li key={entry.id} className="queue-item">
                {index + 1} - {entry.status}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default QueueSelection;

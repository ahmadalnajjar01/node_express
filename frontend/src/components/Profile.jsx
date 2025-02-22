import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true, // Include cookies
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Redirect to sign-in page if unauthorized
          navigate("/signin");
        } else {
          setError("Error fetching profile");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile">
      <h2>Profile</h2>
      {error && <p className="error">{error}</p>}
      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  // Hardcoded "My Challenges" data (initially empty, because the user hasn't joined any)
  const [challenges, setChallenges] = useState([]); 

  // Hardcoded "Available Challenges" data (populated by default)
  const [availableChallenges, setAvailableChallenges] = useState([
    {
      id: 3,
      type: 'Cycling',
      name: '50km Cycling Challenge',
      deadline: '2024-12-01',
      activity_id: 'A003',
      badge_id: 'B003'
    },
    {
      id: 4,
      type: 'Swimming',
      name: '2km Swimming Challenge',
      deadline: '2024-11-20',
      activity_id: 'A004',
      badge_id: 'B004'
    }
  ]);

  // Simulate data fetching
  useEffect(() => {
    fetchMyChallenges();
    fetchAvailableChallenges();
  }, []);

  // Function to fetch "My Challenges" (simulated)
  const fetchMyChallenges = () => {
    // Initially, user has no challenges
    setChallenges([]);
  };

  // Function to fetch "Available Challenges" (simulated)
  const fetchAvailableChallenges = () => {
    // Initially, available challenges are hardcoded
  };

  // Function to join a challenge
  const joinChallenge = (id) => {
    // Find the challenge the user is joining
    const challengeToJoin = availableChallenges.find(challenge => challenge.id === id);

    // Add the selected challenge to "My Challenges"
    setChallenges(prevChallenges => [...prevChallenges, challengeToJoin]);

    // Remove the selected challenge from "Available Challenges"
    setAvailableChallenges(prevAvailableChallenges => 
      prevAvailableChallenges.filter(challenge => challenge.id !== id)
    );

    alert(`You have joined the challenge: ${challengeToJoin.name}`);
  };

  return (
    <div className="container">
      <h1>My Challenges</h1>
      <table>
        <thead>
          <tr>
            <th>Challenge ID</th>
            <th>Challenge Type</th>
            <th>Challenge Name</th>
            <th>Challenge Deadline</th>
            <th>Activity ID</th>
            <th>Participants</th>
            <th>Badge ID</th>
            <th>Leaderboard</th>
          </tr>
        </thead>
        <tbody>
          {challenges.length === 0 ? (
            <tr>
              <td colSpan="8">You haven't joined any challenges yet.</td>
            </tr>
          ) : (
            challenges.map(challenge => (
              <tr key={challenge.id}>
                <td>{challenge.id}</td>
                <td>{challenge.type}</td>
                <td>{challenge.name}</td>
                <td>{challenge.deadline}</td>
                <td>{challenge.activity_id}</td>
                <td>{challenge.participants || 'N/A'}</td>
                <td>{challenge.badge_id}</td>
                <td>
                  <button onClick={() => alert('Viewing Leaderboard for Challenge ' + challenge.id)}>
                    Leaderboard
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h1>Available Challenges</h1>
      <table>
        <thead>
          <tr>
            <th>Challenge ID</th>
            <th>Challenge Type</th>
            <th>Challenge Name</th>
            <th>Challenge Deadline</th>
            <th>Activity ID</th>
            <th>Badge ID</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {availableChallenges.length === 0 ? (
            <tr>
              <td colSpan="7">No challenges available.</td>
            </tr>
          ) : (
            availableChallenges.map(challenge => (
              <tr key={challenge.id}>
                <td>{challenge.id}</td>
                <td>{challenge.type}</td>
                <td>{challenge.name}</td>
                <td>{challenge.deadline}</td>
                <td>{challenge.activity_id}</td>
                <td>{challenge.badge_id}</td>
                <td>
                  <button onClick={() => joinChallenge(challenge.id)}>Join</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

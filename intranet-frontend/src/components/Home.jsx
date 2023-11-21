import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [randomUser, setRandomUser] = useState(null);

    useEffect(() => {
      const getRandomUser = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user/random-user');
          setRandomUser(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      };
  
      getRandomUser();
    }, []);
  return (
    <div>
      {randomUser && (
        <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-primary">Collaborateur aléatoire</h2>
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={randomUser.photo}
                alt=""
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <p className="card-text">
                <strong>Prénom:</strong> {randomUser.firstname}
              </p>
              <p className="card-text">
                <strong>Nom:</strong> {randomUser.lastname}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {randomUser.email}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {randomUser.phone}
              </p>
              <p className="card-text">
                <strong>Date de naissance :</strong> {randomUser.birthdate}
              </p>
              <p className="card-text">
                <strong>Ville:</strong> {randomUser.city}
              </p>
              <p className="card-text">
                <strong>Pays :</strong> {randomUser.country}
              </p>
              <p className="card-text text-muted">
                <em>{randomUser.category}</em>
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Home;

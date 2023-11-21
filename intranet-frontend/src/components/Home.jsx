import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [randomUser, setRandomUser] = useState(null);

    useEffect(() => {
        getRandomUser();
      }, []);
    
      const getRandomUser = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user/random-user');
          setRandomUser(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleSayHello = () => {
        getRandomUser();
      };
  return (
    <div>
      {randomUser && (
        <div className="card bg-light w-50 m-auto mt-5">
        <div className="card-body">
          <h2 className="card-title text-primary text-center">Collaborateur aléatoire</h2>
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
              <p className="card-text mt-5">
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
                <em className={`p-1 ${randomUser.category === 'Technique' ? 'border border-primary rounded bg-primary text-light' : randomUser.category === 'Marketing' ? 'border border-secondary rounded bg-secondary text-light' : randomUser.category === 'Client' ? 'border border-success rounded bg-success text-light' : ''}`}>{randomUser.category}</em>
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="text-center">
        <button className="btn btn-primary mt-5" onClick={handleSayHello}>
            Dire bonjour à quelqu'un d'autre
        </button>
      </div>
    </div>
  );
}

export default Home;

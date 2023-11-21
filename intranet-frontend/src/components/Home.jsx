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
      <h1>Page d'accueil</h1>
      {randomUser && (
        <div>
          <h2>Collaborateur aléatoire</h2>
          <p>Nom: {randomUser.firstname}</p>
          {/* Ajoutez d'autres informations sur le collaborateur ici */}
        </div>
      )}
    </div>
  );
}

export default Home;

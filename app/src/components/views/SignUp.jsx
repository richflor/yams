import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const URL_API = import.meta.env.VITE_APP_TITLE;

  const navigate = useNavigate();

  async function registerUser(event) {
    // event.preventDefault();

    axios.post(`${URL_API}/signup`, {
        email,
        password
    })
    .then(function (res) {

        const status = res.status;
        let message = "";

        if(status !== 201) {
            if (status === 400) {
                message = "L'un des identifiants est déjà utilisé pour un autre compte"
            } else {
                message = "Erreur Interne au Serveur"
            }
            return alert(message);   
        }

        console.log("signup successfull")
        // navigate('/login'); faire ça au niveau root
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <div>
      <form>
        <h1>S'inscrire</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Nom"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mot de passe"
        />
        <br />
        <button onClick={registerUser}>J'enregistre mon compte !</button>
        <a href="/login">Si tu as déjà un compte</a>
      </form>
    </div>
  );
}

export default SignUp;

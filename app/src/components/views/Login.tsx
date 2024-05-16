import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { addUser } from "../../store/slicers/User";
import { URL_API } from "../../config/envVar";
import { InfoUser } from "../../types/User";
import { useNavigate } from "react-router-dom";

export function Login () {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function loginUser() {

      axios.post<InfoUser>(`${URL_API}/login`, {
          email,
          password
      })
      .then(function (res) {
          const data = res.data;
          const status = res.status;
          let message = "";

          if(status !== 200) {
              switch (status) {
                  case 404:
                      message = "L'identifiant fourni ne corresspondent à aucun utilisateur"
                      break;
                  case 401:
                      message = "Mot de passe incorrect"
                      break;
                  default:
                      message = "Erreur Serveur"
                      break;
              }
              return alert(message)            
          }

          localStorage.setItem('token', data.token)
          dispatch(addUser(data));
          // navigate('/game'); faire ça au niveau root
      })
      .catch(function (error) {
          console.log(error);
      });

  }

  return (
    <Box sx={{}}>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <TextField
          value={email}
          label="Email"
          variant='outlined'
          inputProps={{
            required:true,
          }}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField
          value={password}
          label="Mot de passe"
          variant="outlined"
          inputProps={{
            required:true,
            type:"password"
          }}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button
          variant="contained"
          color="primary"
          onClick={()=> loginUser()}>
          <Typography variant="body1" color="white">Se connecter</Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={()=> navigate("/signup")}>
          <Typography variant="body1" color="white">Si vous n'êtes pas inscris</Typography>
        </Button>
      </Stack>
    </Box>
  );
}

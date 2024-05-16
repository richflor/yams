import { useState } from 'react';
import axios from 'axios';
import { URL_API } from '../../config/envVar';
import { SignupInfo } from '../../types/User';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser() {

        axios.post<SignupInfo>(`${URL_API}/signup`, {
            email,
            password
        })
            .then(function (res) {

                const status = res.status;
                let message = "";

                if (status !== 201) {
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
        <Box>
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
            <TextField
                value={name}
                label="Nom"
                variant='outlined'
                inputProps={{
                    required: true,
                }}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                value={email}
                label="Email"
                variant='outlined'
                inputProps={{
                    required: true,
                }}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                value={password}
                label="Mot de passe"
                //   variant="outlined"
                inputProps={{
                    required: true,
                    type: "password"
                }}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => registerUser()}>
                <Typography variant="body1" color="white">Confirmez votre inscription</Typography>
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/login")}>
                <Typography variant="body1" color="white">Se connecter</Typography>
            </Button>
        </Stack>
        </Box>
    );
}

export default SignUp;

import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import { Container } from '@mui/material';

function App() {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('chat.app:user');
  });
  const onSetUser = (user: string) => setUser(user);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {user ? <Chat user={user} /> : <Login onSetUser={onSetUser} />}
    </Container>
  );
}

export default App;

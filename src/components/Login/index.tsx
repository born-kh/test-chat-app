import React, { useState } from 'react';
import { createUser } from '../../configs/firebase';
import { Box, TextField, Button, Stack } from '@mui/material';

type LoginProps = {
  onSetUser: (value: string) => void;
};

const Login = ({ onSetUser }: LoginProps) => {
  const [name, setName] = useState<string>('');
  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await createUser({ name });
      setName('');
      onSetUser(user);
    } catch (e) {}
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <form onSubmit={handleCreateUser}>
        <Stack spacing={2} alignItems="center">
          <TextField
            hiddenLabel
            placeholder="Name"
            variant="outlined"
            value={name}
            onChange={handleOnChangeName}
          />
          <Button variant="contained" disabled={!name.trim().length}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;

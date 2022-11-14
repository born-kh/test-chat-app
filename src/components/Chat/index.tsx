import React, { useEffect, useState, useRef } from 'react';
import { firestore, sendMessage } from '../../configs/firebase';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import MessageItem from './MessageItem';
import { IMessage } from '../../types/Chat';
import { Stack, Button, TextField } from '@mui/material';

const Chat = ({ user }: { user: string }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageValue, setMessageValue] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value);
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage({
      user,
      text: messageValue,
      createdAt: Timestamp.now(),
    });
    setMessageValue('');
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IMessage[];
      const sortMessages = messages.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      setMessages(sortMessages);
    });
    return unsub;
  }, []);

  return (
    <Stack spacing={2} sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3, overflow: 'hidden' }}>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingLeft: 2,
          paddingRight: 2,
          overflowY: 'auto',
        }}
      >
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} currentUser={user} />
        ))}
        <div ref={scrollRef}></div>
      </Stack>
      <form onSubmit={handleSendMessage}>
        <Stack spacing={2} flexDirection="row" alignItems="center">
          <TextField
            hiddenLabel
            placeholder="Message..."
            variant="outlined"
            value={messageValue}
            onChange={onChangeMessage}
            fullWidth
          />
          <Button
            variant="contained"
            disabled={!messageValue.trim().length}
            style={{ marginLeft: 20, marginTop: 0 }}
            size="large"
          >
            Send
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Chat;

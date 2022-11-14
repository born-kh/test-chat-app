import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { IMessage } from '../../types/Chat';

type MessageItemProps = {
  message: IMessage;
  currentUser: string;
};
const MessageItem = ({ message, currentUser }: MessageItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: 1,
        borderRadius: 3,
        alignSelf: message.user === currentUser ? 'self-end' : 'self-start',
        maxWidth: 400,
      }}
    >
      <Typography variant="subtitle2" gutterBottom color={'primary'}>
        {message.user}
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ wordWrap: 'break-word' }}>
        {message.text}
      </Typography>
      <Typography variant="caption" display="block" sx={{ alignSelf: 'self-end' }}>
        {message.createdAt.toDate().toISOString()}
      </Typography>
    </Box>
  );
};

export default memo(MessageItem);

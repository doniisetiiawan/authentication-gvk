import React from 'react';
import MessageItem from '../../messageItem';

function MessageList({
  messages,
  onRemoveMessage,
  onEditMessage,
  authUser,
}) {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
          authUser={authUser}
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  );
}

export default MessageList;

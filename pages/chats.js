import React, { useState, useEffect, useContext } from 'react';

// both the chat and auth need access to same user state data
import { Context } from '../context';

// needed to route back to the auth page when user logs out
import { useRouter } from 'next/router';

// dynamic importing
import dynamic from 'next/dynamic';

const ChatEngine = dynamic(() =>
  import('react-chat-engine').then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import('react-chat-engine').then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  // check if document variable exists
  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push('/');
  });

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID="7f6f715f-d284-4503-a832-fa8fe36b1aaa"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}

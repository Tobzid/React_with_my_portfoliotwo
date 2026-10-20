import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, set } from 'firebase/database';
import './AdminChat.css';

function AdminChat() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef(null);

  // 1. Fetch active customer sessions
  useEffect(() => {
    const chatsRef = ref(db, 'chats');
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sessionList = Object.keys(data).map((key) => ({
          id: key,
          lastMessage: data[key].meta?.lastMessage || 'New inquiry',
          updatedAt: data[key].meta?.updatedAt || 0
        })).sort((a, b) => b.updatedAt - a.updatedAt);

        setSessions(sessionList);
        if (!activeSession && sessionList.length > 0) {
          setActiveSession(sessionList[0].id);
        }
      }
    });

    return () => unsubscribe();
  }, [activeSession]);

  // 2. Fetch live messages for active selected customer
  useEffect(() => {
    if (!activeSession) return;

    const messagesRef = ref(db, `chats/${activeSession}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setMessages(loaded);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [activeSession]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. Admin sends reply back to customer
  const handleAdminReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;

    const messagesRef = ref(db, `chats/${activeSession}/messages`);
    const newMsgRef = push(messagesRef);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    set(newMsgRef, {
      sender: 'admin',
      text: replyText.trim(),
      timestamp: Date.now(),
      time: timeString
    });

    setReplyText('');
  };

  return (
    <div className="admin-chat-container">
      {/* Sidebar: Customer Chat List */}
      <div className="admin-chat-sidebar">
        <h3 className="sidebar-title">Live Inquiries</h3>
        <div className="session-list">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`session-item ${s.id === activeSession ? 'active' : ''}`}
              onClick={() => setActiveSession(s.id)}
            >
              <div className="session-id">{s.id}</div>
              <div className="session-preview">{s.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel: Conversation Window */}
      <div className="admin-chat-main">
        {activeSession ? (
          <>
            <div className="admin-main-header">
              <h4>Chat Session: {activeSession}</h4>
            </div>

            <div className="admin-messages-body">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`admin-bubble-wrap ${m.sender === 'admin' ? 'admin' : 'customer'}`}
                >
                  <div className="admin-bubble">{m.text}</div>
                  <span className="admin-time">{m.time} ({m.sender})</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="admin-reply-form" onSubmit={handleAdminReply}>
              <input
                type="text"
                placeholder="Type reply as Dispatch Admin..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button type="submit">Send Reply</button>
            </form>
          </>
        ) : (
          <div className="no-session">Select a customer chat from the left panel to begin.</div>
        )}
      </div>
    </div>
  );
}

export default AdminChat;
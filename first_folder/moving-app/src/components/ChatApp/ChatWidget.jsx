import { useState, useEffect, useRef } from 'react';
import { FaComments, FaPaperPlane, FaTimes, FaUserTie } from 'react-icons/fa';
import { db } from "../firebase";
import { ref, push, onValue, set } from 'firebase/database';
import './ChatWidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  // 1. Generate or retrieve unique Session ID for visitor
  useEffect(() => {
    let existingId = localStorage.getItem('coastal_chat_session');
    if (!existingId) {
      existingId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('coastal_chat_session', existingId);
    }
    setSessionId(existingId);
  }, []);

  // 2. Listen to real-time message stream from Firebase for this session
  useEffect(() => {
    if (!sessionId) return;

    const chatRef = ref(db, `chats/${sessionId}/messages`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setMessages(loadedMessages);
      } else {
        // First-time auto-welcome message
        setMessages([
          {
            id: 'welcome',
            sender: 'admin',
            text: 'Hello! 👋 Welcome to Coastal Moving Services. How can we help with your upcoming move today?',
            time: 'Just now'
          }
        ]);
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // 3. Send User Message to Firebase
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId) return;

    const chatRef = ref(db, `chats/${sessionId}/messages`);
    const newMsgRef = push(chatRef);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    set(newMsgRef, {
      sender: 'user',
      text: inputValue.trim(),
      timestamp: Date.now(),
      time: timeString
    });

    // Update metadata for Admin list preview
    const metaRef = ref(db, `chats/${sessionId}/meta`);
    set(metaRef, {
      lastMessage: inputValue.trim(),
      updatedAt: Date.now(),
      status: 'active'
    });

    setInputValue('');
  };

  return (
    <div className="chat-widget-wrapper">
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Live Chat"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        {!isOpen && <span className="online-indicator"></span>}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-admin-info">
              <div className="chat-avatar-box">
                <FaUserTie />
                <span className="avatar-status"></span>
              </div>
              <div>
                <h4 className="chat-admin-name">Move Dispatch Agent</h4>
                <span className="chat-status-text">Online | Typical reply &lt; 2 min</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'admin-msg'}`}
              >
                <div className="message-bubble">{msg.text}</div>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask about rates, dates, or packing..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" disabled={!inputValue.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
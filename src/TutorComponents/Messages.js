import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import HeaderTutor from './HeaderTutor';
import './CSS/Messages.css';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [receiverId, setReceiverId] = useState(null);
  const [students, setStudents] = useState([]);
  const studentId = parseInt(localStorage.getItem('student_id'));
  const stompClientRef = useRef(null);
  const chatEndRef = useRef(null);

  // Fetch all students
  useEffect(() => {
    axios.get('http://localhost:8080/student/all')
      .then(response => setStudents(response.data))
      .catch(err => console.error('Failed to fetch students', err));
  }, []);

  // WebSocket connection
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/chat');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe(`/topic/${studentId}`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages(prev => [...prev, msg]);
        });
        console.log('Connected to WebSocket');
      },
      onStompError: (error) => {
        console.error('STOMP error:', error);
      }
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [studentId]);

  // Load previous messages when receiverId changes
  useEffect(() => {
    if (receiverId) {
      axios.get(`http://localhost:8080/api/messages?user1=${studentId}&user2=${receiverId}`)
        .then(res => setMessages(res.data))
        .catch(err => console.error('Failed to fetch messages', err));
    }
  }, [receiverId]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !receiverId) return;

    const messageDTO = {
      senderId: studentId,
      receiverId: receiverId,
      content: input
    };

    stompClientRef.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(messageDTO)
    });

    setMessages(prev => [...prev, {
      sender: { student_id: studentId },
      receiver: { student_id: receiverId },
      content: input,
      timestamp: new Date()
    }]);
    setInput('');
  };

  return (
    <div>
      <HeaderTutor />
      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-list">
          <h1 className="chats">Chats</h1>
          <ul>
            {students.filter(s => s.student_id !== studentId).map(student => (
              <li
                key={student.student_id}
                onClick={() => setReceiverId(student.student_id)}
                className={receiverId === student.student_id ? 'selected' : ''}
              >
                <span>{student.first_name} {student.last_name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {receiverId ? (
            <>
              <div className="chat-header">
                <h1 className="chat-username">
                  Chatting with {
                    students.find(s => s.student_id === receiverId)?.first_name || 'User'
                  }
                </h1>
              </div>

              <div className="chat-messages">
                {[...messages]
                  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                  .map((msg, index) => {
                    const senderName = students.find(s => s.student_id === msg.sender.student_id);
                    const displayName = senderName
                      ? `${senderName.first_name} ${senderName.last_name}`
                      : (msg.sender.student_id === studentId ? "You" : "Unknown");

                    const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div
                        key={index}
                        className={`message ${msg.sender.student_id === studentId ? 'sent' : 'received'}`}
                      >
                        <div className="message-header">
                          <div className="sender-name">{displayName}</div>
                          <div className="timestamp">{formattedTime}</div>
                        </div>
                        <div className="message-content">{msg.content}</div>
                      </div>
                    );
                  })}
                <div ref={chatEndRef} />
              </div>

              <div className="lower-chat">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="send-button" onClick={sendMessage}>➤</button>
              </div>
            </>
          ) : (
            <div className="chat-placeholder">
              <p>Select a student to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

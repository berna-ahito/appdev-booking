import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS('http://localhost:8080/chat'); // backend STOMP endpoint
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient.subscribe('/topic/messages', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    }
  });
  stompClient.activate();
};

export const sendMessage = (messageData) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(messageData),
    });
  }
};

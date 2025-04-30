import React from 'react';
import SideBarTutor from './SideBarTutor';
import HeaderTutor from './HeaderTutor';
import './CSS/Messages.css';
import juviePic from '../images/juviePic.jpg';
import kylePic from '../images/kylePic.jpg';
import bernaPic from '../images/bernaPic.jpg';
import alivioPic from '../images/alivioPic.jpg';


function Messages() {
  return (
    <div>
      <HeaderTutor />
      <SideBarTutor />
      
      <div className="chat-container">
        
        {/* Chat List */}
        <div className="chat-list">
          <h1 className="chats">Chats</h1>
          
          <div className="chat-message-preview">
          <img src={kylePic} alt="Kyle" className="profile-pic" />
          <div className="text-container">
            <p className="name">Kyle Sepulveda</p>
            <p className="message">This is a test</p>
          </div>
          </div>
          
          <div className="chat-message-preview">
          <img src={juviePic} alt="Juvie" className="profile-pic" />
          <div className="text-container">
            <p className="name">Juvie Coca</p>
            <p className="message">Hi everyone!</p>
          </div>
          </div>
        

        <div className="chat-message-preview">
          <img src={bernaPic} alt="Berna" className="profile-pic" />
          <div className="text-container">
            <p className="name">Bernadeth Ahito</p>
            <p className="message">Hi everyone!</p>
          </div>
          </div>

        <div className="chat-message-preview">
          <img src={alivioPic} alt="Blanche" className="profile-pic" />
          <div className="text-container">
            <p className="name">Blanche Alivio</p>
            <p className="message">Hi everyone!</p>
          </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-header">
            <img src={kylePic} alt="Profile" className="profile-pic" />
            <h1 className="chat-username">Kyle Sepulveda</h1>
          </div>
          
          <div className="chat-messages">
            {/* Messages will appear here */}
          </div>
          
          <div className="lower-chat">
            <input type="text" className="chat-input" placeholder="Aa" />
            <button className="send-button">➤</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Messages;

import React from 'react'
import HeaderTutor from './HeaderTutor'
import SideBarTutor from './SideBarTutor'

function HomeTutor() {
  return (
  <div>
    <HeaderTutor />
    <SideBarTutor />
      <div className='chat-container'>
        <div className='chat-box'>
          <h1>Chat with Students</h1>
          <div className='chat-message'>
            <p>Student: Hello, I need help with my homework.</p>
            <p>Tutor: Sure! What do you need help with?</p>
          </div>
      </div>
    </div>  
  </div>
  )
}

export default HomeTutor

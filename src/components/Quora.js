import React from 'react'
import './Quora.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget'


export default function Quora() {
  return (
    <div className='quora'>
        <Navbar />
    <div className="quora__contents">
      <div className="quora__content">
        <div  className='quora_sidebar'>
          <Sidebar />
        </div>
        
        <Feed />

        <div className='quora_widget'>
          <Widget />
        </div>
        
        
      </div>
    </div>
  </div>
  )
}

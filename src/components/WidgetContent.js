import React, { useEffect, useState } from 'react'
import './WidgetContent.css'
import db from '../firebase'
import { useSelector } from 'react-redux';
import { selectQuestionId} from '../features/questionSlice';
import { selectUser } from '../features/userSlice';

export default function WidgetContent() {

    const questionId = useSelector(selectQuestionId);
    const user = useSelector(selectUser);
    const [getAnswers, setGetAnswers]= useState([]);

  useEffect(() => {
    if(questionId){
      db.collection('questions').doc(questionId).collection('answer')
      .orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
      setGetAnswers(
        snapshot.docs.map((doc) =>({id:doc.id, answers:doc.data() }))
      ))
      
    }
  }, [questionId])
  useEffect(() =>{
    db.collection('questions').add({
      user: user
    })
  })
  return (
    <div className=" widget__contents">


      <div className='user_answer' >
      {getAnswers.map(({ id, answers }) => {
      
      console.log(answers.user.email);
       if (user.email === answers.user.email) {
       return (
      <p key={id} style={{ position: 'relative', padding: '1rem' }}>
        {answers.answer}
        <br />
        <span
          style={{
            position: 'absolute',
            color: 'gray',
            fontSize: 'small',
            display: 'flex',
            padding: '0.5em',
            
            right: '0px',
            
          }}
        ></span>
      </p>
    );
  } else {
    return null; // Don't render anything if the emails don't match
  }
})}

                
        </div>
    </div>
  );
}

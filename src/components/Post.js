import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Post.css'
// import img from './img.jpg';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionId, setQuestionInfo } from '../features/questionSlice';
import firebase from 'firebase/compat/app';
import db from '../firebase'
import { selectUser } from '../features/userSlice';


export default function Post({Id, question, imgUrl, timestamp, quoraUser}) {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();


    const [openModal, setOpenModal]= useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer]=useState('');
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
  
  
  
  const handleAnswer = (e) => {
    // e.preventDefault();

    if (questionId) {
      db.collection("questions").doc(questionId).collection("answer").add({
        user: user,
        answer: answer,
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log(answer);
    setAnswer("");
    setOpenModal(false);
    

  };

  return (
    <div className='post' onClick={() => 
      dispatch(setQuestionInfo({
        questionId:Id,
        questionName:question,
      })
      )
      } >
        <div className='post__info'>
            <Avatar
            src={quoraUser.photo}
            
             />
          <h5 style={{marginLeft:'0.5em'}}>{quoraUser.displayName ? quoraUser.displayName: quoraUser.email}</h5> 
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>

        </div>
        <div className='post__body'>
            <div className='post__question'>
                <p>{question}</p>
                <Button className='post__btnAnswer' onClick={() => setOpenModal(true)}>Answer</Button>
            </div>
            <Modal 
            isOpen={openModal} onRequestClose={() => setOpenModal(false)} shouldCloseOnOverlayClick={false}
            style={{
                  overlay:
                  {width:350,
                    height:600,
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      zIndex:'1000',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                   },
                  }}>
            <div className="modal__question">
              <h4>{question}</h4>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>


        </div>
        
        <div className='post__answer' >
              {getAnswers.map(({id, answers}) => (
                <p key={id} style={{position:'relative', paddingBottom:'1rem' }}>
                 {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      paddingBottom: "0.5em",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27"}}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
                </p>

              ))}
                
            </div>
            {imgUrl && (
              <img src={imgUrl} alt='imgURL' />
            )}

      
    </div>
  )
}

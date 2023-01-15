import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HomePage.css';
import { useContext } from 'react';
import { SessionContext } from '../../sessionContext';
import axios from 'axios';
import { useState } from 'react';



const HomePage = () => {
    const sessionDet = useContext(SessionContext)
    const [address, setAddress] = useState('')
    const handleSubmit = async (text) => {
        console.log("handleSubmit 1");
        await getIsTeacher()
        console.log("handleSubmit 2");
        await sessionDet.setSession(text);
        console.log("handleSubmit 3");
    }
    let isTeacher = 0;
    const getIsTeacher = async () => {
        console.log('getIsTeacher 1 ');
        await axios.get('http://localhost:8080/teacherOrStudent')
            .then((res) => {
                console.log('getIsTeacher 2');
                isTeacher = res.data;
                console.log('getIsTeacher 3');
                console.log(" isTeacher ", isTeacher);
                if (isTeacher === 0) {
                    console.log('getIsTeacher 4');
                    setAddress('/teacher') ;
                } else {
                    console.log('getIsTeacher 5');
                    setAddress('/student');
                }
            })
    }

  

    return (
        <div className="home-page-container">
            <div className='welcome-text'>
                <h1>Welcome to live coding</h1>
                <p>This site is designed to allow the student to share the process of writing code with the teacher.<br />
                    You have at your disposal four sessions of learning code in different fields,<br />
                    the first user who enters the session is defined as a teacher and will be given the option of viewing only.<br />
                    Any additional user who enters the session will be considered a student and will have the option to editing the code.<br />
                    Good luck and enjoy learning</p>
            </div>

            <div className="button-container">
                <div >
                    <Link to={address} className="big-beautiful-button" onClick={() => { handleSubmit("loop") }}>loop's</Link>
                </div>
                <div>
                    <Link to={address} className="big-beautiful-button" onClick={() => { handleSubmit("recursion") }}>Recursion</Link>
                </div>
                <div >
                    <Link to={address} className="big-beautiful-button" onClick={() => { handleSubmit("async") }}>async function</Link>
                </div>
                <div >
                    <Link to={address} className="big-beautiful-button" onClick={() => { handleSubmit("class") }}>Class</Link>
                </div>
            </div>
        </div>
    );

}

export default HomePage;

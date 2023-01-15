import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import '../Session.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../../sessionContext';
// const { uuid } = require('uuidv4');


const TeacherSession = () => {
    console.log('TeacherSession ');
    const sessionDet = useContext(SessionContext)
    const socket = new WebSocket(`ws://localhost:4000/session?name=${sessionDet.session}`);
    // socket.id = uuid()
    socket.addEventListener('open', function (event) {
        console.log('session is connected to ws server');
    });
    socket.addEventListener('message', function (event) {
        console.log(`message from server ${event.data}`);
        hljs.highlightBlock(ref.current, {
            lineNodes: true,
        });
    })
    const language = "js"
    const initialCode = "Loading code"
    const ref = useRef(null);
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        hljs.highlightBlock(ref.current, {
            lineNodes: true,
        });
    }, [code | ""]);
    useEffect(() => {
        socket.addEventListener('message', function (event) {
            setCode(event.data);
            hljs.highlightBlock(ref.current, {
                lineNodes: true,
            });
        });
    }, []);
    const handleClose = () => {
        socket.close()
    }
        const sessionText = {
        "class": "Complete the code so jack's name and age",
        "loop": "Complete the code so that all elements of the array are printed",
        "recursion": "Complete the code so that the digits 4-0 are printed in descending order",
        "async": "Complete the code to print I love You !!"
    }
    return (
        <div className='session'>
            <div className='side'>
                <h3>
                    {sessionText[sessionDet.session]}
                </h3>
                <Link to={'/'} className="big-beautiful-button" onClick={handleClose} >Return</Link>
            </div>
            <pre>
                <code ref={ref} className={`hljs ${language}`}>
                    {code}
                </code>
            </pre>

        </div>
    );
};

export default TeacherSession;

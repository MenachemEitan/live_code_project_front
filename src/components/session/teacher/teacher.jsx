import React, { useContext, useRef, useEffect, useState } from 'react';
import highlightJs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import '../Session.css'
import { Link } from 'react-router-dom';
import { SessionContext } from '../../../sessionContext';

const TeacherSession = () => {
    const sessionDet = useContext(SessionContext);
    const language = "js"
    const initialCode = "Loading code"
    const ref = useRef(null);
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        highlightJs.highlightBlock(ref.current);
    }, [code]);
    let handleClose = () => {
    }
    useEffect(() => {
        const socket = new WebSocket(`ws://44.202.9.124:8080/session?name=${sessionDet.session}`);
        socket.addEventListener('open', function (event) {
        });

        socket.addEventListener('message', function (event) {
            setCode(event.data);
        });

        const handleClose = () => {
            socket.close();
        };

        return handleClose;
    }, [sessionDet.session]);

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
                <Link to={'/'} className="big-beautiful-button" onClick={() => { handleClose() }} >Return</Link>
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
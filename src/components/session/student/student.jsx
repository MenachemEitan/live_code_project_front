import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import './student.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../../sessionContext';

const StudentSession = () => {
    console.log(1);
    const sessionDet = useContext(SessionContext)
    console.log(2);
    const socket = new WebSocket(`ws://localhost:4000/session?name=${sessionDet.session}`);
    console.log(3);
    socket.addEventListener('open', function (event) {
        console.log(4);
        // console.log('session is connected to ws server');
    });
    const language = "js"
    const initialCode = "Loading code"
    const ref = useRef(null);
    const count = useRef(0)
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        console.log(5);
        hljs.highlightBlock(ref.current, {
            lineNodes: true,
        });
    }, [code]);
    useEffect(() => {
        console.log(6);
        socket.addEventListener('message', function (event) {
            console.log(7);
            // console.log(typeof(event.data));
            if (count.current === 0) {
                console.log(8);
                count.current = count.current + 1
                setCode(event.data);
            }
        });


    }, []);

    const sendMassage = (text) => {
        socket.send(text)
    }

    const handleCodeChange = e => {
        console.log(9);
        // console.log(e.target.innerText);
        // setCode(e.target.textContent);
        socket.send(e.target.innerText)
    }
    const handleClose = () =>{
        console.log(10);
        socket.close()
    }
    return (
        <div className='session'>
            <pre>
                <code ref={ref} className={`hljs ${language}`} contentEditable
                    onInput={handleCodeChange}>
                    {code}
                </code>
            </pre>
            <Link to={'/'} className="big-beautiful-button" onClick={handleClose} >Return</Link>

        </div>
    );
};

export default StudentSession;

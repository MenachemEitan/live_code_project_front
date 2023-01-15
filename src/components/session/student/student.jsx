import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import '../Session.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../../sessionContext';

const StudentSession = () => {
    const sessionDet = useContext(SessionContext)
    const conectionCount = useRef(0)
    const socket = new WebSocket(`ws://localhost:4000/session?name=${sessionDet.session}`);
    socket.addEventListener('open', function (event) {
    });
    const language = "js"
    const initialCode = "Loading code"
    const ref = useRef(null);
    const count = useRef(0)
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        hljs.highlightBlock(ref.current, {
            lineNodes: true,
        });
    }, [code]);
    useEffect(() => {
        socket.addEventListener('message', function (event) {
            if (count.current === 0) {
                count.current = count.current + 1
                setCode(event.data);
            }
        });


    }, []);


    const handleCodeChange = e => {
        socket.send(e.target.innerText)
    }
    const handleClose = () => {
        console.log(10);
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
                <code ref={ref} className={`hljs ${language}`} contentEditable
                    onInput={handleCodeChange}>
                    {code}
                </code>
            </pre>


        </div>
    );
};

export default StudentSession;

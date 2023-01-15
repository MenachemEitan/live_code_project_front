import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from "react-router-dom";
import TeacherSession from './components/session/teacher/teacher';
import StudentSession from './components/session/student/student'


function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='student' element={<StudentSession />}></Route>
      <Route path='teacher' element={<TeacherSession />}></Route>
    </Routes>
    </>
  );
}

export default App;

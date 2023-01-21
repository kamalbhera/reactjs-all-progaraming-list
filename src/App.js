import './App.css';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/courses/:id'} element={<CourseDetails />} />
          <Route path={'/*'} element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;

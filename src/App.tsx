import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components'
import Home from './pages/Home'
import AppBar from './components/AppBar'
import GenericPage from './pages/GenericPage';

function App() {
  return (
    <StyledMain>
      <Router>
        <div>
          <AppBar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:pageName" element={<GenericPage />} />
        </Routes>
      </Router>
    </StyledMain>
  )
}

const StyledMain = styled.div`
  height: 100vh;
  width: 100vw;
`

export default App

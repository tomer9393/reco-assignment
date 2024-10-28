import './App.css'
import styled from 'styled-components'
import Home from './pages/Home'
import AppBar from './components/AppBar'

function App() {
  return (
    <StyledMain>
      <AppBar/>
      <Home/>
    </StyledMain>
  )
}

const StyledMain = styled.div`
  height: 100vh;
  width: 100vw;
`

export default App

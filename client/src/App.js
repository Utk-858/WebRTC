import {Routes, Route} from 'react-router-dom';
import Home from './screens/Home';
import LobbyScreen from './screens/LobbyScreen';
import Room from './screens/Room';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomNo" element={<Room/>} />
        
      </Routes>
    </div>
  );
}

export default App;

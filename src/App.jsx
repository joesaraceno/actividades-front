import RequestContainer from './RequestContainer';
import ConcurrentRequestHandler from './ConcurrentRequestHandler';
import ProceduralRequestHandler from './ProceduralRequestHandler';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main">
        <RequestContainer>
         <ConcurrentRequestHandler />
         <ProceduralRequestHandler />
        </RequestContainer>
      </div>
    </div>
  );
}

export default App;

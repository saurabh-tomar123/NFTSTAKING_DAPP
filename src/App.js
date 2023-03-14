import logo from './logo.svg';
import './App.css';
import Integration from './Component/Integration';
import video from './vde.mp4'

function App() {
  return (
    <div className="App">
      <video  style={{height:"100%",width:"100%"}} src={video}  loop autoPlay /> 
     <Integration />
    </div>
  );
}

export default App;

import "./App.css";
import Logo from "./Assets/Logo.png";
import { Location } from "./Components/location";

function App() {
  return (
    <div>
      <img src={Logo} className="Logo" alt="find-nearby-brewery-logo" />
      <div className="App">
        <Location />
      </div>
    </div>
  );
}

export default App;

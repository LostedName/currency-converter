import Converter from "./components/Converter/Converter";
import "./style.css";
function App(props) {
  return (
    <>
      <header>
      </header>
      <Converter store={props.store}/>
    </>

  );
}

export default App;

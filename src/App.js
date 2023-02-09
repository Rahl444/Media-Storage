import Page1 from "./page1"
import Page2 from "./Page2";
import Page3 from "./Page3";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   home
    // </div>
    // <Page2/>
    <>
      <Router>
        <main>
          <Routes>
          <Route path="/" element={<Page1/>}/>
          <Route path="/page2" element={<Page2/>}/>
          <Route path="/page3" element={<Page3/>}/>
          </Routes>
        </main>
      </Router>
    </>
    
  );
}

export default App;



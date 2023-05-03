import Pages from "./pages/Pages";
import Search from "./components/Search";
import "./index.css";
import Category from "./components/Category";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Search />
        <Category />
        <Pages />
      </Router>
    </div>
  );
}

export default App;

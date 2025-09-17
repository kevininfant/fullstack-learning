import './App.css';
import UseRefExample from './pages/hooks/useRef';
import TableData from './pages/tableDatasScreen';
import { FruitsProvider } from "./pages/hooks/useContext";
import FruitList from "./pages/fruitlist";
import AddFruit from "./pages/addfruit";
import UsersExample from './pages/hooks/useCallback&UseMemo';

function App() {
  return (
    <div className="App">
       {/* <FruitsProvider> */}
      <TableData />
      {/* <AddFruit /> */}
      {/* <FruitList/> */}
      {/* <UseRefExample/> */}
      {/* <UsersExample /> */}
      {/* </FruitsProvider> */}
    </div>
  );
}

export default App;

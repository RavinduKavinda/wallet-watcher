import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { Expense } from './pages/expence/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Auth/>}/>
          <Route path='/wallet-watcher' element={<Expense/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

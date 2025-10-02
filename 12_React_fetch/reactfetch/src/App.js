import './App.css';
import Euro from './Euro';

function App() {
  return (
    <div className="App">
      <h1>Fetch gyakorlás</h1>
      <div className='tarolo'>
          <div className='oszlop1'>
              <h2>Bal</h2>
              <Euro />
          </div>
          <div className='oszlop2'>
              <h2>Közép</h2>
          </div>
          <div className='oszlop1'>
              <h2>Jobb</h2>
          </div>
           
      </div>
    </div>
  );
}

export default App;

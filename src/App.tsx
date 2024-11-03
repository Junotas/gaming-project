import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="flex justify-center space-x-12 my-16">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="h-48" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-48" alt="React logo" />
        </a>
      </div>
      <h1 className="text-6xl font-bold text-center my-10">Vite + React</h1>
      <div className="card text-center p-10 border-4 border-gray-300 rounded-lg shadow-xl">
        <button
          className="bg-blue-500 text-white text-2xl font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-6 text-xl">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center mt-10 text-xl">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

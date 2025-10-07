import { createSignal } from 'solid-js';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="p-8 text-center">
      <h1>WXT + Solid</h1>
      <div class="card">
        <button class="p-2 rounded-md bg-blue-500 text-white" onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>popup/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the WXT and Solid logos to learn more
      </p>
    </div>
  );
}

export default App;

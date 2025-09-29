import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      const tarefasStorage = localStorage.getItem('tarefas');
      if(tarefasStorage) {
        setTarefas(JSON.parse(tarefasStorage));
      }
      hasLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
  }, [tarefas]);

  const handleAdd = useCallback(() => {
    if(!input || input.trim() === '') return;
    setTarefas(prevTarefas => [...prevTarefas, input]);
    setInput('');
  }, [input]);

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map((tarefa, index) => 
          <li key={index}>{index + 1}. {tarefa}</li>
        )}
      </ul>
      <h3>Você tem um total de {totalTarefas} tarefas!</h3>
      <input 
        id="tarefaInput" 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
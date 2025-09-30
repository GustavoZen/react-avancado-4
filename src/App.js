import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import API from './API';
import './style.css';

function App() {
  // Estado para a lista de tarefas e o input
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');
  const hasLoaded = useRef(false); // Ref para controlar o carregamento inicial

  // Carregar tarefas do localStorage apenas na montagem inicial
  useEffect(() => {
    if (!hasLoaded.current) {
      const tarefasStorage = localStorage.getItem('tarefas');
      if(tarefasStorage) {
        setTarefas(JSON.parse(tarefasStorage));
      }
      hasLoaded.current = true;
    }
  }, []);

  // Salvar tarefas no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
  }, [tarefas]);

  // Adicionar nova tarefa (função do botão e Submit do input)
  const handleAdd = useCallback(() => {
    if(!input || input.trim() === '') return;
    setTarefas(prevTarefas => [...prevTarefas, input]);
    setInput('');
  }, [input]);

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div className="App">
      <header>48 - 57 Hooks (useState, useCallback, useEffect e useMemo) e chamadas de API</header>
      <hr/>
      <h2>Lista de Tarefas</h2>
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
      <hr/>
      <API/>
    </div>
  );
}

export default App;
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './paginas/Home'
import { TarefaProvider } from './common/context/Tarefa'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TarefaProvider>
      <Home />
    </TarefaProvider>
  </React.StrictMode>,
)

import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.css'

// Bun использует стандартный DOM API
const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Если вы хотите начать измерять производительность в вашем приложении, передайте функцию
// для логирования результатов (например: reportWebVitals(console.log))
// или отправьте на аналитический эндпоинт. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals()

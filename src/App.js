import React from 'react';
import './App.css';
import FileShareComponent from './FileShareComponent'; // 경로는 실제 파일 위치에 따라 다를 수 있습니다.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileShareComponent />
      </header>
    </div>
  );
}

export default App;

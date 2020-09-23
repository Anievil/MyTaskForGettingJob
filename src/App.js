import React, {useState} from 'react';
import Header from './components/Header/Header';
import Catalog from './components/Catalog/Catalog'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null)
  return (
    <>
      <Header setIsLogin={setIsLogin} setToken={setToken} isLogin={isLogin}/>
      <Catalog token={token} isLogin={isLogin}/>
    </>
  );
}

export default App;

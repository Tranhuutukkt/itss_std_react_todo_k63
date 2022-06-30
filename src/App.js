import React, {useEffect, useState} from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import {auth, storeUserInfo} from "./lib/firebase";
import Login from "./components/Login";

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            setLoading(false);
            let newUser = null;
            if (user) newUser = await storeUserInfo(user);
            setUser(newUser);
        });
    }, []);

    const logout = () => {
      auth.signOut();
    };

    const HeaderContent = () => {
      if (user){
          return (
              <div className='navbar-end'>
                  <div className='navbar-item'>{user.name}</div>
                  <div className='navbar-item'>
                      <button
                          className='button is-danger is-light is-small'
                          onClick={logout}
                      >ログアウト
                      </button>
                  </div>
              </div>
          )
      }
      else return <Login/>
    }

    return (
        <div className="container is-fluid">
            <header className='navbar'>
                {loading ? (<p>LOADING...</p>) : (<HeaderContent/>)}
            </header>
            <div>{user && <Todo/>}</div>

        </div>
  );
}

export default App;

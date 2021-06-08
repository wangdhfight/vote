import { NavLink as Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import CreateVote from './CreateVote'
import ViewVote from  './ViewVote'
import My from  './My'

import UserContext from './UserContext'
import { Suspense, useEffect } from 'react'
import { useSelector, useDispatch }from 'react-redux'

function App() {
  const history = useHistory()
  const userInfo = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function logout() {
    dispatch({type: 'logout'})
  }

  useEffect(() => {
    dispatch({type: 'get-user-info'})
  }, [])

  return (
    <UserContext.Provider value={{userInfo: userInfo}}>
      <div className="App">
        {userInfo
          ? <>
              <span>欢迎, {userInfo.name}</span>
              <Link to="/home">创建</Link>
              <Link to="/my">我的</Link>
              <button onClick={logout}>登出</button>
            </>
          : <>
              <Link to="/login">登陆</Link>
              <Link to="/register">注册</Link>
            </>
        }

        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create" component={CreateVote} />
          <Route path="/my" component={My} />
          <Route path="/vote/:id">
            <Suspense fallback={'loading...'}>
              <ViewVote />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;

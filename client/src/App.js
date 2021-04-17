import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from 'react-router-dom'

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <div>

        <Switch>
          {/* exact는 이하 경로를 중복 출력하지 않도록한다. */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

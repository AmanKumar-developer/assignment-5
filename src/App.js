import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import LoginForm from './components/LoginForm'

import AllJobs from './components/AllJobs'

import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AboutJob from './components/AboutJob'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={AboutJob} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App

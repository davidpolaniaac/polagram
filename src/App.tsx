import './App.css';

import { BrowserRouter } from "react-router-dom";
import {History} from 'history';
import Login from './containers/Auth/Login';
import Navbar from './components/Navbar';
import NewsFeed from './containers/NewsFeed';
import Profile from './containers/Profile';
import React from 'react';
import Register from './containers/Auth/Register';
import { Route } from 'react-router';
import service from './services';

interface IAppProps {
  history: History,
  loadInitialData: () => void
}
class App extends React.Component<IAppProps> {

  public state = {
    loading: true
  }

  public componentDidMount() {
    const { auth } = service;
    auth.onAuthStateChanged(user =>{
      if(user){
        const {loadInitialData} = this.props;
        loadInitialData();
        if(['/', '/register'].indexOf(window.location.pathname) > -1){
          const { history } = this.props;
          history.push('/app/newsfeed')
        }
      }else{
        if(/\app\/./.test(window.location.pathname)){
          const { history } = this.props;
          history.push('/')
        }
      }
      this.setState({loading: false})
    })
  }
  public render(): React.ReactNode {
    const { loading } = this.state;
    return (
      loading ? 'Loading': <div>
        <BrowserRouter>
          <Route exact={true} path="/" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route path="/app" component={Navbar} />
          <Route exact={true} path="/app/newsfeed" component={NewsFeed} />
          <Route exact={true} path="/app/profile" component={Profile} />
        </BrowserRouter>
      </div>
    );
  }

}

export default App;

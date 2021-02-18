import React, { Component } from 'react';
import './App.css';
import AddDetails from './AddDetails';
import MilesToKm from './MilesToKm';
import UsersList from './UsersList'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/users-list"/>
                )}/>
                 <Route exact path='/add-details' component={AddDetails} />
                 <Route exact path='/miles-to-km' component={MilesToKm} />
                 <Route exact path='/users-list' component={UsersList} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;

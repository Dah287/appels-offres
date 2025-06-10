import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import ListAppelOffreComponent from './components/ListAppelOffreComponent';
import AddAppelOffreComponent from './components/AddAppelOffreComponent';
import DashboardAppelOffreComponent from './components/DashboardAppelOffreComponent';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import LoginComponent from './components/LoginComponent';
import ListAppelOffreParEntiteComponent from './components/ListAppelOffreParEntiteComponent';
import UserManagement from './components/UserManagement';

import PrivateRoute from './routes/PrivateRoute';
import ListAppelOffreSAComponent from './components/ListAppelOffreSAComponent';

import RECAPP from './components/RECAPP';
import UpdateRecappAppelOffreComponent from './components/UpdateRecappAppelOffreComponent';
import ListBandeCommandeComponent from './components/ListBandeCommandeComponent';
import AddBandeCommandeComponent from './components/AddBandeCommandeComponent';
import ListBandeCommandeExcutionComponent from './components/ListBandeCommandeExcutionComponent';
import UpdateExcutionBC from './components/UpdateExcutionBC';
import Test from './components/Test';
import Test2 from './components/Test2';
import DashboardTable from './components/DashboardTable';
import DashboardBC from './components/DashboardBC';

function App() {

 // const isAuthenticated = !!localStorage.getItem('user'); // Vérifie si l'utilisateur est connecté

  return (
    <div >
{/* <Router>
<HeaderComponent/>
      <ListAppelOffreComponent/>
<FooterComponent/>    
</Router>   */}
      <Router>
        <HeaderComponent />
        <div className= "container-fluid">
          {/* <Switch>
              <Route exact path = "/" component = {ListAppelOffreComponent}></Route>
              <Route path = "/appelOffres" component = {ListAppelOffreComponent}></Route>
              <Route path = "/add-appeloffre" component = {AddAppelOffreComponent} ></Route>
              <Route path = "/edit-employee/:id" component = {AddAppelOffreComponent}></Route>
              <Route path = "/dashboard" component = {DashboardAppelOffreComponent}></Route>
            </Switch> */}


<Switch>
  <Route exact path="/" component={LoginComponent}></Route>
  <PrivateRoute path="/appelOffres" component={ListAppelOffreComponent} />
  <PrivateRoute path="/add-appeloffre/:entt" component={AddAppelOffreComponent} />
  <PrivateRoute path="/edit-employee/:id/:entitee" component={AddAppelOffreComponent} />
  <PrivateRoute path="/dashboard" component={DashboardAppelOffreComponent} />
  <Route path="/login" component={LoginComponent} />
  <PrivateRoute path="/recapp" component={RECAPP} />
  <Route path="/updateRecapp/:id/:bloque" component={UpdateRecappAppelOffreComponent} />
  <PrivateRoute path="/ListAppelOffreParEntite/:entitee" component={ListAppelOffreParEntiteComponent} />
  <PrivateRoute path="/user" component={UserManagement} />
  <PrivateRoute path="/ListSA" component={ListAppelOffreSAComponent} />
  <PrivateRoute path="/bande-commandes" component={ListBandeCommandeComponent} />
  <PrivateRoute path="/add-bandecommande" component={AddBandeCommandeComponent} />
  <PrivateRoute path="/edit-bandecommande/:id" component={AddBandeCommandeComponent} />
  <PrivateRoute path="/excution-bandecommande" component={ListBandeCommandeExcutionComponent} />
  <PrivateRoute path="/excution/:id" component={UpdateExcutionBC} />
  <PrivateRoute path="/test" component={Test} />
  <PrivateRoute path="/test2" component={Test2} />
  <PrivateRoute path="/t" component={DashboardTable} />
  <PrivateRoute path="/TableauBord" component={DashboardBC} />
</Switch>

            {/* <FooterComponent /> */}
        </div>        
       
        </Router>
    </div>
  );
}

export default App;
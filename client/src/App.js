import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Home from './Components/Home.jsx';
import PokemonCreate from './Components/PokemonCreate.jsx';
import Detail from './Components/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component = {LandingPage}/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = '/pokemons' component = {PokemonCreate}/>
        <Route exact path = '/home/:id' component ={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

import { Route, Router, Switch } from 'wouter';
import { GameProvider } from './contexts/GameContext';
import BottomNav from './components/BottomNav';
import Title from './pages/Title';
import Fusion from './pages/Fusion';
import Deck from './pages/Deck';
import Battle from './pages/Battle';
import Book from './pages/Book';
import Settings from './pages/Settings';

export default function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-[#fff7e8] text-[#3a2e28] flex flex-col">
          <Switch>
            <Route path="/" component={Title} />
            <Route path="/fusion" component={Fusion} />
            <Route path="/deck" component={Deck} />
            <Route path="/battle" component={Battle} />
            <Route path="/book" component={Book} />
            <Route path="/settings" component={Settings} />
          </Switch>
          <BottomNav />
        </div>
      </Router>
    </GameProvider>
  );
}
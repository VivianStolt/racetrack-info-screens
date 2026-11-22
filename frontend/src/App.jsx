import LoginForm from './components/LoginForm.jsx';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import FrontDesk from './pages/FrontDesk.jsx';
import LapLineTracker from './pages/LapLineTracker.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import NextRace from './pages/NextRace.jsx';
import NotFound from './pages/NotFound.jsx';
import RaceControl from './pages/RaceControl.jsx';
import RaceCountdown from './pages/RaceCountdown.jsx';
import RaceFlags from './pages/RaceFlags.jsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/race-control" element={<RaceControl />} />
				<Route path="/front-desk" element={<FrontDesk />} />
				<Route path="/lap-line-tracker" element={<LapLineTracker />} />
				<Route path="/leader-board" element={<LeaderBoard />} />
				<Route path="/next-race" element={<NextRace />} />
				<Route path="/race-countdown" element={<RaceCountdown />} />
				<Route path="/race-flags" element={<RaceFlags />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

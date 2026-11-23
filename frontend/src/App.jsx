import LoginForm from './components/LoginForm.jsx';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import RequireLogin from './components/RequireLogin.jsx';
import FrontDesk from './pages/FrontDesk.jsx';
import LapLineTracker from './pages/LapLineTracker.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import NextRace from './pages/NextRace.jsx';
import NotFound from './pages/NotFound.jsx';
import RaceControl from './pages/RaceControl.jsx';
import RaceCountdown from './pages/RaceCountdown.jsx';
import RaceFlags from './pages/RaceFlags.jsx';

function App() {
	const [loggedInStation, setLoggedInStation] = useState(undefined);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LoginForm onLoggedInStation={setLoggedInStation} />}
				/>
				<Route
					path="/race-control"
					element={
						<RequireLogin
							loggedInStation={loggedInStation}
							thisStation={'/race-control'}
							onLoggedInStation={setLoggedInStation}
						>
							<RaceControl />
						</RequireLogin>
					}
				/>
				<Route
					path="/front-desk"
					element={
						<RequireLogin
							loggedInStation={loggedInStation}
							thisStation={'/front-desk'}
							onLoggedInStation={setLoggedInStation}
						>
							<FrontDesk />
						</RequireLogin>
					}
				/>
				<Route
					path="/lap-line-tracker"
					element={
						<RequireLogin
							loggedInStation={loggedInStation}
							thisStation={'/lap-line-tracker'}
							onLoggedInStation={setLoggedInStation}
						>
							<LapLineTracker />
						</RequireLogin>
					}
				/>
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

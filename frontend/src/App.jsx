import LoginForm from './components/LoginForm.jsx';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/race-control" element={<h1>Race-Control</h1>} />
				<Route path="/front-desk" element={<h1>Front-Desk</h1>} />
				<Route path="/lap-line-tracker" element={<h1>Lap-Line Tracker</h1>} />
				<Route path="/leader-board" element={<h1>Leader Board</h1>} />
				<Route path="/next-race" element={<h1>Next Race</h1>} />
				<Route path="/race-countdown" element={<h1>Race Countdown</h1>} />
				<Route path="/race-flags" element={<h1>Race Flags</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

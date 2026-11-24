import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

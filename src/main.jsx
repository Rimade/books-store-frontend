import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</BrowserRouter>
);

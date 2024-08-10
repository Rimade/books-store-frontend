import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-sky-200 to-sky-800 text-white text-center">
			<h1 className="text-9xl font-bold animate-pulse">404</h1>
			<p className="text-2xl mt-4 mb-8">
				Oops! The page you're looking for doesn't exist.
			</p>
			<button
				className="bg-white text-sky-600 font-bold py-3 px-6 rounded-full transition-transform transform hover:bg-sky-950 hover:text-white hover:scale-105"
				onClick={handleGoHome}>
				Go Home
			</button>
		</div>
	);
};

export default NotFound;

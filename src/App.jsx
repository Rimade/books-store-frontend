import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, CreateBooks, EditBook, ShowBook, DeleteBook } from './pages';
import NotFound from './pages/NotFound';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books/create" element={<CreateBooks />} />
				<Route path="/books/details/:id" element={<ShowBook />} />
				<Route path="/books/edit/:id" element={<EditBook />} />
				<Route path="/books/delete/:id" element={<DeleteBook />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';
import { useSnackbar } from 'notistack';

const Home = () => {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showType, setShowType] = useState('table');
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:5555/books')
			.then((res) => {
				setBooks(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar('Произошла ошибка при получении книг', {
					variant: 'error',
					autoHideDuration: 2500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="p-4 ">
			<div className="flex justify-center items-center gap-x-4">
				<button
					onClick={() => setShowType('table')}
					className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
					Таблица
				</button>
				<button
					onClick={() => setShowType('card')}
					className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
					Карточка
				</button>
			</div>

			<div className="flex justify-between items-center">
				<h1 className="text-3xl my-8">Список книг</h1>
				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>
			{isLoading ? (
				<Spinner />
			) : showType === 'table' ? (
				<BooksTable books={books} />
			) : (
				<BooksCard books={books} />
			)}
		</div>
	);
};

export default Home;

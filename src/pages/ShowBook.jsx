import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
	const [book, setBook] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((res) => {
				setBook(res.data);
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar('Не удалось получить книгу', {
					variant: 'error',
					autoHideDuration: 1500,
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
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Показать книгу</h1>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Id</span>
						<span>{book._id}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Название</span>
						<span>{book.title}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Автор</span>
						<span>{book.author}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Год публикации</span>
						<span>{book.publishYear}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Дата создания</span>
						<span>{new Date(book.createdAt).toString()}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Дата обновления</span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowBook;

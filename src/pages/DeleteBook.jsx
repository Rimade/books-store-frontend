import React, { useState } from 'react';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { id } = useParams();

	const handleDeleteBook = () => {
		setLoading(true);
		axios
			.delete(`http://localhost:5555/books/${id}`)
			.then(() => {
				navigate('/');
				enqueueSnackbar('Книга успешно удалена', {
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar('Произошла ошибка при удалении книги', {
					variant: 'error',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Удалить книгу</h1>
			{isLoading ? <Spinner /> : ''}
			<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] px-8 pt-4 mx-auto">
				<h3 className="text-2xl mt-4">Вы уверены что хотите удалить книгу?</h3>
				<button
					onClick={handleDeleteBook}
					className="py-3 rounded-xl bg-red-600 text-white m-8 w-full">
					Удалить
				</button>
			</div>
		</div>
	);
};

export default DeleteBook;

import React, { useState, useEffect } from 'react';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [data, setData] = useState({
		title: '',
		author: '',
		publishYear: '',
	});
	const [isLoading, setLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((res) => {
				setData(res.data);
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
				setLoading(false);
			});
	}, []);

	const handleEditBook = () => {
		setLoading(true);
		axios
			.put(`http://localhost:5555/books/${id}`, data)
			.then(() => {
				navigate('/');
				enqueueSnackbar('Книга успешно изменена', {
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
				enqueueSnackbar('Произошла ошибка при изменении книги', {
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
			<h1 className="text-3xl my-4">Изменение книги</h1>
			{isLoading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Название</label>
					<input
						type="text"
						className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
						value={data.title}
						onChange={(e) => setData({ ...data, title: e.target.value })}
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Автор</label>
					<input
						type="text"
						className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
						value={data.author}
						onChange={(e) => setData({ ...data, author: e.target.value })}
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Год публикации</label>
					<input
						type="text"
						className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
						value={data.publishYear}
						onChange={(e) => setData({ ...data, publishYear: e.target.value })}
					/>
				</div>
				<button
					className="bg-sky-500 text-white  p-2 m-8 rounded-md"
					onClick={handleEditBook}>
					Сохранить
				</button>
			</div>
		</div>
	);
};

export default EditBook;

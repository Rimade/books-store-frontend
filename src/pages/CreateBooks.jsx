import React, { useState } from 'react';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [data, setData] = useState({
		title: '',
		author: '',
		publishYear: '',
	});
	const [isLoading, setLoading] = useState(false);

	const handleSaveBook = () => {
		setLoading(true);
		axios
			.post('http://localhost:5555/books', data)
			.then(() => {
				navigate('/');
				enqueueSnackbar('Книга успешно создана', {
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
				enqueueSnackbar('Произошла ошибка при создании книги', {
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
			<h1 className="text-3xl my-4">Создание книги</h1>
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
					onClick={handleSaveBook}>
					Сохранить
				</button>
			</div>
		</div>
	);
};

export default CreateBooks;

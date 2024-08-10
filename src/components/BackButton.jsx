import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = ({ destination = '/' }) => {
	return (
		<div className="flex">
			<Link
				to={destination}
				className="bg-sky-800 text-white px-2 py-1 rounded-sm">
				<BsArrowLeft className="text-2xl" />
			</Link>
		</div>
	);
};

export default BackButton;

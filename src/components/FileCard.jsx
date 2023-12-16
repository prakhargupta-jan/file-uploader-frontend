import PropTypes from "prop-types";

const FileCard = ({ name, dateUploaded, id }) => {
	return (
		<>
		<div className="flex flex-row justify-between items-center p-2">
			<div className="text-2xl">{name}</div>
			<div>
				<div className=" hover:cursor-pointer p-3 rounded-md hover:bg-blue-800 bg-blue-500 text-white">
					<a
						href={
							import.meta.env.VITE_BACKEND_URL +
							"/get-files/" +
							id
						}
						download={name}
					>
						Download
					</a>
				</div>
				<div>{new Date(dateUploaded).toLocaleTimeString() + "-" + new Date(dateUploaded).toDateString() }</div>
			</div>
		</div>
		<hr />
		</>
	);
};

FileCard.propTypes = {
	name: PropTypes.string.isRequired,
	dateUploaded: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default FileCard;

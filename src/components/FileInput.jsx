import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const FileInput = ({ setFiles, setIsLoading }) => {
	const [msg, setMsg] = useState("Input a file then click submit");
	const [file, setFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);

	const onSubmit = async () => {
		const formData = new FormData();
		formData.append("file", file);
		setIsUploading(true);
		let res;
		try {
		res = await axios.post(
			import.meta.env.VITE_BACKEND_URL + "/file-upload",
			formData,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);} catch(err) {
			console.log(err)
			setMsg(err.response.data?.errors?.[0] || err.response.data.errMsg || err.message || "Something went wrong");
			setIsUploading(false);
			return;
		}
		if (res.status.toString().startsWith("2")) {
			setIsLoading(true);
			const data = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/get-files"
			);
			setMsg("Successfully Uploaded");
			if (data.status.toString().startsWith("2")) {
				setFiles(data.data.files);
			}
			setIsLoading(false);
		} else {
			setMsg(res.data.errMsg);
		}
		setIsUploading(false);
	};
	return (
		<div>
			<div className="flex flex-row justify-center">
				<div>
					<input
						type="file"
						onChange={(f) => setFile(f.target.files[0])}
						name="file"
						id="file"
					/>
				</div>
					<button className="p-3 rounded-md hover:bg-blue-800 hover:cursor-pointer disabled:bg-gray-600 disabled:cursor-default bg-blue-500 text-white" disabled={!file && isUploading} onClick={onSubmit}>{isUploading ? "Uploading..." : "Submit"}</button>
			</div>
			<div className="text-lg"><span className="font-bold">Status: </span>{msg}</div>
		</div>
	);
};

FileInput.propTypes = {
	setFiles: PropTypes.func.isRequired,
	setIsLoading: PropTypes.func.isRequired,
};

export default FileInput;

import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "./components/fileCard";
import FileInput from "./components/FileInput";

function App() {
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			let data;
			try {
				data = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/get-files"
			)
			} catch (error) {
				console.error(error);
			}
			
			if (data.status.toString().startsWith("2")) {
				setFiles(data.data.files);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<div className="p-4">
			<FileInput setFiles={setFiles} setIsLoading={setIsLoading} />
			<hr />
			<div>
				{isLoading
					? "Loading..."
					: files.map((data) => <FileCard {...data} key={data.id} />)}
			</div>
		</div>
	);
}

export default App;

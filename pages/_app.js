import '../styles/main.sass'
import Nav from "../components/Nav";
import {useState} from "react";

function MyApp({Component, pageProps}) {
	
	const [darkMode, setDarkMode] = useState(false);
	
	const handleDarkMode = () => {
		setDarkMode(!darkMode)
	}
	
	return (
		<div className={darkMode ? "darkMode" : "lightMode"}>
			<Nav darkMode={darkMode} setDarkMode={setDarkMode} handleDarkMode={handleDarkMode} />
			<Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
		</div>
	)
}

export default MyApp

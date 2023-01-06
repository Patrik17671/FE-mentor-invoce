import '../styles/main.sass'
import Nav from "../components/Nav"

function MyApp({Component, pageProps}) {
	
	return (
		<div>
			<Nav />
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp

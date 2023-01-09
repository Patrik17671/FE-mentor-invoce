import '../styles/main.sass';
import Nav from "../components/Nav";

import store from '../lib/store'
import { Provider } from 'react-redux'

function MyApp({Component, pageProps}) {
	
	return (
		<Provider store={store}>
			<Nav />
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp

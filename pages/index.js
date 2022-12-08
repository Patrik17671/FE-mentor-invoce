import Head from 'next/head'
import Countries from "../components/Countries";

export async function getStaticProps() {
	// Fetch data from external API
	const res = await fetch(`https://restcountries.com/v3.1/all`)
	const allCountries = await res.json()
	
	// Pass data to the page via props
	return { props: { allCountries } }
}


export default function Home({allCountries}) {
	return (
		<div className="">
			<Head>
				<title>Fe mentor countries</title>
				<meta name="description" content="Fe mentor countries"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main>
				<Countries allCountries={allCountries} />
			</main>
		</div>
	)
}

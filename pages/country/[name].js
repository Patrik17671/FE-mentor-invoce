import Link from "next/link";

export async function getStaticPaths() {
	const res = await fetch(`https://restcountries.com/v3.1/all`);
	const data = await res.json();
	const paths = data.map(country => {
		return {
			params: {name: country.name.common}
		}
	})
	return {
		paths: paths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const name = context.params.name
	const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
	const data = await res.json()
	
	return{
		props: {country: data}
	}
}

export default function Country({country}){
	const nativeName = country[0].name.nativeName;
	const nativeNameData = nativeName[Object.keys(nativeName)[0]].common;
	
	const currencies = country[0].currencies
	const currenciesData = [];
	for (const property in currencies) {
		currenciesData.push(currencies[property]);
	}
	
	const languages = country[0].languages
	const languagesData = [];
	for (const property in languages) {
		languagesData.push(languages[property]);
	}
	
	console.log(country[0])
	
	const {
		name,
		region,
		population,
		capital,
		subregion,
		tld,
		flags,
		borders,
	} = country[0]
	
	
	return(
		<div className="container">
			<div className="country__detail">
				<Link className="back-btn" href={"/"}>
					<i className="icon-arrow-left"></i>
					Back
				</Link>
				<div className="md:grid grid-cols-2 gap-20">
					<img src={flags.svg} alt={name.common}/>
					<div className="py-16">
						<h2>{name.common}</h2>
						<div className="sm:grid grid-cols-2 gap-2">
							<div>
								<p><strong>Native Name:</strong> {nativeNameData}</p>
								<p><strong>Population: </strong> {population}</p>
								<p><strong>Region:</strong>  {region}</p>
								<p><strong>SubRegion: </strong> {subregion}</p>
								<p><strong>Capital:</strong> {capital[0]}</p>
							</div>
							<div>
								<p><strong>Top Level Domain:</strong> {tld[0]}</p>
								<p>
									<strong>Currencies:</strong>
									{currenciesData?.map((cur, index) => {
										return(
											<span key={index}> {cur.name}</span>
										)
									})}
								</p>
								<p>
									<strong>Languages:</strong>
									{languagesData?.map((lang,index) => {
										return(
											<span key={index}> {lang}, </span>
										)
									})}
								</p>
							</div>
						</div>
						<div className="flex items-center mt-16">
							<span><strong>Border Countries:</strong></span>
							<ul className="ml-2 flex flex-wrap gap-2">
								{borders?.map((state, index) => {
									return(
										<li className="border-states" key={index}>{state}</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
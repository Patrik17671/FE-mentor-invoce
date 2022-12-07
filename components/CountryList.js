import Link from "next/link";

export default function CountryList({search,searchedData,notFound,allCountries,isLoading, regionData,isRegionFilter}){
	
	if(isLoading) return (<h1>Loading</h1>)
	
	if(isRegionFilter.current) return (
		<div className="country__list">
			{regionData?.map((country,index) => {
				return(
					<Link
						href={`/country/${country.name.common}`}
						className="country__item"
						key={index}
					>
						<img src={country.flags.svg} alt={country.name.common}/>
						<h4>{country.name.common}</h4>
						<p>Population: {country.population}</p>
						<p>Region: {country.region}</p>
						<p>Capital: {country.capital}</p>
					</Link>
				)
			})}
		</div>
	)
	
	if(search) return (
		<div className="country__list">
			{searchedData.map((country,index) => {
				return(
					<Link
						href={`/country/${country.name.common}`}
						className="country__item"
						key={index}
					>
						<img src={country.flags.svg} alt={country.name.common}/>
						<h4>{country.name.common}</h4>
						<p>Population: {country.population}</p>
						<p>Region: {country.region}</p>
						<p>Capital: {country.capital}</p>
					</Link>
				)
			})}
		</div>
	)
	
	return (
		notFound ? (<h1>Not found</h1>)
		:
		(
			<div className="country__list">
				{allCountries.map((country,index) => {
					return(
						<Link
							href={`/country/${country.name.common}`}
							className="country__item"
							key={index}
						>
							<img src={country.flags.svg} alt={country.name.common}/>
							<h4>{country.name.common}</h4>
							<p>Population: {country.population}</p>
							<p>Region: {country.region}</p>
							<p>Capital: {country.capital}</p>
						</Link>
					)
				})}
			</div>
		)
	)
	
}
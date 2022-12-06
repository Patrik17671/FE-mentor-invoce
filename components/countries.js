import {useState} from "react";
import Link from "next/link";

export default function Countries({allCountries}){
	
	const [openFilter, setOpenFilter] = useState(false)
	
	const handleOpenFilter = (e) => {
		e.stopPropagation();
		setOpenFilter(!openFilter)
	}
	
	// console.log(allCountries)
	// allCountries.map((country,index) => {
	// 	return(
	// 		console.log(country.name.common)
	// 	)
	// 	})
	
	return(
		<div onClick={() => setOpenFilter(false)} className="container pt-12">
			<div className="flex gap-4 md:justify-between items-center">
				<div className="search">
					<input type="text"/>
				</div>
				<div onClick={handleOpenFilter} className={`filter ${openFilter ? "active" : ""}`}>
					<span>Filter by region</span>
					<div className="filter__results">
						<ul>
							<li>
								Africa
							</li>
							<li>
								America
							</li>
							<li>
								Asia
							</li>
							<li>
								Europe
							</li>
							<li>
								Oceania
							</li>
						</ul>
					</div>
				</div>
			</div>
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
		</div>
	)
}
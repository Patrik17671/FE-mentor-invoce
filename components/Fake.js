import {useRef, useState} from "react";
import Link from "next/link";

export default function Countries({allCountries}){
	
	const [openFilter, setOpenFilter] = useState(false);
	const [search, setSearch] = useState(false);
	const inputRef = useRef();
	const [searchedData, setSearchedData] = useState([]);
	const [notFound, setNotFound] = useState(false)
	const [isLoading, setLoading] = useState(false)
	
	const handleOpenFilter = (e) => {
		e.stopPropagation();
		setOpenFilter(!openFilter)
	}
	
	const handleSearch = () => {
		if(inputRef.current.value.length > 2){
			setLoading(true)
			setSearch(true)
			fetch(`https://restcountries.com/v3.1/name/${inputRef.current.value}`)
				.then((res) => res.json())
				.then((data) => {
					if(data.status !== 404){
						setSearchedData(data)
						setNotFound(false)
						console.log(searchedData)
					}else {
						setNotFound(true)
						setSearch(false)
						setSearchedData([])
					}
					setLoading(false)
				})
				.catch((error) => {
					console.log('Error:', error);
				});
		}else {
			setSearch(false)
			setNotFound(false)
			setLoading(false)
		}
	}
	
	if (isLoading) return (
		<div>loading</div>
	)
	
	return(
		<div onClick={() => setOpenFilter(false)} className="container pt-12">
			<div className="flex gap-4 md:justify-between items-center">
				<div className="search">
					<input ref={inputRef} onChange={handleSearch} type="text"/>
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
			{
				search ?
				(
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
				:
				
				notFound ? (<h1>Not fouund</h1>) :
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
			}
		</div>
	)
}
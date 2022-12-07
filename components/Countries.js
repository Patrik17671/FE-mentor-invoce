import {useEffect, useRef, useState} from "react";
import CountryFilters from "./CountryFilters";
import CountryList from "./CountryList";

export default function Countries({allCountries}){
	
	//States
	const [openFilter, setOpenFilter] = useState(false);
	const [search, setSearch] = useState(false);
	const [searchedData, setSearchedData] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [region, setRegion] = useState("");
	const [regionData, setRegionData] = useState([]);
	
	//Refs
	const inputRef = useRef();
	const isRegionFilter = useRef(false);
	
	const handleOpenFilter = (e) => {
		e.stopPropagation();
		setOpenFilter(!openFilter)
	}
	
	//Getting searched data
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
	
	//Getting data by regions
	useEffect(() => {
		if(isRegionFilter.current){
			setLoading(true)
			fetch(`https://restcountries.com/v3.1/region/${region}`)
				.then((res) => res.json())
				.then((data) => {
					setRegionData(data)
					setLoading(false)
				})
				.catch((error) => {
					console.log('Error:', error);
				});
			
		}
	}, [region])
	
	return(
		<div onClick={() => setOpenFilter(false)} className="container pt-12">
			<CountryFilters
				inputRef={inputRef}
				handleSearch={handleSearch}
				handleOpenFilter={handleOpenFilter}
				openFilter={openFilter}
				region={region}
				setRegion={setRegion}
				isRegionFilter={isRegionFilter}
			/>
			<CountryList
				search={search}
				searchedData={searchedData}
				notFound={notFound}
				allCountries={allCountries}
				isLoading={isLoading}
				regionData={regionData}
				isRegionFilter={isRegionFilter}
			/>
		</div>
	)
}
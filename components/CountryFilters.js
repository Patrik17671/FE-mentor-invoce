import {useRef} from "react";

export default function CountryFilters({inputRef,handleSearch,handleOpenFilter,openFilter,setRegion,region,isRegionFilter}){
	
	const handleRegion = (e) => {
		setRegion(e.target.innerText.toLowerCase());
		isRegionFilter.current = true
	}
	
	const handleClearRegion = () => {
		setRegion("");
		isRegionFilter.current = false
	}
	
	return(
		<div className="flex gap-4 flex-col md:flex-row md:justify-between items-start md:items-center">
			<div className="search">
				<i className="icon-search"/>
				<input placeholder="Search for a country..." ref={inputRef} onChange={handleSearch} type="text"/>
			</div>
			<div onClick={handleOpenFilter} className={`filter ${openFilter ? "active" : ""}`}>
				<span>Filter by region: {region}</span>
				<div className="filter__results">
					<ul>
						<li onClick={handleClearRegion}>
							Clear
						</li>
						<li onClick={handleRegion}>
							Africa
						</li>
						<li onClick={handleRegion}>
							America
						</li>
						<li onClick={handleRegion}>
							Asia
						</li>
						<li onClick={handleRegion}>
							Europe
						</li>
						<li onClick={handleRegion}>
							Oceania
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
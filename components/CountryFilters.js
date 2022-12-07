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
		<div className="flex gap-4 md:justify-between items-center">
			<div className="search">
				<input ref={inputRef} onChange={handleSearch} type="text"/>
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
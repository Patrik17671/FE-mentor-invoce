import Link from "next/link";

export default function Nav({darkMode,handleDarkMode}){
	
	return(
		<header>
			<div className="container">
				<div className="flex justify-between items-center">
					<Link href={"/"} >
						<h1>Where in the world?</h1>
					</Link>
					<div className="mode-switcher">
						{!darkMode ?
							(<span onClick={handleDarkMode}> <i className="icon-moon-fill"></i> Dark Mode</span>)
							:
							(<span onClick={handleDarkMode}><i className="icon-sun"></i> Light Mode</span>)}
					</div>
				</div>
			</div>
		</header>
	)
}
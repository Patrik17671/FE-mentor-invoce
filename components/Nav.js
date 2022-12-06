import Link from "next/link";

export default function Nav({darkMode,handleDarkMode}){
	
	return(
		<header>
			<div className="container">
				<div className="flex justify-between items-center">
					<Link href={"/"} >
						<h1>Where in the world?</h1>
					</Link>
					<div className="cursor-pointer">
						{darkMode ?
							(<span onClick={handleDarkMode}>Dark Mode</span>)
							:
							(<span onClick={handleDarkMode}>Light Mode</span>)}
					</div>
				</div>
			</div>
		</header>
	)
}
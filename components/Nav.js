// import user from "../assets/images/user.jpg"
import Image from 'next/image'
export default function Nav(){
	return(
		<nav>
			<div className="nav__icon">
				<i className="icon-logo"/>
			</div>
			<div className="nav__profile-wrapper">
				<div className="nav__mode">
					<i  className="icon-moon"/>
				</div>
				<div className="nav__profile">
					<Image src="/images/user.jpg" alt="user image" width="32" height="32"/>
				</div>
			</div>
		</nav>
	)
}
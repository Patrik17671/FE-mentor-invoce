export const fadeLeftAnim = {
	show: {opacity: 1, x: 0},
	hidden: {opacity: 0, x: "-100%"}
}
export const fadeInAnim = {
	show: {opacity: 1},
	hidden: {opacity: 0}
}
export const popUpAnim = {
	show: {opacity: 1, scale: 1},
	hidden: {opacity: 0, scale: .8}
}
export const popUpWrapperAnim = {
	hidden: {opacity: 1, scale: 1},
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.5,
		}
	}
}
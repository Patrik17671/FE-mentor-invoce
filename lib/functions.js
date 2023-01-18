export const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
export const formatDate = (date) => {
	return new Date(date)
}

//Format new date plus day
export const addDays = (date, days) => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	return newDate;
}

//Return fumber from string
export const returnNum = (str) => {
	const num = str.replace(/[^0-9]/g, '');
	return parseInt(num,10);
}
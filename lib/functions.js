import * as yup from "yup";
export const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
export const formatDate = (date) => {
	return new Date(date)
}
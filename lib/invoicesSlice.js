import {createSlice} from '@reduxjs/toolkit';
import {data} from "../pages/api/data.js"

if(typeof window !== 'undefined'){
	localStorage.getItem("invoicesItems") !== "" ?
		localStorage.setItem("invoicesItems", JSON.stringify(data)) : "";
}

const initialState = {
	invoiceItems: typeof window !== 'undefined' ? localStorage.getItem("invoiceItems")
		? JSON.parse(localStorage.getItem("invoiceItems"))
		: [] : [],
}

export const invoicesSlice = createSlice({
	name: 'invoiceItems',
	initialState,
	reducers: {
	
	}
})

export default invoicesSlice.reducer;
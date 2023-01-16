import {createSlice} from '@reduxjs/toolkit';
import {data} from "../pages/api/data.js"

if(typeof window !== 'undefined'){
	localStorage.getItem("invoicesItems") === null ?
		localStorage.setItem("invoicesItems", JSON.stringify(data)) : "";
}

const initialState = {
	invoiceItems: typeof window !== 'undefined' ? localStorage.getItem("invoicesItems")
		? JSON.parse(localStorage.getItem("invoicesItems"))
		: [] : [],
}

export const invoicesSlice = createSlice({
	name: 'invoiceItems',
	initialState,
	reducers: {
		setEditInvoice(state,action){
	
			const itemIndex = state.invoiceItems.findIndex(
				(item) => item.id === action.payload[0].id
			);
			state.invoiceItems[itemIndex].id = action.payload[0].id
			state.invoiceItems[itemIndex].clientName = action.payload[0].clientName
			state.invoiceItems[itemIndex].clientEmail = action.payload[0].clientEmail
			state.invoiceItems[itemIndex].clientAddress = action.payload[0].clientAddress
			state.invoiceItems[itemIndex].senderAddress = action.payload[0].senderAddress
			state.invoiceItems[itemIndex].items = action.payload[0].items
			state.invoiceItems[itemIndex].description = action.payload[0].description
			state.invoiceItems[itemIndex].status = action.payload[0].status
			state.invoiceItems[itemIndex].total = action.payload[0].total
			// state.invoiceItems[itemIndex].paymentTerms = action.payload[0].paymentTerms
			state.invoiceItems[itemIndex].createdAt = action.payload[0].createdAt
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setNewItem(state, action){
			const itemIndex = state.invoiceItems.findIndex(
				(item) => item.id === action.payload[0].id
			);
			
			const items = state.invoiceItems[itemIndex].items
			items.push({name: "",quantity: "",price: "", total: ""})
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		}
	}
})

export const { setEditInvoice, setNewItem} = invoicesSlice.actions;

export const selectInvoiceItems = (state) => state.invoiceItems;

export default invoicesSlice.reducer;
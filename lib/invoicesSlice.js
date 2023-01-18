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
			state.invoiceItems[itemIndex].paymentTerms = action.payload[0].paymentTerms
			state.invoiceItems[itemIndex].createdAt = action.payload[0].createdAt
			state.invoiceItems[itemIndex].paymentDue = action.payload[0].paymentDue
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setNewItem(state, action){
			const itemIndex = state.invoiceItems.findIndex(
				(item) => item.id === action.payload[0].id
			);
			
			const items = state.invoiceItems[itemIndex].items
			items.push({name: "",quantity: "",price: "", total: ""})
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setRemoveItem(state, action){
			const itemIndex = state.invoiceItems.findIndex(
				(item) => item.id === action.payload[0].id
			);
			state.invoiceItems[itemIndex].items = state.invoiceItems[itemIndex].items.filter(
				item => item.name !== action.payload[0].name
			);
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setAsPaid(state, action){
			const itemIndex = state.invoiceItems.findIndex(
				(item) => item.id === action.payload[0].id
			);
			state.invoiceItems[itemIndex].status = "paid"
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setDeleteInvoice(state, action){
			state.invoiceItems = state.invoiceItems.filter(
				item => item.id !== action.payload[0].id
			);
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		},
		setNewInvoice(state, action){
			const newInvoice = {
				clientAddress: {
					street: action.payload[0].clientAddress.street,
					city: action.payload[0].clientAddress.city,
					postCode: action.payload[0].clientAddress.postCode,
					country: action.payload[0].clientAddress.country,
				},
				clientEmail: action.payload[0].clientEmail,
				clientName: action.payload[0].clientName,
				createdAt: action.payload[0].createdAt,
				description: action.payload[0].description,
				id: action.payload[0].id,
				items: action.payload[0].items,
				paymentDue: action.payload[0].paymentDue,
				status: action.payload[0].status,
				total: action.payload[0].total,
				senderAddress: {
					street: action.payload[0].senderAddress.street,
					city: action.payload[0].senderAddress.city,
					postCode: action.payload[0].senderAddress.postCode,
					country: action.payload[0].senderAddress.country,
				},
			}
			state.invoiceItems.push(newInvoice);
			localStorage.setItem("invoicesItems", JSON.stringify(state.invoiceItems));
		}
	}
})

export const { setEditInvoice, setNewItem, setRemoveItem, setAsPaid, setDeleteInvoice, setNewInvoice} = invoicesSlice.actions;

export const selectInvoiceItems = (state) => state.invoiceItems;

export default invoicesSlice.reducer;
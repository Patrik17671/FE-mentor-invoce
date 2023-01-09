import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from "./invoicesSlice";

export default configureStore({
	reducer: {
		invoiceItems: invoicesReducer
	},
})
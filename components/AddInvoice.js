import {useForm,useFieldArray} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setNewInvoice} from "../lib/invoicesSlice";
import {addDays,returnNum} from "../lib/functions";
import {useState} from "react";

export default function AddInvoice({setNewInvoiceState}){
	
	//Payment terms object
	const paymentTermsOptions = [{name:"Net 1 Day", value: 1},{name:"Net 7 Days", value: 7},{name:"Net 14 Days", value: 14},{name:"Net 30 Days", value: 30}]
	
	//Invoice items
	const [items, setItems] = useState([{name: "",price: 0,quantity: 1,total: 0}])
	
	//Toggle payment terms select
	const [openPaymentTerms, setOpenPaymentTerms] = useState(false)
	
	//Redux dispatch
	const dispatch = useDispatch();
	
	//Form function
	const {control,register, handleSubmit,setValue, getValues, reset , formState:{ errors }} = useForm({
	});
	
	//Form dynamic inputs init
	const { invoiceItems, fields } = useFieldArray({
		control,
		name: "items" // unique name for your Field Array
	});
	
	//Set form data to redux
	const submitForm = (formData) => {
		dispatch(setNewInvoice([
			{
				id: formData.id,
				clientName: formData.clientName,
				clientEmail: formData.clientEmail,
				clientAddress: {street: formData.clientAddress.street, city: formData.clientAddress.city, postCode: formData.clientAddress.postCode, country: formData.clientAddress.country},
				senderAddress: {street: formData.senderAddress.street, city: formData.senderAddress.city, postCode: formData.senderAddress.postCode, country: formData.senderAddress.country},
				items: formData.items,
				description: formData.description,
				status: formData.status,
				total: formData.total,
				paymentTerms: returnNum(formData.paymentTerms),
				createdAt: formData.createdAt,
				paymentDue: addDays(formData.createdAt,returnNum(formData.paymentTerms)),
			}
		]));
		setNewInvoiceState(false);
	}
	
	//Add new empty item to items
	const handleNewItem = () => {
		const newItems = [...items,items.push({name: "",price: 0,quantity: 1,total: 0})]
		setItems(newItems);
	}
	
	//Remove item from form
	const handleRemoveItem = (index) => {
		const newItems = items.splice(index,1);
		setItems(newItems);
	}
	
	//Get total value of items
	const handleTotal = () => {
		let values = getValues(`items`);
		let sum = 0;
		const getTotals = (item) => {
			sum += item.total;
		}
		values.forEach(getTotals)
		setValue("total",sum);
	}
	
	return(
		<div className="edit">
			<div className="overlay"
				 onClick={() => {setNewInvoiceState(false)}}
			/>
			<div onClick={
				(e) => {
					e.stopPropagation();
					setOpenPaymentTerms(false);
				}}
			 
				 className="edit__content" >
				<form onSubmit={handleSubmit(submitForm)}>
					<h1 >New Invoice</h1>
					<div className="input__wrapper">
						<label htmlFor="id">Invoice Id</label>
						<input
							type="text" id="id"
							{...register(`id`)}
						/>
						{errors.streetAddress ? <span>This field is required</span> : ""}
					</div>
					
					<h3>Bill From</h3>
					
					<div className="input__wrapper">
						<label htmlFor="streetAddress">Street Address</label>
						<input
							type="text" id="streetAddress"
							{...register(`senderAddress.street`)}
						/>
						{errors.streetAddress ? <span>This field is required</span> : ""}
					</div>
					<div className="grid grid-cols-6 gap-x-4">
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="city">City</label>
							<input
								type="text"
								id="city"
								{...register("senderAddress.city", { required: true })}
							/>
							{errors.senderAddress?.city ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="postCode">Post Code</label>
							<input
								type="text"
								id="postCode"
								{...register(`senderAddress.postCode`)}
							/>
							{errors.senderAddress?.postCode ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-6 md:col-span-2">
							<label htmlFor="country">Country</label>
							<input
								type="text"
								id="country"
								{...register(`senderAddress.country`)}
							/>
							{errors.senderAddress?.country ? <span className="error">This field is required</span> : ""}
						</div>
					</div>
					
					<h3>Bill To</h3>
					
					<div className="input__wrapper">
						<label htmlFor="clientName">Client’s Name</label>
						<input
							type="text"
							id="clientName"
							{...register(`clientName`)}
						/>
						{errors.clientName ? <span className="error">This field is required</span> : ""}
					</div>
					<div className="input__wrapper">
						<label htmlFor="clientEmail">Client’s Email</label>
						<input
							type="text"
							id="clientEmail"
							{...register(`clientEmail`,
								{
									required: "Email is required",
									pattern: {
										value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "Please enter a valid email"
									},
								})}
						/>
						{errors.clientEmail ? <span className="error">{errors.clientEmail?.message}</span> : ""}
					</div>
					<div className="input__wrapper">
						<label htmlFor="streetAddress2">Street Address</label>
						<input
							type="text"
							id="streetAddress2"
							{...register(`clientAddress.street`)}
						/>
					</div>
					<div className="grid grid-cols-6 gap-x-4">
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="city2">City</label>
							<input
								type="text"
								id="city2"
								{...register(`clientAddress.city`)}
							/>
						</div>
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="postCode2">Post Code</label>
							<input
								type="text"
								id="postCode2"
								{...register(`clientAddress.postCode`)}
							/>
						</div>
						<div className="input__wrapper col-span-6 md:col-span-2">
							<label htmlFor="country2">Country</label>
							<input
								type="text"
								id="country2"
								{...register(`clientAddress.country`)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<div className="input__wrapper col-span-2 md:col-span-1">
							<label htmlFor="invoiceDate">Invoice Date</label>
							<input
								type="date"
								id="invoiceDate"
								{...register(`createdAt`)}
							/>
						</div>
						<div className={`input__wrapper select-input col-span-2 md:col-span-1 ${openPaymentTerms ? "active" : ""}`}>
							<label htmlFor="paymentTerms">Payment Terms</label>
							<input
								type="text"
								id="paymentTerms"
								onClick={(e) => {
									e.stopPropagation();
									setOpenPaymentTerms(!openPaymentTerms)
								}}
								{...register(`paymentTerms`)}
							/>
							<i className="icon-arrow-down" />
							<ul>
								{paymentTermsOptions.map((payment, index) => {
									return(
										<li key={index}>
											<label htmlFor={`terms${payment.value}`}>{payment.name}</label>
											<input
												type="checkbox"
												id={`terms${payment.value}`}
												value={payment.value}
												onClick={() => setValue(`paymentTerms`,`Net ${payment.value} Days`)}
											/>
										</li>
									)
								})}
								
							</ul>
						</div>
					</div>
					<div className="input__wrapper">
						<label htmlFor="projectDescription">Project Description</label>
						<input
							type="text"
							id="projectDescription"
							{...register(`description`)}
						/>
						{errors.projectDescription ? <span className="error">This field is required</span> : ""}
					</div>
					
					<div className="edit__items">
						
						<h1>Item List</h1>
						
						<ul>
							{items?.map((item,index) => {
								return(
									<li key={index}>
										<div className="input__wrapper">
											<label htmlFor={`itemName${index}`}>Item Name</label>
											<input
												type="text"
												id={`itemName${index}`}
												{...register(`items.${index}.name`)}
											/>
										</div>
										<div className="flex justify-between items-center gap-4">
											<div className="input__wrapper">
												<label htmlFor={`qty${index}`}>Qty</label>
												<input
													className="valueInput"
													type="number"
													id={`qty${index}`}
													{...register(`items.${index}.quantity`, {valueAsNumber: true, shouldTouch: true , onChange: (e) => {
															const values = getValues([`items.${index}.quantity`,`items.${index}.price`]);
															const totalValue = values.reduce((a, b)=> a*b, 1)
															setValue(`items.${index}.total`, totalValue)
														}})}
												/>
											</div>
											<div className="input__wrapper">
												<label htmlFor={`price${index}`}>Price</label>
												<input
													className="valueInput"
													type="number"
													id={`price${index}`}
													{...register(`items.${index}.price`, {valueAsNumber: true, onChange: (e) => {
															const values = getValues([`items.${index}.quantity`,`items.${index}.price`]);
															const totalValue = values.reduce((a, b)=> a*b, 1)
															setValue(`items.${index}.total`, totalValue)
														}})}
												/>
											</div>
											<div className="input__wrapper no-border">
												<label htmlFor={`total${index}`}>total</label>
												<input
													type="text"
													id={`total${index}`}
													readOnly={true}
													value={item.total}
													{...register(`items.${index}.total`, {valueAsNumber: true})}
												/>
											</div>
											<i onClick={() => handleRemoveItem(index)} className="icon-delete"/>
										</div>
									</li>
								)
							})}
						</ul>
						
						
						<a onClick={handleNewItem} className="btn btn--light btn-full mt-8">+ Add New Item</a>
						
						<input
							className="hidden"
							type="number"
							id="total"
							value={getValues("total")}
							{...register("total", {valueAsNumber: true})}
						/>
						<input
							className="hidden"
							type="text"
							id="status"
							value={"pending"}
							{...register("status")}
						/>
						<input
							className="hidden"
							type="text"
							id="status"
							{...register("paymentDue")}
						/>
						
						<div className="edit__actions new-invoice">
							<a onClick={() => setNewInvoiceState(false)} className="btn btn--light">Discard</a>
							<div>
								<button type="submit" onClick={() => {
									setValue("status","draft");
									handleTotal();
								}}
										className="btn">Save as Draft
								</button>
								<button type="submit" onClick={() => {
									setValue("status","pending");
									handleTotal();
								}}
										className="btn">Save & Send
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
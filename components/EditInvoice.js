import {useForm,useFieldArray} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setEditInvoice, setNewItem, setRemoveItem} from "../lib/invoicesSlice";
import {addDays,returnNum} from "../lib/functions";
import {useState} from "react";

import { motion } from "framer-motion"
import {fadeInAnim, fadeLeftAnim} from "../lib/animations";

export default function EditInvoice({setActiveEdit,invoiceData,dataChanged,setDataChanged}){
	
	//Ivoice data
	const {id, clientAddress, clientEmail,senderAddress ,clientName,items , description, createdAt, paymentDue, paymentTerms,status , total} = invoiceData;
	
	//Payment terms object
	const paymentTermsOptions = [{name:"Net 1 Day", value: 1},{name:"Net 7 Days", value: 7},{name:"Net 14 Days", value: 14},{name:"Net 30 Days", value: 30}]
	
	//Toggle payment terms select
	const [openPaymentTerms, setOpenPaymentTerms] = useState(false)
	
	//Redux dispatch
	const dispatch = useDispatch();
	
	//Form function
	const {control,register, handleSubmit,setValue, getValues, reset , formState:{ errors }} = useForm({
	});
	
	const { invoiceItems, fields } = useFieldArray({
		control,
		name: "items" // unique name for your Field Array
	});
	
	//Set form data to redux
	const submitForm = (formData) => {
		dispatch(setEditInvoice([
			{
				id: id,
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
		]))
		setDataChanged(!dataChanged);
		setActiveEdit(false);
	}
	
	//Add new empty item to items
	const handleNewItem = () => {
		dispatch(setNewItem([
			{
				id: id,
			}
		]))
		setDataChanged(!dataChanged);
	}
	
	const handleRemoveItem = (name) => {
		dispatch(setRemoveItem([
			{
				id: id,
				name: name
			}
		]))
		reset();
		setDataChanged(!dataChanged);
	}
	
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
		<motion.div
			className="edit"
			animate={fadeInAnim.show}
			initial={fadeInAnim.hidden}
			exit={fadeInAnim.hidden}
		>
			<div className="overlay"
				 onClick={() => {setActiveEdit(false)}}
			/>
			<motion.div onClick={
				(e) => {
					e.stopPropagation();
					setOpenPaymentTerms(false);
				}}
			 animate={fadeLeftAnim.show}
			 initial={fadeLeftAnim.hidden}
			 exit={fadeLeftAnim.hidden}
			 transition={{type:"tween"}}
			 className="edit__content"
			>
				<form onSubmit={handleSubmit(submitForm)}>
					<h1>Edit #{id}</h1>
					
					<h3>Bill From</h3>
					
					<div className="input__wrapper">
						<label htmlFor="streetAddress">Street Address</label>
						<input
							type="text" id="streetAddress"
							defaultValue={senderAddress.street}
							{...register(`senderAddress.street`,{ required: true })}
						/>
						{errors.senderAddress?.street ? (<span className="error">This field is required</span>) : ""}
					</div>
					<div className="grid grid-cols-6 gap-x-4">
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="city">City</label>
							<input
								type="text"
								id="city"
								defaultValue={senderAddress.city}
								{...register("senderAddress.city", { required: true })}
							/>
							{errors.senderAddress?.city ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="postCode">Post Code</label>
							<input
								type="text"
								id="postCode"
								defaultValue={senderAddress.postCode}
								{...register(`senderAddress.postCode`, { required: true })}
							/>
							{errors.senderAddress?.postCode ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-6 md:col-span-2">
							<label htmlFor="country">Country</label>
							<input
								type="text"
								id="country"
								defaultValue={senderAddress.country}
								{...register(`senderAddress.country`, { required: true })}
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
							defaultValue={clientName}
							{...register(`clientName`, { required: true })}
						/>
						{errors.clientName ? <span className="error">This field is required</span> : ""}
					</div>
					<div className="input__wrapper">
						<label onClick={() => console.log(errors)} htmlFor="clientEmail">Client’s Email</label>
						<input
							type="text"
							id="clientEmail"
							defaultValue={clientEmail}
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
							defaultValue={clientAddress.street}
							{...register(`clientAddress.street`, { required: true })}
						/>
						{errors.clientAddress?.street ? <span className="error">This field is required</span> : ""}
					</div>
					<div className="grid grid-cols-6 gap-x-4">
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="city2">City</label>
							<input
								type="text"
								id="city2"
								defaultValue={clientAddress.city}
								{...register(`clientAddress.city`, { required: true })}
							/>
							{errors.clientAddress?.city ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-3 md:col-span-2">
							<label htmlFor="postCode2">Post Code</label>
							<input
								type="text"
								id="postCode2"
								defaultValue={clientAddress.postCode}
								{...register(`clientAddress.postCode`, { required: true })}
							/>
							{errors.clientAddress?.postCode ? <span className="error">This field is required</span> : ""}
						</div>
						<div className="input__wrapper col-span-6 md:col-span-2">
							<label htmlFor="country2">Country</label>
							<input
								type="text"
								id="country2"
								defaultValue={clientAddress.country}
								{...register(`clientAddress.country`, { required: true })}
							/>
							{errors.clientAddress?.country ? <span className="error">This field is required</span> : ""}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-4">
						<div className="input__wrapper col-span-2 md:col-span-1">
							<label htmlFor="invoiceDate">Invoice Date</label>
							<input
								type="date"
								id="invoiceDate"
								defaultValue={ createdAt}
								{...register(`createdAt`, { required: true })}
							/>
							{errors.createdAt ? <span className="error">This field is required</span> : ""}
						</div>
						<div className={`input__wrapper select-input col-span-2 md:col-span-1 ${openPaymentTerms ? "active" : ""}`}>
							<label htmlFor="paymentTerms">Payment Terms</label>
							<input
								type="text"
								id="paymentTerms"
								defaultValue={`Net ${paymentTerms} Days`}
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
							defaultValue={description}
							{...register(`description`, { required: true })}
						/>
							{errors.description ? <span className="error">This field is required</span> : ""}
					</div>
					
					<div className="edit__items">
						
						<h1>Item List</h1>
						
						<ul>
							{items.map((item,index) => {
								return(
									<li key={index}>
										<div className="input__wrapper">
											<label htmlFor={`itemName${index}`}>Item Name</label>
											<input
												type="text"
												id={`itemName${index}`}
												defaultValue={item.name}
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
													defaultValue={item.quantity}
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
													defaultValue={item.price}
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
											<i onClick={() => handleRemoveItem(item.name)} className="icon-delete"/>
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
							defaultValue={total}
							{...register("total", {valueAsNumber: true})}
						/>
						<input
							className="hidden"
							type="text"
							id="status"
							defaultValue={status}
							{...register("status")}
						/>
						<input
							className="hidden"
							type="text"
							id="status"
							defaultValue={paymentDue}
							{...register("paymentDue")}
						/>
						
						<div className="edit__actions">
							<a onClick={() => setActiveEdit(false)} className="btn btn--light">Cancel</a>
							<button
								type="submit"
								className="btn"
								onClick={handleTotal}
							>
								Save Changes
							</button>
						</div>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}
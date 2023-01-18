import {data} from "../api/data";
import Link from "next/link";
import EditInvoice from "../../components/EditInvoice.js"
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import {selectInvoiceItems,setAsPaid} from "../../lib/invoicesSlice.js"
import {dateOptions, formatDate} from "../../lib/functions";
import {useDispatch} from "react-redux";

export async function getServerSideProps(context) {
	const id = context.params.id
	
	return{
		props: {
			selectedInvoice: id,
		},
	}
}

export default function Invoice({selectedInvoice}){
	
	const invoicedata = useSelector(selectInvoiceItems);
	const invoiceIndex = invoicedata.invoiceItems.findIndex(x => x.id === selectedInvoice)
	
	//Fixed error with undefined data after refresh
	const [invoiceDataState, setInvoiceDataState] = useState({id:"", clientAddress: "", clientEmail: "",senderAddress: "" ,clientName: "",items: [] , description: "", createdAt:"", paymentDue:"",status: "" , total: ""})
	const [dataChanged, setDataChanged] = useState(false);
	
	useEffect(() =>{
		setInvoiceDataState(invoicedata.invoiceItems[invoiceIndex]);
	},[dataChanged])
	
	const {id, clientAddress, clientEmail,senderAddress ,clientName,items , description, createdAt, paymentDue,status , total} = invoiceDataState
	const [activeEdit, setActiveEdit] = useState(false);
	
	//Redux dispatch
	const dispatch = useDispatch();
	
	const handleSetPaid = () => {
		dispatch(setAsPaid([{id: id}]));
		setDataChanged(!dataChanged);
	}
	
	return(
		<div className="content">
			{activeEdit ?
				(<EditInvoice
					invoiceData={invoiceDataState}
					dataChanged={dataChanged}
					setDataChanged={setDataChanged}
					setActiveEdit={setActiveEdit} />)
				: ""}
			<div className="container">
				<Link href={"/"} className="back-btn mb-8">
					<i className="icon-arrow-left"/>
					Go back
				</Link>
				<div className="invoice__header">
					<div className="flex justify-between w-full  md:justify-start items-center">
						<span className="mr-4">Status</span>
						<span className={`status ${status}`}>
							<div className="dot"/>
							{status}
						</span>
					</div>
					<div className="invoice__actions">
						<a onClick={() => setActiveEdit(true)} className="btn btn--light">Edit</a>
						<a className="btn btn--delete">Delete</a>
						{status === "pending" ? (<a onClick={handleSetPaid} className="btn btn--primary">Mark as Paid</a>) : ""}
					</div>
				</div>
				<div className="invoice__wrapper">
					<div className="md:flex justify-between">
						<div className="mb-8 md:mb-0">
							<span className="invoice__data--big">#{id}</span>
							<span className="invoice__data--small">{description}</span>
						</div>
						<div className="invoice__data--small invoice__data--smaller">
							<span>{senderAddress.street}</span>
							<span>{senderAddress.country}</span>
							<span>{senderAddress.postCode}</span>
							<span>{senderAddress.city}</span>
						</div>
					</div>
					<div className="mt-8 grid grid-cols-2 md:grid-cols-3">
						<div>
							<span className="invoice__data--small">Invoice Date</span>
							<span className="invoice__data--big">{ formatDate(createdAt).toLocaleDateString('en-us', dateOptions)}</span>
							<span className="invoice__data--small mt-8">Payment Due</span>
							<span className="invoice__data--big">{ formatDate(paymentDue).toLocaleDateString('en-us', dateOptions)}</span>
						</div>
						<div>
							<span className="invoice__data--small">Bill To</span>
							<span className="invoice__data--big">{clientName}</span>
							<div className="invoice__data--small invoice__data--smaller">
								<span>{clientAddress.street}</span>
								<span>{clientAddress.country}</span>
								<span>{clientAddress.postCode}</span>
								<span>{clientAddress.city}</span>
							</div>
						</div>
						<div className="mt-8 md:mt-0">
							<span className="invoice__data--small">Sent To</span>
							<span className="invoice__data--big">{clientEmail}</span>
						</div>
					</div>
					<div className="invoice__items">
						<ul>
							{items.map((item,index) => {
								return(
									<li key={index}>
										<div>
											<span className="invoice__item-title">{item.name}</span>
											<span className="invoice__item-qty">{item.quantity}x £{item.price}</span>
										</div>
										<span className="invoice__item-price">£ {item.total}</span>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="invoice__total">
						<span>Grand Total</span>
						<span>£ {total}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
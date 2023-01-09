import {data} from "../api/data";
import Link from "next/link";
import EditInvoice from "../../components/EditInvoice.js"
export async function getStaticPaths() {
	// console.log(data)
	const paths = data.map(invoice => {
		return {
			params: {id: invoice.id}
		}
	})
	return {
		paths: paths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const id = context.params.id
	
	return{
		props: {selectedInvoice: id}
	}
}

export default function Invoice({selectedInvoice}){
	const invoiceIndex = data.findIndex(x => x.id === selectedInvoice)
	const {id, clientAddress, clientEmail,senderAddress ,clientName,items , description, createdAt, paymentDue,status , total} = data[invoiceIndex]
	
	const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
	const formatDate = (date) => {
		return new Date(date)
	}
	
	return(
		<div className="content">
			<EditInvoice />
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
						<a className="btn btn--light">Edit</a>
						<a className="btn btn--delete">Delete</a>
						<a className="btn btn--primary">Mark as Paid</a>
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
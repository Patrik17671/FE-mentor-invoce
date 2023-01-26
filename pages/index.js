import Head from 'next/head'
import Invoices from "../components/Invoices.js";
import {useState,useMemo,useEffect} from "react";
import AddInvoice from "../components/AddInvoice.js"
import {AnimatePresence} from "framer-motion";

export default function Home() {
	
	//Variables
	const statuses = ["paid","pending","draft"];
	
	//States
	const [openFilter, setOpenFilter] = useState(false);
	const [invoices, setInvoices] = useState([]);
	const [activeStatuses, setActiveStatuses] = useState([]);
	const [newInvoice, setNewInvoice] = useState(false);

	//Get data
	useEffect(() => {
		setInvoices(JSON.parse(localStorage.getItem('invoicesItems')))
	}, []);
	
	
	//Change active statuses
	const toggleStatus = (status) => {
		if (activeStatuses.includes(status)) {
			setActiveStatuses(activeStatuses.filter((s) => s !== status));
		} else {
			setActiveStatuses([...activeStatuses, status]);
		}
	};
	
	//Filter by status
	const filteredInvoices = useMemo(() => {
		if (activeStatuses.length === 0) {
			return invoices;
		}
		return invoices.filter(invoice => activeStatuses.includes(invoice.status));
	},[activeStatuses,invoices]);
	
	return (
		<div className="content">
			<Head>
				<title>Fe mentor invoces</title>
				<meta name="description" content="Fe mentor invoces"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main>
				<AnimatePresence>
					{newInvoice ? (<AddInvoice newInvoiceState={newInvoice} setNewInvoiceState={setNewInvoice} />) : ""}
				</AnimatePresence>
				<div className="container">
					<div className="invoices__header">
						<div className="invoices__title">
							<h1>Invoices</h1>
							<span>{invoices.length} invoces</span>
						</div>
						<div className="invoices__actions">
							<span onClick={() => setOpenFilter(!openFilter)} className={`invo-filter ${openFilter ? "active" : ""}`}>
								Filter
								<i className="icon-arrow-down" />
								
								<div className="invo-filter__options">
									{statuses.map((status,index) => {
										return(
											<div key={index}>
												<input
													type="checkbox"
													checked={activeStatuses.includes(status)}
													onChange={() => toggleStatus(status)}
													id={status}/>
												<label htmlFor={status}>{status}</label>
											</div>
										)
									})}
								</div>
							</span>
							<a onClick={() => setNewInvoice(true)} className="btn btn--icon">
								<span className="icon">
									<i className="icon-plus" />
								</span>
								New <span className="hidden md:inline font-bold">invoices</span>
							</a>
						</div>
					</div>
					<Invoices filteredInvoices={filteredInvoices} />
				</div>
			</main>
		</div>
	)
}

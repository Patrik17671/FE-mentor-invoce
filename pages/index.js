import Head from 'next/head'
import Invoices from "../components/Invoices";
import {useState,useMemo} from "react";
import {data} from "./api/data"

let storageData = data;

if(typeof window !== 'undefined'){
	localStorage.getItem("invoicesItems") !== "" ?
		localStorage.setItem("invoicesItems", JSON.stringify(storageData)) : "";
}


export const getStaticProps = async () => {
	return{
		props: {
			invoicesData: storageData,
		}
	}
}

export default function Home({invoicesData}) {
	
	const statuses = ["paid","pending","draft"];
	
	const [openFilter, setOpenFilter] = useState(false);
	const [invoices, setInvoices] = useState(invoicesData);
	const [activeStatuses, setActiveStatuses] = useState([]);
	
	const toggleStatus = (status) => {
		if (activeStatuses.includes(status)) {
			setActiveStatuses(activeStatuses.filter((s) => s !== status));
		} else {
			setActiveStatuses([...activeStatuses, status]);
		}
	};
	
	const filteredInvoices = useMemo(() => {
		
		if (activeStatuses.length === 0) {
			return invoices;
		}
		
		return invoices.filter(invoice => activeStatuses.includes(invoice.status));
		
	},[activeStatuses]);
	
	return (
		<div className="content">
			<Head>
				<title>Fe mentor invoces</title>
				<meta name="description" content="Fe mentor invoces"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main>
				<div className="container">
					<div className="invoices__header">
						<div className="invoices__title">
							<h1>Invoices</h1>
							<span>{invoicesData.length} invoces</span>
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
							<a className="btn btn--icon">
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

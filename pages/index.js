import Head from 'next/head'
import Invoices from "../components/Invoices";
import {useState} from "react";
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
	
	const [openFilter, setOpenFilter] = useState(false);
	const [invoices, setInvoices] = useState(invoicesData)
	
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
									<input  type="checkbox" id="draft"/>
									<label htmlFor="draft">Draft</label>
									
									<input  type="checkbox" id="pending"/>
									<label htmlFor="pending">Pending</label>
									
									<input  type="checkbox" id="paid"/>
									<label htmlFor="paid">Paid</label>
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
					<Invoices invoices={invoices} />
				</div>
			</main>
		</div>
	)
}

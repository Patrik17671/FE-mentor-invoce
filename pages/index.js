import Head from 'next/head'
import Invoices from "../components/Invoices";

export default function Home({}) {
	return (
		<div className="">
			<Head>
				<title>Fe mentor invoces</title>
				<meta name="description" content="Fe mentor invoces"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main className="pt-28">
				<div className="container">
					<div className="invoices__header">
						<div className="invoices__title">
							<h1>Invoices</h1>
							<span>7 invoces</span>
						</div>
						<div className="invoices__actions">
							<span className="invo-filter active">
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
								<span>
									<i className="icon-plus" />
								</span>
								New
							</a>
						</div>
					</div>
					<Invoices />
				</div>
			</main>
		</div>
	)
}

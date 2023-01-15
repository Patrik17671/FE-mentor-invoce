import Link from "next/link";
import {dateOptions, formatDate} from "../lib/functions";
export default function Invoices({filteredInvoices}){
	
	return(
		<ul className="invoices__list">
			{filteredInvoices?.map(invoices => (
				<li key={invoices.id}>
					<Link href={`/invoice/${invoices.id}`}>
						<span className="code">#{invoices.id}</span>
						<span className="date">Due  { formatDate(invoices.paymentDue).toLocaleDateString('en-us', dateOptions)}</span>
						<span className="name">{invoices.clientName}</span>
						<span className="price">£ {invoices.total}</span>
						<div className={`status ${invoices.status}`}>
							<span className="dot" />
							{invoices.status}
						</div>
						<i className="icon-arrow-right hidden md:block" />
					</Link>
				</li>
			))}
		</ul>
	)
}
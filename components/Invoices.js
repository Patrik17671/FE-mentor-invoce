import Link from "next/link";
import {dateOptions, formatDate} from "../lib/functions";
import {AnimatePresence, motion} from "framer-motion"
import {popUpAnim,popUpWrapperAnim} from "../lib/animations";
export default function Invoices({filteredInvoices}){
	
	return(
		<AnimatePresence>
			<motion.ul
				className="invoices__list"
				// variants={popUpWrapperAnim}
				// animate="show"
				// initial="hidden"
			>
				{filteredInvoices?.map(invoices => (
					<motion.li
						key={invoices.id}
						// variants={popUpAnim}
						// exit={popUpAnim.hidden}
					>
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
					</motion.li>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}

export default function Invoices({invoicesData}){
	
	console.log(invoicesData)
	
	invoicesData.map((invo,index) => {
		return console.log(index)
	})
	
	const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
	const formatDate = (date) => {
		return new Date(date)
	}
	
	return(
		<ul className="invoices__list">
			{invoicesData.map(invoices => (
				<li key={invoices.id}>
					<span className="code">#{invoices.id}</span>
					<span className="date">Due  { formatDate(invoices.paymentDue).toLocaleDateString('en-us', dateOptions)}</span>
					<span className="name">{invoices.clientName}</span>
					<span className="price">£ {invoices.total}</span>
					<div className={`status ${invoices.status}`}>
						<span className="dot" />
						{invoices.status}
					</div>
					<i className="icon-arrow-right hidden md:block" />
				</li>
			))}
		</ul>
	)
}
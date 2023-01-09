export default function editInvoice(){
	return(
		<div className="edit overlay">
			<div className="">
				<form action="">
					<h1>Edit #XM914</h1>
					
					<h3>Bill From</h3>
					
					<div className="input__wrapper">
						<label htmlFor="streetAddress">Street Address</label>
						<input type="text" id="streetAddress"/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="input__wrapper">
							<label htmlFor="streetAddress">City</label>
							<input type="text" id="streetAddress"/>
						</div>
						<div className="input__wrapper">
							<label htmlFor="streetAddress">Post Code</label>
							<input type="text" id="streetAddress"/>
						</div>
					</div>
					<div className="input__wrapper">
						<label htmlFor="streetAddress">Country</label>
						<input type="text" id="streetAddress"/>
					</div>
					
					<h3>Bill To</h3>
					
					<div className="input__wrapper">
						<label htmlFor="clientName">Client’s Name</label>
						<input type="text" id="clientName"/>
					</div>
					<div className="input__wrapper">
						<label htmlFor="clientEmail">Client’s Email</label>
						<input type="text" id="clientEmail"/>
					</div>
					<div className="input__wrapper">
						<label htmlFor="streetAddress2">Street Address</label>
						<input type="text" id="streetAddress2"/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="input__wrapper">
							<label htmlFor="City">City</label>
							<input type="text" id="City"/>
						</div>
						<div className="input__wrapper">
							<label htmlFor="postCode2">Post Code</label>
							<input type="text" id="postCode2"/>
						</div>
					</div>
					<div className="input__wrapper">
						<label htmlFor="country2">Country</label>
						<input type="text" id="country2"/>
					</div>
					<div className="input__wrapper">
						<label htmlFor="invoiceDate">Invoice Date</label>
						<input type="text" id="invoiceDate"/>
					</div>
					<div className="input__wrapper">
						<label htmlFor="paymentTerms">Payment Terms</label>
						<input type="text" id="paymentTerms"/>
					</div>
					<div className="input__wrapper">
						<label htmlFor="projectDescription">Project Description</label>
						<input type="text" id="projectDescription"/>
					</div>
					
					<div className="edit__items">
						<div className="input__wrapper">
							<label htmlFor="itemName">Item Name</label>
							<input type="text" id="itemName"/>
						</div>
						<div className="flex justify-between items-center gap-4">
							<div className="input__wrapper">
								<label htmlFor="qty">Qty</label>
								<input type="text" id="qty"/>
							</div>
							<div className="input__wrapper">
								<label htmlFor="price">Price</label>
								<input type="text" id="price"/>
							</div>
							<div className="input__wrapper no-border">
								<label htmlFor="itemName">total</label>
								<input type="text" id="itemName"/>
							</div>
							<i  className="icon-delete"/>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
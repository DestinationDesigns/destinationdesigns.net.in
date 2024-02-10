import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";

import "./Contact.css";

async function Contact() {
	return (
		<>
			<div id="entire-contact">
				<div id="contact-body">
					<div id="contact-heading">
						<h1>Contact</h1>
					</div>

					<div className="contact-flex">
						<div className="contact-info">
							<h2>Hours</h2>
							<p>Monday - Friday : 9 AM to 6 PM</p>
							<p>Saturday : 9 AM to 1 PM</p>
							<p>Sunday : Closed</p>

							<h2>Enquiries</h2>
							<p>info@destinationdesigns.net.in</p>

							<h2>Work with us</h2>
							<p>
								To submit your Resume please check our careers
								page
							</p>
							<button className="contact-button">Career</button>
						</div>
						<div className="contact-form">
							<p>
								For all enquiries, whether you have a project in
								mind or just want to say hello, please get in
								touch via this form.
							</p>
							<form>
								<div id="form-input">
									<input
										id="first-name-form"
										type="text"
										className="form-textbox"
										placeholder=" First Name*"
									/>
									<input
										id="second-name-form"
										type="text"
										className="form-textbox"
										placeholder=" Last Name*"
									/>
								</div>
								<div id="form-input">
									<input
										type="text"
										className="form-textbox"
										placeholder=" Your Email*"
									/>
								</div>

								<div id="form-input">
									<textarea
										className="form-textarea"
										placeholder=" Message*"
										rows={7}
									/>
								</div>
								<div id="form-input">
									<input
										type="button"
										id="submit-button"
										value="Submit"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="map"></div>
			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default Contact;

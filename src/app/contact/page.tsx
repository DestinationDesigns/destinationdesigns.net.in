"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
// import Map from "@/components/Map";

import "./Contact.css";

function Contact() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitError("");

		try {
			const submitData = new FormData();
			submitData.append("type", "contact");
			submitData.append("firstName", formData.firstName);
			submitData.append("lastName", formData.lastName);
			submitData.append("email", formData.email);
			submitData.append("message", formData.message);

			const response = await fetch('/api/send-email', {
				method: 'POST',
				body: submitData
			});

			if (!response.ok) {
				throw new Error('Failed to submit message');
			}

			alert("Message sent successfully!");
			
			// Reset form
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				message: ""
			});
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitError("Error sending message. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

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

							<Link href="/careers">
								<button className="contact-button">
									Career
								</button>
							</Link>
						</div>
						<div className="contact-form">
							<p>
								For all enquiries, whether you have a project in
								mind or just want to say hello, please get in
								touch via this form.
							</p>
							<form onSubmit={handleSubmit}>
								{submitError && (
									<div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
										{submitError}
									</div>
								)}
								<div id="form-input">
									<input
										id="first-name-form"
										type="text"
										name="firstName"
										className="form-textbox"
										placeholder=" First Name*"
										value={formData.firstName}
										onChange={handleInputChange}
										required
									/>
									<input
										id="second-name-form"
										type="text"
										name="lastName"
										className="form-textbox"
										placeholder=" Last Name*"
										value={formData.lastName}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div id="form-input">
									<input
										type="email"
										name="email"
										className="form-textbox"
										placeholder=" Your Email*"
										value={formData.email}
										onChange={handleInputChange}
										required
									/>
								</div>

								<div id="form-input">
									<textarea
										name="message"
										className="form-textarea"
										placeholder=" Message*"
										rows={7}
										value={formData.message}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div id="form-input">
									<button
										type="submit"
										id="submit-button"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Sending..." : "Submit"}
									</button>
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

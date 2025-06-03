"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useState } from "react";

import "./Careers.css";

function Careers() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		position: "",
		resume: null,
		portfolio: null
	});
	const [resumeFileName, setResumeFileName] = useState("");
	const [portfolioFileName, setPortfolioFileName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleFileChange = (e, type) => {
		const file = e.target.files[0];
		if (file) {
			setFormData(prev => ({
				...prev,
				[type]: file
			}));
			// Update the button text to show selected filename
			const button = e.target.previousElementSibling as HTMLInputElement;
			if (button) {
				button.value = file.name;
			}
			if (type === 'resume') {
				setResumeFileName(file.name);
			} else if (type === 'portfolio') {
				setPortfolioFileName(file.name);
			}
		}
	};

	const handleRemoveFile = (type: 'resume' | 'portfolio') => {
		setFormData(prev => ({
			...prev,
			[type]: null
		}));
		if (type === 'resume') {
			setResumeFileName("");
			const resumeInput = document.getElementById('resume-upload') as HTMLInputElement;
			if (resumeInput) resumeInput.value = "";
		} else if (type === 'portfolio') {
			setPortfolioFileName("");
			const portfolioInput = document.getElementById('portfolio-upload') as HTMLInputElement;
			if (portfolioInput) portfolioInput.value = "";
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitError("");
		
		try {
			// Create FormData object to handle file uploads
			const submitData = new FormData();
			submitData.append("type", "career");
			submitData.append("firstName", formData.firstName);
			submitData.append("lastName", formData.lastName);
			submitData.append("email", formData.email);
			submitData.append("position", formData.position);
			if (formData.resume) submitData.append("resume", formData.resume);
			if (formData.portfolio) submitData.append("portfolio", formData.portfolio);

			const response = await fetch('/api/send-email', {
				method: 'POST',
				body: submitData
			});

			if (!response.ok) {
				throw new Error('Failed to submit application');
			}

			alert("Application submitted successfully!");
			
			// Reset form
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				position: "",
				resume: null,
				portfolio: null
			});

			// Reset file input buttons
			const resumeButton = document.querySelector('#resume-upload') as HTMLInputElement;
			const portfolioButton = document.querySelector('#portfolio-upload') as HTMLInputElement;
			if (resumeButton) resumeButton.value = "";
			if (portfolioButton) portfolioButton.value = "";

			// Clear file names displayed
			setResumeFileName("");
			setPortfolioFileName("");

		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitError("Error submitting application. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFileButtonClick = (inputId: string) => {
		const input = document.getElementById(inputId) as HTMLInputElement;
		if (input) {
			input.click();
		}
	};

	return (
		<>
			<div id="entire-career">
				<div id="career-body">
					<div id="careers-heading">
						<h1>Careers</h1>
					</div>
					<div id="career-paragraph">
						<p>
							Our studio has grown to become more than just a
							place of work to our staff members. It is a place
							where people can achieve great things, invest in
							themselves and be rewarded for it. This has
							contributed to a phenomenal team that is strong and
							able and this sort of functionality gives us the
							freedom to focus on our core business practice and
							what we do best. It has allowed us to serve our
							clients to the best of our ability, achieving their
							satisfaction, and not stopping until we have done
							so.
						</p>
					</div>

					<div className="career-flex">
						<div className="career-role">
							<h2>Featured Roles</h2>

							<div className="career-roles">
								<h3> ARCHITECTURAL ASSISTANT</h3>
								<h3>JUNIOR ARCHITECT</h3>
								<h3>ASSISTANT ARCHITECT</h3>
								<h3>ARCHITECT</h3>
								<h3>SENIOR ARCHITECT</h3>
							</div>

							<div id="below-roles">
								For Internship please mail us your portfolio to{" "}
								<br />
								info@destinationdesigns.net.in
							</div>
						</div>
						<div className="career-form">
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
										placeholder=" First Name"
										value={formData.firstName}
										onChange={handleInputChange}
										required
									/>
									<input
										id="second-name-form"
										type="text"
										name="lastName"
										className="form-textbox"
										placeholder=" Last Name"
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
										placeholder=" Your Email"
										value={formData.email}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div id="form-input">
									<select
										className="form-textbox"
										id="form-dropdown"
										name="position"
										value={formData.position}
										onChange={handleInputChange}
										required
									>
										<option value="">Applying Position</option>
										<option value="ARCHITECTURAL ASSISTANT">
											ARCHITECTURAL ASSISTANT
										</option>
										<option value="JUNIOR ARCHITECT">
											JUNIOR ARCHITECT
										</option>
										<option value="ASSISTANT ARCHITECT">
											ASSISTANT ARCHITECT
										</option>
										<option value="ARCHITECT">
											ARCHITECT
										</option>
										<option value="SENIOR ARCHITECT">
											SENIOR ARCHITECT
										</option>
									</select>
								</div>
								<div id="attach-flex">
									<div className="attach-button">
										Attach your Resume
										<input
											type="file"
											accept=".pdf,.doc,.docx"
											onChange={(e) => handleFileChange(e, "resume")}
											style={{ display: "none" }}
											id="resume-upload"
											required
										/>
										<input
											type="button"
											className="form-attach-button"
											value="Choose a file..."
											onClick={() => handleFileButtonClick("resume-upload")}
										/>
										{resumeFileName && (
											<span style={{ marginLeft: '10px' }}>
												{resumeFileName}
												<button
													style={{ marginLeft: '5px', cursor: 'pointer' }}
													onClick={() => handleRemoveFile('resume')}
												>
													X
												</button>
											</span>
										)}
									</div>
									<div className="attach-button">
										Attach your Portfolio
										<input
											type="file"
											accept=".pdf,.doc,.docx"
											onChange={(e) => handleFileChange(e, "portfolio")}
											style={{ display: "none" }}
											id="portfolio-upload"
											required
										/>
										<input
											type="button"
											className="form-attach-button"
											value="Choose a file..."
											onClick={() => handleFileButtonClick("portfolio-upload")}
										/>
										{portfolioFileName && (
											<span style={{ marginLeft: '10px' }}>
												{portfolioFileName}
												<button
													style={{ marginLeft: '5px', cursor: 'pointer' }}
													onClick={() => handleRemoveFile('portfolio')}
												>
													X
												</button>
											</span>
										)}
									</div>
								</div>
								<button
									type="submit"
									className="form-apply"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Submitting..." : "Apply"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default Careers;

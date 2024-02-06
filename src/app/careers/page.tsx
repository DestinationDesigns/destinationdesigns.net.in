import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import "./Careers.css";

async function Careers() {
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
							<form>
								<div id="form-input">
									<input
										id="first-name-form"
										type="text"
										className="form-textbox"
										placeholder=" First Name"
									/>
									<input
										id="second-name-form"
										type="text"
										className="form-textbox"
										placeholder=" Last Name"
									/>
								</div>
								<div id="form-input">
									<input
										type="text"
										className="form-textbox"
										placeholder=" Your Email"
									/>
								</div>
								<div id="form-input">
									<select
										className="form-textbox"
										id="form-dropdown"
									>
										<option disabled>
											Applying Position
										</option>
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
											type="button"
											className="form-attach-button"
											value="Choose a file..."
										/>
									</div>
									<div className="attach-button">
										Attach your Portfolio
										<input
											type="button"
											className="form-attach-button"
											value="Choose a file..."
										/>
									</div>
								</div>
								<input
									type="button"
									className="form-apply"
									value="Apply"
								/>
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

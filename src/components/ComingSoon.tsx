import React, { useEffect, useRef } from "react";
import "./ComingSoon.css";

const ComingSoonPage: React.FC = () => {
	const logoRef = useRef<HTMLDivElement>(null);
	const mainContentRef = useRef<HTMLDivElement>(null);
	const contactSectionRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observerOptions: IntersectionObserverInit = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (
					entry.isIntersecting &&
					entry.target instanceof HTMLElement
				) {
					entry.target.style.animationPlayState = "running";
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Get all elements and filter out null values, ensuring they're HTMLElement
		const elements: HTMLElement[] = [];

		if (logoRef.current) elements.push(logoRef.current);
		if (mainContentRef.current) elements.push(mainContentRef.current);
		if (contactSectionRef.current) elements.push(contactSectionRef.current);
		if (footerRef.current) elements.push(footerRef.current);

		// Pause animations initially and observe elements
		elements.forEach((el) => {
			el.style.animationPlayState = "paused";
			observer.observe(el);
		});

		return () => {
			elements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	const handlePhoneClick = () => {
		// You can add analytics or other tracking here
		console.log("Phone number clicked");
	};

	return (
		<div className="container">
			<div className="logo" ref={logoRef}>
				<i className="fas fa-heartbeat"></i>
				<span>towg</span>
			</div>

			<div className="main-content" ref={mainContentRef}>
				<h1>
					Something <span>Amazing</span> Is Coming Soon
				</h1>
				<p className="tagline">
					We're working hard to bring you innovative health products
					that will transform your wellness journey. Stay tuned for
					our launch!
				</p>

				<FloatingElements />

				<div className="contact-section" ref={contactSectionRef}>
					<h2>Get In Touch</h2>
					<div className="contact-info">
						<a
							href="tel:+1-800-555-HEAL"
							className="phone-number"
							onClick={handlePhoneClick}>
							<i className="fas fa-phone"></i>
							<span>+1 (800) 555-HEAL</span>
						</a>
						<p className="contact-text">
							Have questions? Call us now and our team will be
							happy to assist you.
						</p>
					</div>
				</div>
			</div>

			<footer ref={footerRef}>
				<p>&copy; 2023 Towg Health Products. All rights reserved.</p>
			</footer>
		</div>
	);
};

// FloatingElements component for the animated background elements
const FloatingElements: React.FC = () => {
	return (
		<div className="floating-elements">
			<div className="floating-element element-1"></div>
			<div className="floating-element element-2"></div>
			<div className="floating-element element-3"></div>
			<div className="floating-element element-4"></div>
		</div>
	);
};

export default ComingSoonPage;

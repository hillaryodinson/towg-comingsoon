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

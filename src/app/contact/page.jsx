"use client";
import React, { useEffect, useRef } from "react";
import "./contact.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";

const Page = () => {
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.delayedCall(1.1, () => {
        sectionsRef.current.forEach((section) => {
          gsap.to(section.querySelectorAll("p"), {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className="contact-page" ref={container}>
        <div className="container">
          <div className="col">
            <div className="where" ref={(el) => (sectionsRef.current[0] = el)}>
              <div className="title">
                <p>Location</p>
              </div>
              <div className="item">
                <p>Address Line 1</p>
              </div>
              <div className="item">
                <p>Address Line 2</p>
              </div>
              <div className="item">
                <p>City, Country</p>
              </div>
            </div>
            <div className="vat" ref={(el) => (sectionsRef.current[1] = el)}>
              <div className="title">
                <p>ID</p>
              </div>
              <div className="item">
                <p>123456789</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="contact-header">
              <h1 ref={headerRef}>Get in Touch</h1>
            </div>
            <div
              className="socials"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className="title">
                <p>Connect</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">Social 1</a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="#">Social 2</a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="#">Social 3</a>
                </p>
              </div>
            </div>
            <div className="mail" ref={(el) => (sectionsRef.current[3] = el)}>
              <div className="title">
                <p>Email</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">contact@example.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;

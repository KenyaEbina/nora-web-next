"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import "./portfolio.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const projects = useMemo(() => [
    { name: "Project 1", img: "project-1.jpg", size: "lg" },
    { name: "Project 2", img: "project-2.jpg", size: "sm" },
    { name: "Project 3", img: "project-3.jpg", size: "lg" },
    { name: "Project 4", img: "project-4.jpg", size: "sm" },
    { name: "Project 5", img: "project-5.jpg", size: "lg" },
    { name: "Project 6", img: "project-6.jpg", size: "lg" },
    { name: "Project 7", img: "project-7.jpg", size: "lg" },
    { name: "Project 8", img: "project-8.jpg", size: "lg" },
    { name: "Project 9", img: "project-9.jpg", size: "sm" },
  ], []);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/portfolio/${project.img}`;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setIsLoaded(true);
    };

    loadImages();
  }, [projects]);

  useGSAP(
    () => {
      if (isLoaded && containerRef.current) {
        const header = containerRef.current.querySelector(
          ".portfolio-header h1"
        );
        const cols = containerRef.current.querySelectorAll(".col");

        gsap.to(header, {
          y: 0,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(cols, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5,
          delay: 0.9,
          ease: "power4.out",
          stagger: 0.1,
        });

        cols.forEach((col) => {
          const img = col.querySelector("img");
          const titleP = col.querySelector(".project-title h3");

          col.addEventListener("mouseenter", () => {
            gsap.to(img, {
              scale: 1.25,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 0,
              duration: 1,
              ease: "power4.out",
            });
          });

          col.addEventListener("mouseleave", () => {
            gsap.to(img, {
              scale: 1,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 24,
              duration: 1,
              ease: "power4.out",
            });
          });
        });
      }
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  const renderProjectRows = () => {
    const rows = [];
    for (let i = 0; i < projects.length; i += 3) {
      rows.push(
        <div className="portfolio-row" key={i}>
          {projects.slice(i, i + 3).map((project, index) => (
            <div className={`col ${project.size}`} key={i + index}>
              <Link href="/portfolio/project">
                <img src={`/portfolio/${project.img}`} alt={project.name} />
                <div className="project-title">
                  <h3>{project.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <div
        className={`portfolio-page ${isLoaded ? "loaded" : ""}`}
        ref={containerRef}
      >
        <div className="container">
          <div className="portfolio-header">
            <h1>Projects</h1>
          </div>
          {isLoaded && renderProjectRows()}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;

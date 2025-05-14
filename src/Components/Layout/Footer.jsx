import React from "react";
export default function Footer() {
  return (
    <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small">
      <p className="text-muted mb-1 mb-md-0">
        Copyright © 2023{" "}
        <a href="https://www.nobleui.com/" target="_blank">
          NaatiCCL
        </a>
        .
      </p>
      <p className="text-muted">
        Vision Language With{" "}
        <i className="mb-1 text-primary ms-1 icon-sm" data-feather="heart"></i>
      </p>
    </footer>
  );
}

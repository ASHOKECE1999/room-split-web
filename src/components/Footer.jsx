import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside>
          <p className="text-[12px]">
            Copyright © {new Date().getFullYear()} - All right reserved by Ashok
            Adivappa Gari
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;


"use client";
import Link from 'next/link';
import { useState, useCallback } from 'react';
import fixImagePath from "@/lib/fixImagePath";

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: '',
    subMenuKey: '',
  });

  const handleToggle = (key, subMenuKey = '') => {
    setIsActive(prev =>
      prev.key === key && prev.subMenuKey === subMenuKey
        ? { status: false, key: '', subMenuKey: '' }
        : { status: true, key, subMenuKey }
    );
  };

  // Close drawer + reset submenu state when clicking any nav item
  const handleNavClick = useCallback(() => {
    if (typeof handleMobileMenu === 'function') handleMobileMenu();
    setIsActive({ status: false, key: '', subMenuKey: '' });
  }, [handleMobileMenu]);

  return (
    <>
      <div className="mobile-nav__wrapper" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
          aria-hidden="true"
        />
        <div className="mobile-nav__content">
          <button
            type="button"
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
            aria-label="Close menu"
          >
            <i className="fa fa-times" />
          </button>

          <div className="logo-box" >
            <Link href="/" aria-label="logo image" onClick={handleNavClick}>
              <img src={fixImagePath("resources/logo.png")} width="150" alt="Go Transport" />
            </Link>
          </div>

          <nav className="mobile-nav__container" aria-label="Main">
            <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
              <ul className="main-menu__list">
                <li className={isActive.key === 1 ? 'dropdown current' : 'dropdown'}>
                  <Link href="/index-dark" onClick={handleNavClick}>Home</Link>
                  {/* 
                  <ul style={{ display: isActive.key === 1 ? 'block' : 'none' }}>
                    <li><Link href="/" onClick={handleNavClick}>Home One</Link></li>
                    <li><Link href="/index2" onClick={handleNavClick}>Home Two</Link></li>
                    <li><Link href="/index3" onClick={handleNavClick}>Home Three</Link></li>
                    <li><Link href="/index-dark" onClick={handleNavClick}>Home Dark</Link></li>
                  </ul>
                  <button
                    className={isActive.key === 1 ? 'expanded open' : ''}
                    onClick={() => handleToggle(1)}
                    aria-expanded={isActive.key === 1}
                    aria-label="Toggle Home submenu"
                  >
                    <span className="fa fa-angle-right" />
                  </button>
                  */}
                </li>

                <li>
                  <Link href="/about/" onClick={handleNavClick}>About Us</Link>
                </li>

                <li className={isActive.key === 2 ? 'dropdown current' : 'dropdown'}>
                  <Link href="/service" onClick={handleNavClick}>Services</Link>
                  {/*
                  <ul style={{ display: isActive.key === 2 ? 'block' : 'none' }}>
                    <li><Link href="/service" onClick={handleNavClick}>Services</Link></li>
                    <li><Link href="/international-transport" onClick={handleNavClick}>International Transport</Link></li>
                    <li><Link href="/track-transport" onClick={handleNavClick}>Local Track Transport</Link></li>
                    <li><Link href="/personal-delivery" onClick={handleNavClick}>Fast Personal Delivery</Link></li>
                    <li><Link href="/ocean-transport" onClick={handleNavClick}>Safe Ocean Transport</Link></li>
                    <li><Link href="/warehouse-facility" onClick={handleNavClick}>Warehouse Facility</Link></li>
                    <li><Link href="/emergency-transport" onClick={handleNavClick}>Emergency Transport</Link></li>
                  </ul>
                  <button
                    className={isActive.key === 2 ? 'expanded open' : ''}
                    onClick={() => handleToggle(2)}
                    aria-expanded={isActive.key === 2}
                    aria-label="Toggle Services submenu"
                  >
                    <span className="fa fa-angle-right" />
                  </button>
                  */}
                </li>

                {/* Similar pattern if you bring Projects/Pages/Blog back */}

                <li>
                  <Link href="/contact" onClick={handleNavClick}>Contact</Link>
                </li>
                {/* <li>
                  <Link href="/track" onClick={handleNavClick}>Track Order</Link>
                </li> */}
              </ul>
            </div>
          </nav>

          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope" />
              <Link
                href="mailto:Info@go-transport.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Info@go-transport.com
              </Link>
            </li>
            <li>
              <i className="fa fa-phone-alt" />
              <Link href="tel:+9613000000" onClick={handleNavClick}>
                +961 3 000 000
              </Link>
            </li>
          </ul>

          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <Link href="#" className="fab fa-twitter" onClick={handleNavClick} aria-label="Twitter" />
              <Link href="#" className="fab fa-facebook-square" onClick={handleNavClick} aria-label="Facebook" />
              <Link href="#" className="fab fa-pinterest-p" onClick={handleNavClick} aria-label="Pinterest" />
              <Link href="#" className="fab fa-instagram" onClick={handleNavClick} aria-label="Instagram" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

import Link from "next/link"
import fixImagePath from "@/lib/fixImagePath"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header1({ scroll, handlePopup, handleMobileMenu }) {
    return (
        <>

            {/*Start Main Header One*/}
            <header className="main-header main-header-one" style={{ backgroundColor: 'rgb(14, 19, 30)' }}>
                <nav className="main-menu">
                    <div className="main-menu__wrapper">
                        <div className="container">
                            <div className="main-header-one__inner">
                                <div className="main-header-one__top">
                                    <div className="main-header-one__top-inner">
                                        <div className="main-header-one__top-left">
                                            <div className="header-contact-style1">
                                                <ul>
                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-phone"></span>
                                                        </div>

                                                        <div className="text-box">
                                                            <p><span>Talk to Us</span> <Link href="tel:+96176071205">+961 76 071 205</Link></p>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-email"></span>
                                                        </div>

                                                        <div className="text-box">
                                                            <p><span>Mail Us</span>
                                                                <Link
                                                                    href="mailto:Info@go-transport.com"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Info@go-transport.com
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* <div className="main-header-one__top-right">
                                            <div className="header-social-links">
                                                <Link href="#"><span className="icon-facebook-f"></span></Link>
                                                <Link href="#"><span className="icon-twitter1"></span></Link>
                                                <Link href="#"><span className="icon-instagram"></span></Link>
                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>

                                            <div className="header-search-box">
                                                <Link href="#" className="main-menu__search search-toggler" onClick={handlePopup}>Search
                                                    <i className="icon-search"></i></Link>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="main-header-one__bottom" >
                                    <div className="main-menu__wrapper-inner">
                                        <div className="main-header-one__bottom-inner" >
                                            <div className="main-header-one__bottom-left">
                                                <div className="logo-box">
                                                    <Link href="/">
                                                        <img
                                                            src={fixImagePath("alwafaExportLogo/Group (5).png")}
                                                            alt="Alwafa Export"
                                                            width={117}
                                                            height={45}
                                                            style={{ objectFit: "contain" }}
                                                        />
                                                    </Link>
                                                </div>


                                                <div className="main-header-one__bottom-menu">
                                                    <div className="main-menu__main-menu-box">
                                                        <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i
                                                            className="fa fa-bars"></i></Link>
                                                        <Menu />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="main-header-one__bottom-right">
                                                {/* <div className="thm-btn">
                                                    <Link href="track" style={{ color: "black" }}>
                                                        Track Order <i className="icon-right-arrow21"></i>
                                                    </Link>

                                                </div> */}

                                                {/* <div className="login-box">
                                                <Link href="#"><i className="fa fa-sign-in"></i> <span>Member <br/>
                                                        Login</span> </Link>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/*End Main Header One*/}

            <div className={`stricky-header stricky-header--style1 stricked-menu main-menu ${scroll ? "stricky-fixed" : ""}`} style={{ backgroundColor: 'rgb(14, 19, 30)' }}
            >
                <div className="sticky-header__content">
                    <div className="main-header-one__bottom">
                        <div className="main-menu__wrapper-inner">
                            <div className="main-header-one__bottom-inner">
                                <div className="main-header-one__bottom-left">
                                    <div className="logo-box">
                                        <Link href="/"><img src={fixImagePath("alwafaExportLogo/Group (5).png")}
                                            alt="Alwafa Export"
                                            width={117}
                                            height={45}
                                            style={{ objectFit: "contain" }}
                                        /></Link>
                                    </div>

                                    <div className="main-header-one__bottom-menu">
                                        <div className="main-menu__main-menu-box">
                                            <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i
                                                className="fa fa-bars"></i></Link>
                                            <Menu />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="main-header-one__bottom-right">
                                    <div className="thm-btn">
                                        <Link href="about" style={{ color: "black" }}>Track Order
                                            <i className="icon-right-arrow21"></i>
                                        </Link>
                                    </div>

                                    <div className="login-box">
                                        <Link href="#"><i className="fa fa-sign-in"></i> <span>Member <br />
                                            Login</span> </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>{/* /.sticky-header__content */}
            </div>{/* /.stricky-header */}
            <MobileMenu handleMobileMenu={handleMobileMenu} />

        </>
    )
}

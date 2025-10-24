'use client'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.srn',
        prevEl: '.srp',
    },


    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,

        },
        575: {
            slidesPerView: 1,

        },
        767: {
            slidesPerView: 1,

        },
        991: {
            slidesPerView: 1,

        },
        1199: {
            slidesPerView: 1,

        },
        1350: {
            slidesPerView: 1,

        },
    }
}

export default function Home() {


    const bgImage = "assets/images/services/sericesBanner.png";

    return (
        <>
            <Layout headerStyle={1} footerStyle={2} breadcrumbTitle="Our services"
                bgImage={bgImage}
            >
                {/*Start Service One*/}
                <section className="service-one service-one--service" style={{ backgroundColor: "rgb(24, 35, 50)" }}>
                    <div className="container" style={{ backgroundColor: "rgb(24, 35, 50)" }}>
                        <div className="row flex-wrap" style={{ justifyContent: 'center' }}>
                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/air land frieght.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2 ><Link href="international-transport" style={{ color: '#fff' }}>Air & Land Freight </Link></h2> */}
                                            <h2 style={{ color: '#fff' }}> Air & Land Freight </h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>Reliable logistics across major transportation networks. From urgent air shipments to coordinated ground deliveries, we move your cargo with efficiency and care.</p>
                                        </div>
                                    </div>

                                    <div className="icon">
                                        <span className="icon-international-shipping"></span>
                                    </div>
                                </div>
                            </div>

                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/custom clearance.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2 ><Link href="international-transport" style={{ color: '#fff' }}>Customs Clearance</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Customs Clearance</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>Swift, compliant clearance processes at Beirut's Airport and Port. Our in-house experts ensure smooth entry and exit with zero stress.</p>
                                            {/* Read More button removed from the seventh service card as requested */}
                                        </div>
                                    </div>

                                    <div className="icon"
                                    >
                                        <img
                                            style={{ transition: 'transform .3s ease', transformStyle: 'preserve-3d' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                                            src="/assets/images/services-icon/Customs clearance.svg"
                                            alt="Consulting & Logistics Outsourcing"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*End Service One Single*/}

                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/door to door.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2 ><Link href="international-transport" style={{ color: '#fff' }}>Door-to-Door (D2D) Shipping</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Door-to-Door (D2D) Shipping</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>From your supplier's floor to your customer's door — we manage the journey end-to-end. Transparent, trackable, and tailored to your needs.</p>
                                            {/* Read More button removed from all service cards as requested */}
                                        </div>
                                    </div>


                                    <div className="icon">
                                        <span className="icon-delivery-man"></span>
                                    </div>


                                </div>
                            </div>
                            {/*End Service One Single*/}

                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/cargo insurance.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2 ><Link href="international-transport" style={{ color: '#fff' }}>Cargo Insurance</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Cargo Insurance</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>We protect your cargo in transit, offering insurance plans that provide peace of mind against unexpected disruptions.</p>

                                        </div>
                                    </div>

                                    <div className="icon">
                                        <span className="icon-ship-1"></span>
                                    </div>
                                </div>
                            </div>
                            {/*End Service One Single*/}

                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/warehousing solution.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2 ><Link href="international-transport" style={{ color: '#fff' }}>Warehousing Solutions</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Warehousing Solutions</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>Secure, accessible storage across key logistics hubs. Our global warehouse network supports inventory control and efficient distribution.</p>
                                            {/* Read More button removed from all service cards as requested */}
                                        </div>
                                    </div>

                                    <div className="icon">
                                        <span className="icon-storehouse"></span>
                                    </div>
                                </div>
                            </div>
                            {/*End Service One Single*/}

                            {/*Start Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/inland trucking.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2><Link href="international-transport" style={{ color: '#fff' }}>Inland Trucking</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Inland Trucking</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>Fast, flexible ground transport across Lebanon and beyond. We bridge the gap between ports, warehouses, and final destinations.</p>
                                            {/* <div className="btn-box">
                                        <Link href="international-transport">Read More <span
                                                className="icon-right-arrow21"></span></Link>
                                    </div> */}
                                        </div>
                                    </div>


                                    <div className="icon"
                                    >
                                        <img
                                            style={{ transition: 'transform .3s ease', transformStyle: 'preserve-3d' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                                            src="/assets/images/services-icon/Consulting.svg"
                                            alt="Consulting & Logistics Outsourcing"
                                            className="w-8 h-8 object-contain"

                                        />
                                    </div>
                                </div>
                            </div>
                            {/*End Service One Single*/}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1500ms">
                                <div className="service-one__single">
                                    <div className="service-one__single-inner">
                                        <div className="service-one__single-img">
                                            <img src="assets/images/services/consulting.png" alt="#" />
                                        </div>

                                        <div className="service-one__single-content" style={{ backgroundColor: 'rgb(15,28,37)', padding: '32px 24px' }}>
                                            {/* <h2><Link href="international-transport" style={{ color: '#fff' }}>Consulting & Logistics Outsourcing</Link></h2> */}
                                            <h2 style={{ color: '#fff' }}>Consulting & Logistics Outsourcing</h2>

                                            <p style={{ color: 'rgb(142,142,142)' }}>From documentation to full-scale operations, we optimize your flow and reduce your costs.</p>
                                            {/* <div className="btn-box">
                                        <Link href="international-transport">Read More <span
                                                className="icon-right-arrow21"></span></Link>
                                    </div> */}
                                        </div>
                                    </div>

                                    <div className="icon"
                                    >
                                        <img
                                            style={{ transition: 'transform .3s ease', transformStyle: 'preserve-3d' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                                            src="/assets/images/services-icon/icon-ship-1.svg"
                                            alt="Consulting & Logistics Outsourcing"
                                            className="w-8 h-8 object-contain"

                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End Service One*/}

                {/*Start Why Choose One*/}
                {/* <section className="why-choose-one">
            <div className="why-choose-one__pattern">
                <img src="assets/images/pattern/why-choose-v1-pattern.png" alt=""/>
            </div>
            <div className="shape1 float-bob-y"><img src="assets/images/shapes/why-choose-v1-shape1.png" alt=""/></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="why-choose-one__content">
                            <div className="sec-title tg-heading-subheading animation-style2">
                                <div className="sec-title__tagline">
                                    <div className="line"></div>
                                    <div className="text tg-element-title">
                                        <h4>Why Choose us</h4>
                                    </div>
                                    <div className="icon">
                                        <span className="icon-plane2 float-bob-x3"></span>
                                    </div>
                                </div>
                                <h2 className="sec-title__title tg-element-title">Efficient, Safe, & Swift <br/> Logistics
                                    <span>Solution!</span></h2>
                            </div>

                            <div className="why-choose-one__content-list">
                                <ul>
                                    <li>
                                        <p><span className="icon-plane2"></span> Make long term business decisions</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plane2"></span> Transparent career journey and support.</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plane2"></span> Be a responsible member of the community
                                        </p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plane2"></span> Provide a service we are proud of</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="btn-box">
                                <Link className="thm-btn" href="contact">Contact Us
                                    <i className="icon-right-arrow21"></i>
                                    <span className="hover-btn hover-bx"></span>
                                    <span className="hover-btn hover-bx2"></span>
                                    <span className="hover-btn hover-bx3"></span>
                                    <span className="hover-btn hover-bx4"></span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <div className="why-choose-one__form-box wow fadeInRight" data-wow-delay="0ms"
                            data-wow-duration="1500ms">
                            <div className="title-box">
                                <h2>Request a Quote</h2>
                            </div>

                            <form className="contact-form-validated why-choose-one__form" action="assets/inc/sendemail.php"
                                method="post" >
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input type="text" name="name" placeholder="Name" required=""/>
                                            <div className="icon"><span className="icon-user"></span></div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input type="email" name="email" placeholder="Email" required=""/>
                                            <div className="icon"><span className="icon-email"></span></div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input type="text" name="Phone" placeholder="Phone" required=""/>
                                            <div className="icon"><span className="icon-phone2"></span></div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input type="text" name="date" placeholder="Date" id="datepicker" />
                                            <div className="icon"><span className="icon-calendar"></span></div>
                                        </div>
                                    </div>


                                    <div className="col-xl-12">
                                        <div className="why-choose-one__form-distance">
                                            <div className="title">
                                                <p>distance(Kilo):</p>
                                            </div>
                                            <div className="why-choose-one__form-distance-inner">
                                                <div className="input-box">
                                                    <input type="text" name="distance" placeholder="0" required=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <div className="select-box">
                                                <select className="selectmenu wide">
                                                    <option >Freight Type</option>
                                                    <option>Freight Type 01</option>
                                                    <option>Freight Type 02</option>
                                                    <option>Freight Type 03</option>
                                                    <option>Freight Type 04</option>
                                                    <option>Freight Type 05</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <div className="select-box">
                                                <select className="selectmenu wide">
                                                    <option >Load</option>
                                                    <option>Freight Type 01</option>
                                                    <option>Freight Type 02</option>
                                                    <option>Freight Type 03</option>
                                                    <option>Freight Type 04</option>
                                                    <option>Freight Type 05</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <div className="why-choose-one__form-btn">
                                            <button type="submit" className="thm-btn">
                                                Contact Us
                                                <i className="icon-right-arrow21"></i>
                                                <span className="hover-btn hover-bx"></span>
                                                <span className="hover-btn hover-bx2"></span>
                                                <span className="hover-btn hover-bx3"></span>
                                                <span className="hover-btn hover-bx4"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

                {/* <section className="testimonial-one">
            <div className="testimonial-one__pattern"
                style={{ backgroundImage: 'url(assets/images/pattern/testimonial-v1-pattern.png)' }} ></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="testimonial-one__content">
                            <div className="big-title">
                                <h2>TESTIMONIALS</h2>
                            </div>
                            <div className="sec-title tg-heading-subheading animation-style2">
                                <div className="sec-title__tagline">
                                    <div className="line"></div>
                                    <div className="text tg-element-title">
                                        <h4>Client Testimonial</h4>
                                    </div>
                                    <div className="icon">
                                        <span className="icon-plane2 float-bob-x3"></span>
                                    </div>
                                </div>
                                <h2 className="sec-title__title tg-element-title">What Our Customers <br/>
                                    Say <span>About Us</span> </h2>
                            </div>

                            <Swiper {...swiperOptions} className="testimonial-one__carousel owl-carousel owl-theme">
                                <SwiperSlide>
                                <div className="testimonial-one__single">
                                    <div className="icon">
                                        <span className="icon-quote1"></span>
                                    </div>
                                    <div className="testimonial-one__single-inner">
                                        <div className="shape1"><img src="assets/images/shapes/testimonial-v1-shape1.png"
                                                alt=""/></div>
                                        <div className="author-box">
                                            <div className="img-box">
                                                <img src="assets/images/testimonial/testimonial-v1-img1.png" alt=""/>
                                            </div>
                                            <div className="author-info">
                                                <h2>Ronald Richards</h2>
                                                <div className="bottom-text">
                                                    <p>MANAGER</p>
                                                    <div className="rating-box">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-box">
                                            <p>A logistic service provider company plays a pivotal role in the global
                                                supply chain A logistic service provider companyA logistic service
                                                provider company plays a pivotal role in the global supply chain A
                                                logistic service provider company</p>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="testimonial-one__single">
                                    <div className="icon">
                                        <span className="icon-quote1"></span>
                                    </div>
                                    <div className="testimonial-one__single-inner">
                                        <div className="shape1"><img src="assets/images/shapes/testimonial-v1-shape1.png"
                                                alt=""/></div>
                                        <div className="author-box">
                                            <div className="img-box">
                                                <img src="assets/images/testimonial/testimonial-v1-img1.png" alt=""/>
                                            </div>
                                            <div className="author-info">
                                                <h2>Ronald Richards</h2>
                                                <div className="bottom-text">
                                                    <p>MANAGER</p>
                                                    <div className="rating-box">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-box">
                                            <p>A logistic service provider company plays a pivotal role in the global
                                                supply chain A logistic service provider companyA logistic service
                                                provider company plays a pivotal role in the global supply chain A
                                                logistic service provider company</p>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="testimonial-one__single">
                                    <div className="icon">
                                        <span className="icon-quote1"></span>
                                    </div>
                                    <div className="testimonial-one__single-inner">
                                        <div className="shape1"><img src="assets/images/shapes/testimonial-v1-shape1.png"
                                                alt=""/></div>
                                        <div className="author-box">
                                            <div className="img-box">
                                                <img src="assets/images/testimonial/testimonial-v1-img1.png" alt=""/>
                                            </div>
                                            <div className="author-info">
                                                <h2>Ronald Richards</h2>
                                                <div className="bottom-text">
                                                    <p>MANAGER</p>
                                                    <div className="rating-box">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-box">
                                            <p>A logistic service provider company plays a pivotal role in the global
                                                supply chain A logistic service provider companyA logistic service
                                                provider company plays a pivotal role in the global supply chain A
                                                logistic service provider company</p>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                  
                    <div className="col-xl-6">
                        <div className="testimonial-one__img">
                            <div className="testimonial-one__img1 reveal">
                                <img src="assets/images/testimonial/testimonial-v1-img2.jpg" alt=""/>
                            </div>

                            <div className="testimonial-one__img-author">
                                <ul>
                                    <li>
                                        <div className="img-box"><img src="assets/images/banner/banner-v1-img2.jpg" alt="#"/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-box"><img src="assets/images/banner/banner-v1-img3.jpg" alt="#"/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-box"><img src="assets/images/banner/banner-v1-img4.jpg" alt="#"/>
                                        </div>
                                    </li>
                                </ul>

                                <div className="text-box">
                                    <h2>Customer Satisfied</h2>
                                    <p>4.8 (15k Reviews)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
                {/*End Testimonial One*/}

            </Layout>
        </>
    )
}
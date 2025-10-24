'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ModalVideo from 'react-modal-video'
import { useState } from 'react'



const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.h1n',
    prevEl: '.h1p',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}

export default function 
Banner() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <section className="banner-one"
       style={{
    background: 'linear-gradient(to right, #0d131d, #253D60)',
  }}
  >
<div
  className="banner-one__pattern"
 
/>


        <div className="banner-one__pattern2">
          <img src="assets/images/pattern/banner-v1-pattern2.png" alt="#" />
        </div>

        <div className="banner-one__img1">
          <img className="float-bob-x" src="assets/images/banner/truck.png" alt="#" />
        </div>
        <div className="banner-one__img5">
          <img className="float-bob-y" src="assets/images/banner/boxes.png" alt="#" />
        </div>
        <div className="shape1 rotate-me">
          <img src="assets/images/shapes/Frame 17 (1).png" alt="#" />
        </div>

        <div className="container">
          <div className="banner-one__location clearfix">
            {/* Turkey */}
            <div className="banner-one__location-single style1">
              <div className="round-box"><div className="bdr" /></div>
              <div className="content-box">
                <div className="img-box">
                  <img src="assets/images/flags/turkey.png" alt="Turkey flag" />
                </div>
                <div className="text-box">
                  <h4>Turkey</h4>
                  <p>Turkey</p>
                </div>
              </div>
            </div>

            {/* China */}
            <div className="banner-one__location-single style2">
              <div className="round-box"><div className="bdr" /></div>
              <div className="content-box">
                <div className="img-box">
                  <img src="assets/images/flags/china.png" alt="China flag" />
                </div>
                <div className="text-box">
                  <h4>China</h4>
                  <p>China</p>
                </div>
              </div>
            </div>

            {/* France */}
            <div className="banner-one__location-single style3">
              <div className="round-box"><div className="bdr" /></div>
              <div className="content-box">
                <div className="img-box">
                  <img src="assets/images/flags/france.png" alt="France flag" />
                </div>
                <div className="text-box">
                  <h4>France</h4>
                  <p>France</p>
                </div>
              </div>
            </div>

            {/* Italy */}
            <div className="banner-one__location-single style4">
              <div className="round-box"><div className="bdr" /></div>
              <div className="content-box">
                <div className="img-box">
                  <img src="assets/images/flags/italy.png" alt="Italy flag" />
                </div>
                <div className="text-box">
                  <h4>Italy</h4>
                  <p>Italy</p>
                </div>
              </div>
            </div>

            {/* Dubai */}
            <div className="banner-one__location-single style5">
              <div className="round-box"><div className="bdr" /></div>
              <div className="content-box">
                <div className="img-box">
                  <img src="assets/images/flags/dubai.png" alt="UAE flag" />
                </div>
                <div className="text-box">
                  <h4>Dubai</h4>
                  <p>Dubai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="banner-one__content">
            <div className="banner-one__content-left wow fadeInLeft" data-wow-delay="0ms"
              data-wow-duration="1500ms">
              <h2 >Go Further <br />
                <span style={{ color: "rgba(137, 242, 255, 1)" }}>Go Global</span></h2>
              {/* <p>Specialist In Modern <br /> Transportation </p> */}
            </div>

            <div className="banner-one__content-right wow fadeInRight" data-wow-delay="0ms"
              data-wow-duration="1500ms">
              <div className="banner-one__content-right-text">
                <p>GTT– Go Transport and Transit is your go-to partner for reliable<br />
                  logistics and trade solutions</p>
              </div>



              <div className="banner-one__content-right-btn">
                <Link className="thm-btn" href="about">About Us
                  <i className="icon-right-arrow21"></i>
                  <span className="hover-btn hover-bx"></span>
                  <span className="hover-btn hover-bx2"></span>
                  <span className="hover-btn hover-bx3"></span>
                  <span className="hover-btn hover-bx4"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

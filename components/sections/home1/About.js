"use client";

import Link from "next/link";

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL || "http://95.217.183.52:1337";

const FALLBACK_DESCRIPTION = `At GTT, logistics isn't just about moving goods; it's about building bridges across borders.
We connect continents, empower commerce, and simplify international trade.
With a decade of experience and operations spanning Lebanon, Europe, Asia, and the Middle East,
we offer the reliability of a global player with the agility of a local partner.`;

const FALLBACK_FEATURES = [
  { id: "feature-air", label: "Air Shipment" },
  { id: "feature-land", label: "Land Shipment" },
  { id: "feature-sea", label: "Sea Shipment" },
];

const getImageUrl = (image) => {
  if (!image) return null;

  const normalizedImage =
    image?.data?.attributes || image?.data || image || undefined;
  const rawUrl =
    typeof normalizedImage === "string"
      ? normalizedImage
      : normalizedImage?.url;

  if (!rawUrl) return null;
  if (rawUrl.startsWith("http")) return rawUrl;
  return `${CMS_BASE_URL}${rawUrl}`;
};

const normalizeFeatures = (featureData) => {
  if (!Array.isArray(featureData)) {
    return FALLBACK_FEATURES;
  }

  const parsed = featureData
    .map((item, index) => {
      if (!item) return null;
      const label =
        typeof item === "string"
          ? item
          : item?.feature || item?.title || item?.label || "";
      if (!label) return null;

      return {
        id: item?.id ?? `feature-${index}`,
        label,
      };
    })
    .filter(Boolean);

  return parsed.length ? parsed : FALLBACK_FEATURES;
};

export default function About({ aboutSection }) {
  const title = aboutSection?.title ?? "Our Company";
  const subtitle = aboutSection?.subtitle ?? "Building Bridges Across Borders";
  const description = aboutSection?.description?.trim() || FALLBACK_DESCRIPTION;
  const subtitleLines = subtitle
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const descriptionLines = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const features = normalizeFeatures(aboutSection?.feature);
  const bigImage =
    getImageUrl(aboutSection?.bigImage) || "assets/images/about/about-img1.png";
  const smallImage =
    getImageUrl(aboutSection?.smallImage) ||
    "assets/images/about/about-img2.png";

  return (
    <>
      <section
        className="about-one"
        style={{ backgroundColor: "rgb(14, 19, 30)" }}
      >
        <div className="container">
          <div className="row">
            {/* Left column: imagery */}
            <div className="col-xl-5 col-lg-6">
              <div className="about-one__img">
                <div className="shape1 float-bob-y">
                  <img
                    src="assets/images/shapes/airplane-down-about.png"
                    alt=""
                  />
                </div>
                <div className="shape2 float-bob-y">
                  <img src="assets/images/shapes/points.png" alt="" />
                </div>
                <div className="about-one__img1 reveal">
                  <img src={bigImage} alt="About section main" />
                </div>

                <div className="about-one__img2">
                  <div className="about-one__img2-inner reveal">
                    <img src={smallImage} alt="About section secondary" />
                  </div>

                  <div className="shape3 float-bob-y">
                    <img
                      src="assets/images/shapes/airplane-up-about.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: content */}
            <div className="col-xl-7 col-lg-6">
              <div className="about-one__content">
                <div className="sec-title tg-heading-subheading animation-style2">
                  <div className="sec-title__tagline">
                    <div className="line"></div>
                    <div className="text tg-element-title">
                      <h4>{title}</h4>
                    </div>
                    <div className="icon">
                      <span className="icon-plane2 float-bob-x3"></span>
                    </div>
                  </div>
                  <h2 className="sec-title__title tg-element-title">
                    {subtitleLines.map((line, index) => (
                      <span key={`subtitle-line-${index}`}>
                        {line}
                        {index < subtitleLines.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>

                <div className="about-one__content-text1">
                  <p>
                    {descriptionLines.map((line, index) => (
                      <span key={`about-desc-${index}`}>
                        {line}
                        {index < descriptionLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="about-one__content-text2">
                  <div className="row">
                    {features.map((item) => (
                      <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
                        <div className="about-one__content-text2-single-top">
                          <div className="icon">
                            <span className="icon-check1"></span>
                          </div>
                          <div className="title-box">
                            <h3>{item.label}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="about-one__content-bottom">
                  <div className="btn-box">
                    <Link className="thm-btn" href="about">
                      Discover More
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
          </div>
        </div>
      </section>
    </>
  );
}

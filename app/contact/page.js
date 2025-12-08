import { Fragment } from "react";
import Layout from "@/components/layout/Layout";
import { getContactUsPage } from "@/core/repo";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL ||
  process.env.CMS_BASE_URL ||
  "http://95.217.183.52:1337";

const FALLBACK_BANNER_IMAGE = "assets/images/contact/contactBanner.png";

const DEFAULT_CONTACT_INTRO = {
  title: "Contact us",
  subtitle: "Let’s Move Your Business Forward",
  description:
    "Our team is here to support you with reliable, responsive service. Whether you have a question, need a quote, or want to discuss your logistics needs, we’re ready to help.",
};

const DEFAULT_CONTACT_CARDS = [
  {
    id: "default-location",
    title: "Location",
    description: "Lebanon\nAirport Area, Lebanon",
  },
  {
    id: "default-hours",
    title: "Working Hours",
    description: "Wednesday - Sunday\n7:00 AM - 5:00 PM",
  },
  {
    id: "default-email",
    title: "Email",
    description: "info@go-transport.com",
  },
  {
    id: "default-phone",
    title: "Phones",
    description: "+961 76 071 205",
  },
];

const ICON_MAP = {
  location: "icon-address",
  "working hours": "icon-clock2",
  email: "icon-email",
  phone: "icon-phone",
  phones: "icon-phone",
};

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value);
const isLocalAsset = (value = "") =>
  value?.startsWith("/assets/") || value?.startsWith("assets/");

const extractMediaPath = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) {
    return extractMediaPath(image[0]);
  }
  if (image?.data) {
    return extractMediaPath(image.data);
  }
  return image?.url || image?.path || null;
};

const buildCmsImageUrl = (path = "") => {
  if (!path) return null;
  if (isAbsoluteUrl(path) || isLocalAsset(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CMS_BASE_URL.replace(/\/$/, "")}${normalized}`;
};

const splitLines = (value) => {
  if (!value) return [];
  return `${value}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
};

const iconForTitle = (title = "") => {
  const key = title.trim().toLowerCase();
  return ICON_MAP[key] || ICON_MAP.location;
};

const normalizeCards = (cards) => {
  const source =
    Array.isArray(cards) && cards.length ? cards : DEFAULT_CONTACT_CARDS;
  return source
    .map((card, index) => {
      if (!card) return null;
      return {
        id: card.id ?? `contact-card-${index}`,
        title: (card.title || "").trim() || `Card ${index + 1}`,
        descriptionLines: splitLines(card.description),
      };
    })
    .filter(Boolean);
};

const isEmailValue = (value = "") =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());

const isPhoneValue = (value = "") =>
  /\d/.test(value) && /^[\d()+\-\s]+$/.test(value.trim());

const buildTelHref = (value = "") => {
  const cleaned = value.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "#";
};

export default async function Home() {
  const contactUsData = await getContactUsPage();
  console.log("Contact Us Page API response:", contactUsData);

  const contactData = contactUsData?.data ?? {};
  const banner = contactData?.banner ?? {};

  const heroTitle = contactData?.title?.trim() || DEFAULT_CONTACT_INTRO.title;
  const heroSubtitle =
    contactData?.subtitle?.trim() || DEFAULT_CONTACT_INTRO.subtitle;
  const heroDescription =
    contactData?.description?.trim() || DEFAULT_CONTACT_INTRO.description;

  const subtitleLines = splitLines(heroSubtitle);
  const descriptionLines = splitLines(heroDescription);

  const bannerTitle = banner?.title?.trim() || "Contact";
  const bgImage =
    buildCmsImageUrl(extractMediaPath(banner?.image)) || FALLBACK_BANNER_IMAGE;

  const contactCards = normalizeCards(contactData?.contactUsCards);

  const renderCardLine = (cardTitle, line) => {
    const trimmed = line.trim();
    const lowered = cardTitle.toLowerCase();

    if (lowered === "email" && isEmailValue(trimmed)) {
      return (
        <Link
          href={`mailto:${trimmed}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {trimmed}
        </Link>
      );
    }

    if (
      (lowered === "phone" || lowered === "phones") &&
      isPhoneValue(trimmed)
    ) {
      return <Link href={buildTelHref(trimmed)}>{trimmed}</Link>;
    }

    return trimmed || "—";
  };

  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={2}
        breadcrumbTitle={bannerTitle}
        bgImage={bgImage}
      >
        {/*Start Contact Page*/}
        <section
          className="contact-page"
          style={{ backgroundColor: "rgb(15, 21, 30)" }}
        >
          {/*Start Contact Page Top*/}
          <div
            className="contact-page__top"
            style={{ backgroundColor: "rgb(15, 21, 30)" }}
          >
            <div
              className="contact-page__top-pattern"
              style={{
                backgroundImage:
                  "url(assets/images/pattern/contact-page-top-pattern.png)",
              }}
            ></div>
            <div className="container">
              <div className="row">
                {/*Start Contact Page Top Content*/}
                <div className="col-xl-6">
                  <div className="contact-page__top-content">
                    <div className="sec-title tg-heading-subheading animation-style2">
                      <div className="sec-title__tagline">
                        <div className="line"></div>
                        <div className="text tg-element-title">
                          <h4 style={{ color: "white" }}>{heroTitle}</h4>
                        </div>
                        <div className="icon">
                          <span className="icon-plane2 float-bob-x3"></span>
                        </div>
                      </div>
                      <h2
                        className="sec-title__title tg-element-title"
                        style={{ color: "white" }}
                      >
                        {subtitleLines.length
                          ? subtitleLines.map((line, index) => (
                              <Fragment key={`subtitle-${index}`}>
                                {line}
                                {index < subtitleLines.length - 1 && <br />}
                              </Fragment>
                            ))
                          : heroSubtitle}
                      </h2>
                    </div>

                    <div
                      className="contact-page__top-content-text1"
                      style={{ color: "rgb(143, 143, 143)" }}
                    >
                      <p>
                        {descriptionLines.length
                          ? descriptionLines.map((line, index) => (
                              <Fragment key={`description-${index}`}>
                                {line}
                                {index < descriptionLines.length - 1 && <br />}
                              </Fragment>
                            ))
                          : heroDescription}
                      </p>
                    </div>
                  </div>
                </div>
                {/*End Contact Page Top Content*/}

                {/*Start Contact Page Top Form*/}
                <div className="col-xl-6">
                  <div className="contact-page__top-form">
                    <LeadForm />
                  </div>
                </div>
                {/*End Contact Page Top Form*/}
              </div>
            </div>
          </div>
          {/*End Contact Page Top*/}

          {/*Start Contact Page Bottom*/}
          <div className="contact-page__bottom">
            <div className="container">
              <div className="contact-page__bottom-inner">
                <ul className="list-unstyled">
                  {contactCards.map((card) => (
                    <li className="contact-page__bottom-single" key={card.id}>
                      <div className="icon">
                        <span className={iconForTitle(card.title)}></span>
                      </div>
                      <div className="content">
                        <h2>{card.title}</h2>
                        <p>
                          {card.descriptionLines.length
                            ? card.descriptionLines.map((line, index) => (
                                <Fragment key={`${card.id}-line-${index}`}>
                                  {renderCardLine(card.title, line)}
                                  {index < card.descriptionLines.length - 1 && (
                                    <br />
                                  )}
                                </Fragment>
                              ))
                            : "—"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/*End Contact Page Bottom*/}
        </section>
        {/*End Contact Page*/}

        {/*Start Google Map One*/}
        <section className="google-map-one">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6391.893!2d35.5018!3d33.8938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1710000000000"
            className="google-map-one__map"
          ></iframe>
        </section>
        {/*End Google Map One*/}
      </Layout>
    </>
  );
}

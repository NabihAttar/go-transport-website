import Layout from "@/components/layout/Layout";
import { getAboutUsPage } from "@/core/repo";
import fixImagePath from "@/lib/fixImagePath";
import Link from "next/link";
import { Fragment } from "react";
import { headers } from "next/headers";

const DEFAULT_COMPANY_DESCRIPTION =
  "Founded in 2015, Go Transport and Transit [SARL] is a Beirut-based logistics company with a global mindset. What started as a freight-forwarding initiative has grown into a fully integrated logistics ecosystem, connecting businesses to markets with precision and care.";

const DEFAULT_MISSION_DESCRIPTION =
  "To guide your business through the complexities of global logistics with professional, confidential, and cost-effective solutions.";

const DEFAULT_VISION_DESCRIPTION =
  "To be your trusted logistics partner worldwide — walking beside you with insight, integrity, and commitment to excellence.";

const DEFAULT_OPERATE_DESCRIPTION =
  "With headquarters near Rafic Hariri International Airport and warehousing hubs in different countries, GTT ensures smooth logistics across key international countries:";

const DEFAULT_COUNTRIES = [
  { id: "country-china", label: "China" },
  { id: "country-turkey", label: "Turkey" },
  { id: "country-dubai", label: "Dubai" },
  { id: "country-france", label: "France" },
  { id: "country-italy", label: "Italy" },
];

const FALLBACK_BIG_IMAGE = fixImagePath("about/WhyChooseUs2.png");
const FALLBACK_SMALL_IMAGE = fixImagePath("about/WhyChooseUs1.png");
const FALLBACK_OPERATE_IMAGE = fixImagePath("project/about.png");
const FALLBACK_BANNER_IMAGE = "/assets/images/pattern/aboutBanner.png";

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL ||
  process.env.CMS_BASE_URL ||
  "http://95.217.183.52:1337";

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value);
const isLocalAsset = (value = "") =>
  value?.startsWith("/assets/") || value?.startsWith("assets/");
const needsResolution = (value) =>
  Boolean(value) && !isAbsoluteUrl(value) && !isLocalAsset(value);

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

const splitLines = (value = "") =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const normalizeCountries = (countryData) => {
  if (!Array.isArray(countryData)) {
    return DEFAULT_COUNTRIES;
  }

  const parsed = countryData
    .map((item, index) => {
      if (!item) return null;
      const label =
        typeof item === "string"
          ? item
          : item?.feature || item?.title || item?.label || "";
      if (!label) return null;
      return {
        id: item?.id ?? `country-${index}`,
        label: label.trim(),
      };
    })
    .filter(Boolean);

  return parsed.length ? parsed : DEFAULT_COUNTRIES;
};

const buildPhoneHref = (phone) => {
  if (!phone) return "#";
  const normalized = phone.replace(/[^\d+]/g, "");
  return `tel:${normalized}`;
};

const buildCmsImageUrl = (path = "") => {
  if (!path) return null;
  if (isAbsoluteUrl(path) || isLocalAsset(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CMS_BASE_URL.replace(/\/$/, "")}${normalized}`;
};

const getRequestBaseUrl = () => {
  const envBase =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (envBase) {
    return envBase.replace(/\/$/, "");
  }
  const incomingHeaders = headers();
  const host = incomingHeaders.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
};

const resolveImagePaths = async (pathMap, baseUrl) => {
  const cleanedEntries = Object.entries(pathMap || {}).map(([key, value]) => [
    key,
    typeof value === "string" ? value.trim() : value || "",
  ]);

  const fetchEntries = cleanedEntries.filter(([, path]) =>
    needsResolution(path)
  );
  const resolvedFromFetch = {};

  if (fetchEntries.length) {
    const params = new URLSearchParams();
    fetchEntries.forEach(([, path]) => params.append("path", path));

    try {
      const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/getIMagesURL?${params.toString()}`,
        { cache: "no-store" }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.urls)) {
          fetchEntries.forEach(([key], index) => {
            resolvedFromFetch[key] = data.urls[index] || null;
          });
        } else if (fetchEntries.length === 1 && data.url) {
          resolvedFromFetch[fetchEntries[0][0]] = data.url;
        }
      } else {
        console.error("Failed to resolve image URLs:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to resolve image URLs:", error);
    }
  }

  return cleanedEntries.reduce((acc, [key, path]) => {
    if (!path) {
      acc[key] = null;
      return acc;
    }

    if (!needsResolution(path)) {
      acc[key] = path;
      return acc;
    }

    acc[key] = resolvedFromFetch[key] || buildCmsImageUrl(path) || path;
    return acc;
  }, {});
};

export default async function Home() {
  const aboutUsData = await getAboutUsPage();
  console.log("About Us Page API response:", aboutUsData);

  const aboutData = aboutUsData?.data ?? {};
  const banner = aboutData?.banner ?? {};
  const businessInfo = aboutData?.businessInfo ?? {};
  const whereWeOperate = aboutData?.whereWeOperate ?? {};

  const requestBaseUrl = getRequestBaseUrl();
  const resolvedImages = await resolveImagePaths(
    {
      banner: extractMediaPath(banner?.image),
      big: extractMediaPath(businessInfo?.bigImage),
      small: extractMediaPath(businessInfo?.smallImage),
      operate: extractMediaPath(whereWeOperate?.image),
    },
    requestBaseUrl
  );

  const bannerTitle = banner?.title?.trim() || "About company";
  const bannerImage = resolvedImages.banner || FALLBACK_BANNER_IMAGE;
  const bigImage = resolvedImages.big || FALLBACK_BIG_IMAGE;
  const smallImage = resolvedImages.small || FALLBACK_SMALL_IMAGE;
  const operateImage = resolvedImages.operate || FALLBACK_OPERATE_IMAGE;

  const companyTitle = businessInfo?.title?.trim() || "Our Company";
  const companySubtitle = businessInfo?.subtitle?.trim() || "Who We Are";
  const companyDescription =
    businessInfo?.description?.trim() || DEFAULT_COMPANY_DESCRIPTION;
  const subtitleLines = splitLines(companySubtitle);
  const descriptionLines = splitLines(companyDescription);

  const missionTitle =
    businessInfo?.missionCard?.title?.trim() || "Our Mission";
  const missionDescription =
    businessInfo?.missionCard?.description?.trim() ||
    DEFAULT_MISSION_DESCRIPTION;
  const visionTitle = businessInfo?.vissionCard?.title?.trim() || "Our Vision";
  const visionDescription =
    businessInfo?.vissionCard?.description?.trim() ||
    DEFAULT_VISION_DESCRIPTION;

  const phoneNumber = businessInfo?.phoneNumber?.trim() || "+961 76 071 205";
  const phoneHref = buildPhoneHref(phoneNumber);

  const operateTitle = whereWeOperate?.title?.trim() || "Where We Operate";
  const operateDescription =
    whereWeOperate?.description?.trim() || DEFAULT_OPERATE_DESCRIPTION;
  const operateCountries = normalizeCountries(whereWeOperate?.countries);

  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={2}
        breadcrumbTitle={bannerTitle}
        bgImage={bannerImage}
      >
        <section
          className="about-one"
          style={{ background: "rgba(15, 21, 30)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="about-one__content">
                  <div className="sec-title tg-heading-subheading animation-style2">
                    <div className="sec-title__tagline">
                      <div className="line"></div>
                      <div className="text tg-element-title">
                        <h4 style={{ color: "white" }}>{companyTitle}</h4>
                      </div>
                      <div className="icon">
                        <span className="icon-plane2 float-bob-x3"></span>
                      </div>
                    </div>
                    <h2
                      className="sec-title__title tg-element-title"
                      style={{ color: "white" }}
                    >
                      {subtitleLines.map((line, index) => (
                        <Fragment key={`subtitle-${index}`}>
                          {line}
                          {index < subtitleLines.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </h2>
                  </div>

                  <div className="about-one__content-text1">
                    <p style={{ color: "rgb(143, 143, 143)" }}>
                      {descriptionLines.map((line, index) => (
                        <Fragment key={`desc-${index}`}>
                          {line}
                          {index < descriptionLines.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </p>
                  </div>

                  <div className="about-one__content-text2">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div
                          className="about-one__content-text2-single"
                          style={{ backgroundColor: "rgba(24, 35, 50, 100)" }}
                        >
                          <div className="about-one__content-text2-single-top">
                            <div className="icon">
                              <span className="icon-worldwide-shipping-1"></span>
                            </div>

                            <div className="title-box">
                              <h3 style={{ color: "white" }}>{missionTitle}</h3>
                            </div>
                          </div>

                          <p style={{ color: "rgba(142, 142, 142)" }}>
                            {missionDescription}
                          </p>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div
                          className="about-one__content-text2-single"
                          style={{ backgroundColor: "rgba(24, 35, 50, 100)" }}
                        >
                          <div className="about-one__content-text2-single-top">
                            <div className="icon">
                              <span className="icon-24-hours-service"></span>
                            </div>

                            <div className="title-box">
                              <h3 style={{ color: "white" }}>{visionTitle}</h3>
                            </div>
                          </div>

                          <p style={{ color: "rgba(142, 142, 142)" }}>
                            {visionDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="about-one__content-bottom">
                    <div className="contact-box ">
                      <div className="icon">
                        <span className="icon-phone2"></span>
                      </div>

                      <div className="text-box">
                        <p style={{ color: "#89f2ff" }}>Make A Phone Call</p>
                        <h4>
                          <Link href={phoneHref} style={{ color: "white" }}>
                            {phoneNumber}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="about-one__img">
                  <div className="shape1 float-bob-y">
                    <img
                      src={fixImagePath("shapes/airplane-down-about.png")}
                      alt=""
                    />
                  </div>
                  <div className="shape2 float-bob-y">
                    <img src={fixImagePath("shapes/points.png")} alt="" />
                  </div>
                  <div className="about-one__img1 reveal">
                    <img src={bigImage} alt="About section highlight" />
                  </div>

                  <div className="about-one__img2">
                    <div className="about-one__img2-inner reveal">
                      <img src={smallImage} alt="About section detail" />
                    </div>

                    <div className="shape3 float-bob-y">
                      <img
                        src={fixImagePath("shapes/airplane-up-about.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="about-one"
          style={{ backgroundColor: "rgb(22, 28, 37)" }}
        >
          <div className="project-details__inner">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6">
                  <div className="project-details__text2-img">
                    <div className="inner">
                      <img src={operateImage} alt={operateTitle} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="project-details__text2-content">
                    <h2 style={{ color: "white" }}>{operateTitle}</h2>
                    <p style={{ color: "rgb(143, 143, 143)" }}>
                      {operateDescription}
                    </p>
                    <ul>
                      {operateCountries.map((country) => (
                        <li key={country.id}>
                          <p style={{ color: "rgb(143, 143, 143)" }}>
                            <span className="icon-arrow-right-circle"></span>{" "}
                            {country.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

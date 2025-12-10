"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

const FALLBACK_TITLE = "Why Choose us";
const FALLBACK_SUBTITLE = "Our Core Value";
const FALLBACK_BIG_IMAGE = "assets/images/about/WhyChooseUs1.png";
const FALLBACK_SMALL_IMAGE = "assets/images/about/WhyChooseUs2.png";
const FALLBACK_FEATURES = [
  { id: "why-feature-1", label: "Confidentiality & Data Privacy" },
  { id: "why-feature-2", label: "Cost-Conscious Operations" },
  { id: "why-feature-3", label: "Integrity in Every Action" },
  { id: "why-feature-4", label: "Accountability Through Experience" },
];

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value);

const isLocalAsset = (value = "") =>
  value?.startsWith("assets/") || value?.startsWith("/assets/");

const needsResolution = (value = "") =>
  Boolean(value) && !isAbsoluteUrl(value) && !isLocalAsset(value);

const sanitizeText = (value, fallback = "") => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length) {
      return trimmed;
    }
  }
  return fallback;
};

const splitLines = (value = "") =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const extractMediaPath = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;

  if (Array.isArray(image)) {
    return extractMediaPath(image[0]);
  }

  if (image?.data) {
    return extractMediaPath(image.data);
  }

  const attributes = image?.attributes || image;
  return (
    attributes?.url ||
    attributes?.path ||
    attributes?.formats?.large?.url ||
    attributes?.formats?.medium?.url ||
    attributes?.formats?.small?.url ||
    attributes?.formats?.thumbnail?.url ||
    null
  );
};

const deriveInitialImage = (path, fallback) => {
  if (!path) return fallback;
  if (isAbsoluteUrl(path) || isLocalAsset(path)) {
    return path;
  }
  // For paths that need resolution (like /uploads/...), return fallback initially
  // The API will resolve it and update the state
  return fallback;
};

const normalizeFeatures = (featuresData) => {
  const collection = Array.isArray(featuresData)
    ? featuresData
    : Array.isArray(featuresData?.data)
      ? featuresData.data
      : [];

  if (!collection.length) {
    return FALLBACK_FEATURES;
  }

  const normalized = collection
    .map((item, index) => {
      if (!item) return null;

      const label = sanitizeText(
        typeof item === "string"
          ? item
          : item?.feature || item?.title || item?.label,
        ""
      );

      if (!label) return null;

      return {
        id: item?.id || item?.documentId || `why-feature-${index}`,
        label,
      };
    })
    .filter(Boolean);

  return normalized.length ? normalized : FALLBACK_FEATURES;
};

const useResolvedImages = (bigPath, smallPath) => {
  const [imageUrls, setImageUrls] = useState({
    big: deriveInitialImage(bigPath, FALLBACK_BIG_IMAGE),
    small: deriveInitialImage(smallPath, FALLBACK_SMALL_IMAGE),
  });

  useEffect(() => {
    const baseImages = {
      big: deriveInitialImage(bigPath, FALLBACK_BIG_IMAGE),
      small: deriveInitialImage(smallPath, FALLBACK_SMALL_IMAGE),
    };

    setImageUrls(baseImages);

    const requestEntries = [];

    if (needsResolution(bigPath)) {
      requestEntries.push({ key: "big", path: bigPath });
    }

    if (needsResolution(smallPath)) {
      requestEntries.push({ key: "small", path: smallPath });
    }

    if (!requestEntries.length) {
      return;
    }

    const params = new URLSearchParams();
    requestEntries.forEach(({ path }) => params.append("path", path));

    let ignore = false;

    // Fetch image URLs from API
    fetch(`/api/getIMagesURL?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to resolve image URLs");
        }
        return response.json();
      })
      .then((data) => {
        if (ignore) return;
        const resolvedImages = { ...baseImages };

        // Handle API response - prioritize API URLs over base images
        if (Array.isArray(data.urls)) {
          // Multiple images requested
          requestEntries.forEach((entry, index) => {
            const resolved = data.urls[index];
            if (resolved) {
              resolvedImages[entry.key] = resolved;
            }
          });
        } else if (requestEntries.length === 1 && data.url) {
          // Single image requested
          resolvedImages[requestEntries[0].key] = data.url;
        }

        setImageUrls(resolvedImages);
      })
      .catch((error) => {
        console.error("Failed to fetch image URLs:", error);
        // Keep fallback images on error
      });

    return () => {
      ignore = true;
    };
  }, [bigPath, smallPath]);

  return imageUrls;
};

export default function WhyChooseUs({ whyUsSection }) {
  const title = sanitizeText(whyUsSection?.title, FALLBACK_TITLE);
  const subtitle = sanitizeText(whyUsSection?.subtitle, FALLBACK_SUBTITLE);
  const subtitleLines = useMemo(() => splitLines(subtitle), [subtitle]);
  const features = useMemo(
    () => normalizeFeatures(whyUsSection?.features),
    [whyUsSection?.features]
  );

  const bigImagePath = extractMediaPath(whyUsSection?.bigImage);
  const smallImagePath = extractMediaPath(whyUsSection?.smallImage);
  const imageUrls = useResolvedImages(bigImagePath, smallImagePath);
  return (
    <>
      <section
        className="why-choose-one"
        style={{ background: "rgba(15, 21, 30, 1)", paddingBottom: "260px" }}
      >
        <div className="why-choose-one__pattern">
          <img src="assets/images/pattern/why-choose-v1-pattern.png" alt="" />
        </div>

        <div className="container">
          <div className="row align-items-center">
            {/* Left: Content */}
            <div className="col-xl-6 col-lg-6">
              <div className="why-choose-one__content">
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
                      <Fragment key={`why-subtitle-${index}`}>
                        {line}
                        {index < subtitleLines.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </h2>
                </div>

                <div className="why-choose-one__content-list">
                  <ul>
                    {features.map((feature) => (
                      <li key={feature.id}>
                        <p>
                          <span className="icon-plane2"></span> {feature.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <Link className="thm-btn" href="/contact">
                    Contact Us
                    <i className="icon-right-arrow21"></i>
                    <span className="hover-btn hover-bx"></span>
                    <span className="hover-btn hover-bx2"></span>
                    <span className="hover-btn hover-bx3"></span>
                    <span className="hover-btn hover-bx4"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Images */}
            <div className="col-xl-5 offset-xl-1 col-lg-6">
              <div className="about-one__img">
                <div className="shape2 float-bob-y">
                  <img src="assets/images/shapes/points.png" alt="" />
                </div>
                <div className="about-one__img1 reveal">
                  <img
                    src={imageUrls.big || FALLBACK_BIG_IMAGE}
                    alt="Why choose us main visual"
                  />
                </div>
                <div className="about-one__img2">
                  <div className="about-one__img2-inner reveal">
                    <img
                      src={imageUrls.small || FALLBACK_SMALL_IMAGE}
                      alt="Why choose us supporting visual"
                    />
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
            {/* End Right */}
          </div>
        </div>
      </section>
    </>
  );
}

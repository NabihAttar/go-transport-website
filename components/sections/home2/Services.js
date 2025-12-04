"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_SECTION_TITLE = "Our Services";
const DEFAULT_SECTION_SUBTITLE = "Our Services at Glance";
const PLACEHOLDER_ICON = "assets/images/services-icon/placeholder.png";

const FALLBACK_SERVICES = [
  {
    title: "Air & Land Freight",
    subtitle: "(Import & Export)",
    icon: "assets/images/services-icon/air-land.svg",
  },
  {
    title: "Customs Clearance",
    subtitle: "(Beirut Airport & Port)",
    icon: "assets/images/services-icon/catgo-insurance.svg",
  },
  {
    title: "Consulting & Logistics",
    subtitle: "Outsourcing",
    icon: "assets/images/services-icon/consulting&logistics.svg",
  },
  {
    title: "Door-to-Door",
    subtitle: "(D2D) Shipping",
    icon: "assets/images/services-icon/customs-clearance.svg",
  },
  {
    title: "Cargo Insurance",
    subtitle: "Solutions",
    icon: "assets/images/services-icon/door-to-door.svg",
  },
  {
    title: "Inland Trucking",
    subtitle: "(E2E)",
    icon: "assets/images/services-icon/inland-trucking.svg",
  },
  {
    title: "Global Warehousing",
    subtitle: "",
    icon: "assets/images/services-icon/global-warehousing.svg",
  },
];

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value);
const isLocalAsset = (value = "") =>
  value?.startsWith("assets/") || value?.startsWith("/assets/");
const needsResolution = (value = "") =>
  Boolean(value) && !isAbsoluteUrl(value) && !isLocalAsset(value);

const fallbackByIndex = (index = 0) =>
  FALLBACK_SERVICES[index % FALLBACK_SERVICES.length] || FALLBACK_SERVICES[0];

const mapFallbackServices = () =>
  FALLBACK_SERVICES.map((service, index) => ({
    id: service.id || `fallback-service-${index}`,
    title: service.title,
    subtitle: service.subtitle,
    icon: service.icon,
    fallbackIcon: service.icon,
    requiresResolution: needsResolution(service.icon),
  }));

const sanitizeText = (value, fallback = "") => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length) {
      return trimmed;
    }
  }
  return fallback;
};

const extractMediaUrl = (source) => {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (Array.isArray(source)) return extractMediaUrl(source[0]);
  if (source?.data) return extractMediaUrl(source.data);

  const attributes = source?.attributes || source;

  const resolved =
    attributes?.url ||
    attributes?.path ||
    attributes?.formats?.small?.url ||
    attributes?.formats?.thumbnail?.url ||
    attributes?.formats?.medium?.url ||
    attributes?.formats?.large?.url ||
    "";

  return typeof resolved === "string" ? resolved.trim() : "";
};

const deriveServices = (servicesSection) => {
  if (!Array.isArray(servicesSection?.services)) {
    return mapFallbackServices();
  }

  const normalized = servicesSection.services
    .map((entry, index) => {
      if (!entry) return null;
      const fallback = fallbackByIndex(index);
      const title = sanitizeText(entry.title || entry.name, fallback.title);
      const subtitle = sanitizeText(
        entry.subtitle || entry.description || entry.caption,
        fallback.subtitle || ""
      );
      const rawIcon = extractMediaUrl(entry.icon);
      const iconCandidate =
        (typeof rawIcon === "string" ? rawIcon.trim() : "") || "";
      const icon = iconCandidate || fallback.icon;

      return {
        id: entry.documentId || entry.id || `service-${index}`,
        title,
        subtitle,
        icon,
        fallbackIcon: fallback.icon,
        requiresResolution: needsResolution(icon),
      };
    })
    .filter(Boolean);

  return normalized.length ? normalized : mapFallbackServices();
};

const useResolvedServiceIcons = (services) => {
  const [iconMap, setIconMap] = useState({});

  useEffect(() => {
    const entries = services
      .map((service) => {
        if (!service?.requiresResolution || !service?.icon) return null;
        return {
          key: service.id,
          path: service.icon,
        };
      })
      .filter(Boolean);

    if (!entries.length) {
      setIconMap({});
      return;
    }

    setIconMap({});

    const params = new URLSearchParams();
    entries.forEach(({ path }) => params.append("path", path));

    let ignore = false;

    fetch(`/api/getIMagesURL?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to resolve service icons");
        }
        return response.json();
      })
      .then((data) => {
        if (ignore) return;
        const resolved = {};

        if (Array.isArray(data.urls)) {
          entries.forEach((entry, index) => {
            const resolvedUrl = data.urls[index];
            if (resolvedUrl) {
              resolved[entry.key] = resolvedUrl;
            }
          });
        } else if (entries.length === 1 && data.url) {
          resolved[entries[0].key] = data.url;
        }

        setIconMap(resolved);
      })
      .catch((error) => {
        console.error("Failed to resolve service icons:", error);
      });

    return () => {
      ignore = true;
    };
  }, [services]);

  return iconMap;
};

// Render SVGs / remote assets via <img>, otherwise use Next/Image
function ServiceIcon({ src, alt, priority }) {
  const resolvedSrc =
    typeof src === "string" && src.trim().length
      ? src.trim()
      : PLACEHOLDER_ICON;
  const isSvg = resolvedSrc.toLowerCase().endsWith(".svg");
  const useNativeImg = isSvg || isAbsoluteUrl(resolvedSrc);

  if (useNativeImg) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER_ICON;
        }}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={30}
      height={30}
      style={{ objectFit: "contain" }}
      priority={priority}
      onError={() => {
        /* Next/Image doesn’t expose target */
      }}
    />
  );
}

export default function Services({ servicesSection }) {
  const services = useMemo(
    () => deriveServices(servicesSection),
    [servicesSection]
  );
  const resolvedIcons = useResolvedServiceIcons(services);
  const sectionTitle = sanitizeText(
    servicesSection?.title,
    DEFAULT_SECTION_TITLE
  );
  const sectionSubtitle = sanitizeText(
    servicesSection?.subtitle,
    DEFAULT_SECTION_SUBTITLE
  );

  return (
    <section
      className="service-two"
      style={{
        backgroundColor: "rgba(22, 28, 37, 1)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">
        <div className="sec-title center text-center tg-heading-subheading animation-style2">
          <div className="sec-title__tagline">
            <div className="line"></div>
            <div className="text tg-element-title">
              <h4>{sectionTitle}</h4>
            </div>
            <div className="icon">
              <span className="icon-plane2 float-bob-x3"></span>
            </div>
          </div>
          <h2 className="sec-title__title tg-element-title">
            {sectionSubtitle}
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id || `service-${index}`}
              className="service-card"
            >
              <div className="circle">
                <ServiceIcon
                  src={
                    service.requiresResolution
                      ? resolvedIcons[service.id] || service.fallbackIcon
                      : service.icon
                  }
                  alt={service.title}
                  priority={index < 3}
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.subtitle}</p>
              <div className="line-bottom"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Layout from "@/components/layout/Layout";
import ServiceGridSection from "@/components/service/ServiceGridSection";
import { getServicePage, getAllServices } from "@/core/repo";
import { headers } from "next/headers";

// Fallback services in case API fails
const FALLBACK_SERVICES = [
  {
    id: "air-land-freight",
    title: "Air & Land Freight",
    description:
      "Reliable logistics across major transportation networks. From urgent air shipments to coordinated ground deliveries, we move your cargo with efficiency and care.",
    imageSrc: "assets/images/services/air land frieght.png",
    icon: { type: "span", className: "icon-international-shipping" },
    animation: "fadeInLeft",
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    description:
      "Swift, compliant clearance processes at Beirut's Airport and Port. Our in-house experts ensure smooth entry and exit with zero stress.",
    imageSrc: "assets/images/services/custom clearance.png",
    icon: {
      type: "image",
      src: "/assets/images/services-icon/Customs clearance.svg",
      alt: "Customs clearance icon",
      className: "w-8 h-8 object-contain",
      interactive: true,
    },
    animation: "fadeInRight",
  },
  {
    id: "door-to-door",
    title: "Door-to-Door (D2D) Shipping",
    description:
      "From your supplier's floor to your customer's door — we manage the journey end-to-end. Transparent, trackable, and tailored to your needs.",
    imageSrc: "assets/images/services/door to door.png",
    icon: { type: "span", className: "icon-delivery-man" },
    animation: "fadeInLeft",
  },
  {
    id: "cargo-insurance",
    title: "Cargo Insurance",
    description:
      "We protect your cargo in transit, offering insurance plans that provide peace of mind against unexpected disruptions.",
    imageSrc: "assets/images/services/cargo insurance.png",
    icon: { type: "span", className: "icon-ship-1" },
    animation: "fadeInLeft",
  },
  {
    id: "warehousing-solutions",
    title: "Warehousing Solutions",
    description:
      "Secure, accessible storage across key logistics hubs. Our global warehouse network supports inventory control and efficient distribution.",
    imageSrc: "assets/images/services/warehousing solution.png",
    icon: { type: "span", className: "icon-storehouse" },
    animation: "fadeInRight",
  },
  {
    id: "inland-trucking",
    title: "Inland Trucking",
    description:
      "Fast, flexible ground transport across Lebanon and beyond. We bridge the gap between ports, warehouses, and final destinations.",
    imageSrc: "assets/images/services/inland trucking.png",
    icon: {
      type: "image",
      src: "/assets/images/services-icon/Consulting.svg",
      alt: "Inland trucking icon",
      className: "w-8 h-8 object-contain",
      interactive: true,
    },
    animation: "fadeInLeft",
  },
  {
    id: "consulting-outsourcing",
    title: "Consulting & Logistics Outsourcing",
    description:
      "From documentation to full-scale operations, we optimize your flow and reduce your costs.",
    imageSrc: "assets/images/services/consulting.png",
    icon: {
      type: "image",
      src: "/assets/images/services-icon/icon-ship-1.svg",
      alt: "Consulting and outsourcing icon",
      className: "w-8 h-8 object-contain",
      interactive: true,
    },
    animation: "fadeInLeft",
  },
];

const FALLBACK_BANNER_IMAGE = "assets/images/services/sericesBanner.png";

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

const buildImageUrl = (path = "") => {
  if (!path) return null;
  // If it's already an absolute URL, return it as is
  if (isAbsoluteUrl(path)) {
    return path;
  }
  // If it's a local asset, return it as is
  if (isLocalAsset(path)) {
    return path;
  }
  // Return API route URL instead of direct CMS URL
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Remove leading slash if present for the API route
  const apiPath = normalized.startsWith("/") ? normalized.slice(1) : normalized;
  return `/api/getimage/${apiPath}`;
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

    // Use API-resolved URL if available, otherwise build API route URL
    acc[key] = resolvedFromFetch[key] || buildImageUrl(path) || path;
    return acc;
  }, {});
};

// Transform API services data to match ServiceCard format
const transformServices = (apiServices = []) => {
  return apiServices.map((service, index) => {
    const imagePath = extractMediaPath(service?.serviceData?.image);
    const description =
      service?.serviceData?.descritpion ||
      service?.serviceData?.description ||
      "";

    // Alternate animations for visual variety
    const animations = ["fadeInLeft", "fadeInRight", "fadeInUp"];
    const animation = animations[index % animations.length];

    return {
      id: service?.documentId || service?.id || `service-${index}`,
      title: service?.title || "",
      description: description.trim(),
      imageSrc: imagePath || null,
      icon: { type: "span", className: "icon-international-shipping" },
      animation,
    };
  });
};

export default async function ServicePage() {
  const servicesData = await getServicePage();

  // Fetch all services from API
  let apiServices = [];
  let transformedServices = FALLBACK_SERVICES;

  try {
    const allServicesResponse = await getAllServices();
    apiServices = allServicesResponse?.data || [];

    if (apiServices.length > 0) {
      transformedServices = transformServices(apiServices);
    }
  } catch (error) {
    console.error("Failed to fetch services from API:", error);
    // Fall back to FALLBACK_SERVICES
  }

  const requestBaseUrl = getRequestBaseUrl();

  // Build image path map for all service images
  const imagePathMap = {
    banner: extractMediaPath(servicesData?.data?.banner?.image),
  };

  // Add all service images to the path map
  transformedServices.forEach((service, index) => {
    if (service.imageSrc) {
      imagePathMap[`service-${index}`] = service.imageSrc;
    }
  });

  // Resolve all image paths
  const resolvedImages = await resolveImagePaths(imagePathMap, requestBaseUrl);

  // Update service images with resolved URLs
  const servicesWithResolvedImages = transformedServices.map(
    (service, index) => ({
      ...service,
      imageSrc:
        resolvedImages[`service-${index}`] ||
        service.imageSrc ||
        "assets/images/services/default.png",
    })
  );

  const bgImage = resolvedImages.banner || FALLBACK_BANNER_IMAGE;
  console.log(servicesWithResolvedImages);
  return (
    <Layout
      headerStyle={1}
      footerStyle={2}
      breadcrumbTitle={servicesData?.data?.banner?.title || "Our Services"}
      bgImage={bgImage}
    >
      <ServiceGridSection services={servicesWithResolvedImages} />
    </Layout>
  );
}

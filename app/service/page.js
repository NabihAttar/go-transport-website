import Layout from "@/components/layout/Layout";
import ServiceGridSection from "@/components/service/ServiceGridSection";
import { getServicePage } from "@/core/repo";

const services = [
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

export default async function ServicePage() {
  const servicesData = await getServicePage();

  const bannerImagePath = servicesData?.data?.banner?.image;
  let bgImage = "assets/images/services/sericesBanner.png";
  if (bannerImagePath) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/getIMagesURL?${bannerImagePath.url}}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const data = await response.json();
      bgImage = data.url || bgImage;
    }
  }

  return (
    <Layout
      headerStyle={1}
      footerStyle={2}
      breadcrumbTitle={servicesData.data.banner.title}
      bgImage={bgImage}
    >
      <ServiceGridSection services={services} />
    </Layout>
  );
}

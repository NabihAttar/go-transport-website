import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import AboutHome1 from "@/components/sections/home1/About";
import WhyChooseUs from "@/components/sections/home1/WhyChooseUs";
import Services from "@/components/sections/home2/Services";
import { getHomepage } from "@/core/repo";

export const revalidate = 300;

export default async function Home() {
  const homepageData = await getHomepage();
  const heroSection = homepageData?.data?.heroSection;
  const aboutSection = homepageData?.data?.aboutSection;
  const servicesSection = homepageData?.data?.servicesSection;
  const whyUsSection = homepageData?.data?.whyUs;
  return (
    <div className="dark-version">
      <Layout headerStyle={1} footerStyle={2} initialData={homepageData}>
        <Banner heroSection={heroSection} />
        <AboutHome1 aboutSection={aboutSection} />
        <Services servicesSection={servicesSection} />
        <WhyChooseUs whyUsSection={whyUsSection} />
      </Layout>
    </div>
  );
}

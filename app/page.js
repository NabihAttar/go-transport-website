import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import AboutHome1 from "@/components/sections/home1/About";
import WhyChooseUs from "@/components/sections/home1/WhyChooseUs";
import Services from "@/components/sections/home2/Services";
import { getHomepage } from "@/core/repo";

export default async function Home() {
  const homepageData = await getHomepage();
  console.log(homepageData);
  return (
    <div className="dark-version">
      <Layout headerStyle={1} footerStyle={2} initialData={homepageData}>
        <Banner />
        <AboutHome1 />
        {/* <Service />
                <AboutHome2 /> */}
        <Services />
        {/* <Projects /> */}
        <WhyChooseUs />
        {/* <Blog /> */}
        {/* <Skills />
                <Testimonial />
                <Faq />
                <Cta />
                <Funfacts />
                <Team />
                <Blog />
                <Brands /> */}
        {/* <Testimonial /> */}
      </Layout>
    </div>
  );
}

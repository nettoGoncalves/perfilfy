import ComingSoon from "../components/landing-page/coming-soon";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header />
      <Hero />
      {/* <Pricing />
      <FAQ /> */}
      {/* <ComingSoon /> */}
    </div>
  );
}

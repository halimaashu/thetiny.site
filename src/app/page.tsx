import Banner from "@/components/Banner";
import FaqSection from "@/components/Faqsection";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PricingSection from "@/components/Pricingsection";
import ReviewsSection from "@/components/Reviewssection";
import StatsSection from "@/components/Statssection'";
import WhyWe from "@/components/WhyWe";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
       <div className="">
       
        <Banner/>
        <WhyWe/>
        <StatsSection/>
        <PricingSection/>
        <ReviewsSection/>
        <FaqSection/>
       </div>
      </main>
    </div>
  );
}

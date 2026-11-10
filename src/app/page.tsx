import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
       <div className="">
        <NavBar />
        <Banner/>
        <Footer/>
       </div>
      </main>
    </div>
  );
}

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
      <AIAssistant />
    </main>
  );
}

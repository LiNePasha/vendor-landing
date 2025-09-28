import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PreviewStore from "@/components/PreviewStore";
import CTA from "@/components/CTA";
import SignupForm from "@/components/SignupForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <PreviewStore />
      <SignupForm />
      <Features />
      <CTA />
    </main>
  );
}

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Exploring } from "@/sections/Exploring";
import { Journey } from "@/sections/Journey";
import { Education } from "@/sections/Education";
import { Competitions } from "@/sections/Competitions";
import { Research } from "@/sections/Research";
import { Skills } from "@/sections/Skills";
import { FeaturedWork } from "@/sections/FeaturedWork";
import { Statement } from "@/sections/Statement";
import { Writing } from "@/sections/Writing";
import { BeyondCode } from "@/sections/BeyondCode";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Journey />
      <Education />
      <FeaturedWork />
      <Research />
      <Competitions />
      <Exploring />
      <Skills />
      <Statement />
      <Writing />
      <BeyondCode />
      <Contact />
    </main>
  );
}

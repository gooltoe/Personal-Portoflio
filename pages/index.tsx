import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects2";
import ContactMe from "../components/ContactMe";
import ContactMe2 from "../components/ContactMe2";

import { PageInfo, Project, Skill, Social } from "../typings";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchPageInfo } from "../utils/fetchPageInfo";

type Props = {
  skills: Skill[];
  socials: Social[];
  projects: Project[];
  pageInfo: PageInfo;
};

const Home = ({ skills, socials, projects, pageInfo }: Props) => {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 md:scrollbar scrollbar-thin  scrollbar-track-gray-400/20 scrollbar-thumb-[#709DFF]/80 scroll-smooth">
      <Head>
        <title>Joe's Portfolio</title>
      </Head>

      {/* Header */}
      <NavBar socials={socials} />

      {/* Hero */}
      <section id="Hero" className="snap-start">
        <Hero pageInfo={pageInfo} socials={socials} />
      </section>

      {/* About */}
      <section id="About" className="snap-center md:px-[10vw]">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experience */}
      {/* <section id="Experience" className="snap-center px-[10vw]">
        <WorkExperience />
      </section> */}

      {/* Skills */}
      <section id="Skills" className="snap-start px-[10vw]">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="Projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      {/* Contact Me */}
      <section id="Contact" className="snap-start">
        <ContactMe2 socials={socials} />
      </section>

      <footer className="sticky bottom-5 w-fill">
        <div className="flex justify-end pr-10">
          <Link href="#Hero" scroll={true}>
            <ArrowUpCircleIcon className="w-12  cursor-pointer text-gray-500 hover:text-[#709DFF] transition duration-300" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const skills = await fetchSkills();
  const socials = await fetchSocials();
  const pageInfo = await fetchPageInfo();
  const projects = await fetchProjects();

  return {
    props: {
      skills,
      socials,
      pageInfo,
      projects,
    },
    revalidate: 10,
  };
};

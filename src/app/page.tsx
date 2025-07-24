import logo from "../assets/logo.png";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import NavBar from "./(main)/Navbar";

export default function Home() {
  return (
    // Outer container:
    // Apply dark mode classes here. bg-gray-100 is for light mode, dark:bg-gray-900 for dark mode.
    // text-gray-900 for light mode, dark:text-gray-100 for dark mode.
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {" "}
      {/* <--- MODIFIED HERE */}
      <div className="p-2">
        <NavBar />
      </div>
      {/* The main content div's background and text also need to be adaptable */}
      <div className="flex min-h-screen flex-col items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {" "}
        {/* <--- MODIFIED HERE */}
        {/* Main content section:
            - bg-gray-100 for light mode, dark:bg-gray-900 for dark mode.
            - text-gray-900 for light mode, dark:text-gray-100 for dark mode.
        */}
        <main className="flex w-full flex-grow flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12 dark:bg-gray-900 dark:text-gray-100">
          {" "}
          {/* <--- MODIFIED HERE */}
          {/* Text content */}
          <div className="max-w-prose space-y-3">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto md:ms-0"
            />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Create the{" "}
              <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Perfect Resume
              </span>{" "}
              in Minutes
            </h1>
            {/* Paragraph text needs dark mode variant */}
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {" "}
              {/* <--- MODIFIED HERE */}
              Struggling to Stand out ? Let{" "}
              <span className="font-bold">Career Craft AI</span> help you
              rewrite your Resume Story.
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/resumes">Get started</Link>
            </Button>
          </div>
          {/* Hero2 image */}
          <div>
            <Image
              src={hero2}
              alt="Resume preview"
              width={600}
              height={400}
              className="shadow-md lg:rotate-[1.5deg]"
            />
          </div>
        </main>
        {/* New section for hero1 and hero3: also needs dark mode colors */}
        <section className="flex w-full flex-col items-center gap-8 bg-gray-100 px-5 py-8 dark:bg-gray-900">
          {" "}
          {/* <--- MODIFIED HERE */}
          {/* Container for hero1 to control its width and margin */}
          <div className="w-full max-w-screen-md">
            <Image
              src={hero1}
              alt="Another resume preview 1"
              width={1200}
              height={900}
              className="w-full rounded-lg object-contain shadow-md"
            />
          </div>
          {/* Container for hero3 to control its width and margin */}
          <div className="w-full max-w-screen-md">
            <Image
              src={hero3}
              alt="Another resume preview 3"
              width={1200}
              height={900}
              className="w-full rounded-lg object-contain shadow-md"
            />
          </div>
        </section>
        {/* Footer section:
            - Footer already uses bg-gray-800 and text-gray-300.
            - If you want it to change in dark mode, you'd add dark: variants here too.
            - For now, leaving it as a darker fixed footer.
        */}
        <footer className="mt-auto w-full bg-gray-800 px-5 py-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Developed By Chiranjeev</p>
          <p className="mt-2 text-sm">
            <span>All Rights</span>|
            <span
            // href="https://github.com/cp200513/AI_Resume_Builder.git"
            // className="mx-2 hover:underline"
            >
              Yet to be Reserved
            </span>
          </p>
        </footer>
      </div>{" "}
      {/* This closes the second outer div */}
    </div> // This closes the very outermost div
  );
}

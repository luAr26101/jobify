import logo from "@/assets/logo.svg";
import landingImg from "@/assets/main.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <Image
          src={logo}
          alt="Jobify Dev Logo"
          width={164}
          height={50}
          priority
        />
      </header>
      <section className="mx-auto -mt-20 grid h-screen max-w-6xl items-center px-4 sm:px-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="text-4xl font-bold capitalize md:text-6xl">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="mt-4 max-w-lg leading-loose">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
            rerum id qui, reiciendis odit praesentium neque ratione similique
            quo in ducimus sunt corporis libero eius.
          </p>
          <Button asChild className="mt-4" size="lg">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image
          src={landingImg}
          alt="Landing Image"
          width={874}
          height={771}
          priority
          className="hidden lg:block"
        />
      </section>
    </main>
  );
}

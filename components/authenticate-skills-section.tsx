import Image from "next/image";

export default function AuthenticateSkillsSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="relative h-[360px] w-full md:h-[460px] md:w-1/3">
            <div className="absolute left-0 top-0 z-10 h-[80%] w-[80%] -rotate-12 transform transition-transform duration-300 hover:-rotate-6">
              <Image
                src="/images/homepage/skills_1.png"
                alt="Professional working at night"
                width={350}
                height={500}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-[10%] h-[80%] w-[80%] -rotate-6 transform transition-transform duration-300 hover:rotate-0">
              <Image
                src="/images/homepage/skills_2.png"
                alt="Professional in tech environment"
                width={350}
                height={500}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="z-20 my-4 w-full text-center md:w-1/3">
            <h2 className="mb-4 text-3xl font-bold text-[#00418d]">
              Authenticate Skills,
              <br />
              Simplify Hiring
            </h2>
            <p className="text-gray-700">
              SkillKwiz seeks to benchmark people&apos;s skills in their chosen
              profession. We conduct skill testing in secure centers with
              candidate authentication, and verified skill reports are made
              available so you no longer have to conduct lengthy technical
              interviews.
            </p>
          </div>

          <div className="relative h-[360px] w-full md:h-[460px] md:w-1/3">
            <div className="absolute right-0 top-0 z-10 h-[80%] w-[80%] rotate-9 transform transition-transform duration-300 hover:rotate-6">
              <Image
                src="/images/homepage/skills_3.png"
                alt="Professional at workstation"
                width={350}
                height={500}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-[10%] h-[80%] w-[80%] rotate-6 transform transition-transform duration-300 hover:rotate-0">
              <Image
                src="/images/homepage/skills_4.png"
                alt="Business professional looking at digital interface"
                width={350}
                height={500}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

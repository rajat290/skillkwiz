import Image from "next/image";

export default function AuthenticateSkillsSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-16xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">

          {/* Left side – two images side by side */}
          <div className="w-full md:w-1/3">
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-lg
              
               transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/homepage/skills_1.png"
                  alt="Professional working at night"
                  width={350}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg  transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/homepage/skills_2.png"
                  alt="Professional in tech environment"
                  width={350}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Centre – text */}
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

          {/* Right side – two images side by side */}
          <div className="w-full md:w-1/3">
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-lg  transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/homepage/skills_3.png"
                  alt="Professional at workstation"
                  width={350}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg  transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/homepage/skills_4.png"
                  alt="Business professional looking at digital interface"
                  width={350}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


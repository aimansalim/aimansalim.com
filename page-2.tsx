import React from 'react'
import { Link } from 'react-router-dom'

export default function Page() {
  // Get current year for dynamic dates
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-black text-white font-space-grotesk">
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50">
        <Link to="/">
          <img
            src="/placeholder.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <nav className="space-x-8">
          <Link to="/projects" className="text-sm uppercase tracking-wider hover:text-emerald-500">
            Projects
          </Link>
          <Link to="/about" className="text-sm uppercase tracking-wider hover:text-emerald-500">
            About
          </Link>
        </nav>
      </header>

      <main className="pt-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[300px,1fr] gap-12 mb-20">
          <div className="relative aspect-square">
            <img
              src="https://uploads-ssl.webflow.com/6481cd195a1b6affcccd1c08/6481e7306f5db9f2d072ff7c_Untitled%20design%20(2).png"
              alt="Profile visualization"
              width={300}
              height={300}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Name</span>
              <span className="text-emerald-500">Carlos Melegrío</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Age</span>
              <span>[Redacted]</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Location</span>
              <span>37.7784° S, 144.9658° E</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Creative Skills</span>
              <span>UI Design, Icons & Illustration, Photography, Video Production</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Technical Skills</span>
              <span>Plex, ProtoPie, Origami, Swift, Flutter, React, Javascript, Python and CI/CD</span>
            </div>
            <div className="grid grid-cols-[100px,1fr] gap-4">
              <span className="text-zinc-500 uppercase text-sm">Bio</span>
              <p className="text-zinc-300">
                Hello! I'm a product designer with about a decade of experience. My work cuts across the entire product — from solving a problem, looking for scale, and down to refining the smallest details for the sake of the craft.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-xl mb-8">Work Experience</h2>
          
          <div className="space-y-12">
            <div className="grid md:grid-cols-[200px,1fr] gap-8">
              <div className="text-sm">2021 to {currentYear}</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Company</span>
                  <span className="text-emerald-500">Mamtel Group</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Location</span>
                  <span>Melbourne</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Work</span>
                  <span className="text-zinc-300">Designed and delivered features for the Cards, Add-Ons and Store squads as a consultant for ANZ Plus.</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8">
              <div className="text-sm">2018 to 2021</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Company</span>
                  <span className="text-emerald-500">Itty Bitty Apps</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Location</span>
                  <span>Melbourne</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Work</span>
                  <span className="text-zinc-300">Product design for Reveal, and eventually joined as a founding designer for ANZ Plus — setting up design systems and key feature teams.</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8">
              <div className="text-sm">2017</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Company</span>
                  <span className="text-emerald-500">Ada Support</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Location</span>
                  <span>Toronto</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Work</span>
                  <span className="text-zinc-300">Designed, built, and shipped a video and GIF chatbot message feature — as Ada's first intern.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xl mb-8">Freelance</h2>
          <p className="mb-4">Past Clients Include</p>
          <p className="text-emerald-500">
            Art Processors (MONA), Calibre, Supp, RideStats, Vital, Product Design Lab, and Monash University
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-xl mb-8">Education</h2>
          
          <div className="space-y-12">
            <div className="grid md:grid-cols-[200px,1fr] gap-8">
              <div className="text-sm">2017</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Curriculum</span>
                  <span>Honours Year</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">University</span>
                  <span>Monash University</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Achievements</span>
                  <span className="text-zinc-300">Investigated a way to identify animals from a distance using a combination of biophysics and machine learning. The outcome was a thesis, and an innovation patent.</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8">
              <div className="text-sm">2014 to 2017</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Curriculum</span>
                  <span>Bachelor of Science Advanced (Global Challenges)</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">University</span>
                  <span>Monash University</span>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-4">
                  <span className="text-zinc-500 uppercase text-sm">Achievements</span>
                  <span className="text-zinc-300">Studied an exclusive and selective degree that combined a traditional science curriculum with training in leadership, entrepreneurship and policy. I majored in Computer Science, minored in Advanced Math, and built a few startups along the way.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex space-x-8">
            <Link to="/projects" className="text-sm uppercase tracking-wider hover:text-emerald-500">
              Projects
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-wider hover:text-emerald-500">
              About
            </Link>
            <a href="https://github.com" className="text-sm uppercase tracking-wider hover:text-emerald-500">
              Github
            </a>
            <a href="https://linkedin.com" className="text-sm uppercase tracking-wider hover:text-emerald-500">
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-zinc-500">
            Carlos Melegrío © {currentYear}
          </div>
        </div>
      </footer>
    </div>
  )
}


import { MatrixText } from '../../components/matrix-text'

export default function CV() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-2xl">
          <MatrixText text="Education" />
        </h2>
        <div className="space-y-1">
          <h3 className="text-2xl">Software Engineering</h3>
          <p className="text-[#A9A9A9]">UniMoRe</p>
          <p className="text-sm">Currently studying as a 22 year old student</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl">
          <MatrixText text="Technical Stack" />
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl">Design</h3>
            <p className="text-[#A9A9A9]">Adobe Suite, Figma</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl">Development</h3>
            <p className="text-[#A9A9A9]">Next.js, React, TailwindCSS</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl">Tools</h3>
            <p className="text-[#A9A9A9]">GitHub, Vercel, VS Code</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl">Database</h3>
            <p className="text-[#A9A9A9]">PostgreSQL</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl">
          <MatrixText text="Projects" />
        </h2>
        
        <div className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-2xl">UniSpot</h3>
            <p className="text-[#A9A9A9]">Student Platform</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Study Room Finder Platform</li>
              <li>Real-time Availability</li>
              <li>Student Community Features</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl">Calories AI</h3>
            <p className="text-[#A9A9A9]">Health Tech</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>AI-Powered Calorie Tracking</li>
              <li>Real-time Image Analysis</li>
              <li>Nutrition Insights</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl">Creative Direction & YouTube</h3>
            <p className="text-[#A9A9A9]">Content Design & Branding</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Contributed to 160M+ Views (Aledellagiusta Channel)</li>
              <li>High-Profile Collaborations</li>
              <li>Led Graphic Design Team</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl">Boold Design</h3>
            <p className="text-[#A9A9A9]">Creative Agency</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Founded & Led Creative Direction</li>
              <li>Platform Development</li>
              <li>Early AI Innovation</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl">Primavera Lab</h3>
            <p className="text-[#A9A9A9]">Fashion Brand</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Complete Brand Identity</li>
              <li>Product Visual Design</li>
              <li>Digital Presence Strategy</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}


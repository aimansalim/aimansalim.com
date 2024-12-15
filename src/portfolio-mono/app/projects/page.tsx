import { MatrixText } from '../../components/matrix-text'

const projects = [
  {
    title: "UniSpot",
    description: "Student Platform",
    techStack: "Next.js · React · TailwindCSS · PostgreSQL · WebSockets",
    stats: [
      { value: "100+", label: "Users" },
      { value: "50+", label: "Rooms" },
      { value: "BETA", label: "Status" }
    ]
  },
  {
    title: "Creative Direction",
    description: "Content Design & Branding",
    techStack: "Adobe Suite · Figma · After Effects",
    stats: [
      { value: "160M+", label: "Views" },
      { value: "12.8%", label: "CTR" },
      { value: "50+", label: "Collabs" }
    ]
  },
  {
    title: "Boold Design",
    description: "Creative Agency",
    techStack: "Next.js · React · TailwindCSS · PostgreSQL · Framer Motion",
    stats: [
      { value: "10+", label: "Projects" },
      { value: "5", label: "Tech Stack" },
      { value: "2021", label: "Founded" }
    ]
  },
  {
    title: "IT Consultancy",
    description: "Technical Solutions",
    techStack: "Python · OCR · XML · AS/400 · API Integration",
    stats: [
      { value: "5+", label: "Systems" },
      { value: "10+", label: "Processes" },
      { value: "40%", label: "ROI" }
    ]
  },
  {
    title: "Calorie AI",
    description: "Health Tech",
    techStack: "Next.js · OpenAI API · TailwindCSS · Vision AI",
    stats: [
      { value: "95%", label: "Accuracy" },
      { value: "<1s", label: "Response" },
      { value: "1000+", label: "Foods" }
    ]
  },
  {
    title: "Primavera Lab",
    description: "Fashion",
    techStack: "Photshop · Shopify · Seo",
    stats: [
      { value: "19k", label: "Views" },
      { value: "37", label: "Designs" },
      { value: "TEST", label: "Status" }
    ]
  }
]

export default function Projects() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl">
        <MatrixText text="Projects" />
      </h1>
      <div className="space-y-12">
        {projects.map((project) => (
          <div key={project.title} className="space-y-2">
            <h2 className="text-2xl">
              <MatrixText text={project.title} />
            </h2>
            <p className="text-[#A9A9A9]">{project.description}</p>
            <p className="text-sm text-[#666666]">{project.techStack}</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {project.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl">{stat.value}</div>
                  <div className="text-sm text-[#666666]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


import { MatrixText } from './matrix-text'

interface Stat {
  value: string
  label: string
}

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  stats: Stat[]
}

export function ProjectCard({ title, description, techStack, stats }: ProjectCardProps) {
  return (
    <div className="border border-white/10 p-6 space-y-4">
      <h3 className="text-xl font-bold">
        <MatrixText text={title} />
      </h3>
      <p className="text-white/60 text-sm">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="text-xs border border-white/10 px-2 py-1">
            {tech}
          </span>
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-box">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Command, ExternalLink, Code2, Layers, Box, Globe, Cpu } from 'lucide-react';

// Project type definition
interface Project {
  id: string;
  category: string;
  status: 'ACTIVE' | 'BETA' | 'ARCHIVED';
  name: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  stack: Array<{ name: string; type: string }>;
  link?: string;
  route?: string;
}

const projects: Project[] = [
  {
    id: '001',
    category: 'UNIVERSITY',
    status: 'ACTIVE',
    name: 'UNISPOT',
    description: 'A university project for UNIMORE that displays class schedules and classroom locations across the campus.',
    metrics: [
      { label: 'Departments', value: '5' },
      { label: 'Buildings', value: '3' },
      { label: 'Classrooms', value: '25+' }
    ],
    stack: [
      { name: 'React', type: 'Frontend' },
      { name: 'WebSocket', type: 'Real-time' },
      { name: 'TypeScript', type: 'Core' }
    ],
    route: '/projects/unispot'
  },
  {
    id: '002',
    category: 'DESIGN LEAD',
    status: 'ACTIVE',
    name: 'ALEDELLAGIUSTA',
    description: 'Lead designer specializing in user psychology and engagement. Expert in creating interfaces that drive user actions and maximize click-through rates.',
    metrics: [
      { label: 'Designs', value: 'Hundreds' },
      { label: 'Total Views', value: '160M+' },
      { label: 'Experience', value: '3+ Years' }
    ],
    stack: [
      { name: 'Figma', type: 'Design' },
      { name: 'Adobe CC', type: 'Creative' },
      { name: 'Webflow', type: 'Deploy' },
      { name: 'After Effects', type: 'Motion' }
    ],
    link: 'https://aledellagiusta.com'
  },
  {
    id: '003',
    category: 'DESIGN',
    status: 'ACTIVE',
    name: 'BOOLD DESIGN',
    description: 'Creative agency specializing in branding and web design. Portfolio includes personal website designs and upcoming projects.',
    metrics: [
      { label: 'Projects', value: '50+' },
      { label: 'Websites', value: '15+' },
      { label: 'Success Rate', value: '95%' }
    ],
    stack: [
      { name: 'Figma', type: 'Design' },
      { name: 'React', type: 'Frontend' },
      { name: 'TailwindCSS', type: 'Styling' },
      { name: 'Framer', type: 'Motion' }
    ],
    route: '/projects/design'
  },
  {
    id: '004',
    category: 'AI OPS',
    status: 'ACTIVE',
    name: 'CALORIES AI',
    description: 'AI-powered nutrition tracking and meal analysis system.',
    metrics: [
      { label: 'Accuracy', value: '95%' },
      { label: 'Database', value: '10K+ Foods' },
      { label: 'Response', value: '< 2s' }
    ],
    stack: [
      { name: 'TensorFlow', type: 'AI' },
      { name: 'Python', type: 'Backend' },
      { name: 'React', type: 'Frontend' },
      { name: 'OpenCV', type: 'Vision' }
    ],
    link: 'https://calories-ai.pages.dev'
  },
  {
    id: '005',
    category: 'AI PIONEER',
    status: 'BETA',
    name: 'SAFEINTELLIGENCE.CO',
    description: 'AI-powered solution started in 2021, before the mainstream AI boom. Early adopter of large language models for business applications.',
    metrics: [
      { label: 'Started', value: '2021' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'AI Models', value: '3+' }
    ],
    stack: [
      { name: 'GPT-4', type: 'AI' },
      { name: 'Next.js', type: 'Frontend' },
      { name: 'PostgreSQL', type: 'Database' }
    ],
    link: 'https://safeintelligence.co'
  }
];

// Corner decorations component
const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
  </>
);

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 font-space-grotesk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-12 border border-white/10 p-6 md:p-8">
          <CornerDecorations />
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-1 bg-white/40" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">Project Portfolio</div>
            <div className="flex-1 h-px bg-white/10" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">Projects: {projects.length}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Code2, label: 'Active Projects', value: projects.filter(p => p.status === 'ACTIVE').length },
              { icon: Layers, label: 'Technologies', value: projects.reduce((acc, p) => acc + p.stack.length, 0) },
              { icon: Box, label: 'Completed', value: projects.length },
              { icon: Globe, label: 'Live Sites', value: projects.filter(p => p.status !== 'ARCHIVED').length }
            ].map((stat, i) => (
              <div key={i} className="relative border border-white/10 p-4">
                <CornerDecorations />
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="w-3 h-3 text-white/40" />
                  <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
                </div>
                <div className="text-xl md:text-2xl font-medium">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative border border-white/10 hover:border-white/20 transition-colors"
            >
              <CornerDecorations />
              <div className="p-4 sm:p-6 md:p-8">
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500/50" />
                      <div className="text-[10px] uppercase tracking-wider text-white/40">{project.category}</div>
                    </div>
                    <div className="text-[10px] px-2 py-1 border border-white/10 uppercase tracking-wider text-white/60">
                      ID: {project.id}
                    </div>
                    <div className={`text-[10px] px-2 py-1 border uppercase tracking-wider
                      ${project.status === 'ACTIVE' ? 'border-emerald-500/50 text-emerald-500/50' :
                        project.status === 'BETA' ? 'border-blue-500/50 text-blue-500/50' :
                        'border-white/10 text-white/40'}`}>
                      {project.status}
                    </div>
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white/60 transition-colors"
                    >
                      <span className="uppercase tracking-wider">External Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : project.route && (
                    <Link
                      to={project.route}
                      className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white/60 transition-colors"
                    >
                      <span className="uppercase tracking-wider">View Details</span>
                      <Command className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                {/* Project Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                  {/* Main Info */}
                  <div className="col-span-1 md:col-span-4 space-y-4 mb-6 md:mb-0">
                    <h2 className="text-2xl font-medium">{project.name}</h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="col-span-1 md:col-span-4 mb-6 md:mb-0">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mb-4">Performance Metrics</div>
                    <div className="space-y-3">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center justify-between border border-white/10 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-white/40">{metric.label}</div>
                          <div className="text-sm font-medium">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="col-span-1 md:col-span-4">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mb-4">Tech Stack</div>
                    <div className="grid grid-cols-2 gap-2">
                      {project.stack.map((tech, i) => (
                        <div key={i} className="border border-white/10 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-3 h-3 text-white/40" />
                            <div className="text-[10px] uppercase tracking-wider text-white/40">{tech.type}</div>
                          </div>
                          <div className="text-sm">{tech.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState } from 'react'
import { MatrixText } from '../../components/matrix-text'

const projects = [
  {
    title: "UniSpot",
    url: "https://uni-posti.vercel.app/",
    description: "Find study rooms and track availability in real-time"
  },
  {
    title: "Calories AI",
    url: "https://calories-ai.pages.dev/",
    description: "AI-powered calorie tracking and nutrition insights"
  },
  {
    title: "Boold Design",
    url: "https://boold.it/",
    description: "Creative agency portfolio and services"
  },
  {
    title: "Boold AI",
    url: "https://boold.co/",
    description: "Early AI innovation platform from 2021"
  }
]

export default function Preview() {
  const [selectedUrl, setSelectedUrl] = useState(projects[0].url)

  return (
    <div className="space-y-12">
      <h1 className="text-2xl">
        <MatrixText text="Preview" />
      </h1>
      
      <div className="space-y-8">
        <div className="space-y-6">
          {projects.map((project) => (
            <button
              key={project.url}
              onClick={() => setSelectedUrl(project.url)}
              className="text-left w-full space-y-1"
            >
              <div className="text-2xl">
                <MatrixText text={project.title} />
              </div>
              <div className="text-[#A9A9A9] text-sm">
                {project.description}
              </div>
            </button>
          ))}
        </div>
        
        <div className="aspect-video w-full">
          <iframe
            src={selectedUrl}
            className="w-full h-full"
            style={{ background: 'white' }}
          />
        </div>
      </div>
    </div>
  )
}


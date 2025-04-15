import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Project } from '../types';
import { Plus, Users, Star, Search, GitBranch, Terminal, Filter } from 'lucide-react';

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Neural Interface SDK',
    description: 'Building a comprehensive SDK for neural interface applications',
    tags: ['TypeScript', 'React', 'Node.js'],
    progress: 65,
    createdBy: '1',
    members: ['1', '2'],
    discussions: [],
    createdAt: new Date('2024-03-15'),
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Quantum Encryption',
    description: 'Advanced quantum encryption protocols for secure communication',
    tags: ['Python', 'Rust', 'Cryptography'],
    progress: 30,
    createdBy: '2',
    members: ['2'],
    discussions: [],
    createdAt: new Date('2024-03-10'),
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop'
  }
];

const technologies = ['TypeScript', 'React', 'Node.js', 'Python', 'Rust', 'Cryptography'];

export default function Projects() {
  const { isAuthenticated } = useAuth();
  const [projects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredProjects = projects
    .filter(project =>
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTech.length === 0 || project.tags.some(tag => selectedTech.includes(tag)))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group">
            <button className="cyber-button py-1.5 px-3 text-sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 cyber-card p-2 z-10 hidden group-hover:block">
              <div className="space-y-2">
                <div className="text-xs text-gray-400">Technologies</div>
                <div className="flex flex-wrap gap-1">
                  {technologies.map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        selectedTech.includes(tech)
                          ? 'bg-neon-blue/20 text-neon-blue'
                          : 'bg-cyber-primary/50 text-gray-400 hover:bg-cyber-primary'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                <div className="border-t border-neon-blue/20 pt-2">
                  <div className="text-xs text-gray-400 mb-1">Sort by</div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                    className="cyber-input text-xs w-full py-1"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <Link
              to="/projects/create"
              className="cyber-button py-1.5 px-3 text-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Project
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(project => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="cyber-card group hover:border-neon-blue/40 transition-all duration-300"
          >
            <div className="relative h-40 rounded-t-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
            </div>
            
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="cyber-heading text-lg group-hover:text-neon-blue transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <Terminal className="w-4 h-4 text-neon-blue flex-shrink-0" />
              </div>

              <p className="text-gray-400 text-sm mt-1 mb-2 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-neon-yellow" />
                    <span className="text-gray-400">128</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-neon-purple" />
                    <span className="text-gray-400">45</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-neon-pink" />
                    <span className="text-gray-400">{project.members.length}</span>
                  </div>
                </div>
                <span className="text-gray-400">
                  {project.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
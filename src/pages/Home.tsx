import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, ArrowRight } from 'lucide-react';

const trendingTopics = [
  {
    id: '1',
    title: 'Quantum Computing in 2025',
    views: 1234,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Neural Networks Evolution',
    views: 982,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Cybersecurity Frontiers',
    views: 756,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop'
  }
];

const topProjects = [
  {
    id: '1',
    title: 'Neural Interface SDK',
    stars: 128,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Quantum Encryption Library',
    stars: 98,
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'AI-Powered Analytics',
    stars: 76,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop'
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515630278258-407f66498911?w=1600&h=800&fit=crop"
          alt="Cyberpunk City"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/80 to-transparent">
          <div className="h-full flex items-center px-8 md:px-12">
            <div className="max-w-2xl">
              <h1 className="cyber-heading text-4xl md:text-6xl mb-4">
                CYBER_NET<span className="text-neon-blue">_2025</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8">
                Connect. Create. Conquer the Digital Frontier.
              </p>
              <Link
                to="/projects"
                className="cyber-button inline-flex items-center"
              >
                Explore Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="cyber-heading text-2xl flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-neon-pink" />
            Trending Topics
          </h2>
          <Link to="/forum" className="cyber-button">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTopics.map(topic => (
            <Link
              key={topic.id}
              to={`/forum`}
              className="cyber-card group"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-neon-blue font-bold text-lg mb-2 group-hover:text-neon-pink transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400">
                  {topic.views.toLocaleString()} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="cyber-heading text-2xl flex items-center">
            <Star className="w-6 h-6 mr-2 text-neon-purple" />
            Top Projects
          </h2>
          <Link to="/projects" className="cyber-button">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProjects.map(project => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="cyber-card group"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-neon-purple font-bold text-lg mb-2 group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {project.stars} stars
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
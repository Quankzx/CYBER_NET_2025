import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Youtube,
  Book,
  Github,
  FileText,
  Search,
  Filter,
  Calendar,
  Users,
  Star,
  ExternalLink
} from 'lucide-react';

// Learning resources data
const learningResources = [
  {
    title: 'Video Tutorials',
    icon: <Youtube className="w-6 h-6" />,
    items: [
      {
        id: '1',
        name: 'JavaScript Mastery',
        url: '/resources/1',
        description: 'Modern web development tutorials',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        stats: {
          subscribers: '1.2M',
          videos: 200,
          rating: 4.9
        }
      },
      {
        id: '2',
        name: 'Fireship',
        url: '/resources/2',
        description: 'Quick, practical dev tutorials',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
        stats: {
          subscribers: '2.1M',
          videos: 500,
          rating: 4.8
        }
      },
      {
        id: '3',
        name: 'Traversy Media',
        url: '/resources/3',
        description: 'Web development tutorials',
        image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
        stats: {
          subscribers: '1.8M',
          videos: 1000,
          rating: 4.9
        }
      }
    ]
  },
  {
    title: 'Documentation',
    icon: <Book className="w-6 h-6" />,
    items: [
      {
        id: '4',
        name: 'MDN Web Docs',
        url: '/resources/4',
        description: 'Comprehensive web documentation',
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop',
        stats: {
          articles: '10K+',
          contributors: '1000+',
          languages: 40
        }
      },
      {
        id: '5',
        name: 'React Documentation',
        url: '/resources/5',
        description: 'Official React documentation',
        image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
        stats: {
          tutorials: 100,
          examples: 500,
          updates: 'Weekly'
        }
      },
      {
        id: '6',
        name: 'TypeScript Handbook',
        url: '/resources/6',
        description: 'TypeScript language documentation',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
        stats: {
          chapters: 50,
          examples: 300,
          updates: 'Monthly'
        }
      }
    ]
  },
  {
    title: 'Practice & Examples',
    icon: <Github className="w-6 h-6" />,
    items: [
      {
        id: '7',
        name: 'Frontend Mentor',
        url: '/resources/7',
        description: 'Real-world frontend challenges',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop',
        stats: {
          challenges: 500,
          solutions: '10K+',
          difficulty: '3 levels'
        }
      },
      {
        id: '8',
        name: 'CodePen',
        url: '/resources/8',
        description: 'Frontend code examples',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=400&fit=crop',
        stats: {
          pens: '1M+',
          creators: '100K+',
          views: '1B+'
        }
      },
      {
        id: '9',
        name: 'GitHub Trending',
        url: '/resources/9',
        description: 'Trending open source projects',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
        stats: {
          projects: '1K+',
          languages: 50,
          updates: 'Daily'
        }
      }
    ]
  },
  {
    title: 'Articles & Blogs',
    icon: <FileText className="w-6 h-6" />,
    items: [
      {
        id: '10',
        name: 'Dev.to',
        url: '/resources/10',
        description: 'Community-driven dev articles',
        image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=400&fit=crop',
        stats: {
          articles: '100K+',
          writers: '50K+',
          readers: '1M+'
        }
      },
      {
        id: '11',
        name: 'Medium - Programming',
        url: '/resources/11',
        description: 'Curated programming articles',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
        stats: {
          publications: 1000,
          authors: '10K+',
          topics: 100
        }
      },
      {
        id: '12',
        name: 'CSS Tricks',
        url: '/resources/12',
        description: 'Web development articles',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
        stats: {
          articles: '5K+',
          snippets: '1K+',
          guides: 200
        }
      }
    ]
  }
];

// Categories for filtering
const categories = ['All', 'Videos', 'Documentation', 'Practice', 'Articles'];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = selectedCategory === 'All'
    ? learningResources
    : learningResources.filter(section => section.title.includes(selectedCategory));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=400&fit=crop"
          alt="Learning Resources"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/80 to-transparent">
          <div className="h-full flex items-center px-8">
            <div>
              <h1 className="cyber-heading text-4xl mb-2">Learning Resources</h1>
              <p className="text-gray-300 max-w-xl">
                Curated collection of the best programming resources, tutorials, and learning materials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
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
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1 rounded text-sm ${
                      selectedCategory === category
                        ? 'bg-neon-blue/20 text-neon-blue'
                        : 'text-gray-400 hover:bg-cyber-primary/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Sections */}
      <div className="space-y-12">
        {filteredResources.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-6">
              {section.icon}
              <h2 className="cyber-heading text-2xl">{section.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items
                .filter(item =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <Link
                    key={item.id}
                    to={item.url}
                    className="cyber-card group hover:border-neon-blue/40"
                  >
                    <div className="relative h-40 rounded-t-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="cyber-heading text-lg group-hover:text-neon-blue transition-colors">
                          {item.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-neon-blue" />
                      </div>

                      <p className="text-gray-400 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {Object.entries(item.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="cyber-card p-2 bg-cyber-primary/30"
                          >
                            <div className="text-neon-blue mb-1">
                              {typeof value === 'number'
                                ? value.toLocaleString()
                                : value}
                            </div>
                            <div className="text-gray-400 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
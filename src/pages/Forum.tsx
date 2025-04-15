import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChatBox } from '../types';
import { MessageSquarePlus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data
const mockChatBoxes: ChatBox[] = [
  {
    id: '1',
    title: 'Neural Networks Evolution',
    description: 'Discussing the latest advancements in neural network architectures',
    createdBy: '1',
    createdAt: new Date('2024-03-15'),
    category: 'AI & ML',
    tags: ['Neural Networks', 'Deep Learning', 'AI'],
    messages: [],
    views: 1234,
    replies: 45
  },
  {
    id: '2',
    title: 'Quantum Computing Progress',
    description: 'Updates and breakthroughs in quantum computing research',
    createdBy: '2',
    createdAt: new Date('2024-03-10'),
    category: 'Quantum Computing',
    tags: ['Quantum', 'Computing', 'Research'],
    messages: [],
    views: 982,
    replies: 23
  }
];

const categories = ['AI & ML', 'Quantum Computing', 'Cybersecurity', 'Web Development', 'Mobile Development'];
const tags = ['Neural Networks', 'Deep Learning', 'AI', 'Quantum', 'Computing', 'Research'];

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const [topics] = useState<ChatBox[]>(mockChatBoxes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;

  const filteredTopics = topics
    .filter(topic =>
      (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       topic.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory.length === 0 || selectedCategory.includes(topic.category)) &&
      (selectedTags.length === 0 || topic.tags.some(tag => selectedTags.includes(tag)))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return b.views - a.views;
    });

  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * topicsPerPage,
    currentPage * topicsPerPage
  );

  const toggleCategory = (category: string) => {
    setSelectedCategory(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
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
              placeholder="Search topics..."
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
            <div className="absolute right-0 top-full mt-2 w-64 cyber-card p-2 z-10 hidden group-hover:block">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Categories</div>
                  <div className="flex flex-wrap gap-1">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-2 py-0.5 rounded text-xs ${
                          selectedCategory.includes(category)
                            ? 'bg-neon-blue/20 text-neon-blue'
                            : 'bg-cyber-primary/50 text-gray-400 hover:bg-cyber-primary'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-0.5 rounded text-xs ${
                          selectedTags.includes(tag)
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'bg-cyber-primary/50 text-gray-400 hover:bg-cyber-primary'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neon-blue/20 pt-2">
                  <div className="text-xs text-gray-400 mb-1">Sort by</div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                    className="cyber-input text-xs w-full py-1"
                  >
                    <option value="newest">Newest first</option>
                    <option value="popular">Most popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <Link
              to="/forum/create"
              className="cyber-button py-1.5 px-3 text-sm whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4 mr-1" />
              New Topic
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {paginatedTopics.map(topic => (
          <Link
            key={topic.id}
            to={`/forum/${topic.id}`}
            className="cyber-card p-3 block hover:border-neon-blue/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-neon-blue font-medium text-lg hover:text-neon-pink transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    {topic.category}
                  </span>
                  {topic.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-gray-400">
                  {topic.views.toLocaleString()} views
                </div>
                <div className="text-neon-blue">
                  {topic.replies} replies
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {topic.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="cyber-button p-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="cyber-button p-1"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
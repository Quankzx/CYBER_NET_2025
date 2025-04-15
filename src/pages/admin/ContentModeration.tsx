import React, { useState } from 'react';
import {
  Search,
  Filter,
  MessageSquare,
  Flag,
  Trash2,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  User,
  Calendar,
  ThumbsUp,
  MessageCircle,
  BarChart2,
  Shield
} from 'lucide-react';

interface Content {
  id: string;
  type: 'post' | 'comment' | 'discussion';
  title?: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  status: 'active' | 'flagged' | 'removed' | 'locked';
  category?: string;
  tags?: string[];
  stats: {
    views?: number;
    likes: number;
    replies: number;
  };
  reports?: {
    id: string;
    reason: string;
    description: string;
    reportedBy: {
      name: string;
      avatar: string;
    };
    timestamp: Date;
    status: 'pending' | 'resolved' | 'dismissed';
  }[];
  parent?: {
    id: string;
    title: string;
    type: 'post' | 'discussion';
  };
}

// Mock data
const mockContent: Content[] = [
  {
    id: '1',
    type: 'discussion',
    title: 'Neural Networks Evolution',
    content: 'The field of neural networks has seen remarkable progress in recent years...',
    author: {
      id: '1',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
    },
    createdAt: new Date('2024-03-15'),
    status: 'active',
    category: 'AI & ML',
    tags: ['Neural Networks', 'Deep Learning', 'AI'],
    stats: {
      views: 1234,
      likes: 89,
      replies: 45
    }
  },
  {
    id: '2',
    type: 'post',
    content: 'This content contains inappropriate language and spam links...',
    author: {
      id: '2',
      name: 'John Matrix',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
    },
    createdAt: new Date('2024-03-19'),
    status: 'flagged',
    stats: {
      likes: 2,
      replies: 8
    },
    reports: [
      {
        id: '1',
        reason: 'Spam content',
        description: 'This post contains multiple spam links and inappropriate language',
        reportedBy: {
          name: 'Alex Murphy',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
        },
        timestamp: new Date('2024-03-19'),
        status: 'pending'
      }
    ],
    parent: {
      id: '1',
      title: 'Neural Networks Evolution',
      type: 'discussion'
    }
  }
];

interface ContentDetailsModalProps {
  content: Content;
  onClose: () => void;
  onUpdateStatus: (contentId: string, newStatus: Content['status']) => void;
}

function ContentDetailsModal({ content, onClose, onUpdateStatus }: ContentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'reports'>('details');

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-4xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="cyber-heading text-xl mb-1">
              {content.title || `${content.type.charAt(0).toUpperCase() + content.type.slice(1)} Details`}
            </h2>
            <div className="text-gray-400 text-sm">
              by {content.author.name} on {content.createdAt.toLocaleDateString()}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-neon-blue/20">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2 px-4 relative ${
              activeTab === 'details' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Details
            {activeTab === 'details' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-4 relative ${
              activeTab === 'reports' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Reports
            {activeTab === 'reports' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                  <select
                    value={content.status}
                    onChange={(e) => onUpdateStatus(content.id, e.target.value as Content['status'])}
                    className="cyber-input w-full"
                  >
                    <option value="active">Active</option>
                    <option value="flagged">Flagged</option>
                    <option value="removed">Removed</option>
                    <option value="locked">Locked</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Content</h3>
                  <div className="cyber-card p-3 bg-cyber-primary/30">
                    <p className="text-gray-300 whitespace-pre-line">
                      {content.content}
                    </p>
                  </div>
                </div>

                {content.parent && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Parent Content</h3>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="text-neon-blue">{content.parent.title}</div>
                      <div className="text-xs text-gray-400">
                        Type: {content.parent.type}
                      </div>
                    </div>
                  </div>
                )}

                {content.category && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Category & Tags</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                          {content.category}
                        </span>
                      </div>
                      {content.tags && (
                        <div className="flex flex-wrap gap-1">
                          {content.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Author</h3>
                  <div className="cyber-card p-3 bg-cyber-primary/30">
                    <div className="flex items-center gap-3">
                      <img
                        src={content.author.avatar}
                        alt={content.author.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div>
                        <div className="text-neon-blue">{content.author.name}</div>
                        <div className="text-xs text-gray-400">ID: {content.author.id}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Statistics</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {content.stats.views !== undefined && (
                      <div className="cyber-card p-3 bg-cyber-primary/30">
                        <div className="text-xl font-bold text-neon-blue">
                          {content.stats.views}
                        </div>
                        <div className="text-xs text-gray-400">Views</div>
                      </div>
                    )}
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="text-xl font-bold text-neon-purple">
                        {content.stats.likes}
                      </div>
                      <div className="text-xs text-gray-400">Likes</div>
                    </div>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="text-xl font-bold text-neon-pink">
                        {content.stats.replies}
                      </div>
                      <div className="text-xs text-gray-400">Replies</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Actions</h3>
                  <div className="space-y-2">
                    <button className="cyber-button w-full justify-center text-sm py-2">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Content
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2">
                      <Lock className="w-4 h-4 mr-2" />
                      Lock Thread
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Content
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Content
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              {content.reports ? (
                content.reports.map(report => (
                  <div key={report.id} className="cyber-card p-4 bg-cyber-primary/30">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-neon-pink/10">
                        <Flag className="w-4 h-4 text-neon-pink" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-neon-pink font-medium">
                              {report.reason}
                            </div>
                            <div className="text-xs text-gray-400">
                              Reported by {report.reportedBy.name} on {report.timestamp.toLocaleDateString()}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            report.status === 'resolved'
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : report.status === 'dismissed'
                              ? 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {report.description}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button className="cyber-button py-1 px-2 text-sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </button>
                          <button className="cyber-button py-1 px-2 text-sm">
                            <XCircle className="w-4 h-4 mr-1" />
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No reports found for this content
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentModeration() {
  const [content, setContent] = useState<Content[]>(mockContent);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<Content['type'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Content['status'] | 'all'>('all');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const filteredContent = content.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUpdateStatus = (contentId: string, newStatus: Content['status']) => {
    setContent(prev => prev.map(item =>
      item.id === contentId ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Content Moderation</h1>
          <p className="text-gray-400">Monitor and moderate user-generated content</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-green-500">↑ 12%</span>
          </div>
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {content.length}
          </div>
          <div className="text-sm text-gray-400">Total Content</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Flag className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-red-500">↑ 5%</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {content.filter(c => c.status === 'flagged').length}
          </div>
          <div className="text-sm text-gray-400">Flagged Content</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Lock className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-yellow-500">↑ 3%</span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {content.filter(c => c.status === 'locked').length}
          </div>
          <div className="text-sm text-gray-400">Locked Threads</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-red-500">↑ 8%</span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {content.reduce((sum, c) => sum + (c.reports?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-400">Active Reports</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as Content['type'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Types</option>
            <option value="post">Posts</option>
            <option value="comment">Comments</option>
            <option value="discussion">Discussions</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Content['status'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="flagged">Flagged</option>
            <option value="removed">Removed</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">Content</th>
                <th className="text-left p-4 text-gray-400 font-medium">Author</th>
                <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Reports</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map(item => (
                <tr key={item.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div>
                      {item.title && (
                        <div className="font-medium text-neon-blue mb-1">{item.title}</div>
                      )}
                      <div className="text-sm text-gray-400 line-clamp-2">
                        {item.content}
                      </div>
                      {item.parent && (
                        <div className="text-xs text-gray-400 mt-1">
                          in: {item.parent.title}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.author.avatar}
                        alt={item.author.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div className="text-gray-300">{item.author.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'active'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : item.status === 'flagged'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        : item.status === 'removed'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.reports ? (
                      <div className="text-neon-pink">
                        {item.reports.length} reports
                      </div>
                    ) : (
                      <div className="text-gray-400">No reports</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedContent(item)}
                        className="cyber-button p-1.5"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Details Modal */}
      {selectedContent && (
        <ContentDetailsModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
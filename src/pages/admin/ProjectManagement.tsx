import React, { useState } from 'react';
import {
  Search,
  Filter,
  FolderGit2,
  Users,
  Star,
  Eye,
  Edit3,
  Trash2,
  Flag,
  Shield,
  XCircle,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Calendar,
  Clock,
  BarChart2,
  GitBranch,
  Link as LinkIcon,
  Plus,
  Upload,
  Globe
} from 'lucide-react';

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'active' | 'pending' | 'archived' | 'reported';
  createdAt: Date;
  lastUpdated: Date;
  category: string;
  tags: string[];
  members: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  stats: {
    stars: number;
    forks: number;
    issues: number;
    discussions: number;
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
  links: {
    github?: string;
    website?: string;
    documentation?: string;
  };
}

// Mock data
const mockProjects: ProjectDetails[] = [
  {
    id: '1',
    title: 'Neural Interface SDK',
    description: 'A comprehensive software development kit for building neural interface applications',
    creator: {
      id: '1',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
    },
    status: 'active',
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-03-20'),
    category: 'AI & ML',
    tags: ['Neural Networks', 'SDK', 'TypeScript'],
    members: [
      {
        id: '1',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
        role: 'Owner'
      },
      {
        id: '2',
        name: 'John Matrix',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        role: 'Developer'
      }
    ],
    stats: {
      stars: 128,
      forks: 45,
      issues: 12,
      discussions: 34
    },
    links: {
      github: 'https://github.com/example/neural-sdk',
      website: 'https://neural-sdk.dev',
      documentation: 'https://docs.neural-sdk.dev'
    }
  },
  {
    id: '2',
    title: 'Quantum Encryption Library',
    description: 'Advanced quantum encryption protocols for secure communication',
    creator: {
      id: '2',
      name: 'John Matrix',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
    },
    status: 'reported',
    createdAt: new Date('2024-02-01'),
    lastUpdated: new Date('2024-03-19'),
    category: 'Cybersecurity',
    tags: ['Quantum', 'Encryption', 'Security'],
    members: [
      {
        id: '2',
        name: 'John Matrix',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        role: 'Owner'
      }
    ],
    stats: {
      stars: 76,
      forks: 23,
      issues: 8,
      discussions: 15
    },
    reports: [
      {
        id: '1',
        reason: 'Potential security vulnerability',
        description: 'The encryption implementation might have a weakness in...',
        reportedBy: {
          name: 'Alex Murphy',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
        },
        timestamp: new Date('2024-03-19'),
        status: 'pending'
      }
    ],
    links: {
      github: 'https://github.com/example/quantum-encryption'
    }
  }
];

interface ProjectDetailsModalProps {
  project: ProjectDetails;
  onClose: () => void;
  onUpdateStatus: (projectId: string, newStatus: ProjectDetails['status']) => void;
}

interface CreateProjectModalProps {
  onClose: () => void;
  onSave: (project: Partial<ProjectDetails>) => void;
}

function CreateProjectModal({ onClose, onSave }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [documentationLink, setDocumentationLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Partial<ProjectDetails> = {
      title,
      description,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      links: {
        github: githubLink,
        website: websiteLink,
        documentation: documentationLink
      },
      status: 'pending',
      createdAt: new Date(),
      lastUpdated: new Date(),
      stats: {
        stars: 0,
        forks: 0,
        issues: 0,
        discussions: 0
      },
      members: []
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="cyber-heading text-xl">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cyber-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cyber-input w-full h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="cyber-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="cyber-input w-full"
              placeholder="e.g., React, TypeScript, Web Development"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Project Links</label>
            <div className="space-y-2">
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="GitHub Repository URL"
                  className="cyber-input w-full pl-10"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                <input
                  type="url"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  placeholder="Project Website URL"
                  className="cyber-input w-full pl-10"
                />
              </div>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                <input
                  type="url"
                  value={documentationLink}
                  onChange={(e) => setDocumentationLink(e.target.value)}
                  placeholder="Documentation URL"
                  className="cyber-input w-full pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Enter image URL"
              className="cyber-input w-full"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cyber-button bg-cyber-dark"
            >
              Cancel
            </button>
            <button type="submit" className="cyber-button">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectDetailsModal({ project, onClose, onUpdateStatus }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'members' | 'reports'>('details');

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-4xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="cyber-heading text-xl mb-1">{project.title}</h2>
            <div className="text-gray-400 text-sm">
              Created by {project.creator.name} on {project.createdAt.toLocaleDateString()}
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
            onClick={() => setActiveTab('members')}
            className={`py-2 px-4 relative ${
              activeTab === 'members' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Members
            {activeTab === 'members' && (
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
                    value={project.status}
                    onChange={(e) => onUpdateStatus(project.id, e.target.value as ProjectDetails['status'])}
                    className="cyber-input w-full"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending Review</option>
                    <option value="archived">Archived</option>
                    <option value="reported">Reported</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Description</h3>
                  <p className="text-gray-300">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Category & Tags</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Links</h3>
                  <div className="space-y-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button w-full justify-center text-sm py-1.5"
                      >
                        <GitBranch className="w-4 h-4 mr-2" />
                        GitHub Repository
                      </a>
                    )}
                    {project.links.website && (
                      <a
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button w-full justify-center text-sm py-1.5"
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Project Website
                      </a>
                    )}
                    {project.links.documentation && (
                      <a
                        href={project.links.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button w-full justify-center text-sm py-1.5"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Documentation
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Statistics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between mb-1">
                        <Star className="w-4 h-4 text-neon-blue" />
                        <span className="text-neon-blue">{project.stats.stars}</span>
                      </div>
                      <div className="text-xs text-gray-400">Stars</div>
                    </div>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between mb-1">
                        <GitBranch className="w-4 h-4 text-neon-purple" />
                        <span className="text-neon-purple">{project.stats.forks}</span>
                      </div>
                      <div className="text-xs text-gray-400">Forks</div>
                    </div>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between mb-1">
                        <AlertTriangle className="w-4 h-4 text-neon-pink" />
                        <span className="text-neon-pink">{project.stats.issues}</span>
                      </div>
                      <div className="text-xs text-gray-400">Issues</div>
                    </div>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between mb-1">
                        <MessageSquare className="w-4 h-4 text-neon-yellow" />
                        <span className="text-neon-yellow">{project.stats.discussions}</span>
                      </div>
                      <div className="text-xs text-gray-400">Discussions</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Actions</h3>
                  <div className="space-y-2">
                    <button className="cyber-button w-full justify-center text-sm py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Review Project
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Owner
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Project
                    </button>
                    <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4">
              {project.members.map(member => (
                <div key={member.id} className="cyber-card p-3 bg-cyber-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div>
                        <div className="text-neon-blue">{member.name}</div>
                        <div className="text-xs text-gray-400">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="cyber-button p-1.5">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              {project.reports ? (
                project.reports.map(report => (
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
                  No reports found for this project
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<ProjectDetails[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<ProjectDetails['status'] | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUpdateStatus = (projectId: string, newStatus: ProjectDetails['status']) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  const handleCreateProject = (projectData: Partial<ProjectDetails>) => {
    const newProject: ProjectDetails = {
      id: String(projects.length + 1),
      ...projectData as ProjectDetails,
      creator: {
        id: '1',
        name: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      },
      members: [],
      stats: {
        stars: 0,
        forks: 0,
        issues: 0,
        discussions: 0
      },
      createdAt: new Date(),
      lastUpdated: new Date(),
      status: 'pending'
    };

    setProjects(prev => [...prev, newProject]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Project Management</h1>
          <p className="text-gray-400">Monitor and moderate projects</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="cyber-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <FolderGit2 className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-green-500">↑ 12%</span>
          </div>
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {projects.length}
          </div>
          <div className="text-sm text-gray-400">Total Projects</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-green-500">↑ 8%</span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-gray-400">Active Projects</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Flag className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-red-500">↑ 5%</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {projects.filter(p => p.status === 'reported').length}
          </div>
          <div className="text-sm text-gray-400">Reported</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-green-500">↑ 15%</span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {projects.reduce((sum, p) => sum + p.members.length, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Members</div>
        </div>
      </div>

      {/* Filters */}
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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Categories</option>
            <option value="AI & ML">AI & ML</option>
            <option value="Web Development">Web Development</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Mobile Development">Mobile Development</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProjectDetails['status'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
            <option value="reported">Reported</option>
          </select>
        </div>
      </div>

      {/* Project List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">Project</th>
                <th className="text-left p-4 text-gray-400 font-medium">Creator</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Members</th>
                <th className="text-left p-4 text-gray-400 font-medium">Activity</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-neon-blue">{project.title}</div>
                      <div className="text-sm text-gray-400 line-clamp-1">
                        {project.description}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                          {project.category}
                        </span>
                        {project.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={project.creator.avatar}
                        alt={project.creator.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div className="text-gray-300">{project.creator.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : project.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        : project.status === 'archived'
                        ? 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {project.members.map(member => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          title={member.name}
                          className="w-8 h-8 rounded-full border-2 border-cyber-dark"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">
                      {project.lastUpdated.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Last updated
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
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

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateProject}
        />
      )}
    </div>
  );
}
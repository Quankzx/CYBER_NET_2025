import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MessageSquare,
  GitBranch,
  Users,
  Star,
  Edit3,
  UserPlus,
  LogOut,
  Link as LinkIcon,
  Calendar,
  Bell,
  Send,
  ThumbsUp,
  Share2,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

// Mock project data with enhanced fields
const mockProject = {
  id: '1',
  title: 'Neural Interface SDK',
  description: 'A comprehensive software development kit for building neural interface applications. Includes low-level drivers, middleware, and high-level APIs.',
  image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&h=400&fit=crop',
  progress: 65,
  createdBy: {
    id: '1',
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
  },
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
    },
    {
      id: '3',
      name: 'Alex Murphy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
      role: 'Designer'
    }
  ],
  stats: {
    stars: 128,
    forks: 45,
    issues: 12,
    contributors: 8
  },
  readme: `# Neural Interface SDK\n\n## Overview\nThis SDK provides a comprehensive set of tools for developing neural interface applications...\n\n## Features\n- Low-level hardware drivers\n- Signal processing middleware\n- High-level APIs\n- Real-time data streaming\n\n## Getting Started\n1. Install dependencies\n2. Configure hardware\n3. Run example application`,
  tags: ['Neural Networks', 'SDK', 'Hardware'],
  category: 'AI & ML',
  links: {
    github: 'https://github.com/example/neural-sdk',
    website: 'https://neural-sdk.dev'
  },
  milestones: [
    {
      title: 'Alpha Release',
      date: '2024-04-01',
      completed: true
    },
    {
      title: 'Beta Testing',
      date: '2024-06-01',
      completed: false
    },
    {
      title: 'v1.0 Release',
      date: '2024-08-01',
      completed: false
    }
  ],
  discussions: [
    {
      id: '1',
      user: {
        id: '2',
        name: 'John Matrix',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      },
      content: 'The signal processing module is looking great! I noticed some potential optimizations we could make.',
      timestamp: new Date('2024-03-20T10:30:00'),
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '1.1',
          user: {
            id: '1',
            name: 'Sarah Connor',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
          },
          content: 'Thanks John! Could you elaborate on the specific areas you think we could optimize?',
          timestamp: new Date('2024-03-20T11:15:00'),
          likes: 5,
          isLiked: false
        }
      ]
    }
  ]
};

interface EditProjectModalProps {
  project: typeof mockProject;
  onClose: () => void;
  onSave: (updates: Partial<typeof mockProject>) => void;
}

function EditProjectModal({ project, onClose, onSave }: EditProjectModalProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [progress, setProgress] = useState(project.progress);
  const [category, setCategory] = useState(project.category);
  const [tags, setTags] = useState(project.tags.join(', '));
  const [githubLink, setGithubLink] = useState(project.links.github);
  const [websiteLink, setWebsiteLink] = useState(project.links.website);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      progress,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      links: {
        github: githubLink,
        website: websiteLink
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-2xl p-6">
        <h2 className="cyber-heading text-xl mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cyber-input w-full h-24"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Progress ({progress}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">GitHub Link</label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Website Link</label>
            <input
              type="url"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="cyber-input w-full"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="cyber-button bg-cyber-dark">
              Cancel
            </button>
            <button type="submit" className="cyber-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [project, setProject] = useState(mockProject);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const isOwner = user?.id === project.createdBy.id;
  const isMember = project.members.some(member => member.id === user?.id);

  const handleProgressChange = (newProgress: number) => {
    if (isOwner) {
      setProject(prev => ({ ...prev, progress: newProgress }));
    }
  };

  const handleProjectUpdate = (updates: Partial<typeof mockProject>) => {
    setProject(prev => ({ ...prev, ...updates }));
  };

  const toggleCommentExpansion = (commentId: string) => {
    setExpandedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleJoinProject = () => {
    if (!isAuthenticated) return;
    // Add user to project members
    setProject(prev => ({
      ...prev,
      members: [...prev.members, {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar,
        role: 'Member'
      }]
    }));
  };

  const handleLeaveProject = () => {
    if (!isAuthenticated || isOwner) return;
    // Remove user from project members
    setProject(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== user!.id)
    }));
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invitation logic here
    setShowInviteModal(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="relative h-64 rounded-2xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent">
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="cyber-heading text-3xl md:text-4xl mb-2">
                  {project.title}
                </h1>
                <p className="text-gray-300 max-w-2xl">
                  {project.description}
                </p>
              </div>
              {isOwner && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="cyber-button"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          {/* Progress Bar */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="cyber-heading text-lg">Project Progress</h2>
              <span className="text-neon-blue">{project.progress}%</span>
            </div>
            {isOwner ? (
              <input
                type="range"
                min="0"
                max="100"
                value={project.progress}
                onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                className="w-full"
              />
            ) : (
              <div className="w-full h-2 bg-cyber-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-neon-blue transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cyber-card p-4 flex items-center space-x-3">
              <Star className="w-5 h-5 text-neon-blue" />
              <div>
                <div className="text-2xl font-bold text-neon-blue">
                  {project.stats.stars}
                </div>
                <div className="text-sm text-gray-400">Stars</div>
              </div>
            </div>
            <div className="cyber-card p-4 flex items-center space-x-3">
              <GitBranch className="w-5 h-5 text-neon-pink" />
              <div>
                <div className="text-2xl font-bold text-neon-pink">
                  {project.stats.forks}
                </div>
                <div className="text-sm text-gray-400">Forks</div>
              </div>
            </div>
            <div className="cyber-card p-4 flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-neon-purple" />
              <div>
                <div className="text-2xl font-bold text-neon-purple">
                  {project.stats.issues}
                </div>
                <div className="text-sm text-gray-400">Issues</div>
              </div>
            </div>
            <div className="cyber-card p-4 flex items-center space-x-3">
              <Users className="w-5 h-5 text-neon-yellow" />
              <div>
                <div className="text-2xl font-bold text-neon-yellow">
                  {project.stats.contributors}
                </div>
                <div className="text-sm text-gray-400">Contributors</div>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="cyber-card p-6">
            <h2 className="cyber-heading text-xl mb-4">README.md</h2>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {project.readme}
              </pre>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Project Actions */}
          <div className="cyber-card p-4">
            {!isMember ? (
              <button
                onClick={handleJoinProject}
                disabled={!isAuthenticated}
                className="cyber-button w-full justify-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Project
              </button>
            ) : !isOwner && (
              <button
                onClick={handleLeaveProject}
                className="cyber-button w-full justify-center bg-cyber-dark text-neon-pink border-neon-pink"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave Project
              </button>
            )}
          </div>

          {/* Project Links */}
          <div className="cyber-card p-4">
            <h3 className="cyber-heading text-lg mb-3">Links</h3>
            <div className="space-y-2">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button w-full justify-center text-sm py-1.5"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                GitHub Repository
              </a>
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button w-full justify-center text-sm py-1.5"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Project Website
              </a>
            </div>
          </div>

          {/* Project Members */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="cyber-heading text-lg">Members</h3>
              {isOwner && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="cyber-button py-1 px-2 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              {project.members.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border border-neon-blue"
                    />
                    <div>
                      <div className="text-sm text-neon-blue">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Tags & Category */}
          <div className="cyber-card p-4">
            <h3 className="cyber-heading text-lg mb-3">Tags & Category</h3>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-400">Category:</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
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
          </div>

          {/* Project Milestones */}
          <div className="cyber-card p-4">
            <h3 className="cyber-heading text-lg mb-3">Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 ${
                    milestone.completed ? 'text-neon-blue' : 'text-gray-400'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="text-sm">{milestone.title}</div>
                    <div className="text-xs">{milestone.date}</div>
                  </div>
                  {milestone.completed && (
                    <div className="w-2 h-2 rounded-full bg-neon-blue" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discussions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="cyber-heading text-xl flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-neon-blue" />
            Discussions
          </h2>
          <div className="flex items-center space-x-2">
            <button className="cyber-button py-1.5 px-3">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* New Discussion Form */}
        {isMember && (
          <form className="cyber-card p-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Start a new discussion..."
              className="cyber-input w-full h-24 mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="cyber-button"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Discussion
              </button>
            </div>
          </form>
        )}

        {/* Discussion Threads */}
        <div className="space-y-4">
          {project.discussions.map(discussion => (
            <div key={discussion.id} className="cyber-card p-4">
              {/* Main Comment */}
              <div className="flex items-start gap-3">
                <img
                  src={discussion.user.avatar}
                  alt={discussion.user.name}
                  className="w-8 h-8 rounded-full border border-neon-blue"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-neon-blue">
                        {discussion.user.name}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {discussion.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className={`cyber-button py-1 px-2 text-sm ${
                          discussion.isLiked ? 'text-neon-pink' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {discussion.likes}
                      </button>
                      <button className="cyber-button py-1 px-2 text-sm">
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2">{discussion.content}</p>

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleCommentExpansion(discussion.id)}
                        className="text-sm text-neon-blue flex items-center"
                      >
                        {expandedComments.includes(discussion.id) ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            Hide Replies
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            Show Replies ({discussion.replies.length})
                          </>
                        )}
                      </button>

                      {expandedComments.includes(discussion.id) && (
                        <div className="mt-4 space-y-4 pl-8 border-l border-neon-blue/20">
                          {discussion.replies.map(reply => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <img
                                src={reply.user.avatar}
                                alt={reply.user.name}
                                className="w-6 h-6 rounded-full border border-neon-blue"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium text-neon-blue">
                                      {reply.user.name}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2">
                                      {reply.timestamp.toLocaleString()}
                                    </span>
                                  </div>
                                  <button
                                    className={`cyber-button py-1 px-2 text-sm ${
                                      reply.isLiked ? 'text-neon-pink' : 'text-gray-400'
                                    }`}
                                  >
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    {reply.likes}
                                  </button>
                                </div>
                                <p className="text-gray-300 mt-2">{reply.content}</p>
                              </div>
                            </div>
                          ))}

                          {/* Reply Form */}
                          {isMember && (
                            <form className="mt-4">
                              <div className="flex gap-3">
                                <input
                                  type="text"
                                  placeholder="Write a reply..."
                                  className="cyber-input flex-1 text-sm py-1.5"
                                />
                                <button type="submit" className="cyber-button py-1.5 px-3">
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Project Modal */}
      {showEditModal && (
        <EditProjectModal
          project={project}
          onClose={() => setShowEditModal(false)}
          onSave={handleProjectUpdate}
        />
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
          <div className="cyber-card w-full max-w-md p-6">
            <h2 className="cyber-heading text-xl mb-4">Invite Member</h2>
            <form onSubmit={handleInviteMember}>
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="cyber-input w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="cyber-button bg-cyber-dark"
                >
                  Cancel
                </button>
                <button type="submit" className="cyber-button">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
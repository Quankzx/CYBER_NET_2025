import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Users,
  AlertTriangle,
  Ban,
  Eye,
  Trash2,
  Flag,
  Shield,
  XCircle,
  BarChart2,
  MessageCircle,
  UserX,
  Clock
} from 'lucide-react';

interface ChatThread {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: {
    content: string;
    timestamp: Date;
    sender: string;
  };
  status: 'active' | 'reported' | 'blocked';
  messageCount: number;
  reports?: {
    reason: string;
    reportedBy: string;
    timestamp: Date;
  }[];
}

// Mock data
const mockThreads: ChatThread[] = [
  {
    id: '1',
    participants: [
      {
        id: '1',
        name: 'John Matrix',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      },
      {
        id: '2',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
      }
    ],
    lastMessage: {
      content: 'Thanks for the help with the project!',
      timestamp: new Date('2024-03-20T10:30:00'),
      sender: '1'
    },
    status: 'active',
    messageCount: 24
  },
  {
    id: '2',
    participants: [
      {
        id: '3',
        name: 'Alex Murphy',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
      },
      {
        id: '4',
        name: 'Ellen Ripley',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
      }
    ],
    lastMessage: {
      content: 'This message contains inappropriate content',
      timestamp: new Date('2024-03-19T15:45:00'),
      sender: '3'
    },
    status: 'reported',
    messageCount: 12,
    reports: [
      {
        reason: 'Inappropriate content',
        reportedBy: 'Ellen Ripley',
        timestamp: new Date('2024-03-19T15:46:00')
      }
    ]
  }
];

interface ThreadDetailsModalProps {
  thread: ChatThread;
  onClose: () => void;
  onUpdateStatus: (threadId: string, newStatus: ChatThread['status']) => void;
}

function ThreadDetailsModal({ thread, onClose, onUpdateStatus }: ThreadDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="cyber-heading text-xl">Chat Thread Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thread Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Status</h3>
              <select
                value={thread.status}
                onChange={(e) => onUpdateStatus(thread.id, e.target.value as ChatThread['status'])}
                className="cyber-input w-full"
              >
                <option value="active">Active</option>
                <option value="reported">Reported</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-1">Participants</h3>
              <div className="space-y-2">
                {thread.participants.map(participant => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-2 cyber-card bg-cyber-primary/30 p-3"
                  >
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-8 h-8 rounded-full border border-neon-blue"
                    />
                    <div>
                      <div className="text-neon-blue">{participant.name}</div>
                      <div className="text-xs text-gray-400">ID: {participant.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-1">Thread Stats</h3>
              <div className="cyber-card bg-cyber-primary/30 p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Messages</span>
                  <span className="text-neon-blue">{thread.messageCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Activity</span>
                  <span className="text-neon-blue">
                    {thread.lastMessage.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reports & Actions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Reports</h3>
              {thread.reports && thread.reports.length > 0 ? (
                <div className="space-y-2">
                  {thread.reports.map((report, index) => (
                    <div key={index} className="cyber-card bg-cyber-primary/30 p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-neon-pink flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-neon-pink">{report.reason}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Reported by: {report.reportedBy}
                          </div>
                          <div className="text-xs text-gray-400">
                            {report.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cyber-card bg-cyber-primary/30 p-3 text-gray-400 text-sm">
                  No reports found
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-1">Actions</h3>
              <div className="space-y-2">
                <button className="cyber-button w-full justify-center text-sm py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Review Messages
                </button>
                <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                  <Ban className="w-4 h-4 mr-2" />
                  Block Thread
                </button>
                <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Thread
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="cyber-button bg-cyber-dark">
            Close
          </button>
          <button className="cyber-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagingManagement() {
  const [threads, setThreads] = useState<ChatThread[]>(mockThreads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ChatThread['status'] | 'all'>('all');
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.participants.some(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || thread.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || thread.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (threadId: string, newStatus: ChatThread['status']) => {
    setThreads(prev => prev.map(thread =>
      thread.id === threadId ? { ...thread, status: newStatus } : thread
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Messaging Management</h1>
          <p className="text-gray-400">Monitor and moderate chat conversations</p>
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
            {threads.length}
          </div>
          <div className="text-sm text-gray-400">Active Threads</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-red-500">↑ 5%</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {threads.filter(t => t.status === 'reported').length}
          </div>
          <div className="text-sm text-gray-400">Reported Threads</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-green-500">↑ 8%</span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {threads.reduce((sum, t) => sum + t.messageCount, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Messages</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-green-500">↑ 15%</span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {new Set(threads.flatMap(t => t.participants.map(p => p.id))).size}
          </div>
          <div className="text-sm text-gray-400">Active Users</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ChatThread['status'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reported">Reported</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Thread List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">Participants</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Message</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Messages</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Activity</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreads.map(thread => (
                <tr key={thread.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {thread.participants.map(participant => (
                        <img
                          key={participant.id}
                          src={participant.avatar}
                          alt={participant.name}
                          title={participant.name}
                          className="w-8 h-8 rounded-full border-2 border-cyber-dark"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-300 line-clamp-1">
                      {thread.lastMessage.content}
                    </div>
                    <div className="text-xs text-gray-400">
                      by {thread.participants.find(p => p.id === thread.lastMessage.sender)?.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      thread.status === 'active'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : thread.status === 'reported'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {thread.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">{thread.messageCount}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">
                      {thread.lastMessage.timestamp.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {thread.lastMessage.timestamp.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedThread(thread)}
                        className="cyber-button p-1.5"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Ban className="w-4 h-4" />
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

      {/* Thread Details Modal */}
      {selectedThread && (
        <ThreadDetailsModal
          thread={selectedThread}
          onClose={() => setSelectedThread(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
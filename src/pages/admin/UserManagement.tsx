import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Shield,
  Ban,
  Trash2,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  MapPin,
  Mail,
  Calendar,
  Lock,
  Unlock,
  Flag,
  History,
  BarChart2,
  UserCheck,
  UserX,
  FileCheck
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'mod' | 'admin';
  status: 'active' | 'banned' | 'pending';
  joinedAt: Date;
  location: string;
  skills: string[];
  verified: boolean;
  verificationDetails?: {
    idCard: boolean;
    linkedin: boolean;
    documents: {
      name: string;
      status: 'pending' | 'approved' | 'rejected';
      submittedAt: Date;
    }[];
  };
  stats: {
    projects: number;
    discussions: number;
    connections: number;
  };
  activityLog: {
    type: 'login' | 'project' | 'discussion' | 'report';
    description: string;
    timestamp: Date;
  }[];
}

// Mock data
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    role: 'admin',
    status: 'active',
    joinedAt: new Date('2024-01-01'),
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js'],
    verified: true,
    verificationDetails: {
      idCard: true,
      linkedin: true,
      documents: [
        {
          name: 'ID Verification',
          status: 'approved',
          submittedAt: new Date('2024-01-02')
        }
      ]
    },
    stats: {
      projects: 12,
      discussions: 45,
      connections: 89
    },
    activityLog: [
      {
        type: 'login',
        description: 'Logged in from new device',
        timestamp: new Date('2024-03-20T10:30:00')
      }
    ]
  },
  {
    id: '2',
    name: 'John Matrix',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    role: 'mod',
    status: 'active',
    joinedAt: new Date('2024-01-15'),
    location: 'New York, NY',
    skills: ['Python', 'Machine Learning'],
    verified: true,
    verificationDetails: {
      idCard: true,
      linkedin: true,
      documents: [
        {
          name: 'ID Verification',
          status: 'approved',
          submittedAt: new Date('2024-01-16')
        }
      ]
    },
    stats: {
      projects: 5,
      discussions: 23,
      connections: 45
    },
    activityLog: [
      {
        type: 'project',
        description: 'Created new project: AI Image Generator',
        timestamp: new Date('2024-03-19T15:45:00')
      }
    ]
  },
  {
    id: '3',
    name: 'Alex Murphy',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    role: 'user',
    status: 'pending',
    joinedAt: new Date('2024-03-01'),
    location: 'London, UK',
    skills: ['Java', 'Spring Boot'],
    verified: false,
    verificationDetails: {
      idCard: false,
      linkedin: true,
      documents: [
        {
          name: 'ID Verification',
          status: 'pending',
          submittedAt: new Date('2024-03-02')
        }
      ]
    },
    stats: {
      projects: 2,
      discussions: 8,
      connections: 12
    },
    activityLog: [
      {
        type: 'discussion',
        description: 'Posted in: JavaScript Best Practices',
        timestamp: new Date('2024-03-18T09:30:00')
      }
    ]
  }
];

interface UserDetailsModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateStatus: (userId: string, status: UserProfile['status']) => void;
  onUpdateRole: (userId: string, role: UserProfile['role']) => void;
}

function UserDetailsModal({ user, onClose, onUpdateStatus, onUpdateRole }: UserDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'verification' | 'activity'>('profile');

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-4xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border border-neon-blue"
            />
            <div>
              <h2 className="cyber-heading text-xl flex items-center gap-2">
                {user.name}
                {user.verified && (
                  <CheckCircle className="w-4 h-4 text-neon-blue" />
                )}
              </h2>
              <div className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-neon-blue/20">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 relative ${
              activeTab === 'profile' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Profile
            {activeTab === 'profile' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`py-2 px-4 relative ${
              activeTab === 'verification' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Verification
            {activeTab === 'verification' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2 px-4 relative ${
              activeTab === 'activity' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Activity Log
            {activeTab === 'activity' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && (
            <>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                    <select
                      value={user.status}
                      onChange={(e) => onUpdateStatus(user.id, e.target.value as UserProfile['status'])}
                      className="cyber-input w-full"
                    >
                      <option value="active">Active</option>
                      <option value="banned">Banned</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Role</h3>
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user.id, e.target.value as UserProfile['role'])}
                      className="cyber-input w-full"
                    >
                      <option value="user">User</option>
                      <option value="mod">Moderator</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Location</h3>
                    <div className="flex items-center gap-2 text-neon-blue">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Joined</h3>
                    <div className="flex items-center gap-2 text-neon-blue">
                      <Calendar className="w-4 h-4" />
                      {user.joinedAt.toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Statistics</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="cyber-card p-3 bg-cyber-primary/30">
                        <div className="text-xl font-bold text-neon-blue">
                          {user.stats.projects}
                        </div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      <div className="cyber-card p-3 bg-cyber-primary/30">
                        <div className="text-xl font-bold text-neon-purple">
                          {user.stats.discussions}
                        </div>
                        <div className="text-xs text-gray-400">Discussions</div>
                      </div>
                      <div className="cyber-card p-3 bg-cyber-primary/30">
                        <div className="text-xl font-bold text-neon-pink">
                          {user.stats.connections}
                        </div>
                        <div className="text-xs text-gray-400">Connections</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Actions</h3>
                    <div className="space-y-2">
                      <button className="cyber-button w-full justify-center text-sm py-2">
                        <Lock className="w-4 h-4 mr-2" />
                        Reset Password
                      </button>
                      <button className="cyber-button w-full justify-center text-sm py-2">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Warning
                      </button>
                      <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Ban className="w-4 h-4 mr-2" />
                        Ban User
                      </button>
                      <button className="cyber-button w-full justify-center text-sm py-2 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-3">Identity Verification</h3>
                  <div className="space-y-3">
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-neon-blue" />
                          <span className="text-gray-300">ID Card</span>
                        </div>
                        {user.verificationDetails?.idCard ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="cyber-card p-3 bg-cyber-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-neon-purple" />
                          <span className="text-gray-300">LinkedIn Profile</span>
                        </div>
                        {user.verificationDetails?.linkedin ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-3">Document History</h3>
                  <div className="space-y-3">
                    {user.verificationDetails?.documents.map((doc, index) => (
                      <div key={index} className="cyber-card p-3 bg-cyber-primary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neon-blue">{doc.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            doc.status === 'approved'
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : doc.status === 'rejected'
                              ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Submitted: {doc.submittedAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 mb-3">Verification Actions</h3>
                <div className="flex gap-2">
                  <button className="cyber-button py-1.5 px-3">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve All
                  </button>
                  <button className="cyber-button py-1.5 px-3 bg-cyber-dark text-neon-pink border-neon-pink">
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject All
                  </button>
                  <button className="cyber-button py-1.5 px-3">
                    <Mail className="w-4 h-4 mr-1" />
                    Request More Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              {user.activityLog.map((activity, index) => (
                <div key={index} className="cyber-card p-3 bg-cyber-primary/30">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'login'
                        ? 'bg-neon-blue/10'
                        : activity.type === 'project'
                        ? 'bg-neon-purple/10'
                        : activity.type === 'discussion'
                        ? 'bg-neon-pink/10'
                        : 'bg-neon-yellow/10'
                    }`}>
                      {activity.type === 'login' && <Lock className="w-4 h-4 text-neon-blue" />}
                      {activity.type === 'project' && <Eye className="w-4 h-4 text-neon-purple" />}
                      {activity.type === 'discussion' && <MessageSquare className="w-4 h-4 text-neon-pink" />}
                      {activity.type === 'report' && <Flag className="w-4 h-4 text-neon-yellow" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-gray-300">{activity.description}</p>
                        <span className="text-xs text-gray-400">
                          {activity.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserProfile['role'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserProfile['status'] | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateStatus = (userId: string, newStatus: UserProfile['status']) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleUpdateRole = (userId: string, newRole: UserProfile['role']) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">User Management</h1>
          <p className="text-gray-400">Manage and monitor user accounts</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <User className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-green-500">↑ 12%</span>
          </div>
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {users.length}
          </div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-green-500">↑ 8%</span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {users.filter(u => u.verified).length}
          </div>
          <div className="text-sm text-gray-400">Verified Users</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-green-500">↑ 5%</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {users.filter(u => u.role === 'mod' || u.role === 'admin').length}
          </div>
          <div className="text-sm text-gray-400">Moderators</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <UserX className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-red-500">↑ 2%</span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {users.filter(u => u.status === 'banned').length}
          </div>
          <div className="text-sm text-gray-400">Banned Users</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserProfile['role'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="mod">Moderators</option>
            <option value="admin">Administrators</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserProfile['status'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* User List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">User</th>
                <th className="text-left p-4 text-gray-400 font-medium">Role</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Location</th>
                <th className="text-left p-4 text-gray-400 font-medium">Joined</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div>
                        <div className="font-medium text-neon-blue flex items-center gap-1">
                          {user.name}
                          {user.verified && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                        : user.role === 'mod'
                        ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
                        : 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : user.status === 'banned'
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-400">
                      {user.joinedAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="cyber-button p-1.5"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5 bg-cyber-dark text-neon-pink border-neon-pink">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateRole={handleUpdateRole}
        />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PrivacySettingsModal from '../components/PrivacySettingsModal';
import {
  MapPin,
  Mail,
  Link as LinkIcon,
  Github,
  Linkedin,
  Globe,
  Edit2,
  Plus,
  Star,
  Users,
  FolderGit2,
  MessageSquare,
  Check,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Activity,
  Bell,
  Calendar,
  Clock,
  BarChart2,
  Award,
  Zap,
  Target
} from 'lucide-react';

// Types for dashboard data
interface DashboardStats {
  projectsCount: number;
  activeProjects: number;
  completedProjects: number;
  discussionsCount: number;
  contributionsCount: number;
  connectionsCount: number;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'discussion' | 'connection' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  link?: string;
}

interface ProjectOverview {
  id: string;
  name: string;
  role: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  lastActivity: Date;
  team: {
    name: string;
    avatar: string;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt: Date;
  progress?: {
    current: number;
    total: number;
  };
}

// Mock data
const mockDashboardStats: DashboardStats = {
  projectsCount: 12,
  activeProjects: 5,
  completedProjects: 7,
  discussionsCount: 156,
  contributionsCount: 342,
  connectionsCount: 89
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'project',
    title: 'Neural Interface SDK',
    description: 'Added new feature for real-time data processing',
    timestamp: new Date('2024-03-20T10:30:00'),
    link: '/projects/1'
  },
  {
    id: '2',
    type: 'discussion',
    title: 'AI Ethics Discussion',
    description: 'Started a new discussion about AI ethics',
    timestamp: new Date('2024-03-19T15:45:00'),
    link: '/forum/1'
  },
  {
    id: '3',
    type: 'connection',
    title: 'New Connection',
    description: 'Connected with Alice Johnson',
    timestamp: new Date('2024-03-18T09:15:00')
  }
];

const mockProjects: ProjectOverview[] = [
  {
    id: '1',
    name: 'Neural Interface SDK',
    role: 'Lead Developer',
    progress: 65,
    status: 'active',
    lastActivity: new Date('2024-03-20T10:30:00'),
    team: [
      {
        name: 'Alice Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
      },
      {
        name: 'Bob Smith',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Quantum Encryption',
    role: 'Developer',
    progress: 30,
    status: 'active',
    lastActivity: new Date('2024-03-19T14:20:00'),
    team: [
      {
        name: 'Charlie Brown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
      }
    ]
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Project Master',
    description: 'Completed 10 projects',
    icon: <Award className="w-8 h-8 text-neon-blue" />,
    earnedAt: new Date('2024-03-15'),
    progress: {
      current: 7,
      total: 10
    }
  },
  {
    id: '2',
    title: 'Community Leader',
    description: 'Started 5 active discussions',
    icon: <Zap className="w-8 h-8 text-neon-purple" />,
    earnedAt: new Date('2024-03-10'),
    progress: {
      current: 3,
      total: 5
    }
  },
  {
    id: '3',
    title: 'Network Builder',
    description: 'Connected with 50 professionals',
    icon: <Target className="w-8 h-8 text-neon-pink" />,
    earnedAt: new Date('2024-03-05'),
    progress: {
      current: 89,
      total: 50
    }
  }
];

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'discussions' | 'achievements'>('overview');
  const [dashboardStats] = useState<DashboardStats>(mockDashboardStats);
  const [recentActivity] = useState<RecentActivity[]>(mockRecentActivity);
  const [projects] = useState<ProjectOverview[]>(mockProjects);
  const [achievements] = useState<Achievement[]>(mockAchievements);

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="cyber-card p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-blue/10">
                  <FolderGit2 className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-blue">
                    {dashboardStats.activeProjects}
                  </div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                </div>
              </div>
              <div className="cyber-card p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-purple/10">
                  <Check className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-purple">
                    {dashboardStats.completedProjects}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
              </div>
              <div className="cyber-card p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-pink/10">
                  <Activity className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-pink">
                    {dashboardStats.contributionsCount}
                  </div>
                  <div className="text-sm text-gray-400">Contributions</div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <h3 className="cyber-heading text-xl mb-4">Project Timeline</h3>
              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.id} className="cyber-card p-4 bg-cyber-primary/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-medium text-neon-blue">
                          {project.name}
                        </h4>
                        <div className="text-sm text-gray-400">
                          {project.role}
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <img
                            key={index}
                            src={member.avatar}
                            alt={member.name}
                            title={member.name}
                            className="w-8 h-8 rounded-full border-2 border-cyber-dark"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-neon-blue">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-blue transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Last activity: {project.lastActivity.toLocaleDateString()}</span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          project.status === 'active'
                            ? 'bg-neon-blue/10 text-neon-blue'
                            : project.status === 'completed'
                            ? 'bg-neon-purple/10 text-neon-purple'
                            : 'bg-neon-yellow/10 text-neon-yellow'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'discussions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="cyber-card p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-blue/10">
                  <MessageSquare className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-blue">
                    {dashboardStats.discussionsCount}
                  </div>
                  <div className="text-sm text-gray-400">Total Discussions</div>
                </div>
              </div>
              <div className="cyber-card p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-purple/10">
                  <Users className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-purple">
                    {dashboardStats.connectionsCount}
                  </div>
                  <div className="text-sm text-gray-400">Connections</div>
                </div>
              </div>
            </div>

            {/* Discussion activity will go here */}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <div key={achievement.id} className="cyber-card p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-cyber-primary/30">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neon-blue mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        {achievement.description}
                      </p>
                      {achievement.progress && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-neon-blue">
                              {achievement.progress.current} / {achievement.progress.total}
                            </span>
                          </div>
                          <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-blue transition-all duration-300"
                              style={{
                                width: `${(achievement.progress.current / achievement.progress.total) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-2">
                        Earned: {achievement.earnedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default: // Overview
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="cyber-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-neon-blue">Projects</h3>
                  <BarChart2 className="w-5 h-5 text-neon-blue" />
                </div>
                <div className="text-3xl font-bold text-neon-blue mb-1">
                  {dashboardStats.projectsCount}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Active</span>
                  <span className="text-neon-blue">{dashboardStats.activeProjects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-neon-purple">{dashboardStats.completedProjects}</span>
                </div>
              </div>

              <div className="cyber-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-neon-pink">Activity</h3>
                  <Activity className="w-5 h-5 text-neon-pink" />
                </div>
                <div className="text-3xl font-bold text-neon-pink mb-1">
                  {dashboardStats.contributionsCount}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Discussions</span>
                  <span className="text-neon-pink">{dashboardStats.discussionsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Connections</span>
                  <span className="text-neon-yellow">{dashboardStats.connectionsCount}</span>
                </div>
              </div>

              <div className="cyber-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-neon-purple">Time</h3>
                  <Clock className="w-5 h-5 text-neon-purple" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last Active</span>
                    <span className="text-neon-purple">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-neon-purple">March 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cyber-card p-6">
              <h3 className="cyber-heading text-xl mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 cyber-card bg-cyber-primary/30"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'project'
                        ? 'bg-neon-blue/10'
                        : activity.type === 'discussion'
                        ? 'bg-neon-pink/10'
                        : 'bg-neon-purple/10'
                    }`}>
                      {activity.type === 'project' ? (
                        <FolderGit2 className="w-5 h-5 text-neon-blue" />
                      ) : activity.type === 'discussion' ? (
                        <MessageSquare className="w-5 h-5 text-neon-pink" />
                      ) : (
                        <Users className="w-5 h-5 text-neon-purple" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-neon-blue">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {activity.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Projects Preview */}
            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="cyber-heading text-xl">Active Projects</h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="cyber-button py-1.5 px-3"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {projects.slice(0, 2).map(project => (
                  <div key={project.id} className="cyber-card p-4 bg-cyber-primary/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-medium text-neon-blue">
                          {project.name}
                        </h4>
                        <div className="text-sm text-gray-400">
                          {project.role}
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <img
                            key={index}
                            src={member.avatar}
                            alt={member.name}
                            title={member.name}
                            className="w-8 h-8 rounded-full border-2 border-cyber-dark"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-neon-blue">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-blue transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="cyber-card p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-2 border-neon-blue"
            />
            <div>
              <h1 className="cyber-heading text-2xl mb-1">{user?.name}</h1>
              <div className="text-gray-400">Senior Software Engineer</div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                San Francisco, CA
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="cyber-button py-1.5 px-3">
              <Edit2 className="w-4 h-4 mr-1" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a href="#" className="cyber-button py-1.5 px-3">
            <Mail className="w-4 h-4" />
          </a>
          <a href="#" className="cyber-button py-1.5 px-3">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="cyber-button py-1.5 px-3">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="cyber-button py-1.5 px-3">
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="border-b border-neon-blue/20">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 relative ${
              activeTab === 'overview' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-4 relative ${
              activeTab === 'projects' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Projects
            {activeTab === 'projects' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-2 px-4 relative ${
              activeTab === 'discussions' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Discussions
            {activeTab === 'discussions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-2 px-4 relative ${
              activeTab === 'achievements' ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            Achievements
            {activeTab === 'achievements' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue" />
            )}
          </button>
        </nav>
      </div>

      {/* Dashboard Content */}
      {renderDashboardContent()}
    </div>
  );
}
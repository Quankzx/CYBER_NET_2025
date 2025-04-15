import React, { useState } from 'react';
import { Users, FolderGit2, MessageSquare, Bell, BookOpen, BarChart2, Settings, DollarSign, Search, Filter, Download, Calendar, ArrowUp, ArrowDown, Globe, Smartphone, LampDesk as Desktop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Mock data for charts
const userActivityData = [
  { name: 'Jan', active: 4000, new: 2400 },
  { name: 'Feb', active: 3000, new: 1398 },
  { name: 'Mar', active: 2000, new: 9800 },
  { name: 'Apr', active: 2780, new: 3908 },
  { name: 'May', active: 1890, new: 4800 },
  { name: 'Jun', active: 2390, new: 3800 },
];

const projectStatusData = [
  { name: 'Active', value: 400 },
  { name: 'Completed', value: 300 },
  { name: 'On Hold', value: 200 },
  { name: 'Cancelled', value: 100 },
];

const contentEngagementData = [
  { name: 'Mon', posts: 20, comments: 40, likes: 60 },
  { name: 'Tue', posts: 30, comments: 45, likes: 80 },
  { name: 'Wed', posts: 25, comments: 55, likes: 70 },
  { name: 'Thu', posts: 40, comments: 60, likes: 90 },
  { name: 'Fri', posts: 35, comments: 50, likes: 85 },
];

const courseProgressData = [
  { name: 'Week 1', students: 400, completion: 80 },
  { name: 'Week 2', students: 350, completion: 75 },
  { name: 'Week 3', students: 300, completion: 70 },
  { name: 'Week 4', students: 280, completion: 65 },
];

// Analytics data
const analyticsData = {
  totalUsers: 12543,
  totalProjects: 892,
  totalPosts: 2341,
  totalCourses: 156,
  growth: {
    users: 12.5,
    projects: 8.3,
    posts: 15.2,
    courses: 5.7
  },
  dailyActiveUsers: 2345,
  monthlyActiveUsers: 8765,
  deviceStats: {
    desktop: 65,
    mobile: 30,
    tablet: 5
  },
  countryStats: [
    { country: 'United States', users: 4521 },
    { country: 'India', users: 2341 },
    { country: 'United Kingdom', users: 1234 },
    { country: 'Germany', users: 987 },
    { country: 'Canada', users: 876 }
  ],
  recentActivities: [
    {
      type: 'user',
      action: 'New user registered',
      details: 'John Doe joined the platform',
      timestamp: new Date('2024-03-20T10:30:00')
    },
    {
      type: 'project',
      action: 'New project created',
      details: 'AI Image Generator Project',
      timestamp: new Date('2024-03-20T09:45:00')
    },
    {
      type: 'report',
      action: 'Content reported',
      details: 'Spam content in Forum post #123',
      timestamp: new Date('2024-03-20T09:30:00')
    }
  ]
};

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Admin Dashboard</h1>
          <p className="text-gray-400">Overview and analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="cyber-input text-sm py-1.5"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="cyber-button py-1.5 px-3">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-neon-blue" />
            <span className={`text-sm ${analyticsData.growth.users > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {analyticsData.growth.users > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(analyticsData.growth.users)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {analyticsData.totalUsers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <FolderGit2 className="w-5 h-5 text-neon-purple" />
            <span className={`text-sm ${analyticsData.growth.projects > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {analyticsData.growth.projects > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(analyticsData.growth.projects)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {analyticsData.totalProjects.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Projects</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-5 h-5 text-neon-pink" />
            <span className={`text-sm ${analyticsData.growth.posts > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {analyticsData.growth.posts > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(analyticsData.growth.posts)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {analyticsData.totalPosts.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Posts</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 text-neon-yellow" />
            <span className={`text-sm ${analyticsData.growth.courses > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {analyticsData.growth.courses > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(analyticsData.growth.courses)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {analyticsData.totalCourses.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Courses</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="cyber-card p-4">
          <h2 className="cyber-heading text-lg mb-4">User Activity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b2b3d" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a23',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#0ff" strokeWidth={2} />
                <Line type="monotone" dataKey="new" stroke="#ff2d55" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="cyber-card p-4">
          <h2 className="cyber-heading text-lg mb-4">Project Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#0ff"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0ff', '#ff2d55', '#b026ff', '#ffed4a'][index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a23',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Engagement Chart */}
        <div className="cyber-card p-4">
          <h2 className="cyber-heading text-lg mb-4">Content Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b2b3d" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a23',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="posts" fill="#0ff" />
                <Bar dataKey="comments" fill="#ff2d55" />
                <Bar dataKey="likes" fill="#b026ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Progress Chart */}
        <div className="cyber-card p-4">
          <h2 className="cyber-heading text-lg mb-4">Course Progress</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b2b3d" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a23',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="students" stroke="#0ff" fill="#0ff" fillOpacity={0.2} />
                <Area type="monotone" dataKey="completion" stroke="#ff2d55" fill="#ff2d55" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="cyber-card p-4">
        <h2 className="cyber-heading text-lg mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {analyticsData.recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-3 cyber-card bg-cyber-primary/30">
              <div className={`p-2 rounded-lg ${
                activity.type === 'user'
                  ? 'bg-neon-blue/10'
                  : activity.type === 'project'
                  ? 'bg-neon-purple/10'
                  : 'bg-neon-pink/10'
              }`}>
                {activity.type === 'user' ? (
                  <Users className="w-4 h-4 text-neon-blue" />
                ) : activity.type === 'project' ? (
                  <FolderGit2 className="w-4 h-4 text-neon-purple" />
                ) : (
                  <Bell className="w-4 h-4 text-neon-pink" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-neon-blue">
                      {activity.action}
                    </div>
                    <p className="text-sm text-gray-400">
                      {activity.details}
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
    </div>
  );
}
export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: 'user' | 'mod' | 'admin';
  privacy?: {
    projects: PrivacySettings;
    discussions: PrivacySettings;
    followers: PrivacySettings;
    following: PrivacySettings;
  };
  skills?: string[];
  interests?: string[];
  connections?: string[];
  blockedUsers?: string[];
}

export interface PrivacySettings {
  visibility: 'public' | 'private' | 'friends' | 'custom';
  allowedUsers?: string[];
  blockedUsers?: string[];
  messageSettings?: {
    allowDirectMessages: boolean;
    onlyFromConnections: boolean;
  };
}

interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  read: boolean;
  likes?: string[];
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

export interface ChatBox {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  category: string;
  tags: string[];
  messages: Message[];
  views: number;
  replies: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  progress: number;
  createdBy: string;
  members: string[];
  discussions: Discussion[];
  createdAt: Date;
  image: string;
}

interface Discussion {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  replies: Discussion[];
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: Date;
  status: {
    typing?: string[];
    online: string[];
  };
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'follow' | 'like' | 'comment' | 'connection_request';
  content: string;
  fromUser: User;
  read: boolean;
  timestamp: Date;
  link?: string;
}

interface ConnectionSuggestion {
  userId: string;
  matchScore: number;
  matchReasons: {
    type: 'skill' | 'interest' | 'project' | 'mutual_connection';
    description: string;
  }[];
}
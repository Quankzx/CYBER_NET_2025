import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PrivacySettings, Chat, Notification } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updatePrivacySettings: (section: keyof User['privacy'], settings: PrivacySettings) => void;
  chats: Chat[];
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markMessageAsRead: (chatId: string, messageId: string) => void;
  blockUser: (userId: string) => void;
  reportUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers = {
  admin: {
    id: 'admin1',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    role: 'admin',
    privacy: {
      projects: { visibility: 'public' },
      discussions: { visibility: 'public' },
      followers: { visibility: 'public' },
      following: { visibility: 'public' }
    }
  },
  regular: {
    id: 'user1',
    name: 'Regular User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'user',
    privacy: {
      projects: { visibility: 'public' },
      discussions: { visibility: 'public' },
      followers: { visibility: 'public' },
      following: { visibility: 'public' }
    }
  }
};

// Mock chats data
const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['admin1', 'user1'],
    messages: [
      {
        id: 'msg1',
        content: 'Hello there!',
        userId: 'user1',
        timestamp: new Date(),
        read: false
      }
    ],
    lastActivity: new Date(),
    status: {
      online: ['admin1']
    }
  }
];

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'message',
    content: 'You have a new message',
    fromUser: mockUsers.regular,
    read: false,
    timestamp: new Date(),
    link: '/messages'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic - use admin credentials for admin access
    const mockUser = email.includes('admin') ? mockUsers.admin : mockUsers.regular;
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updatePrivacySettings = (section: keyof User['privacy'], settings: PrivacySettings) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      privacy: {
        ...user.privacy,
        [section]: settings
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markMessageAsRead = (chatId: string, messageId: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId ? { ...msg, read: true } : msg
              )
            }
          : chat
      )
    );
  };

  const blockUser = (userId: string) => {
    setBlockedUsers(prev => [...prev, userId]);
    // Remove existing chat with blocked user
    setChats(prev => prev.filter(chat => !chat.participants.includes(userId)));
  };

  const reportUser = (userId: string) => {
    // Add the reported user to a list
    console.log('Reported user:', userId);
    // You might want to send this to an API in a real application
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updatePrivacySettings,
        chats,
        notifications,
        markNotificationAsRead,
        markMessageAsRead,
        blockUser,
        reportUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  MessageSquare,
  X,
  Send,
  ChevronDown,
  ChevronUp,
  User as UserIcon,
  Bell,
  Smile,
  Paperclip,
  Heart,
  MoreVertical,
  Shield,
  Ban,
  Flag,
  Plus,
  Edit3,
  Search
} from 'lucide-react';

interface SuggestedConnection {
  id: string;
  name: string;
  avatar: string;
  matchReason: string;
  skills: string[];
  mutualProjects: number;
}

interface MessageModalProps {
  message?: {
    id: string;
    content: string;
    userId: string;
  };
  onClose: () => void;
  onSave: (content: string) => void;
  title: string;
}

function MessageModal({ message, onClose, onSave, title }: MessageModalProps) {
  const [content, setContent] = useState(message?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="cyber-heading text-xl">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Message Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="cyber-input w-full h-32"
              placeholder="Type your message..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cyber-button bg-cyber-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cyber-button"
              disabled={!content.trim()}
            >
              {message ? 'Update Message' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MessengerPopup() {
  const { user, chats, notifications, markNotificationAsRead, blockUser, reportUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [editingMessage, setEditingMessage] = useState<{id: string; content: string; userId: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock suggested connections based on skills and interests
  const suggestedConnections: SuggestedConnection[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      matchReason: 'Similar skills in React and TypeScript',
      skills: ['React', 'TypeScript', 'Node.js'],
      mutualProjects: 2
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      matchReason: 'Worked on similar AI projects',
      skills: ['Python', 'Machine Learning', 'AI'],
      mutualProjects: 1
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeChat) {
      scrollToBottom();
    }
  }, [isOpen, activeChat, chats]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !fileInputRef.current?.files?.length) return;
    
    // Handle sending message logic here
    // Include file if selected
    const files = fileInputRef.current?.files;
    if (files?.length) {
      // Handle file upload
      console.log('Sending file:', files[0].name);
    }

    setMessage('');
    fileInputRef.current?.value && (fileInputRef.current.value = '');
    scrollToBottom();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleLikeMessage = (messageId: string) => {
    // Handle liking message
    console.log('Liked message:', messageId);
  };

  const handleBlockUser = (userId: string) => {
    blockUser(userId);
    setShowChatOptions(false);
    setActiveChat(null);
  };

  const handleReportUser = (userId: string) => {
    reportUser(userId);
    setShowChatOptions(false);
  };

  const handleAddMessage = (content: string) => {
    // Handle adding new message
    console.log('New message:', content);
  };

  const handleUpdateMessage = (content: string) => {
    if (!editingMessage) return;
    // Handle updating message
    console.log('Updated message:', editingMessage.id, content);
    setEditingMessage(null);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Mock emojis for the picker
  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '👋', '💡', '⭐'];

  return (
    <div className="fixed bottom-4 right-4 z-50" >
      {/* Connection Suggestions */}
      {showSuggestions && (
        <div className="absolute bottom-full right-0 mb-4 w-80 cyber-card max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-neon-blue/20">
            <h3 className="cyber-heading text-sm">Suggested Connections</h3>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-gray-400 hover:text-neon-blue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-80">
            {suggestedConnections.map(connection => (
              <div
                key={connection.id}
                className="p-3 hover:bg-cyber-primary/30 transition-colors border-b border-neon-blue/10"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-10 h-10 rounded-full border border-neon-blue"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-neon-blue">{connection.name}</div>
                    <div className="text-sm text-gray-400 mb-2">{connection.matchReason}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {connection.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full text-xs bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">
                      {connection.mutualProjects} mutual projects
                    </div>
                  </div>
                </div>
                <button className="cyber-button w-full mt-2 py-1 text-sm justify-center">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messenger Button */}
      <div className="flex gap-2">
        {/* Suggestions Button */}
        <button
          onClick={() => {
            setShowSuggestions(!showSuggestions);
            setShowNotifications(false);
            setIsOpen(false);
          }}
          className="cyber-button p-2"
        >
          <UserIcon className="w-5 h-5" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setIsOpen(false);
            setShowSuggestions(false);
          }}
          className="cyber-button p-2 relative"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotifications(false);
            setShowSuggestions(false);
          }}
          className="cyber-button p-2"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute bottom-14 right-0 w-80 cyber-card max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-neon-blue/20">
            <h3 className="cyber-heading text-sm">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-neon-blue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-80">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <button
                  key={notification.id}
                  onClick={() => {
                    markNotificationAsRead(notification.id);
                    if (notification.link) {
                      // Handle navigation
                    }
                  }}
                  className={`w-full p-3 flex items-start gap-3 hover:bg-cyber-primary/30 transition-colors ${
                    !notification.read ? 'bg-cyber-primary/10' : ''
                  }`}
                >
                  <img
                    src={notification.fromUser.avatar}
                    alt={notification.fromUser.name}
                    className="w-8 h-8 rounded-full border border-neon-blue"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-gray-300">{notification.content}</p>
                    <span className="text-xs text-gray-400">
                      {notification.timestamp.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Messenger Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 cyber-card max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-neon-blue/20">
            <h3 className="cyber-heading text-sm">Messages</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddMessage(true)}
                className="cyber-button p-1.5"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-neon-blue"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!activeChat ? (
            // Chat List
            <div className="overflow-y-auto max-h-80">
              {chats.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No conversations yet
                </div>
              ) : (
                chats.map(chat => {
                  const otherUser = chat.participants.find(p => p !== user?.id);
                  const unreadCount = chat.messages.filter(m => !m.read && m.userId !== user?.id).length;

                  return (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-cyber-primary/30 transition-colors"
                    >
                      <UserIcon className="w-8 h-8 text-neon-blue" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-neon-blue">{otherUser}</span>
                          {unreadCount > 0 && (
                            <span className="bg-neon-pink text-white text-xs rounded-full px-2 py-0.5">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {chat.messages[chat.messages.length - 1]?.content}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            // Chat View
            <div className="flex flex-col h-96">
              {/* Chat Header */}
              <div className="p-2 border-b border-neon-blue/20 flex items-center justify-between">
                <button
                  onClick={() => setActiveChat(null)}
                  className="flex items-center text-neon-blue"
                >
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Back
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowChatOptions(!showChatOptions)}
                    className="text-gray-400 hover:text-neon-blue"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showChatOptions && (
                    <div className="absolute right-0 top-full mt-1 w-48 cyber-card py-1 z-10">
                      <button
                        onClick={() => handleBlockUser('other-user-id')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-cyber-primary/30 flex items-center text-neon-pink"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Block User
                      </button>
                      <button
                        onClick={() => handleReportUser('other-user-id')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-cyber-primary/30 flex items-center text-neon-yellow"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Report User
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-cyber-primary/30 flex items-center text-neon-blue">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chats
                  .find(c => c.id === activeChat)
                  ?.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.userId === user?.id ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded relative group ${
                          message.userId === user?.id
                            ? 'bg-neon-blue/20 text-neon-blue'
                            : 'bg-cyber-primary text-gray-300'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-gray-400">
                          {message.timestamp.toLocaleString()}
                        </span>
                        <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          {message.userId === user?.id && (
                            <button
                              onClick={() => setEditingMessage(message)}
                              className="p-1 rounded hover:bg-cyber-primary/50"
                            >
                              <Edit3 className="w-3 h-3 text-neon-blue" />
                            </button>
                          )}
                          <button
                            onClick={() => handleLikeMessage(message.id)}
                            className="p-1 rounded hover:bg-cyber-primary/50"
                          >
                            <Heart className="w-3 h-3 text-neon-pink" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-neon-blue/20">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="cyber-input w-full text-sm py-1.5 pr-20"
                    />
                    <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1 hover:text-neon-blue transition-colors"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleFileSelect}
                        className="p-1 hover:text-neon-blue transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="cyber-button py-1.5 px-3">
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={() => handleSendMessage}
                  accept="image/*,.pdf,.doc,.docx"
                />

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-16 right-4 cyber-card p-2">
                    <div className="grid grid-cols-4 gap-1">
                      {emojis.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleEmojiSelect(emoji)}
                          className="w-8 h-8 hover:bg-cyber-primary/30 rounded flex items-center justify-center"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {/* Add Message Modal */}
      {showAddMessage && (
        <MessageModal
          title="New Message"
          onClose={() => setShowAddMessage(false)}
          onSave={handleAddMessage}
        />
      )}

      {/* Edit Message Modal */}
      {editingMessage && (
        <MessageModal
          title="Edit Message"
          message={editingMessage}
          onClose={() => setEditingMessage(null)}
          onSave={handleUpdateMessage}
        />
      )}
    </div>
  );
}
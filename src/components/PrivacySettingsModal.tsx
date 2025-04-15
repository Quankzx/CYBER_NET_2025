import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Plus, Search, User as UserIcon } from 'lucide-react';
import type { PrivacySettings } from '../types';

interface PrivacySettingsModalProps {
  section: 'projects' | 'discussions' | 'followers' | 'following';
  onClose: () => void;
}

export default function PrivacySettingsModal({ section, onClose }: PrivacySettingsModalProps) {
  const { user, updatePrivacySettings } = useAuth();
  const [settings, setSettings] = useState<PrivacySettings>(
    user?.privacy?.[section] || { visibility: 'public' }
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    settings.allowedUsers || []
  );
  const [blockedUsers, setBlockedUsers] = useState<string[]>(
    settings.blockedUsers || []
  );

  // Mock user search results
  const searchResults = [
    { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
    { id: '3', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop' }
  ];

  const handleSave = () => {
    updatePrivacySettings(section, {
      ...settings,
      allowedUsers: selectedUsers,
      blockedUsers
    });
    onClose();
  };

  const toggleUser = (userId: string, list: 'allowed' | 'blocked') => {
    if (list === 'allowed') {
      setSelectedUsers(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
      setBlockedUsers(prev => prev.filter(id => id !== userId));
    } else {
      setBlockedUsers(prev =>
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="cyber-heading text-xl">
            {section.charAt(0).toUpperCase() + section.slice(1)} Privacy Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-neon-blue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Visibility Options */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Who can see your {section}?
            </label>
            <div className="space-y-2">
              {['public', 'private', 'friends', 'custom'].map(option => (
                <button
                  key={option}
                  onClick={() => setSettings({ ...settings, visibility: option as PrivacySettings['visibility'] })}
                  className={`w-full p-2 text-left rounded ${
                    settings.visibility === option
                      ? 'bg-neon-blue/20 text-neon-blue'
                      : 'text-gray-400 hover:bg-cyber-primary/30'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Settings */}
          {settings.visibility === 'custom' && (
            <div className="space-y-4">
              {/* User Search */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Add specific users
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="cyber-input pl-9 w-full text-sm"
                  />
                </div>

                {/* Search Results */}
                {searchTerm && (
                  <div className="mt-2 cyber-card bg-cyber-primary/30 max-h-40 overflow-y-auto">
                    {searchResults.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 hover:bg-cyber-primary/50"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full border border-neon-blue"
                          />
                          <span className="text-sm text-gray-300">{user.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleUser(user.id, 'allowed')}
                            className={`p-1 rounded ${
                              selectedUsers.includes(user.id)
                                ? 'text-neon-blue'
                                : 'text-gray-400'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Users */}
              {selectedUsers.length > 0 && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Allowed Users
                  </label>
                  <div className="space-y-2">
                    {selectedUsers.map(userId => {
                      const user = searchResults.find(u => u.id === userId);
                      return (
                        <div
                          key={userId}
                          className="flex items-center justify-between p-2 cyber-card bg-cyber-primary/30"
                        >
                          <div className="flex items-center gap-2">
                            {user ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border border-neon-blue"
                              />
                            ) : (
                              <UserIcon className="w-8 h-8 text-neon-blue" />
                            )}
                            <span className="text-sm text-gray-300">
                              {user?.name || userId}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleUser(userId, 'allowed')}
                            className="text-neon-pink"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Blocked Users */}
              {blockedUsers.length > 0 && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Blocked Users
                  </label>
                  <div className="space-y-2">
                    {blockedUsers.map(userId => {
                      const user = searchResults.find(u => u.id === userId);
                      return (
                        <div
                          key={userId}
                          className="flex items-center justify-between p-2 cyber-card bg-cyber-primary/30"
                        >
                          <div className="flex items-center gap-2">
                            {user ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border border-neon-pink"
                              />
                            ) : (
                              <UserIcon className="w-8 h-8 text-neon-pink" />
                            )}
                            <span className="text-sm text-gray-300">
                              {user?.name || userId}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleUser(userId, 'blocked')}
                            className="text-neon-pink"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button onClick={onClose} className="cyber-button bg-cyber-dark">
              Cancel
            </button>
            <button onClick={handleSave} className="cyber-button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import {
  Shield,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  XCircle,
  Lock,
  Check,
  X
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'projects' | 'content' | 'system';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock permissions data
const mockPermissions: Permission[] = [
  {
    id: 'user_view',
    name: 'View Users',
    description: 'Can view user profiles and information',
    category: 'users'
  },
  {
    id: 'user_manage',
    name: 'Manage Users',
    description: 'Can edit user information and manage accounts',
    category: 'users'
  },
  {
    id: 'user_delete',
    name: 'Delete Users',
    description: 'Can delete user accounts',
    category: 'users'
  },
  {
    id: 'project_view',
    name: 'View Projects',
    description: 'Can view all projects',
    category: 'projects'
  },
  {
    id: 'project_manage',
    name: 'Manage Projects',
    description: 'Can edit and manage projects',
    category: 'projects'
  },
  {
    id: 'project_delete',
    name: 'Delete Projects',
    description: 'Can delete projects',
    category: 'projects'
  },
  {
    id: 'content_view',
    name: 'View Content',
    description: 'Can view all content',
    category: 'content'
  },
  {
    id: 'content_manage',
    name: 'Manage Content',
    description: 'Can edit and manage content',
    category: 'content'
  },
  {
    id: 'content_delete',
    name: 'Delete Content',
    description: 'Can delete content',
    category: 'content'
  },
  {
    id: 'system_settings',
    name: 'System Settings',
    description: 'Can modify system settings',
    category: 'system'
  },
  {
    id: 'system_logs',
    name: 'View System Logs',
    description: 'Can view system logs and activity',
    category: 'system'
  }
];

// Mock roles data
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access and control',
    permissions: mockPermissions.map(p => p.id),
    users: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-20')
  },
  {
    id: '2',
    name: 'Moderator',
    description: 'Content management and moderation',
    permissions: ['user_view', 'content_view', 'content_manage', 'content_delete'],
    users: 8,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-19')
  },
  {
    id: '3',
    name: 'Project Manager',
    description: 'Project oversight and management',
    permissions: ['project_view', 'project_manage', 'user_view'],
    users: 12,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-18')
  }
];

interface RoleModalProps {
  role?: Role;
  onClose: () => void;
  onSave: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'users'>) => void;
}

function RoleModal({ role, onClose, onSave }: RoleModalProps) {
  const [name, setName] = useState(role?.name || '');
  const [description, setDescription] = useState(role?.description || '');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role?.permissions || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      permissions: selectedPermissions
    });
    onClose();
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="cyber-heading text-xl">
            {role ? 'Edit Role' : 'Create New Role'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="cyber-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cyber-input w-full h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">Permissions</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(mockPermissions.reduce((acc, permission) => {
                if (!acc[permission.category]) {
                  acc[permission.category] = {
                    name: permission.category,
                    permissions: []
                  };
                }
                acc[permission.category].permissions.push(permission);
                return acc;
              }, {} as Record<string, { name: string; permissions: Permission[] }>)).map(category => (
                <div key={category.name} className="cyber-card bg-cyber-primary/30 p-4">
                  <h3 className="text-neon-blue capitalize mb-3">{category.name}</h3>
                  <div className="space-y-2">
                    {category.permissions.map(permission => (
                      <label
                        key={permission.id}
                        className="flex items-start gap-2 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 border ${
                            selectedPermissions.includes(permission.id)
                              ? 'bg-neon-blue/20 border-neon-blue'
                              : 'border-gray-400 group-hover:border-neon-blue'
                          } rounded transition-colors`}>
                            {selectedPermissions.includes(permission.id) && (
                              <Check className="w-3 h-3 text-neon-blue" />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">
                            {permission.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {permission.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cyber-button bg-cyber-dark"
            >
              Cancel
            </button>
            <button type="submit" className="cyber-button">
              {role ? 'Save Changes' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveRole = (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'users'>) => {
    if (selectedRole) {
      // Update existing role
      setRoles(prev => prev.map(role =>
        role.id === selectedRole.id
          ? {
              ...role,
              ...roleData,
              updatedAt: new Date()
            }
          : role
      ));
    } else {
      // Create new role
      const newRole: Role = {
        id: String(roles.length + 1),
        ...roleData,
        users: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRoles(prev => [...prev, newRole]);
    }
    setSelectedRole(null);
    setShowCreateModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Role Management</h1>
          <p className="text-gray-400">Manage user roles and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="cyber-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Role
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">Role</th>
                <th className="text-left p-4 text-gray-400 font-medium">Users</th>
                <th className="text-left p-4 text-gray-400 font-medium">Permissions</th>
                <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Updated</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map(role => (
                <tr key={role.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium text-neon-blue">{role.name}</div>
                        <div className="text-sm text-gray-400">{role.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">{role.users}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map(permissionId => {
                        const permission = mockPermissions.find(p => p.id === permissionId);
                        return permission ? (
                          <span
                            key={permission.id}
                            className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                          >
                            {permission.name}
                          </span>
                        ) : null;
                      })}
                      {role.permissions.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">
                      {role.createdAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">
                      {role.updatedAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedRole(role)}
                        className="cyber-button p-1.5"
                      >
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

      {/* Role Modal */}
      {(selectedRole || showCreateModal) && (
        <RoleModal
          role={selectedRole || undefined}
          onClose={() => {
            setSelectedRole(null);
            setShowCreateModal(false);
          }}
          onSave={handleSaveRole}
        />
      )}
    </div>
  );
}
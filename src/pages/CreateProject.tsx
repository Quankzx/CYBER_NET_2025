import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Upload,
  Calendar,
  Link as LinkIcon,
  Tags,
  Users,
  GitBranch,
  Plus,
  Trash2,
  FileCode,
  Globe
} from 'lucide-react';

interface Milestone {
  title: string;
  date: string;
  description: string;
}

interface TeamMember {
  email: string;
  role: string;
}

export default function CreateProject() {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [readme, setReadme] = useState('');

  // Predefined categories
  const categories = [
    'AI & ML',
    'Web Development',
    'Mobile Apps',
    'Blockchain',
    'IoT',
    'Game Development',
    'Cybersecurity',
    'DevOps',
    'Data Science',
    'Other'
  ];

  // Predefined roles
  const roles = [
    'Developer',
    'Designer',
    'Project Manager',
    'DevOps Engineer',
    'QA Engineer',
    'Technical Writer',
    'Other'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { title: '', date: '', description: '' }
    ]);
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value
    };
    setMilestones(updatedMilestones);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { email: '', role: roles[0] }]);
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setTeamMembers(updatedMembers);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle project creation logic here
    navigate('/projects');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="cyber-card p-6">
        <h1 className="cyber-heading text-2xl mb-6 flex items-center">
          <Terminal className="w-6 h-6 mr-2 text-neon-blue" />
          Initialize New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image Upload */}
          <div className="relative">
            <div
              className={`h-48 rounded-lg overflow-hidden ${
                coverImage ? '' : 'border-2 border-dashed border-neon-blue/30'
              }`}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Project cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Upload project cover image
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="cyber-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project"
                className="cyber-input w-full h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="cyber-input w-full"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20 flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-neon-pink/70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags (press Enter)"
                className="cyber-input w-full"
              />
            </div>
          </div>

          {/* Project Links */}
          <div className="space-y-4">
            <h2 className="cyber-heading text-lg flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-neon-purple" />
              Project Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  GitHub Repository
                </label>
                <div className="relative">
                  <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="cyber-input w-full pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Project Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
                  <input
                    type="url"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    placeholder="https://yourproject.com"
                    className="cyber-input w-full pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="cyber-heading text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-neon-yellow" />
                Team Members
              </h2>
              <button
                type="button"
                onClick={addTeamMember}
                className="cyber-button py-1 px-2 text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                    placeholder="team@member.com"
                    className="cyber-input flex-1"
                  />
                  <select
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                    className="cyber-input w-40"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="cyber-button py-2 px-2 bg-cyber-dark text-neon-pink border-neon-pink"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="cyber-heading text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-neon-purple" />
                Milestones
              </h2>
              <button
                type="button"
                onClick={addMilestone}
                className="cyber-button py-1 px-2 text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="cyber-card p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        placeholder="Milestone title"
                        className="cyber-input"
                      />
                      <input
                        type="date"
                        value={milestone.date}
                        onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                        className="cyber-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="cyber-button py-2 px-2 ml-3 bg-cyber-dark text-neon-pink border-neon-pink"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                    placeholder="Milestone description"
                    className="cyber-input w-full h-20"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* README */}
          <div className="space-y-4">
            <h2 className="cyber-heading text-lg flex items-center">
              <FileCode className="w-5 h-5 mr-2 text-neon-blue" />
              README.md
            </h2>
            <textarea
              value={readme}
              onChange={(e) => setReadme(e.target.value)}
              placeholder="# Project Name

## Overview
Brief description of your project...

## Features
- Feature 1
- Feature 2

## Getting Started
Installation instructions..."
              className="cyber-input w-full h-64 font-mono"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="cyber-button">
              <Terminal className="w-4 h-4 mr-2" />
              Initialize Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
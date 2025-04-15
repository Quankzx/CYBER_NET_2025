import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  Star,
  Eye,
  Edit3,
  Trash2,
  Flag,
  Shield,
  XCircle,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  Calendar,
  Clock,
  BarChart2,
  UserCheck,
  FileText,
  Plus,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

// Mock data for initial development
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Master modern React patterns and best practices with hands-on projects.',
    instructor: {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
      verified: true
    },
    category: 'Web Development',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-02-01'),
    tags: ['React', 'JavaScript', 'Frontend'],
    members: [
      {
        id: '101',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3',
        role: 'student'
      }
    ],
    stats: {
      students: 156,
      lessons: 24,
      completionRate: 78,
      rating: 4.8
    },
    feedback: [
      {
        id: '201',
        user: {
          name: 'Michael Smith',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3'
        },
        content: 'Excellent course structure and content depth.',
        rating: 5,
        timestamp: new Date('2024-01-20')
      }
    ],
    links: {
      github: 'https://github.com/example/react-course',
      website: 'https://reactcourse.dev',
      documentation: 'https://docs.reactcourse.dev'
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3',
    duration: '12 weeks',
    level: 'Advanced',
    prerequisites: ['JavaScript fundamentals', 'Basic React knowledge'],
    syllabus: [
      {
        title: 'React Fundamentals Review',
        duration: '2 weeks',
        topics: ['Component lifecycle', 'Hooks deep dive', 'State management']
      },
      {
        title: 'Advanced Patterns',
        duration: '3 weeks',
        topics: ['HOCs', 'Render props', 'Custom hooks']
      }
    ]
  },
  {
    id: '2',
    title: 'Full Stack Development with Node.js',
    description: 'Build scalable web applications with Node.js, Express, and MongoDB.',
    instructor: {
      id: '2',
      name: 'David Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3',
      verified: true
    },
    category: 'Backend Development',
    status: 'pending',
    createdAt: new Date('2024-01-20'),
    lastUpdated: new Date('2024-01-20'),
    tags: ['Node.js', 'Express', 'MongoDB'],
    members: [],
    stats: {
      students: 0,
      lessons: 18,
      completionRate: 0,
      rating: 0
    },
    feedback: [],
    links: {
      github: 'https://github.com/example/node-course'
    },
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3',
    duration: '10 weeks',
    level: 'Intermediate',
    prerequisites: ['JavaScript basics', 'Web development fundamentals'],
    syllabus: [
      {
        title: 'Node.js Basics',
        duration: '2 weeks',
        topics: ['Event loop', 'Modules', 'File system']
      }
    ]
  }
];

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  status: 'active' | 'pending' | 'archived';
  createdAt: Date;
  lastUpdated: Date;
  tags: string[];
  members: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  stats: {
    students: number;
    lessons: number;
    completionRate: number;
    rating: number;
  };
  feedback: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    rating: number;
    timestamp: Date;
  }[];
  links: {
    github?: string;
    website?: string;
    documentation?: string;
  };
  thumbnail?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  syllabus?: {
    title: string;
    duration: string;
    topics: string[];
  }[];
}

interface CourseModalProps {
  course?: Course;
  onClose: () => void;
  onSave: (courseData: Partial<Course>) => void;
}

function CourseModal({ course, onClose, onSave }: CourseModalProps) {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [category, setCategory] = useState(course?.category || '');
  const [level, setLevel] = useState(course?.level || 'Beginner');
  const [duration, setDuration] = useState(course?.duration || '');
  const [thumbnail, setThumbnail] = useState(course?.thumbnail || '');
  const [prerequisites, setPrerequisites] = useState(course?.prerequisites?.join(', ') || '');
  const [tags, setTags] = useState(course?.tags?.join(', ') || '');
  const [website, setWebsite] = useState(course?.links?.website || '');
  const [syllabus, setSyllabus] = useState(course?.syllabus || [{ title: '', duration: '', topics: [] }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      category,
      level: level as Course['level'],
      duration,
      thumbnail,
      prerequisites: prerequisites.split(',').map(p => p.trim()),
      tags: tags.split(',').map(t => t.trim()),
      links: { website },
      syllabus
    });
    onClose();
  };

  const addSyllabusSection = () => {
    setSyllabus([...syllabus, { title: '', duration: '', topics: [] }]);
  };

  const updateSyllabusSection = (index: number, field: keyof typeof syllabus[0], value: string) => {
    const updatedSyllabus = [...syllabus];
    if (field === 'topics') {
      updatedSyllabus[index][field] = value.split(',').map(t => t.trim());
    } else {
      updatedSyllabus[index][field] = value;
    }
    setSyllabus(updatedSyllabus);
  };

  const removeSyllabusSection = (index: number) => {
    setSyllabus(syllabus.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/80 flex items-center justify-center z-50 p-4">
      <div className="cyber-card w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="cyber-heading text-xl">
            {course ? 'Edit Course' : 'Create New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-neon-blue">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="cyber-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="cyber-input w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="cyber-input w-full h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Course['level'])}
                className="cyber-input w-full"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 8 weeks"
                className="cyber-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="cyber-input w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prerequisites (comma-separated)</label>
              <input
                type="text"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
                className="cyber-input w-full"
                placeholder="e.g., Basic JavaScript, HTML, CSS"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="cyber-input w-full"
                placeholder="e.g., JavaScript, React, Web Development"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="cyber-input w-full"
              placeholder="Enter image URL"
            />
          </div>

          {/* Syllabus */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm text-gray-400">Syllabus</label>
              <button
                type="button"
                onClick={addSyllabusSection}
                className="cyber-button py-1 px-2 text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {syllabus.map((section, index) => (
                <div key={index} className="cyber-card p-4 bg-cyber-primary/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSyllabusSection(index, 'title', e.target.value)}
                        placeholder="Section title"
                        className="cyber-input"
                      />
                      <input
                        type="text"
                        value={section.duration}
                        onChange={(e) => updateSyllabusSection(index, 'duration', e.target.value)}
                        placeholder="Duration (e.g., 2 hours)"
                        className="cyber-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSyllabusSection(index)}
                      className="cyber-button py-2 px-2 ml-3 bg-cyber-dark text-neon-pink border-neon-pink"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={section.topics.join(', ')}
                    onChange={(e) => updateSyllabusSection(index, 'topics', e.target.value)}
                    placeholder="Topics (comma-separated)"
                    className="cyber-input w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cyber-button bg-cyber-dark"
            >
              Cancel
            </button>
            <button type="submit" className="cyber-button">
              {course ? 'Save Changes' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<Course['status'] | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSaveCourse = (courseData: Partial<Course>) => {
    if (selectedCourse) {
      // Update existing course
      setCourses(prev => prev.map(course =>
        course.id === selectedCourse.id
          ? { ...course, ...courseData, lastUpdated: new Date() }
          : course
      ));
    } else {
      // Create new course
      const newCourse: Course = {
        id: String(courses.length + 1),
        ...courseData as Course,
        instructor: {
          id: '1',
          name: 'Admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
          verified: true
        },
        status: 'pending',
        createdAt: new Date(),
        lastUpdated: new Date(),
        members: [],
        stats: {
          students: 0,
          lessons: 0,
          completionRate: 0,
          rating: 0
        },
        feedback: []
      };
      setCourses(prev => [...prev, newCourse]);
    }
    setSelectedCourse(null);
    setShowCreateModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">Course Management</h1>
          <p className="text-gray-400">Manage and monitor online courses</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="cyber-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-neon-blue" />
            <span className="text-sm text-green-500">↑ 12%</span>
          </div>
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {courses.length}
          </div>
          <div className="text-sm text-gray-400">Total Courses</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-5 h-5 text-neon-purple" />
            <span className="text-sm text-green-500">↑ 8%</span>
          </div>
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {courses.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-400">Active Courses</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-green-500">↑ 15%</span>
          </div>
          <div className="text-2xl font-bold text-neon-pink mb-1">
            {courses.reduce((sum, c) => sum + c.stats.students, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Students</div>
        </div>

        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-green-500">↑ 5%</span>
          </div>
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {(courses.reduce((sum, c) => sum + c.stats.rating, 0) / courses.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-400">Average Rating</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-9 w-full text-sm h-9"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="DevOps">DevOps</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Course['status'] | 'all')}
            className="cyber-input text-sm py-1.5"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-blue/20">
                <th className="text-left p-4 text-gray-400 font-medium">Course</th>
                <th className="text-left p-4 text-gray-400 font-medium">Instructor</th>
                <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Students</th>
                <th className="text-left p-4 text-gray-400 font-medium">Rating</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id} className="border-b border-neon-blue/10 hover:bg-cyber-primary/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover border border-neon-blue"
                        />
                      )}
                      <div>
                        <div className="font-medium text-neon-blue">{course.title}</div>
                        <div className="text-sm text-gray-400 line-clamp-1">
                          {course.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-8 h-8 rounded-full border border-neon-blue"
                      />
                      <div>
                        <div className="text-gray-300">{course.instructor.name}</div>
                        {course.instructor.verified && (
                          <div className="text-xs text-neon-blue flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                      {course.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'active'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : course.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300">{course.stats.students}</div>
                    <div className="text-xs text-gray-400">
                      {course.stats.completionRate}% completion
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-neon-yellow">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.stats.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="cyber-button p-1.5"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="cyber-button p-1.5">
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

      {/* Course Modal */}
      {(showCreateModal || selectedCourse) && (
        <CourseModal
          course={selectedCourse || undefined}
          onClose={() => {
            setSelectedCourse(null);
            setShowCreateModal(false);
          }}
          onSave={handleSaveCourse}
        />
      )}
    </div>
  );
}
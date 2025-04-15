import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Users,
  Send,
  Star,
  Clock,
  BookOpen,
  Upload,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  submissions: {
    user: {
      name: string;
      avatar: string;
    };
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: Date;
    feedback?: string;
  }[];
}

interface ActiveViewer {
  id: string;
  name: string;
  avatar: string;
  lastActive: Date;
}

const mockResource = {
  id: '1',
  title: 'JavaScript Mastery - Modern Web Development',
  description: `Master modern web development with this comprehensive course. We'll cover:

- Advanced JavaScript concepts
- React and Next.js
- State management
- API integration
- Performance optimization
- Deployment strategies`,
  videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  instructor: {
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    bio: 'Senior Software Engineer | JavaScript Expert | Tech Educator'
  },
  stats: {
    views: 45678,
    likes: 2341,
    comments: 389,
    rating: 4.9
  },
  duration: '2:15:30',
  level: 'Advanced',
  tags: ['JavaScript', 'React', 'Web Development'],
  chapters: [
    { time: '0:00', title: 'Introduction to Modern Web Development' },
    { time: '15:30', title: 'JavaScript Fundamentals' },
    { time: '45:20', title: 'React Essentials' },
    { time: '1:15:00', title: 'State Management Deep Dive' },
    { time: '1:45:00', title: 'Building Production-Ready Apps' },
    { time: '2:05:00', title: 'Deployment and Best Practices' }
  ]
};

const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'John Matrix',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
    },
    content: 'The React section was incredibly detailed. Great explanation of hooks!',
    timestamp: new Date('2024-03-20T10:30:00'),
    likes: 45,
    isLiked: false
  },
  {
    id: '2',
    user: {
      name: 'Alex Murphy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
    },
    content: 'Could you make a follow-up video on advanced state management patterns?',
    timestamp: new Date('2024-03-20T11:15:00'),
    likes: 28,
    isLiked: true
  }
];

const mockAssignment: Assignment = {
  id: '1',
  title: 'Build a Full-Stack Web Application',
  description: `Create a full-stack web application using the technologies covered in this tutorial:

1. React frontend with modern hooks
2. State management implementation
3. RESTful API integration
4. Responsive design with Tailwind CSS
5. Deployment configuration

Submit your project repository with a detailed README.`,
  dueDate: new Date('2024-04-15'),
  submissions: [
    {
      user: {
        name: 'John Matrix',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      },
      status: 'approved',
      submittedAt: new Date('2024-03-25'),
      feedback: 'Excellent implementation! Clean code and great documentation.'
    },
    {
      user: {
        name: 'Alex Murphy',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
      },
      status: 'pending',
      submittedAt: new Date('2024-03-26')
    }
  ]
};

const mockActiveViewers: ActiveViewer[] = [
  {
    id: '1',
    name: 'John Matrix',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Alex Murphy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    lastActive: new Date()
  },
  {
    id: '3',
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    lastActive: new Date()
  }
];

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource] = useState(mockResource);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [assignment] = useState<Assignment>(mockAssignment);
  const [activeViewers] = useState<ActiveViewer[]>(mockActiveViewers);
  const [newComment, setNewComment] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string; timestamp: Date }[]>([]);
  const [showAssignment, setShowAssignment] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    // Simulate real-time chat updates
    const interval = setInterval(() => {
      const viewer = activeViewers[Math.floor(Math.random() * activeViewers.length)];
      setChatMessages(prev => [
        ...prev,
        {
          user: viewer.name,
          message: `Random message from ${viewer.name}`,
          timestamp: new Date()
        }
      ].slice(-50)); // Keep only last 50 messages
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: String(comments.length + 1),
      user: {
        name: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop'
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatMessages(prev => [...prev, {
      user: 'You',
      message: chatMessage,
      timestamp: new Date()
    }]);
    setChatMessage('');
  };

  const handleSubmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;
    // Handle submission logic here
    setSubmissionUrl('');
    setShowAssignment(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Video Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="relative pt-[56.25%] cyber-card overflow-hidden">
            <iframe
              src={resource.videoUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Resource Info */}
          <div className="cyber-card p-4">
            <h1 className="cyber-heading text-2xl mb-2">{resource.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-neon-blue" />
                  <span className="text-gray-400">{resource.stats.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neon-pink" />
                  <span className="text-gray-400">{resource.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-neon-purple" />
                  <span className="text-gray-400">{resource.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="cyber-button py-1.5 px-3">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {resource.stats.likes}
                </button>
                <button className="cyber-button py-1.5 px-3">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-4">
              <p className="text-gray-300 whitespace-pre-line">{resource.description}</p>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-3 cyber-card bg-cyber-primary/30">
              <img
                src={resource.instructor.avatar}
                alt={resource.instructor.name}
                className="w-12 h-12 rounded-full border border-neon-blue"
              />
              <div>
                <div className="font-medium text-neon-blue">{resource.instructor.name}</div>
                <div className="text-sm text-gray-400">{resource.instructor.bio}</div>
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="cyber-card p-4">
            <h2 className="cyber-heading text-lg mb-3">Chapters</h2>
            <div className="space-y-2">
              {resource.chapters.map((chapter, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-2 hover:bg-cyber-primary/30 rounded transition-colors"
                >
                  <span className="text-gray-300">{chapter.title}</span>
                  <span className="text-neon-blue">{chapter.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="cyber-card p-4">
            <h2 className="cyber-heading text-lg mb-4">Comments ({comments.length})</h2>
            
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="cyber-input w-full h-24 mb-2"
              />
              <div className="flex justify-end">
                <button type="submit" className="cyber-button" disabled={!newComment.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full border border-neon-blue"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-neon-blue">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {comment.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <button
                        className={`cyber-button py-1 px-2 text-sm ${
                          comment.isLiked ? 'text-neon-pink' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </button>
                    </div>
                    <p className="text-gray-300 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Rating */}
          <div className="cyber-card p-4">
            <h3 className="cyber-heading text-lg mb-2">Rate this Tutorial</h3>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className={`p-1 ${star <= userRating ? 'text-neon-yellow' : 'text-gray-400'}`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              Average rating: {resource.stats.rating}/5
            </div>
          </div>

          {/* Active Viewers */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="cyber-heading text-lg">Active Viewers</h3>
              <Users className="w-5 h-5 text-neon-blue" />
            </div>
            <div className="space-y-2">
              {activeViewers.map(viewer => (
                <div key={viewer.id} className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={viewer.avatar}
                      alt={viewer.name}
                      className="w-8 h-8 rounded-full border border-neon-blue"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-cyber-dark" />
                  </div>
                  <span className="text-gray-300 text-sm">{viewer.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="cyber-heading text-lg">Live Chat</h3>
              <MessageCircle className="w-5 h-5 text-neon-pink" />
            </div>
            <div className="h-64 overflow-y-auto mb-3 space-y-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <span className="text-neon-blue">{msg.user}: </span>
                  <span className="text-gray-300">{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="cyber-input flex-1 text-sm"
              />
              <button type="submit" className="cyber-button py-1.5 px-3">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Assignment */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="cyber-heading text-lg">Assignment</h3>
              <button
                onClick={() => setShowAssignment(!showAssignment)}
                className="cyber-button py-1 px-2 text-sm"
              >
                {showAssignment ? 'Hide' : 'Show'}
              </button>
            </div>

            {showAssignment && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neon-blue mb-2">{assignment.title}</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-line">
                    {assignment.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    Due: {assignment.dueDate.toLocaleDateString()}
                  </div>
                </div>

                <form onSubmit={handleSubmissionSubmit} className="space-y-3">
                  <input
                    type="url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="Enter GitHub repository URL"
                    className="cyber-input w-full text-sm"
                  />
                  <button
                    type="submit"
                    className="cyber-button w-full justify-center"
                    disabled={!submissionUrl.trim()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </button>
                </form>

                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Recent Submissions</div>
                  {assignment.submissions.map((submission, index) => (
                    <div key={index} className="cyber-card p-2 bg-cyber-primary/30">
                      <div className="flex items-center gap-2">
                        <img
                          src={submission.user.avatar}
                          alt={submission.user.name}
                          className="w-6 h-6 rounded-full border border-neon-blue"
                        />
                        <span className="text-gray-300 text-sm">
                          {submission.user.name}
                        </span>
                        {submission.status === 'approved' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {submission.status === 'rejected' && (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      {submission.feedback && (
                        <p className="text-xs text-gray-400 mt-1">
                          {submission.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
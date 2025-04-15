import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Send, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface Reply {
  id: string;
  content: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

const mockTopic = {
  id: '1',
  title: 'Neural Networks Evolution',
  content: `The field of neural networks has seen remarkable progress in recent years. From basic perceptrons to complex transformers, the evolution has been fascinating.

Let's discuss the latest advancements and their implications for the future of AI.

Key points to consider:
1. Architectural innovations
2. Training efficiency
3. Real-world applications
4. Future directions`,
  user: {
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
  },
  category: 'AI & ML',
  tags: ['Neural Networks', 'Deep Learning', 'AI'],
  createdAt: new Date('2024-03-15'),
  views: 1234,
  likes: 89,
  isLiked: false
};

const mockReplies: Reply[] = [
  {
    id: '1',
    content: 'The advancement in transformer architectures has been particularly impressive. The attention mechanism has revolutionized how we process sequential data.',
    user: {
      name: 'John Matrix',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
    },
    timestamp: new Date('2024-03-15T10:30:00'),
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    content: 'What are your thoughts on the efficiency improvements in training large models? The computational requirements are still a major challenge.',
    user: {
      name: 'Alex Murphy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
    },
    timestamp: new Date('2024-03-15T11:15:00'),
    likes: 8,
    isLiked: true
  }
];

export default function TopicDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [topic] = useState(mockTopic);
  const [replies] = useState<Reply[]>(mockReplies);
  const [newReply, setNewReply] = useState('');
  const [isLiked, setIsLiked] = useState(topic.isLiked);
  const [likeCount, setLikeCount] = useState(topic.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    // Handle reply submission
    setNewReply('');
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Topic Header */}
      <div className="cyber-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={topic.user.avatar}
              alt={topic.user.name}
              className="w-10 h-10 rounded-full border border-neon-blue"
            />
            <div>
              <div className="font-medium text-neon-blue">
                {topic.user.name}
              </div>
              <div className="text-xs text-gray-400">
                {topic.createdAt.toLocaleDateString()}
              </div>
            
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">{topic.views} views</span>
            <button
              onClick={handleLike}
              className={`cyber-button py-1 px-2 ${
                isLiked ? 'text-neon-pink' : 'text-gray-400'
              }`}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likeCount}
            </button>
            <button className="cyber-button py-1 px-2">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="cyber-heading text-2xl mb-2">{topic.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
            {topic.category}
          </span>
          {topic.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          {topic.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-neon-blue" />
          <h2 className="cyber-heading text-lg">
            Replies ({replies.length})
          </h2>
        </div>

        {replies.map(reply => (
          <div key={reply.id} className="cyber-card p-4">
            <div className="flex items-start gap-3">
              <img
                src={reply.user.avatar}
                alt={reply.user.name}
                className="w-8 h-8 rounded-full border border-neon-blue"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-neon-blue">
                      {reply.user.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {reply.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className={`cyber-button py-1 px-2 text-sm ${
                      reply.isLiked ? 'text-neon-pink' : 'text-gray-400'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {reply.likes}
                  </button>
                </div>
                <p className="text-gray-300 mt-2">{reply.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Reply Form */}
        {isAuthenticated && (
          <form onSubmit={handleReplySubmit} className="cyber-card p-4">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply..."
              className="cyber-input w-full h-24 mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newReply.trim()}
                className="cyber-button"
              >
                <Send className="w-4 h-4 mr-2" />
                Reply
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
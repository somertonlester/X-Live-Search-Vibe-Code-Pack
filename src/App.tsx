import React, { useState } from 'react';
import { Plus, AlertCircle, Bell, MessageSquare, Globe, BarChart2, Clock, X, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const N8N_WEBHOOK = 'https://promptadvisers.app.n8n.cloud/webhook-test/bafca7c5-dc53-4967-9f1b-c2f5b1048c00';

interface AlertPayload {
  type: string;
  prompt: string;
  question: string;
  metadata: {
    tool: string;
    category: string;
    timestamp: string;
  };
}

interface AlertCard {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function App() {
  const [questions, setQuestions] = useState<Record<string, string>>({});
  const [generalQuestion, setGeneralQuestion] = useState('');
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loadingCards, setLoadingCards] = useState<Record<string, boolean>>({});
  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const [showResponse, setShowResponse] = useState<string | null>(null);

  const alertCards: AlertCard[] = [
    {
      type: 'techUpdates',
      title: 'Tech Updates',
      description: 'Track updates from tech leaders and influencers',
      icon: <Globe className="w-8 h-8 mb-4" />
    },
    {
      type: 'news',
      title: 'Breaking News',
      description: 'Monitor real-time breaking news alerts',
      icon: <AlertCircle className="w-8 h-8 mb-4" />
    },
    {
      type: 'analysis',
      title: 'Content Analysis',
      description: 'Analyze content from multiple sources',
      icon: <BarChart2 className="w-8 h-8 mb-4" />
    },
    {
      type: 'history',
      title: 'Historical Events',
      description: 'Track historical event timelines',
      icon: <Clock className="w-8 h-8 mb-4" />
    },
    {
      type: 'memes',
      title: 'Memes & Trends',
      description: 'Monitor viral content and trends',
      icon: <MessageSquare className="w-8 h-8 mb-4" />
    },
    {
      type: 'community',
      title: 'Community Pulse',
      description: 'Check community sentiment and activity',
      icon: <Bell className="w-8 h-8 mb-4" />
    }
  ];

  const getPromptForType = (type: string): string => {
    const prompts = {
      techUpdates: "You are a tech news analyst. Analyze and summarize the latest updates from tech leaders and companies. Focus on emerging trends and significant announcements.",
      news: "You are a breaking news reporter. Monitor and report on real-time news events. Prioritize accuracy and timeliness in your coverage.",
      analysis: "You are a content analyst. Examine multiple sources to provide comprehensive analysis. Compare different perspectives and identify key patterns.",
      history: "You are a historical researcher. Create detailed timelines of events and their connections. Provide context and background information.",
      memes: "You are a trend analyst. Track and analyze viral content and memes. Identify patterns in social media engagement and content spread.",
      community: "You are a community manager. Monitor sentiment and engagement in online communities. Identify trends and concerns in public discourse."
    };
    return prompts[type as keyof typeof prompts] || "Default prompt for general inquiries";
  };

  const getCategoryForType = (type: string): string => {
    const categories = {
      techUpdates: "TECH_INTELLIGENCE",
      news: "BREAKING_NEWS",
      analysis: "CONTENT_ANALYSIS",
      history: "HISTORICAL_DATA",
      memes: "VIRAL_TRENDS",
      community: "COMMUNITY_INSIGHTS"
    };
    return categories[type as keyof typeof categories] || "GENERAL";
  };

  const formatResponse = (response: string): string => {
    try {
      const parsed = JSON.parse(response);
      
      // Handle array of objects with 'output' property
      if (Array.isArray(parsed) && parsed[0]?.output) {
        return parsed[0].output;
      }
      
      // Handle single object with 'output' property
      if (parsed.output) {
        return parsed.output;
      }
      
      // If it's a string wrapped in an object
      if (typeof parsed === 'string') {
        return parsed;
      }
      
      // If it's an array of strings
      if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
        return parsed[0];
      }
      
      // Fallback: return the stringified version but without the JSON artifacts
      const stringified = JSON.stringify(parsed);
      return stringified
        .replace(/^\[|\]$/g, '') // Remove outer brackets
        .replace(/^\{|\}$/g, '') // Remove outer braces
        .replace(/"output":|"response":/g, '') // Remove key labels
        .replace(/^"|"$/g, '') // Remove outer quotes
        .replace(/\\n/g, '\n') // Convert escaped newlines
        .replace(/\\"/g, '"') // Convert escaped quotes
        .trim();
    } catch (e) {
      // If parsing fails, return the original response
      return response
        .replace(/^\[|\]$/g, '')
        .replace(/^\{|\}$/g, '')
        .replace(/"output":|"response":/g, '')
        .replace(/^"|"$/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .trim();
    }
  };

  const sendGeneralQuestion = async () => {
    if (!generalQuestion.trim()) {
      toast.error('Please enter a question first');
      return;
    }

    setLoadingGeneral(true);

    const payload = {
      question: generalQuestion,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let responseText;
      try {
        responseText = await response.text();
      } catch (textError) {
        throw new Error('Unable to read response body');
      }

      if (!response.ok) {
        throw new Error(`Server error (${response.status}): ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        data = { output: responseText };
      }

      const formattedResponse = formatResponse(JSON.stringify(data));
      setResponses(prev => ({ ...prev, general: formattedResponse }));
      setShowResponse('general');
      
      toast.success('Response received!');
      setGeneralQuestion('');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoadingGeneral(false);
    }
  };

  const sendAlert = async (type: string) => {
    if (!questions[type]?.trim()) {
      toast.error('Please enter a question first');
      return;
    }

    setLoadingCards(prev => ({ ...prev, [type]: true }));

    const payload: AlertPayload = {
      type,
      prompt: getPromptForType(type),
      question: questions[type],
      metadata: {
        tool: type,
        category: getCategoryForType(type),
        timestamp: new Date().toISOString()
      }
    };

    try {
      const response = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let responseText;
      try {
        responseText = await response.text();
      } catch (textError) {
        throw new Error('Unable to read response body');
      }

      if (!response.ok) {
        throw new Error(`Server error (${response.status}): ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        data = { output: responseText };
      }

      const formattedResponse = formatResponse(JSON.stringify(data));
      setResponses(prev => ({ ...prev, [type]: formattedResponse }));
      setShowResponse(type);
      
      toast.success('Response received!');
      setQuestions(prev => ({ ...prev, [type]: '' }));
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoadingCards(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleQuestionChange = (type: string, value: string) => {
    setQuestions(prev => ({ ...prev, [type]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendGeneralQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-violet-600">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Alert System
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Send different types of alerts with a single click. Each alert triggers a specialized workflow.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Ask Anything</h2>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={generalQuestion}
                  onChange={(e) => setGeneralQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask any question..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button
                  onClick={sendGeneralQuestion}
                  disabled={loadingGeneral || !generalQuestion.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {loadingGeneral ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Asking...</span>
                    </>
                  ) : (
                    'Ask'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {alertCards.map((card) => (
            <div
              key={card.type}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:bg-white/20 transition-all duration-300"
            >
              {card.icon}
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-white/70 text-sm mb-4">
                {card.description}
              </p>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={questions[card.type] || ''}
                  onChange={(e) => handleQuestionChange(card.type, e.target.value)}
                  placeholder="Enter your question..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                
                <button
                  onClick={() => sendAlert(card.type)}
                  disabled={loadingCards[card.type] || !questions[card.type]?.trim()}
                  className="w-full px-4 py-2 bg-white/20 rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingCards[card.type] ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Send Alert'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveCard('custom')}
          disabled={Object.values(loadingCards).some(Boolean) || loadingGeneral}
          className="fixed bottom-8 right-8 bg-white text-violet-600 rounded-full p-4 shadow-lg hover:bg-violet-100 transition-all duration-300 disabled:opacity-50"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <Dialog.Root open={showResponse !== null} onOpenChange={() => setShowResponse(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh] bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-4 flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-white">Response</Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
              {showResponse && responses[showResponse] && (
                <div className="prose prose-invert prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-white" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 text-white" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 text-white" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 text-white/90 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="mb-4 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="mb-4 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-white/90" {...props} />,
                      code: ({node, inline, ...props}) => 
                        inline ? (
                          <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-white" {...props} />
                        ) : (
                          <code className="block bg-white/10 p-4 rounded-lg mb-4 overflow-x-auto text-sm text-white" {...props} />
                        ),
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-white/20 pl-4 italic my-4 text-white/80" {...props} />
                      ),
                    }}
                  >
                    {responses[showResponse]}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
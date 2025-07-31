import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIQueryInterface = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const mockMessages = [
    {
      id: 1,
      type: 'user',
      content: 'What is the revenue growth trend for the last 5 years?',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      type: 'ai',
      content: `Based on the financial data analysis, here's the revenue growth trend for the last 5 years:\n\n• 2019: ₹1,85,000 Cr (Base year)\n• 2020: ₹1,98,000 Cr (+7.0% growth)\n• 2021: ₹2,15,000 Cr (+8.6% growth)\n• 2022: ₹2,32,000 Cr (+7.9% growth)\n• 2023: ₹2,45,670 Cr (+5.9% growth)\n\nKey insights:\n✓ Consistent positive growth across all years\n✓ Average annual growth rate: 7.3%\n✓ Total growth over 5 years: 32.8%\n✓ Growth rate has moderated in recent years but remains healthy`,
      timestamp: new Date(Date.now() - 3590000)
    },
    {
      id: 3,
      type: 'user',content: 'How does our debt-to-equity ratio compare to industry standards?',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: 'ai',
      content: `Your current debt-to-equity ratio analysis:\n\n**Current Ratio: 0.45**\n**Industry Average: 0.65**\n**Industry Best Practice: <0.50**\n\n**Assessment:**\n✅ **Excellent** - Your ratio is significantly below industry average\n✅ **Low Risk** - Conservative debt management approach\n✅ **Strong Position** - Better than 75% of industry peers\n\n**Implications:**\n• Lower financial risk profile\n• Potential for strategic leverage if needed\n• Strong creditworthiness for future financing\n• May indicate conservative growth strategy`,
      timestamp: new Date(Date.now() - 1790000)
    }
  ];

  const suggestedQueries = [
    "What are the key financial ratios and how do they compare to benchmarks?",
    "Analyze the asset composition and liquidity position",
    "Show me the quarterly performance trends",
    "What is the return on equity trend over the years?",
    "Compare our growth metrics with industry peers",
    "Identify potential financial risks and opportunities"
  ];

  const recentQueries = [
    "Revenue growth analysis for Q4 2023",
    "Asset turnover ratio calculation",
    "Cash flow statement insights",
    "Working capital management review",
    "Profitability margin trends"
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I've analyzed your query: "${query}"\n\nBased on the current financial data, here are the key insights:\n\n• Analysis shows positive trends in the requested metrics\n• Data indicates strong performance compared to industry benchmarks\n• Recommendations include continued monitoring of key indicators\n• Consider reviewing quarterly reports for detailed breakdowns\n\nWould you like me to dive deeper into any specific aspect of this analysis?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestedQuery = (suggestedQuery) => {
    setQuery(suggestedQuery);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="glass-morphic rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Bot" size={20} />
          <span>AI Financial Assistant</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconSize={16}
          onClick={() => setMessages([])}
        >
          Clear
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 max-h-96">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Ask me anything about your financial data</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-surface border border-glass-border'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {message.type === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Bot" size={14} color="white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-glass-border p-4 rounded-lg max-w-[80%]">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Icon name="Bot" size={14} color="white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Query Input */}
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask about financial data, ratios, trends..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
              disabled={isLoading}
            />
          </div>
          <Button
            variant="default"
            onClick={handleSendQuery}
            disabled={!query.trim() || isLoading}
            loading={isLoading}
            iconName="Send"
            iconSize={16}
          >
            Send
          </Button>
        </div>

        {/* Suggested Queries */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Suggested Questions</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {suggestedQueries.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuery(suggestion)}
                className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-glass-hover rounded-lg transition-all duration-200"
              >
                <Icon name="Lightbulb" size={14} className="inline mr-2" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Recent Queries</label>
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {recentQueries.slice(0, 3).map((recent, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuery(recent)}
                className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-glass-hover rounded-lg transition-all duration-200"
              >
                <Icon name="Clock" size={14} className="inline mr-2" />
                {recent}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQueryInterface;
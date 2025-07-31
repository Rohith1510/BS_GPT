import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QueryTemplates from './components/QueryTemplates';
import QueryHistory from './components/QueryHistory';
import QueryInput from './components/QueryInput';
import ChatMessage from './components/ChatMessage';
import LoadingIndicator from './components/LoadingIndicator';
import ContextSuggestions from './components/ContextSuggestions';

const AIQueryInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [currentContext, setCurrentContext] = useState('');
  const messagesEndRef = useRef(null);

  // Mock suggestions for auto-complete
  const suggestions = [
    "What was the total revenue for the last fiscal year?",
    "Show me revenue growth trends over the past 3 years",
    "Compare revenue by quarters for 2024",
    "Calculate year-over-year growth rate",
    "Show me the fastest growing business segments",
    "Compare assets vs liabilities over time",
    "What is our net profit margin trend?",
    "Show EBITDA performance over quarters",
    "Calculate return on equity (ROE)",
    "Analyze cost structure changes"
  ];

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      type: 'ai',
      content: `Welcome to BalanceSheet GPT! I'm your AI financial analyst assistant.\n\nI can help you analyze your financial data, create visualizations, and provide insights. Here are some things you can ask me:\n\n• Revenue and growth analysis\n• Financial ratio calculations\n• Comparative analysis across periods\n• Asset and liability breakdowns\n• Profitability trends\n\nFeel free to ask me anything about your financial data in natural language!`,
      timestamp: new Date(),
      confidence: 1.0,
      suggestions: [
        "Show me revenue trends",
        "Calculate key ratios",
        "Compare this year vs last year"
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Mock AI response generator
  const generateAIResponse = async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Mock response based on query content
    let response = {
      id: Date.now().toString(),
      type: 'ai',
      content: '',
      timestamp: new Date(),
      confidence: 0.85 + Math.random() * 0.15,
      charts: [],
      tables: [],
      suggestions: []
    };

    if (query.toLowerCase().includes('revenue')) {
      response.content = `Based on your financial data analysis, here are the revenue insights:\n\nTotal revenue for FY 2024: ₹45.2 crores (up 18.5% from previous year)\nQ4 2024 showed the strongest performance with ₹13.8 crores in revenue.\n\nKey highlights:\n• Product sales contributed 68% of total revenue\n• Service revenue grew by 24% year-over-year\n• International markets now represent 32% of total revenue`;
      
      response.charts = [{
        type: 'bar',
        title: 'Quarterly Revenue Breakdown (₹ Crores)',
        data: [
          { name: 'Q1 2024', value: 9.8 },
          { name: 'Q2 2024', value: 11.2 },
          { name: 'Q3 2024', value: 10.4 },
          { name: 'Q4 2024', value: 13.8 }
        ]
      }];

      response.suggestions = [
        "What drove the Q4 revenue spike?",
        "Compare with industry benchmarks",
        "Show revenue by product line"
      ];
    } else if (query.toLowerCase().includes('growth')) {
      response.content = `Growth Analysis Summary:\n\nYear-over-Year Growth Rate: 18.5%\nCompound Annual Growth Rate (3-year): 15.2%\n\nGrowth drivers:\n• New product launches contributed 6.2% growth\n• Market expansion added 4.8% growth\n• Operational efficiency improvements: 3.1%\n• Price optimization: 4.4%`;
      
      response.charts = [{
        type: 'line',
        title: 'Revenue Growth Trend (₹ Crores)',
        data: [
          { name: '2022', value: 32.1 },
          { name: '2023', value: 38.2 },
          { name: '2024', value: 45.2 }
        ]
      }];

      response.suggestions = [
        "What are the growth projections?",
        "Analyze growth by segment",
        "Compare with competitors"
      ];
    } else if (query.toLowerCase().includes('ratio') || query.toLowerCase().includes('calculate')) {
      response.content = `Key Financial Ratios Analysis:\n\nLiquidity Ratios:\n• Current Ratio: 2.34 (Healthy)\n• Quick Ratio: 1.87 (Good)\n• Cash Ratio: 0.92 (Adequate)\n\nProfitability Ratios:\n• Gross Profit Margin: 42.3%\n• Net Profit Margin: 18.7%\n• Return on Equity (ROE): 22.4%\n• Return on Assets (ROA): 15.8%`;
      
      response.tables = [{
        title: 'Financial Ratios Comparison',
        headers: ['Ratio', 'Current Year', 'Previous Year', 'Industry Avg'],
        rows: [
          ['Current Ratio', '2.34', '2.18', '2.10'],
          ['ROE (%)', '22.4', '19.8', '18.5'],
          ['Debt-to-Equity', '0.45', '0.52', '0.60'],
          ['Asset Turnover', '1.24', '1.18', '1.15']
        ]
      }];

      response.suggestions = [
        "What improved our ratios?",
        "Compare with sector leaders",
        "Show ratio trends over 5 years"
      ];
    } else if (query.toLowerCase().includes('asset') || query.toLowerCase().includes('liabilit')) {
      response.content = `Assets vs Liabilities Analysis:\n\nTotal Assets: ₹78.5 crores\nTotal Liabilities: ₹35.2 crores\nShareholders' Equity: ₹43.3 crores\n\nAsset Composition:\n• Current Assets: 45% (₹35.3 crores)\n• Fixed Assets: 42% (₹33.0 crores)\n• Investments: 13% (₹10.2 crores)\n\nLiability Structure:\n• Current Liabilities: 58% (₹20.4 crores)\n• Long-term Debt: 32% (₹11.3 crores)\n• Other Liabilities: 10% (₹3.5 crores)`;
      
      response.charts = [{
        type: 'pie',
        title: 'Asset Distribution',
        data: [
          { name: 'Current Assets', value: 35.3 },
          { name: 'Fixed Assets', value: 33.0 },
          { name: 'Investments', value: 10.2 }
        ]
      }];

      response.suggestions = [
        "Analyze asset utilization",
        "Show liability maturity profile",
        "Compare asset quality metrics"
      ];
    } else {
      response.content = `I've analyzed your query about "${query}".\n\nBased on the available financial data, I can provide insights on various aspects of your company's performance. However, I need more specific information to give you the most relevant analysis.\n\nCould you please specify what particular aspect you'd like me to focus on? For example:\n• Specific time periods\n• Particular financial metrics\n• Comparison criteria\n• Business segments of interest`;
      
      response.suggestions = [
        "Show me revenue trends",
        "Calculate profitability ratios",
        "Compare quarterly performance",
        "Analyze cash flow patterns"
      ];
    }

    return response;
  };

  const handleSubmitQuery = async (query) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Add to history
    const historyItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date()
    };
    setQueryHistory(prev => [historyItem, ...prev.slice(0, 19)]); // Keep last 20 queries
    
    // Update context
    setCurrentContext(query);
    
    try {
      const aiResponse = await generateAIResponse(query);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error while processing your query. Please try again or rephrase your question.',
        timestamp: new Date(),
        confidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    handleSubmitQuery(template);
  };

  const handleSelectHistoryQuery = (query) => {
    handleSubmitQuery(query);
  };

  const handleFollowUp = (suggestion) => {
    handleSubmitQuery(suggestion);
  };

  const handleClearHistory = () => {
    setQueryHistory([]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setCurrentContext('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Layout */}
      <div className="flex h-screen pt-16">
        {/* Left Sidebar */}
        <div className={`${leftSidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 border-r border-glass-border glass-morphic flex-shrink-0`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-glass-border flex items-center justify-between">
              {!leftSidebarCollapsed && (
                <h2 className="text-lg font-semibold text-foreground">Query Tools</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
                className="glass-hover"
              >
                <Icon name={leftSidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <QueryTemplates 
                onSelectTemplate={handleSelectTemplate}
                isCollapsed={leftSidebarCollapsed}
              />
              
              <div className="border-t border-glass-border pt-6">
                <QueryHistory
                  history={queryHistory}
                  onSelectQuery={handleSelectHistoryQuery}
                  onClearHistory={handleClearHistory}
                  isCollapsed={leftSidebarCollapsed}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-glass-border glass-morphic">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="Bot" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">AI Financial Assistant</h1>
                  <p className="text-sm text-muted-foreground">Ask me anything about your financial data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearChat}
                  className="glass-morphic glass-hover border-glass-border"
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Clear Chat
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFollowUp={handleFollowUp}
                />
              ))}
              
              {isLoading && <LoadingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Query Input */}
          <div className="p-6 border-t border-glass-border glass-morphic">
            <div className="max-w-4xl mx-auto">
              <QueryInput
                onSubmitQuery={handleSubmitQuery}
                isLoading={isLoading}
                suggestions={suggestions}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`${rightSidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 border-l border-glass-border glass-morphic flex-shrink-0`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-glass-border flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                className="glass-hover"
              >
                <Icon name={rightSidebarCollapsed ? "ChevronLeft" : "ChevronRight"} size={16} />
              </Button>
              {!rightSidebarCollapsed && (
                <h2 className="text-lg font-semibold text-foreground">Smart Insights</h2>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <ContextSuggestions
                suggestions={[]}
                onSelectSuggestion={handleFollowUp}
                currentContext={currentContext}
                isCollapsed={rightSidebarCollapsed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQueryInterface;
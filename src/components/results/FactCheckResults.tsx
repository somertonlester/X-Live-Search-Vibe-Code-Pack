import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, LinkIcon, User, ExternalLink, Flag } from 'lucide-react';

interface FactCheckResultsProps {
  query: string;
}

export const FactCheckResults: React.FC<FactCheckResultsProps> = ({ query }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-semibold">Recent Claims Analysis</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {factCheckItems.map((item, index) => (
            <FactCheckItem 
              key={index}
              claim={item.claim}
              verdict={item.verdict}
              explanation={item.explanation}
              sources={item.sources}
              author={item.author}
              date={item.date}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-electricCyan" />
              <span>Source Credibility</span>
            </h2>
          </div>
          
          <div className="p-5 space-y-4">
            {sourceCredibility.map((source, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  {source.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{source.name}</h3>
                    <a href="#" className="text-electricCyan">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getCredibilityColor(source.score)}`}
                        style={{ width: `${source.score}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium">
                      {source.score}/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="text-xs text-white/50 mb-2">Credibility Score Legend:</div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>80-100: High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>50-79: Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>0-49: Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <Flag className="w-5 h-5 text-electricCyan" />
              <span>Common Misinformation Flags</span>
            </h2>
          </div>
          
          <div className="p-5">
            <div className="space-y-3">
              {misinformationFlags.map((flag, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        flag.severity === 'high' 
                          ? 'bg-red-500/20 text-red-500' 
                          : flag.severity === 'medium'
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-blue-500/20 text-blue-500'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">{flag.title}</h3>
                      <p className="text-sm text-white/70 mb-2">{flag.description}</p>
                      <div className="text-xs text-white/50">
                        Instances detected: <span className="text-white font-medium">{flag.instances}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center gap-1 text-electricCyan border border-electricCyan/30 rounded-lg py-2 hover:bg-electricCyan/10 transition-all duration-200">
              <span>View misinformation tracking guide</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FactCheckItemProps {
  claim: string;
  verdict: 'true' | 'false' | 'mixed' | 'unverified';
  explanation: string;
  sources: { name: string; url: string }[];
  author: string;
  date: string;
}

const FactCheckItem: React.FC<FactCheckItemProps> = ({ 
  claim, 
  verdict, 
  explanation, 
  sources, 
  author, 
  date 
}) => {
  const getVerdictLabel = () => {
    switch (verdict) {
      case 'true': return 'True';
      case 'false': return 'False';
      case 'mixed': return 'Partly True';
      case 'unverified': return 'Unverified';
      default: return 'Unknown';
    }
  };
  
  const getVerdictIcon = () => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'false': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'mixed': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'unverified': return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };
  
  const getVerdictColor = () => {
    switch (verdict) {
      case 'true': return 'bg-green-500/20 text-green-500';
      case 'false': return 'bg-red-500/20 text-red-500';
      case 'mixed': return 'bg-amber-500/20 text-amber-500';
      case 'unverified': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold mb-3">"{claim}"</h3>
          
          <div className="mb-4 flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${getVerdictColor()}`}>
              {getVerdictIcon()}
              <span className="font-medium">{getVerdictLabel()}</span>
            </div>
          </div>
          
          <p className="text-white/80 mb-4">{explanation}</p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-electricCyan" />
              <span>Sources</span>
            </h4>
            
            <div className="space-y-1">
              {sources.map((source, index) => (
                <a 
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-electricCyan hover:underline"
                >
                  {source.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="space-y-3">
              <VerdictMeter value={getVerdictPercentage(verdict)} type={verdict} />
              
              <div className="pt-3 border-t border-white/10 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/70">Fact checked by:</span>
                  <span>{author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Date:</span>
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VerdictMeterProps {
  value: number;
  type: 'true' | 'false' | 'mixed' | 'unverified';
}

const VerdictMeter: React.FC<VerdictMeterProps> = ({ value, type }) => {
  const getColor = () => {
    switch (type) {
      case 'true': return 'text-green-500';
      case 'false': return 'text-red-500';
      case 'mixed': return 'text-amber-500';
      case 'unverified': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'true': return 'from-green-500/20 to-green-500/5';
      case 'false': return 'from-red-500/20 to-red-500/5';
      case 'mixed': return 'from-amber-500/20 to-amber-500/5';
      case 'unverified': return 'from-blue-500/20 to-blue-500/5';
      default: return 'from-gray-500/20 to-gray-500/5';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="10" 
            strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
            strokeDashoffset="70.75"
            className={`${getColor()} opacity-20 transition-all duration-1000`}
            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="10" 
            strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
            strokeDashoffset="70.75"
            className={getColor()}
            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`text-2xl font-bold ${getColor()}`}>{value}%</span>
        </div>
      </div>
      <div className="text-sm font-medium mt-2">Truth Score</div>
    </div>
  );
};

const getVerdictPercentage = (verdict: 'true' | 'false' | 'mixed' | 'unverified'): number => {
  switch (verdict) {
    case 'true': return 95;
    case 'false': return 5;
    case 'mixed': return 60;
    case 'unverified': return 50;
    default: return 0;
  }
};

const factCheckItems = [
  {
    claim: "The recent economic policy changes have resulted in a 30% increase in job creation compared to last year.",
    verdict: 'mixed' as const,
    explanation: "Our analysis shows that while job creation has increased, the actual figure is closer to 15% rather than the claimed 30%. The growth is also not uniform across sectors, with technology and healthcare seeing stronger gains than manufacturing and retail.",
    sources: [
      { name: "Bureau of Labor Statistics Report (May 2024)", url: "#" },
      { name: "Economic Analysis Institute Study", url: "#" },
      { name: "Industry Employment Trends Q2 2024", url: "#" }
    ],
    author: "Economic Analysis Team",
    date: "June 15, 2024"
  },
  {
    claim: "The new healthcare legislation will cause millions to lose their current insurance coverage immediately.",
    verdict: 'false' as const,
    explanation: "The legislation contains explicit protection clauses for existing insurance plans, and transition periods of at least 18 months for any required changes. There is no mechanism in the law that would cause immediate loss of coverage for any significant population.",
    sources: [
      { name: "Full Text of Healthcare Act 2024", url: "#" },
      { name: "Congressional Budget Office Assessment", url: "#" },
      { name: "Health Policy Research Institute Analysis", url: "#" }
    ],
    author: "Healthcare Policy Team",
    date: "June 12, 2024"
  },
  {
    claim: "The recent climate agreement has been ratified by all major industrial nations.",
    verdict: 'true' as const,
    explanation: "As of June 10, 2024, all G20 nations have formally ratified the International Climate Accord, with the final ratification coming from Brazil on June 8. This represents all major industrial economies as defined by global carbon emissions and GDP.",
    sources: [
      { name: "United Nations Climate Agreement Registry", url: "#" },
      { name: "Official Ratification Statements Database", url: "#" },
      { name: "Climate Action Tracker", url: "#" }
    ],
    author: "Environmental Policy Team",
    date: "June 10, 2024"
  }
];

const sourceCredibility = [
  {
    name: "National Science Foundation",
    score: 94,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  {
    name: "Economic Research Institute",
    score: 87,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  {
    name: "Global News Network",
    score: 72,
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
  },
  {
    name: "Policy Insights Blog",
    score: 58,
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
  },
  {
    name: "Daily Political Commentary",
    score: 34,
    icon: <XCircle className="w-5 h-5 text-red-500" />
  }
];

const getCredibilityColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-500';
};

const misinformationFlags = [
  {
    title: "Out-of-Context Statistics",
    description: "Numbers presented without proper context or comparison baselines",
    instances: 24,
    severity: 'high' as const
  },
  {
    title: "Misleading Causation Claims",
    description: "Correlation presented as direct causation without evidence",
    instances: 18,
    severity: 'medium' as const
  },
  {
    title: "Unverified Sources",
    description: "Claims attributed to vague or unidentifiable experts or studies",
    instances: 31,
    severity: 'high' as const
  },
  {
    title: "Outdated Information",
    description: "Old data presented as current without updates or context",
    instances: 13,
    severity: 'low' as const
  }
];
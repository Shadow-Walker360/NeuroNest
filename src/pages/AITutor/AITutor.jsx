import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import Button  from '../../components/ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './AITutor.css';

const TOPICS = [
  { emoji:'🧮', label:'Calculus' },
  { emoji:'⚗️', label:'Chemistry' },
  { emoji:'💻', label:'Algorithms' },
  { emoji:'🌍', label:'History' },
  { emoji:'🧬', label:'Biology' },
  { emoji:'📐', label:'Physics' },
];

const WEAK_AREAS = [
  { label:'Partial Fractions', pct:32, color:'var(--rose)' },
  { label:'Nucleophilic Sub.', pct:48, color:'var(--sky)' },
  { label:'Graph Theory', pct:61, color:'var(--lavender)' },
  { label:'Thermodynamics', pct:73, color:'var(--amber)' },
];

const SUGGESTIONS = [
  'Explain integration by parts',
  'Give me 5 practice questions on calculus',
  'What are my weakest topics?',
  'Create a study plan for this week',
  'Generate flashcards on organic chemistry',
  'Predict my exam score',
];

const AI_RESPONSES = {
  default: [
    "Great question! Let me break this down step by step.\n\nBased on your recent performance, I'll tailor my explanation to fill in the gaps I've identified in your understanding. Here's what you need to know:",
    "I've analysed your last 7 sessions and noticed you're strong in conceptual understanding but need more practice with numerical problems. Let me give you a targeted explanation.",
    "This is a topic where 68% of students at your level struggle. Here's the clearest way to understand it, using the approach that works best for your learning style:",
    "Based on your curriculum (Kenya CBC, Senior Secondary), here's how this concept appears in your exams and exactly what the examiner is looking for:",
  ],
  flashcards: "I've generated 10 personalised flashcards based on your weak areas:\n\n📌 Card 1: What is the product of a nucleophilic substitution (SN2) reaction?\n📌 Card 2: Define integration by parts and state the formula.\n📌 Card 3: What is the time complexity of Dijkstra's algorithm?\n\n...and 7 more. Want me to start a spaced-repetition session now? 🎯",
  studyplan: "Here's your AI-generated study plan for this week:\n\n📅 Monday: Calculus — Partial Fractions (45 min) + 10 practice problems\n📅 Tuesday: Chemistry — Nucleophilic Substitution review + past paper questions\n📅 Wednesday: Rest + light flashcard review (20 min)\n📅 Thursday: Algorithms — Graph traversal implementation + quiz\n📅 Friday: Full mock exam under timed conditions\n\nWant me to add this to your calendar? 📆",
  quiz: "Starting your personalised quiz! Based on your weak areas, I've chosen 5 questions:\n\n**Q1:** Evaluate ∫x·ln(x)dx\n\nA) x²ln(x)/2 - x²/4 + C\nB) x·ln(x) - x + C  \nC) ln(x²)/2 + C\nD) x²/2·ln(x) - x²/4 + C\n\nType A, B, C, or D to answer, then I'll give you instant feedback! ⚡",
};

let aiIdx = 0;

export default function AITutor() {
  const { toast } = useToast();
  const [activeTopic, setActiveTopic] = useState('Calculus');
  const [messages, setMessages]       = useState([{
    role: 'ai',
    text: "Hello! I'm your LearnVerse AI tutor 🤖\n\nI've analysed your recent sessions and I know you're working on Calculus II (Integration by Parts) and want to improve your Chemistry score before your KCSE exams.\n\nWhat would you like to work on today?",
  }]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId]         = useState(`session_${Date.now()}`);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, typing]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
  };

  const getAIResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('flashcard')) return AI_RESPONSES.flashcards;
    if (lower.includes('study plan') || lower.includes('week')) return AI_RESPONSES.studyplan;
    if (lower.includes('quiz') || lower.includes('practice') || lower.includes('question')) return AI_RESPONSES.quiz;
    return AI_RESPONSES.default[aiIdx++ % AI_RESPONSES.default.length];
  };

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(p => [...p, { role:'user', text:msg }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setTyping(true);
    // Simulate API call to /api/ai/chat
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { role:'ai', text: getAIResponse(msg) }]);
    }, 1400 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleFlashcards = () => { toast.info('Generating Flashcards', 'Creating 10 personalised flashcards from your weak areas…'); sendMessage('Generate flashcards for my weak areas'); };
  const handleQuiz       = () => { sendMessage('Give me a practice quiz on my weak areas'); };
  const handleStudyPlan  = () => { sendMessage('Create a study plan for this week'); };

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div className="ai-tutor-page">

          <div className="ai-tutor-layout">
            {/* SIDEBAR */}
            <div className="ai-sidebar">
              {/* Topics */}
              <div className="ai-sidebar-card">
                <div className="ai-sidebar-title">Topics</div>
                {TOPICS.map(t => (
                  <button key={t.label} className={`ai-topic-btn ${activeTopic === t.label ? 'active' : ''}`} onClick={() => { setActiveTopic(t.label); sendMessage(`Let's work on ${t.label}`); }}>
                    <span>{t.emoji}</span>{t.label}
                  </button>
                ))}
              </div>

              {/* Weak areas */}
              <div className="ai-sidebar-card">
                <div className="ai-sidebar-title">Weak Areas</div>
                {WEAK_AREAS.map(w => (
                  <div key={w.label} className="ai-weak-area">
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, fontWeight:600, marginBottom:5, color:'var(--text-b)' }}>{w.label}</div>
                      <div className="ai-weak-bar"><div className="ai-weak-fill" style={{ width:`${w.pct}%`, background:w.color, transition:'width 1s ease' }}/></div>
                    </div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:w.color, marginLeft:8 }}>{w.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="ai-sidebar-card">
                <div className="ai-sidebar-title">Quick Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Button variant="secondary" size="sm" fullWidth onClick={handleFlashcards}>🃏 Generate Flashcards</Button>
                  <Button variant="secondary" size="sm" fullWidth onClick={handleQuiz}>📝 Start Quiz</Button>
                  <Button variant="secondary" size="sm" fullWidth onClick={handleStudyPlan}>📅 Study Plan</Button>
                </div>
              </div>
            </div>

            {/* CHAT */}
            <div className="ai-chat-container">
              <div className="ai-chat-header">
                <div className="ai-chat-header-title">
                  <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#F59E0B,#F97316)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,color:'#000' }}>AI</div>
                  LearnVerse AI Tutor
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span className="badge badge-emerald" style={{ fontSize:9, display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ width:5,height:5,borderRadius:'50%',background:'var(--emerald)',display:'block' }}/>ONLINE
                  </span>
                  <span style={{ fontSize:11,color:'var(--text-b)' }}>Topic: {activeTopic}</span>
                </div>
              </div>

              <div className="ai-chat-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`ai-msg ${m.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
                    <div className="ai-msg-av" style={{
                      background: m.role === 'ai' ? 'linear-gradient(135deg,#F59E0B,#F97316)' : 'var(--surface-c)',
                      border: m.role === 'user' ? '1px solid var(--border)' : 'none',
                    }}>
                      {m.role === 'ai' ? 'AI' : 'Me'}
                    </div>
                    <div className="ai-msg-bubble" style={{ whiteSpace:'pre-line' }}>{m.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="ai-msg ai-msg">
                    <div className="ai-msg-av" style={{ background:'linear-gradient(135deg,#F59E0B,#F97316)' }}>AI</div>
                    <div className="ai-msg-bubble" style={{ display:'flex', alignItems:'center', gap:5 }}>
                      {[0,0.2,0.4].map((d,i) => (
                        <span key={i} style={{ width:6,height:6,borderRadius:'50%',background:'var(--amber)',display:'block',animation:`bounce3 1.2s ease ${d}s infinite` }}/>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>

              {/* Suggestion chips */}
              <div className="ai-suggestion-chips">
                {SUGGESTIONS.map(s => (
                  <span key={s} className="ai-chip" onClick={() => sendMessage(s)}>{s}</span>
                ))}
              </div>

              <div className="ai-chat-input-area">
                <textarea
                  ref={textareaRef}
                  className="ai-chat-input"
                  value={input}
                  onChange={e => { setInput(e.target.value); autoResize(); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything — explain a concept, request a quiz, or ask for a study plan… (Enter to send, Shift+Enter for new line)"
                  rows={1}
                />
                <button className="ai-send-btn" onClick={() => sendMessage()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
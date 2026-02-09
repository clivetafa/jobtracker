import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Upload, Briefcase, CheckCircle, XCircle, Users, Clock, Sparkles, 
  MapPin, Search, Filter, Download, BarChart, Calendar, Mail,
  Linkedin, Globe, Phone, FileText, Star, TrendingUp, Award
} from 'lucide-react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobTrackerJobs');
    return savedJobs ? JSON.parse(savedJobs) : [
      {
        id: 1,
        company: 'Takealot',
        position: 'Senior Frontend Developer',
        status: 'interview',
        date: 'Jan 15, 2024',
        location: 'Cape Town, Western Cape',
        salary: 'R850k - R1.2m',
        notes: 'Technical interview scheduled for next week',
        contact: 'hr@takealot.com',
        url: 'https://takealot.com/careers',
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js']
      },
      {
        id: 2,
        company: 'Naspers',
        position: 'Full Stack Engineer',
        status: 'applied',
        date: 'Jan 18, 2024',
        location: 'Stellenbosch, Western Cape',
        salary: 'R800k - R1.1m',
        notes: 'Waiting for response',
        contact: 'careers@naspers.com',
        url: 'https://naspers.com/careers',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS']
      },
      {
        id: 3,
        company: 'Yoco',
        position: 'React Developer',
        status: 'accepted',
        date: 'Jan 10, 2024',
        location: 'Johannesburg, Gauteng',
        salary: 'R750k - R950k',
        notes: 'Offer accepted! Starting March 1st',
        contact: 'talent@yoco.com',
        url: 'https://yoco.com/careers',
        skills: ['React', 'Redux', 'JavaScript', 'CSS']
      },
      {
        id: 4,
        company: 'MTN',
        position: 'Software Engineer',
        status: 'rejected',
        date: 'Jan 5, 2024',
        location: 'Pretoria, Gauteng',
        salary: 'R900k - R1.4m',
        notes: 'Not enough senior experience',
        contact: 'recruitment@mtn.com',
        url: 'https://mtn.com/careers',
        skills: ['Java', 'Spring', 'MySQL', 'Docker']
      },
      {
        id: 5,
        company: 'MultiChoice',
        position: 'UI Engineer',
        status: 'interview',
        date: 'Jan 20, 2024',
        location: 'Randburg, Gauteng',
        salary: 'R950k - R1.3m',
        notes: 'Second round interview scheduled',
        contact: 'jobs@multichoice.co.za',
        url: 'https://multichoice.co.za/careers',
        skills: ['React', 'UI/UX', 'Figma', 'TypeScript']
      },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [cvFile, setCvFile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    status: 'applied',
    location: '',
    salary: '',
    notes: ''
  });

  // Save to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobTrackerJobs', JSON.stringify(jobs));
  }, [jobs]);

  const stats = [
    { title: 'Total Applications', value: jobs.length.toString(), icon: Briefcase, color: 'bg-blue-500', change: '+2 this month' },
    { title: 'Applied', value: jobs.filter(j => j.status === 'applied').length.toString(), icon: Clock, color: 'bg-yellow-500', change: 'Pending review' },
    { title: 'Interviews', value: jobs.filter(j => j.status === 'interview').length.toString(), icon: Users, color: 'bg-purple-500', change: 'Active' },
    { title: 'Rejected', value: jobs.filter(j => j.status === 'rejected').length.toString(), icon: XCircle, color: 'bg-red-500', change: 'Learn & improve' },
    { title: 'Accepted', value: jobs.filter(j => j.status === 'accepted').length.toString(), icon: CheckCircle, color: 'bg-green-500', change: 'Congratulations!' },
  ];

  const southAfricanCompanies = [
    'Takealot', 'Naspers', 'Yoco', 'MTN', 'MultiChoice', 'Woolworths', 'Discovery',
    'Sanlam', 'Old Mutual', 'Standard Bank', 'Absa', 'FNB', 'Nedbank', 'Vodacom',
    'Capitec', 'Bidvest', 'Shoprite', 'Pick n Pay', 'Spar', 'Mr Price', 'Truworths',
    'Massmart', 'Dis-Chem', 'Clicks', 'Mediclinic', 'Netcare', 'Life Healthcare'
  ];

  const southAfricanLocations = [
    'Cape Town, Western Cape', 'Johannesburg, Gauteng', 'Pretoria, Gauteng',
    'Durban, KwaZulu-Natal', 'Stellenbosch, Western Cape', 'Sandton, Gauteng',
    'Randburg, Gauteng', 'Centurion, Gauteng', 'Port Elizabeth, Eastern Cape',
    'Bloemfontein, Free State', 'Polokwane, Limpopo', 'Nelspruit, Mpumalanga'
  ];

  const positions = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
    'DevOps Engineer', 'Mobile Developer', 'UI/UX Designer',
    'Data Scientist', 'Product Manager', 'Software Architect'
  ];

  const getStatusColor = (status) => {
    const colors = {
      applied: 'status-applied',
      interview: 'status-interview',
      rejected: 'status-rejected',
      accepted: 'status-accepted',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = () => {
    if (!newJob.company || !newJob.position || !newJob.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const jobToAdd = {
      id: Date.now(),
      company: newJob.company,
      position: newJob.position,
      status: newJob.status,
      date: new Date().toLocaleDateString('en-ZA', { 
        day: 'numeric',
        month: 'short', 
        year: 'numeric' 
      }),
      location: newJob.location,
      salary: newJob.salary || 'R600k - R900k',
      notes: newJob.notes || '',
      contact: '',
      url: '',
      skills: []
    };

    setJobs([jobToAdd, ...jobs]);
    setShowAddModal(false);
    setNewJob({ company: '', position: '', status: 'applied', location: '', salary: '', notes: '' });
    toast.success(`Added application at ${jobToAdd.company}`);
  };

  const handleDeleteJob = (id) => {
    const jobToDelete = jobs.find(job => job.id === id);
    if (window.confirm(`Delete application at ${jobToDelete.company}?`)) {
      setJobs(jobs.filter(job => job.id !== id));
      toast.error(`Removed application at ${jobToDelete.company}`);
    }
  };

  const handleEditJob = (job) => {
    const newCompany = prompt('Enter new company name:', job.company);
    if (newCompany) {
      setJobs(jobs.map(j => j.id === job.id ? {...j, company: newCompany} : j));
      toast.success('Company name updated');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
    toast.success('Status updated!');
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      toast.success('CV uploaded successfully!');
      // Simulate AI analysis
      setTimeout(() => {
        toast.success('AI Analysis Complete! Check insights below.');
      }, 1500);
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jobtracker-data.json';
    link.click();
    toast.success('Data exported successfully!');
  };

  const handleGenerateReport = () => {
    const report = `
      JOB APPLICATION REPORT - ${new Date().toLocaleDateString()}
      ============================================
      Total Applications: ${jobs.length}
      Applied: ${jobs.filter(j => j.status === 'applied').length}
      Interviews: ${jobs.filter(j => j.status === 'interview').length}
      Accepted: ${jobs.filter(j => j.status === 'accepted').length}
      Rejected: ${jobs.filter(j => j.status === 'rejected').length}
      
      APPLICATIONS:
      ${jobs.map(job => `
      • ${job.company} - ${job.position}
        Status: ${job.status.toUpperCase()}
        Date: ${job.date}
        Location: ${job.location}
        Salary: ${job.salary}
      `).join('')}
      
      Generated by JobTracker AI 🇿🇦
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-report-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    toast.success('Report generated!');
  };

  const calculateSuccessRate = () => {
    const interviews = jobs.filter(j => j.status === 'interview').length;
    const accepted = jobs.filter(j => j.status === 'accepted').length;
    return interviews > 0 ? Math.round((accepted / interviews) * 100) : 0;
  };

  const getStatusCount = (status) => {
    return jobs.filter(job => job.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="logo">JT</div>
            <div>
              <h1>JobTracker</h1>
              <p className="tagline">AI-Powered Career Manager</p>
            </div>
          </div>
          <div className="navbar-actions">
            <button className="btn-secondary" onClick={handleExportData}>
              <Download size={16} /> Export
            </button>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add Job
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Welcome Header */}
        <div className="welcome-header">
          <div>
            <h1>Howzit, Clive! 🇿🇦</h1>
            <p>Track, analyze, and optimize your South African job search</p>
          </div>
          <div className="header-stats">
            <div className="stat-chip">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString('en-ZA')}</span>
            </div>
            <div className="stat-chip success">
              <TrendingUp size={14} />
              <span>{calculateSuccessRate()}% Success Rate</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-text">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                  <span className="stat-change">{stat.change}</span>
                </div>
                <div className={`stat-icon ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              {index === 0 && (
                <div className="stat-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(jobs.length / 20) * 100}%` }}
                    ></div>
                  </div>
                  <span>{jobs.length}/20 target</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="search-filter">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search companies, positions, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({jobs.length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'applied' ? 'active' : ''}`}
              onClick={() => setFilterStatus('applied')}
            >
              Applied ({getStatusCount('applied')})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'interview' ? 'active' : ''}`}
              onClick={() => setFilterStatus('interview')}
            >
              Interview ({getStatusCount('interview')})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'accepted' ? 'active' : ''}`}
              onClick={() => setFilterStatus('accepted')}
            >
              Accepted ({getStatusCount('accepted')})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilterStatus('rejected')}
            >
              Rejected ({getStatusCount('rejected')})
            </button>
          </div>
        </div>

        <div className="content-grid">
          {/* Job Table */}
          <div className="main-column">
            <div className="card">
              <div className="card-header">
                <h2>📋 Your Applications ({filteredJobs.length})</h2>
                <div className="card-actions">
                  <button className="btn-icon" onClick={handleGenerateReport}>
                    <BarChart size={18} /> Report
                  </button>
                  <button className="btn-icon">
                    <Filter size={18} /> Sort
                  </button>
                </div>
              </div>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-state">
                          <div className="empty-content">
                            <Briefcase size={48} />
                            <h3>No applications found</h3>
                            <p>Try changing your search or add a new job application</p>
                            <button 
                              className="btn-primary"
                              onClick={() => setShowAddModal(true)}
                            >
                              + Add Your First Job
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="table-row">
                          <td>
                            <div className="company-cell">
                              <div className="company-logo">
                                {job.company.charAt(0)}
                              </div>
                              <div>
                                <div className="company-name">{job.company}</div>
                                <div className="company-meta">
                                  {job.notes && <span>📝 {job.notes.substring(0, 20)}...</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="position-cell">
                              <div className="position-title">{job.position}</div>
                              {job.skills && job.skills.length > 0 && (
                                <div className="skill-tags">
                                  {job.skills.slice(0, 2).map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                  ))}
                                  {job.skills.length > 2 && (
                                    <span className="skill-tag">+{job.skills.length - 2}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <select
                              className={`status-select ${getStatusColor(job.status)}`}
                              value={job.status}
                              onChange={(e) => handleStatusChange(job.id, e.target.value)}
                            >
                              <option value="applied">Applied</option>
                              <option value="interview">Interview</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <div className="date-cell">
                              <Calendar size={14} />
                              {job.date}
                            </div>
                          </td>
                          <td>
                            <div className="location-cell">
                              <MapPin size={14} />
                              {job.location}
                            </div>
                          </td>
                          <td>
                            <div className="salary-cell">{job.salary}</div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="action-btn edit"
                                onClick={() => handleEditJob(job)}
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button 
                                className="action-btn delete"
                                onClick={() => handleDeleteJob(job.id)}
                                title="Delete"
                              >
                                🗑️
                              </button>
                              {job.url && (
                                <a 
                                  href={job.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="action-btn link"
                                  title="View Job"
                                >
                                  <Globe size={14} />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Insights Dashboard */}
            <div className="card">
              <div className="card-header">
                <h2>🧠 AI Insights Dashboard</h2>
                <span className="badge-premium">PRO</span>
              </div>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-icon success">
                    <TrendingUp size={20} />
                  </div>
                  <h3>Interview Success Rate</h3>
                  <div className="insight-value">{calculateSuccessRate()}%</div>
                  <p>Higher than SA average (65%)</p>
                </div>
                <div className="insight-card">
                  <div className="insight-icon warning">
                    <Star size={20} />
                  </div>
                  <h3>Top Skills Match</h3>
                  <div className="insight-value">92%</div>
                  <p>React, TypeScript, Node.js</p>
                </div>
                <div className="insight-card">
                  <div className="insight-icon info">
                    <Award size={20} />
                  </div>
                  <h3>Avg. Response Time</h3>
                  <div className="insight-value">7 days</div>
                  <p>Faster than industry average</p>
                </div>
                <div className="insight-card">
                  <div className="insight-card">
                    <div className="insight-icon purple">
                      <BarChart size={20} />
                    </div>
                    <h3>Salary Benchmark</h3>
                    <div className="insight-value">R950k</div>
                    <p>Above market average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* CV Analyzer */}
            <div className="card">
              <div className="card-header">
                <h3>📄 AI CV Analyzer</h3>
                <span className="badge">BETA</span>
              </div>
              <div className="cv-upload-area">
                <div className="upload-icon">
                  <Upload size={32} />
                </div>
                <p className="upload-text">Drop your CV here or click to upload</p>
                <p className="upload-subtext">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCVUpload}
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="btn-upload">
                  Choose File
                </label>
                {cvFile && (
                  <div className="file-info">
                    <FileText size={16} />
                    <span>{cvFile.name}</span>
                  </div>
                )}
              </div>
              <button className="btn-analyze">
                <Sparkles size={18} />
                Analyze with AI
              </button>

              <div className="cv-results">
                <h4>AI Recommendations:</h4>
                <ul>
                  <li>✅ Add more quantifiable achievements</li>
                  <li>✅ Include BEE credentials for SA market</li>
                  <li>⚠️  Add more TypeScript projects</li>
                  <li>📈 Highlight remote work experience</li>
                </ul>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3>⚡ Quick Actions</h3>
              <div className="quick-actions">
                <button className="quick-btn">
                  <Mail size={16} />
                  <span>Email Follow-ups</span>
                </button>
                <button className="quick-btn">
                  <Linkedin size={16} />
                  <span>LinkedIn Profile</span>
                </button>
                <button className="quick-btn">
                  <Calendar size={16} />
                  <span>Schedule Interview</span>
                </button>
                <button className="quick-btn">
                  <Phone size={16} />
                  <span>Practice Calls</span>
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="card">
              <h3>📅 Recent Activity</h3>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-icon interview">👥</div>
                  <div>
                    <p>Interview scheduled with MultiChoice</p>
                    <small>Today at 14:30</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon applied">📤</div>
                  <div>
                    <p>Application sent to Woolworths</p>
                    <small>Yesterday</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon accepted">🎉</div>
                  <div>
                    <p>Offer accepted from Yoco!</p>
                    <small>3 days ago</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Suggestions */}
            <div className="card">
              <h3>💼 Suggested Jobs</h3>
              <div className="job-suggestions">
                <div className="job-suggestion">
                  <div className="suggestion-logo">V</div>
                  <div>
                    <h4>Vodacom</h4>
                    <p>Senior React Developer</p>
                    <small>Midrand, Gauteng</small>
                  </div>
                  <button className="btn-apply">Apply</button>
                </div>
                <div className="job-suggestion">
                  <div className="suggestion-logo">C</div>
                  <div>
                    <h4>Capitec</h4>
                    <p>Full Stack Engineer</p>
                    <small>Stellenbosch, WC</small>
                  </div>
                  <button className="btn-apply">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">JT</div>
              <div>
                <h3>JobTracker AI</h3>
                <p>Your intelligent career companion</p>
              </div>
            </div>
            <div className="footer-stats">
              <div className="footer-stat">
                <strong>{jobs.length}</strong>
                <span>Applications</span>
              </div>
              <div className="footer-stat">
                <strong>{calculateSuccessRate()}%</strong>
                <span>Success Rate</span>
              </div>
              <div className="footer-stat">
                <strong>24/7</strong>
                <span>AI Support</span>
              </div>
            </div>
            <div className="footer-actions">
              <button className="btn-outline" onClick={handleExportData}>
                Export Data
              </button>
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                + Add New
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>🇿🇦 Made for South African Job Seekers • Data stored locally • AI-powered insights</p>
            <p className="copyright">© 2024 JobTracker AI • v1.0.0</p>
          </div>
        </footer>
      </main>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>➕ Add New Job Application</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  placeholder="e.g., Takealot, MTN, Naspers"
                  value={newJob.company}
                  onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Position *</label>
                <select
                  value={newJob.position}
                  onChange={(e) => setNewJob({...newJob, position: e.target.value})}
                >
                  <option value="">Select a position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newJob.status}
                  onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location *</label>
                <select
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                >
                  <option value="">Select location</option>
                  {southAfricanLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Salary Range (ZAR)</label>
                <input
                  type="text"
                  placeholder="e.g., R800k - R1.2m"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  placeholder="Any additional notes..."
                  value={newJob.notes}
                  onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddJob}>
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
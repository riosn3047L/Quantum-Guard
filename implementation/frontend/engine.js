// QuantumGuard Scoring Engine
// Calculates practice scores, dimension scores, overall score, maturity levels, risk multipliers, and compliance coverage.

const Engine = {};

// ═══════════════════════════════════════════════════
// STORAGE — localStorage persistence
// ═══════════════════════════════════════════════════
Engine.storage = {
  save(key, data) {
    localStorage.setItem('qg_' + key, JSON.stringify(data));
  },
  load(key) {
    const raw = localStorage.getItem('qg_' + key);
    return raw ? JSON.parse(raw) : null;
  },
  clear() {
    Object.keys(localStorage).filter(k => k.startsWith('qg_')).forEach(k => localStorage.removeItem(k));
  }
};

// ═══════════════════════════════════════════════════
// ORG PROFILE
// ═══════════════════════════════════════════════════
Engine.saveOrgProfile = function(profile) {
  Engine.storage.save('orgProfile', profile);
};

Engine.getOrgProfile = function() {
  return Engine.storage.load('orgProfile') || {};
};

// ═══════════════════════════════════════════════════
// ANSWERS — store per-question answers { questionId: score }
// ═══════════════════════════════════════════════════
Engine.saveAnswers = function(answers, type) {
  // type = 'quick' or 'comprehensive'
  Engine.storage.save(type + '_answers', answers);
};

Engine.getAnswers = function(type) {
  return Engine.storage.load(type + '_answers') || {};
};

// ═══════════════════════════════════════════════════
// SCORING
// ═══════════════════════════════════════════════════

/**
 * Calculate practice score = average of all answered question scores in that practice
 * @param {Object} answers - { questionId: score (1-4) }
 * @param {string} practiceId - e.g. '1.1'
 * @param {Array} questions - QG.QUESTIONS or QG.QUICK_QUESTIONS
 * @returns {number} score (1.0 - 4.0) or 0 if no answers
 */
Engine.calculatePracticeScore = function(answers, practiceId, questions) {
  const practiceQs = questions.filter(q => q.practice === practiceId);
  const scores = practiceQs.map(q => answers[q.id]).filter(s => s != null && s > 0);
  if (scores.length === 0) return 0;
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate dimension score = MIN of its 3 practice scores (weakest link principle)
 * @param {Object} answers
 * @param {string} dimensionId - 'CVI', 'SGRM', 'DPE', 'ITR'
 * @param {Array} questions
 * @returns {number} dimension score
 */
Engine.calculateDimensionScore = function(answers, dimensionId, questions) {
  const practices = QG.PRACTICES.filter(p => p.dimension === dimensionId);
  const practiceScores = practices.map(p => Engine.calculatePracticeScore(answers, p.id, questions)).filter(s => s > 0);
  if (practiceScores.length === 0) return 0;
  return Math.min(...practiceScores);
};

/**
 * Calculate overall QuantumGuard score = average of 4 dimension scores
 * @param {Object} answers
 * @param {Array} questions
 * @returns {number} overall score
 */
Engine.calculateOverallScore = function(answers, questions) {
  const dimIds = ['CVI', 'SGRM', 'DPE', 'ITR'];
  const dimScores = dimIds.map(d => Engine.calculateDimensionScore(answers, d, questions)).filter(s => s > 0);
  if (dimScores.length === 0) return 0;
  return dimScores.reduce((sum, s) => sum + s, 0) / dimScores.length;
};

/**
 * Get full breakdown of all scores
 * @param {Object} answers
 * @param {Array} questions
 * @returns {Object} { overall, dimensions: { CVI: { score, practices: { '1.1': score, ... } }, ... } }
 */
Engine.getFullScoreBreakdown = function(answers, questions) {
  const result = { dimensions: {} };
  
  QG.DIMENSIONS.forEach(dim => {
    const practices = QG.PRACTICES.filter(p => p.dimension === dim.id);
    const practiceScores = {};
    
    practices.forEach(p => {
      practiceScores[p.id] = {
        score: parseFloat(Engine.calculatePracticeScore(answers, p.id, questions).toFixed(2)),
        name: p.name,
        weight: p.weight
      };
    });
    
    result.dimensions[dim.id] = {
      name: dim.name,
      color: dim.color,
      score: parseFloat(Engine.calculateDimensionScore(answers, dim.id, questions).toFixed(2)),
      practices: practiceScores
    };
  });
  
  result.overall = parseFloat(Engine.calculateOverallScore(answers, questions).toFixed(2));
  result.maturityLevel = Engine.getMaturityLevel(result.overall);
  
  return result;
};

/**
 * Get maturity level for a given score
 * @param {number} score
 * @returns {Object} maturity level object
 */
Engine.getMaturityLevel = function(score) {
  if (score <= 0) return QG.MATURITY_LEVELS[0];
  for (let i = QG.MATURITY_LEVELS.length - 1; i >= 0; i--) {
    if (score >= QG.MATURITY_LEVELS[i].min) return QG.MATURITY_LEVELS[i];
  }
  return QG.MATURITY_LEVELS[0];
};

/**
 * Calculate risk multiplier from org profile
 * @param {Object} profile - { industry, orgSize, geoScope, dataSensitivity, regulatoryReqs }
 * @returns {number} composite risk multiplier (1.0 - 1.5)
 */
Engine.calculateRiskMultiplier = function(profile) {
  const rm = QG.RISK_MULTIPLIERS;
  let multiplier = 0;
  
  if (profile.industry && rm.industry.values[profile.industry]) {
    multiplier += rm.industry.weight * rm.industry.values[profile.industry];
  } else {
    multiplier += rm.industry.weight * 1.0;
  }
  
  if (profile.dataSensitivity && rm.dataSensitivity.values[profile.dataSensitivity]) {
    multiplier += rm.dataSensitivity.weight * rm.dataSensitivity.values[profile.dataSensitivity];
  } else {
    multiplier += rm.dataSensitivity.weight * 1.0;
  }
  
  if (profile.regulatoryReqs && rm.regulatoryReqs.values[profile.regulatoryReqs]) {
    multiplier += rm.regulatoryReqs.weight * rm.regulatoryReqs.values[profile.regulatoryReqs];
  } else {
    multiplier += rm.regulatoryReqs.weight * 1.0;
  }
  
  if (profile.geoScope && rm.geoScope.values[profile.geoScope]) {
    multiplier += rm.geoScope.weight * rm.geoScope.values[profile.geoScope];
  } else {
    multiplier += rm.geoScope.weight * 1.0;
  }
  
  if (profile.orgSize && rm.orgSize.values[profile.orgSize]) {
    multiplier += rm.orgSize.weight * rm.orgSize.values[profile.orgSize];
  } else {
    multiplier += rm.orgSize.weight * 1.0;
  }
  
  return parseFloat(multiplier.toFixed(3));
};

/**
 * Get nearest industry benchmark match
 * @param {Object} profile
 * @returns {Object|null} benchmark entry
 */
Engine.getNearestBenchmark = function(profile) {
  if (!profile.industry) return QG.BENCHMARKS[QG.BENCHMARKS.length - 1]; // 'Other'
  
  let sizeKey = 'All';
  if (profile.orgSize) {
    if (profile.orgSize.includes('Fortune')) sizeKey = 'Fortune 500';
    else if (profile.orgSize.includes('Large')) sizeKey = 'Large';
    else sizeKey = 'SMB';
  }
  
  // Find exact match
  let match = QG.BENCHMARKS.find(b => b.industry === profile.industry && b.size === sizeKey);
  if (!match) match = QG.BENCHMARKS.find(b => b.industry === profile.industry);
  if (!match) match = QG.BENCHMARKS[QG.BENCHMARKS.length - 1]; // fallback to 'Other'
  
  return match;
};

/**
 * Calculate assessment progress
 * @param {Object} answers
 * @param {Array} questions
 * @returns {Object} { answered, total, percent }
 */
Engine.getProgress = function(answers, questions) {
  const total = questions.length;
  const answered = Object.keys(answers).filter(k => answers[k] > 0).length;
  return { answered, total, percent: Math.round((answered / total) * 100) };
};

/**
 * Get recommendation text based on score range
 * @param {number} score
 * @param {string} type - 'overall', 'CVI', 'SGRM', 'DPE', 'ITR'
 * @returns {string}
 */
Engine.getRecommendation = function(score, type) {
  if (type === 'overall') {
    if (score <= 1.5) return 'Immediate action required. Your organization shows significant gaps in quantum readiness. Focus on establishing basic security foundations.';
    if (score <= 2.5) return 'You have basic controls but need systematic improvements. Prioritize high-impact areas and develop a quantum readiness roadmap.';
    if (score <= 3.5) return 'Good foundation in place. Focus on optimizing existing controls and addressing remaining gaps for quantum resilience.';
    return 'Strong quantum readiness. Continue monitoring emerging threats and maintain your security posture.';
  }
  
  const dimRecs = {
    CVI: 'Implement comprehensive asset discovery and establish vulnerability management processes.',
    SGRM: 'Establish quantum risk governance structure and develop strategic planning capabilities.',
    DPE: 'Deploy quantum-resistant encryption and implement robust key management systems.',
    ITR: 'Strengthen infrastructure security and develop incident response capabilities.'
  };
  
  if (score <= 2.0 && dimRecs[type]) return dimRecs[type];
  if (score <= 3.0) return `Continue improving ${type} capabilities with a focus on systematic implementation.`;
  return `${type} is performing well. Focus on optimization and industry leadership.`;
};

// Make available globally
if (typeof window !== 'undefined') window.Engine = Engine;
if (typeof module !== 'undefined') module.exports = Engine;

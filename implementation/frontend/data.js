// QuantumGuard Data Layer — Auto-generated from framework/full-assessment.md
// Contains all 120 assessment questions, dimensions, practices, org profile fields, and compliance mappings.

const QG = {};

// ═══════════════════════════════════════════════════
// DIMENSIONS
// ═══════════════════════════════════════════════════
QG.DIMENSIONS = [
  { id: 'CVI', name: 'Cryptographic Visibility & Inventory', color: '#00D4FF', weight: 0.25,
    description: 'Understanding and cataloging cryptographic assets across the organization.' },
  { id: 'SGRM', name: 'Strategic Governance & Risk Management', color: '#D2BBFF', weight: 0.25,
    description: 'Leadership commitment and systematic risk management for quantum threats.' },
  { id: 'DPE', name: 'Data Protection Engineering', color: '#FFD9A1', weight: 0.25,
    description: 'Technical implementation of quantum-safe data protection measures.' },
  { id: 'ITR', name: 'Implementation & Technical Readiness', color: '#FF8A65', weight: 0.25,
    description: 'Operational capabilities for deploying and maintaining quantum-safe systems.' }
];

// ═══════════════════════════════════════════════════
// PRACTICES (12 total: 3 per dimension)
// ═══════════════════════════════════════════════════
QG.PRACTICES = [
  { id: '1.1', dimension: 'CVI', name: 'Cryptographic Discovery & Inventory Management', weight: 0.35 },
  { id: '1.2', dimension: 'CVI', name: 'Vulnerability Assessment & Classification', weight: 0.35 },
  { id: '1.3', dimension: 'CVI', name: 'Cryptographic Dependency Mapping', weight: 0.30 },
  { id: '2.1', dimension: 'SGRM', name: 'Executive Leadership & Policy Management', weight: 0.40 },
  { id: '2.2', dimension: 'SGRM', name: 'Risk Assessment & Compliance Management', weight: 0.35 },
  { id: '2.3', dimension: 'SGRM', name: 'Third-Party & Supply Chain Risk Management', weight: 0.25 },
  { id: '3.1', dimension: 'DPE', name: 'Data Classification & Protection Requirements', weight: 0.40 },
  { id: '3.2', dimension: 'DPE', name: 'Storage Security & Encryption Management', weight: 0.35 },
  { id: '3.3', dimension: 'DPE', name: 'Transit Security & Protocol Management', weight: 0.25 },
  { id: '4.1', dimension: 'ITR', name: 'Infrastructure Assessment & Planning', weight: 0.35 },
  { id: '4.2', dimension: 'ITR', name: 'Implementation Capability Development', weight: 0.35 },
  { id: '4.3', dimension: 'ITR', name: 'Testing & Validation Capabilities', weight: 0.30 }
];

// ═══════════════════════════════════════════════════
// MATURITY LEVELS
// ═══════════════════════════════════════════════════
QG.MATURITY_LEVELS = [
  { level: 1, name: 'Basic',       min: 1.0, max: 1.4, color: '#FF5252',
    description: 'Initial awareness and ad-hoc practices. Limited documentation or systematic processes.' },
  { level: 2, name: 'Developing',  min: 1.5, max: 2.4, color: '#FFB74D',
    description: 'Structured approaches beginning to emerge. Basic processes documented but not fully implemented.' },
  { level: 3, name: 'Established', min: 2.5, max: 3.4, color: '#4FC3F7',
    description: 'Systematic and consistent practices. Comprehensive processes with regular execution.' },
  { level: 4, name: 'Advanced',    min: 3.5, max: 3.9, color: '#81C784',
    description: 'Optimized processes with continuous improvement. Advanced analytics and predictive capabilities.' },
  { level: 5, name: 'Optimizing',  min: 4.0, max: 4.0, color: '#CE93D8',
    description: 'Industry-leading practices and innovation. Comprehensive integration across all aspects.' }
];

// ═══════════════════════════════════════════════════
// ORG PROFILE FIELDS
// ═══════════════════════════════════════════════════
QG.ORG_PROFILE = {
  industries: [
    'Financial Services', 'Healthcare', 'Defense/Military', 'Technology',
    'Energy/Utilities', 'Manufacturing', 'Retail', 'Government',
    'Education', 'Telecommunications', 'Transportation', 'Other'
  ],
  orgSizes: [
    'Fortune 500/Global Enterprise',
    'Large Enterprise (1000+ employees)',
    'Mid-Market (100-999 employees)',
    'Small Business (<100 employees)'
  ],
  geoScope: [
    'Global (10+ countries)',
    'Multi-region (3-9 countries)',
    'Regional (2 countries)',
    'Single Country'
  ],
  dataSensitivity: [
    'Highly Classified/Secret',
    'Confidential/Sensitive',
    'Internal Use Only',
    'Public/Non-sensitive'
  ],
  regulatoryReqs: [
    'Multiple Major Frameworks',
    'Single Major Framework',
    'Industry Standards Only',
    'Minimal Requirements'
  ]
};

// ═══════════════════════════════════════════════════
// RISK MULTIPLIERS (from toolkit-specs Table 7)
// ═══════════════════════════════════════════════════
QG.RISK_MULTIPLIERS = {
  industry: {
    weight: 0.30,
    values: {
      'Financial Services': 1.5, 'Healthcare': 1.5, 'Defense/Military': 1.5,
      'Technology': 1.3, 'Energy/Utilities': 1.3, 'Telecommunications': 1.3,
      'Manufacturing': 1.0, 'Retail': 1.0, 'Government': 1.3,
      'Education': 1.0, 'Transportation': 1.0, 'Other': 1.0
    }
  },
  dataSensitivity: {
    weight: 0.25,
    values: {
      'Highly Classified/Secret': 1.5, 'Confidential/Sensitive': 1.3,
      'Internal Use Only': 1.0, 'Public/Non-sensitive': 1.0
    }
  },
  regulatoryReqs: {
    weight: 0.20,
    values: {
      'Multiple Major Frameworks': 1.5, 'Single Major Framework': 1.3,
      'Industry Standards Only': 1.0, 'Minimal Requirements': 1.0
    }
  },
  geoScope: {
    weight: 0.15,
    values: {
      'Global (10+ countries)': 1.5, 'Multi-region (3-9 countries)': 1.3,
      'Regional (2 countries)': 1.0, 'Single Country': 1.0
    }
  },
  orgSize: {
    weight: 0.10,
    values: {
      'Fortune 500/Global Enterprise': 1.5, 'Large Enterprise (1000+ employees)': 1.3,
      'Mid-Market (100-999 employees)': 1.0, 'Small Business (<100 employees)': 1.0
    }
  }
};

// ═══════════════════════════════════════════════════
// INDUSTRY BENCHMARKS (from toolkit-specs Table 11)
// ═══════════════════════════════════════════════════
QG.BENCHMARKS = [
  { industry: 'Financial Services', size: 'Fortune 500', overall: 3.2, CVI: 3.4, SGRM: 3.5, DPE: 3.1, ITR: 2.9 },
  { industry: 'Financial Services', size: 'Large', overall: 2.8, CVI: 2.9, SGRM: 3.1, DPE: 2.7, ITR: 2.5 },
  { industry: 'Financial Services', size: 'SMB', overall: 2.2, CVI: 2.1, SGRM: 2.4, DPE: 2.3, ITR: 2.0 },
  { industry: 'Healthcare', size: 'Fortune 500', overall: 3.0, CVI: 3.2, SGRM: 3.3, DPE: 2.9, ITR: 2.7 },
  { industry: 'Healthcare', size: 'Large', overall: 2.6, CVI: 2.7, SGRM: 2.9, DPE: 2.5, ITR: 2.3 },
  { industry: 'Healthcare', size: 'SMB', overall: 2.0, CVI: 1.9, SGRM: 2.2, DPE: 2.1, ITR: 1.8 },
  { industry: 'Technology', size: 'Fortune 500', overall: 3.5, CVI: 3.6, SGRM: 3.4, DPE: 3.7, ITR: 3.4 },
  { industry: 'Technology', size: 'Large', overall: 3.1, CVI: 3.0, SGRM: 3.0, DPE: 3.3, ITR: 3.0 },
  { industry: 'Technology', size: 'SMB', overall: 2.5, CVI: 2.4, SGRM: 2.4, DPE: 2.7, ITR: 2.4 },
  { industry: 'Other', size: 'All', overall: 2.3, CVI: 2.2, SGRM: 2.5, DPE: 2.3, ITR: 2.1 }
];

// ═══════════════════════════════════════════════════
// ALL 120 ASSESSMENT QUESTIONS
// ═══════════════════════════════════════════════════
QG.QUESTIONS = [
  { id: 1, dimension: 'CVI', practice: '1.1', stream: 'A',
    question: "How does your organization identify cryptographic assets?",
    options: [
    { score: 1, label: 'Basic', text: "No formal cryptographic asset identification process exists" },
    { score: 2, label: 'Developing', text: "Manual inventory covering only known high-value systems" },
    { score: 3, label: 'Established', text: "Automated discovery implemented for portions of infrastructure" },
    { score: 4, label: 'Advanced', text: "Comprehensive automated discovery with validation across all environments" }
    ]
  },
  { id: 2, dimension: 'CVI', practice: '1.1', stream: 'A',
    question: "How does your organization document cryptographic assets?",
    options: [
    { score: 1, label: 'Basic', text: "No standardized documentation exists" },
    { score: 2, label: 'Developing', text: "Basic spreadsheet tracking that captures limited attributes" },
    { score: 3, label: 'Established', text: "Structured database with standardized templates" },
    { score: 4, label: 'Advanced', text: "Centralized asset management platform with automated updates and risk scoring" }
    ]
  },
  { id: 3, dimension: 'CVI', practice: '1.1', stream: 'A',
    question: "How does your organization govern cryptographic asset ownership and accountability?",
    options: [
    { score: 1, label: 'Basic', text: "No formal assignment of ownership or accountability for cryptographic assets" },
    { score: 2, label: 'Developing', text: "Ownership of cryptographic assets is informally assigned for critical systems or managed by individual teams" },
    { score: 3, label: 'Established', text: "Ownership roles are formally defined across the organization, with documented responsibilities and coverage tracking" },
    { score: 4, label: 'Advanced', text: "Cryptographic ownership is embedded into asset governance processes, with automated assignment, accountability metrics, and cross-functional oversight" }
    ]
  },
  { id: 4, dimension: 'CVI', practice: '1.1', stream: 'A',
    question: "How does your organization validate cryptographic asset inventory completeness?",
    options: [
    { score: 1, label: 'Basic', text: "No validation of inventory completeness" },
    { score: 2, label: 'Developing', text: "Periodic manual sampling of selected systems to verify inventory accuracy" },
    { score: 3, label: 'Established', text: "Regular automated verification scans with a formal reconciliation process to address discrepancies" },
    { score: 4, label: 'Advanced', text: "Continuous monitoring with anomaly detection and completeness analytics that automatically identifies potential gaps in the cryptographic inventory" }
    ]
  },
  { id: 5, dimension: 'CVI', practice: '1.1', stream: 'A',
    question: "How does your organization ensure cryptographic visibility across third-party and cloud systems?",
    options: [
    { score: 1, label: 'Basic', text: "No visibility into cryptographic usage in third-party services or cloud environments" },
    { score: 2, label: 'Developing', text: "Visibility is manually assessed for select vendors or critical cloud services" },
    { score: 3, label: 'Established', text: "Cryptographic visibility is routinely evaluated and documented across third-party and cloud environments using structured methods" },
    { score: 4, label: 'Advanced', text: "Continuous visibility into cryptographic usage across all external environments is maintained using automated tools, contractual controls, and integration with inventory systems" }
    ]
  },
  { id: 6, dimension: 'CVI', practice: '1.1', stream: 'B',
    question: "How is cryptographic asset inventory data used for strategic planning?",
    options: [
    { score: 1, label: 'Basic', text: "No strategic use of inventory data" },
    { score: 2, label: 'Developing', text: "Basic reports generated for compliance purposes only" },
    { score: 3, label: 'Established', text: "Structured analysis guides resource allocation and security planning" },
    { score: 4, label: 'Advanced', text: "Advanced analytics drive quantum readiness strategy with ROI modeling" }
    ]
  },
  { id: 7, dimension: 'CVI', practice: '1.1', stream: 'B',
    question: "How are cryptographic assets prioritized for quantum-resistance upgrades?",
    options: [
    { score: 1, label: 'Basic', text: "No prioritization process exists" },
    { score: 2, label: 'Developing', text: "Criticality ratings based on system importance only" },
    { score: 3, label: 'Established', text: "Multi-factor risk scoring based on algorithm type, key size, long-term data sensitivity, and exposure" },
    { score: 4, label: 'Advanced', text: "Advanced prioritization model incorporating business impact, resource constraints, dependencies, and data protection timeframes" }
    ]
  },
  { id: 8, dimension: 'CVI', practice: '1.1', stream: 'B',
    question: "How is cryptographic asset inventory maintained over time?",
    options: [
    { score: 1, label: 'Basic', text: "No maintenance process exists" },
    { score: 2, label: 'Developing', text: "Manual updates during major system changes only" },
    { score: 3, label: 'Established', text: "Scheduled automated refresh with change management integration" },
    { score: 4, label: 'Advanced', text: "Real-time inventory updates with change verification and historical versioning" }
    ]
  },
  { id: 9, dimension: 'CVI', practice: '1.1', stream: 'B',
    question: "How does your organization include IoT and embedded devices in its cryptographic inventory and quantum readiness planning?",
    options: [
    { score: 1, label: 'Basic', text: "IoT and embedded devices are not included in cryptographic inventory or transition planning" },
    { score: 2, label: 'Developing', text: "Manual list exists for critical IoT or embedded systems, but cryptographic details are incomplete or outdated" },
    { score: 3, label: 'Established', text: "IoT and embedded devices are systematically inventoried with crypto attributes (e.g., algorithm, key size), and included in quantum upgrade plans" },
    { score: 4, label: 'Advanced', text: "Real-time automated discovery and monitoring of all IoT and embedded devices with complete cryptographic visibility" }
    ]
  },
  { id: 10, dimension: 'CVI', practice: '1.1', stream: 'B',
    question: "How does your organization stay informed about quantum computing and cryptanalysis advancements?",
    options: [
    { score: 1, label: 'Basic', text: "No monitoring process exists" },
    { score: 2, label: 'Developing', text: "Manual reviews of standards bodies or industry publications occur occasionally but are not systematic" },
    { score: 3, label: 'Established', text: "Structured monitoring process tracks cryptographic research, algorithm deprecation, and quantum milestones using defined sources and schedules" },
    { score: 4, label: 'Advanced', text: "Continuous monitoring with automated alerting and integration into asset inventories, allowing near real-time updates when cryptographic standards or threat models evolve" }
    ]
  },
  { id: 11, dimension: 'CVI', practice: '1.2', stream: 'A',
    question: "How does your organization assess quantum vulnerability of cryptographic assets?",
    options: [
    { score: 1, label: 'Basic', text: "No vulnerability assessment process exists" },
    { score: 2, label: 'Developing', text: "Basic identification of commonly known vulnerable algorithms" },
    { score: 3, label: 'Established', text: "Structured assessment methodology with vulnerability classification based on algorithm type, key size, and implementation" },
    { score: 4, label: 'Advanced', text: "Comprehensive risk-based assessment with technical validation and detailed algorithm-specific analysis" }
    ]
  },
  { id: 12, dimension: 'CVI', practice: '1.2', stream: 'A',
    question: "How does your organization classify quantum vulnerability severity?",
    options: [
    { score: 1, label: 'Basic', text: "No method in place to classify quantum vulnerabilities" },
    { score: 2, label: 'Developing', text: "General high/medium/low ratings with minimal or informal criteria" },
    { score: 3, label: 'Established', text: "Formal classification framework using defined factors like algorithm, key size, data sensitivity, exposure, and protection duration" },
    { score: 4, label: 'Advanced', text: "Quantitative risk scoring model combining technical vulnerability with business impact metrics" }
    ]
  },
  { id: 13, dimension: 'CVI', practice: '1.2', stream: 'A',
    question: "How does your organization validate vulnerability findings?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists" },
    { score: 2, label: 'Developing', text: "Manual review of vulnerability assessments by security team" },
    { score: 3, label: 'Established', text: "Structured validation methodology with technical testing of algorithm implementations" },
    { score: 4, label: 'Advanced', text: "Automated validation with multiple assessment techniques and cryptographic expertise" }
    ]
  },
  { id: 14, dimension: 'CVI', practice: '1.2', stream: 'A',
    question: "How does your organization integrate emerging quantum threats into planning and strategy?",
    options: [
    { score: 1, label: 'Basic', text: "No planning or strategy considers quantum threat developments" },
    { score: 2, label: 'Developing', text: "Strategic plans are occasionally updated in response to major quantum-related announcements or standard changes" },
    { score: 3, label: 'Established', text: "Quantum threat developments are regularly factored into cryptographic planning, with updates to migration timelines, policies, and coordination with key vendors" },
    { score: 4, label: 'Advanced', text: "Quantum threat scenarios drive ongoing strategy refinement using impact modeling, vendor quantum-readiness tracking, and alignment with business risk and data protection timelines" }
    ]
  },
  { id: 15, dimension: 'CVI', practice: '1.2', stream: 'A',
    question: "How does your organization contribute to (quantum) cryptanalysis and mitigation research?",
    options: [
    { score: 1, label: 'Basic', text: "No involvement in external research or knowledge-sharing efforts" },
    { score: 2, label: 'Developing', text: "Participation in industry working groups or forums and shared lessons learned on algorithm vulnerabilities" },
    { score: 3, label: 'Established', text: "Active collaboration with academic or industry partners on research related to cryptanalysis or mitigation" },
    { score: 4, label: 'Advanced', text: "Original research, tools, or publications that contribute to advancing cryptography or cryptanalysis practices" }
    ]
  },
  { id: 16, dimension: 'CVI', practice: '1.2', stream: 'B',
    question: "How are vulnerability findings communicated to stakeholders?",
    options: [
    { score: 1, label: 'Basic', text: "No formal communication process exists" },
    { score: 2, label: 'Developing', text: "Vulnerability reports shared with technical teams listing affected systems and algorithms" },
    { score: 3, label: 'Established', text: "Structured reporting tailored to different stakeholder groups with contextual information about algorithm risks" },
    { score: 4, label: 'Advanced', text: "Comprehensive communication strategy with executive dashboards showing vulnerability metrics and trends" }
    ]
  },
  { id: 17, dimension: 'CVI', practice: '1.2', stream: 'B',
    question: "How does your organization assess the quantum vulnerability of cryptographic mechanisms used for data authenticity and long-term integrity?",
    options: [
    { score: 1, label: 'Basic', text: "No assessment of authenticity or integrity mechanisms under quantum threat" },
    { score: 2, label: 'Developing', text: "Informal review of signature algorithms and MACs in critical systems" },
    { score: 3, label: 'Established', text: "Structured evaluation of signing and integrity mechanisms by algorithm, key size, and data lifetime" },
    { score: 4, label: 'Advanced', text: "Comprehensive vulnerability assessment of all long-term integrity and authenticity controls, including exposure modeling and risk scoring" }
    ]
  },
  { id: 18, dimension: 'CVI', practice: '1.2', stream: 'B',
    question: "How does your organization validate the correctness and secure configuration of deployed cryptographic implementations?",
    options: [
    { score: 1, label: 'Basic', text: "No validation of deployed cryptographic implementations" },
    { score: 2, label: 'Developing', text: "Ad-hoc manual checks of cryptographic configurations in selected systems" },
    { score: 3, label: 'Established', text: "Structured validation process reviewing algorithm correctness, key sizes, and configuration settings" },
    { score: 4, label: 'Advanced', text: "Automated and continuous validation of cryptographic use across systems, including detection of library misuse, insecure modes, and deprecated protocols" }
    ]
  },
  { id: 19, dimension: 'CVI', practice: '1.2', stream: 'B',
    question: "How does your organization assess trends in cryptographic vulnerabilities over time?",
    options: [
    { score: 1, label: 'Basic', text: "No tracking or analysis of changes in cryptographic vulnerability posture" },
    { score: 2, label: 'Developing', text: "Informal or occasional reviews noting major algorithm or system changes" },
    { score: 3, label: 'Established', text: "Regular analysis using defined metrics to track algorithm usage, crypto upgrades, and exposure trends" },
    { score: 4, label: 'Advanced', text: "Continuous trend monitoring with predictive analytics tied to system changes, quantum advancements, and deprecation timelines" }
    ]
  },
  { id: 20, dimension: 'CVI', practice: '1.2', stream: 'B',
    question: "How does your organization apply quantum vulnerability insights to improve cryptographic practices and standards?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to apply findings from vulnerability assessments" },
    { score: 2, label: 'Developing', text: "Lessons from significant vulnerabilities occasionally lead to manual updates in practices" },
    { score: 3, label: 'Established', text: "Structured process to review assessment findings and update standards, guidance, or configurations" },
    { score: 4, label: 'Advanced', text: "Continuous improvement loop with automated feedback into coding patterns, policy updates, and tool configurations based on recurring issues" }
    ]
  },
  { id: 21, dimension: 'CVI', practice: '1.3', stream: 'A',
    question: "How does your organization identify and map cryptographic dependencies across systems and services?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to identify cryptographic dependencies between systems" },
    { score: 2, label: 'Developing', text: "Manual identification of direct dependencies in known critical systems" },
    { score: 3, label: 'Established', text: "Structured methodology to map cryptographic dependencies across systems, protocols, and services, including indirect relationships" },
    { score: 4, label: 'Advanced', text: "Automated discovery and mapping of all cryptographic dependencies, including dynamic connections, shared libraries, and multi-system flows" }
    ]
  },
  { id: 22, dimension: 'CVI', practice: '1.3', stream: 'A',
    question: "How does your organization document and maintain cryptographic dependencies between systems and services?",
    options: [
    { score: 1, label: 'Basic', text: "No formal documentation of cryptographic dependencies" },
    { score: 2, label: 'Developing', text: "Informal or manual records of direct dependencies" },
    { score: 3, label: 'Established', text: "Structured documentation using standardized formats to capture algorithms, key types, and inter-system relationships" },
    { score: 4, label: 'Advanced', text: "Centralized and continuously maintained dependency database with metadata for algorithms, certificates, relationship types, and system roles" }
    ]
  },
  { id: 23, dimension: 'CVI', practice: '1.3', stream: 'A',
    question: "How does your organization analyze the impact of cryptographic changes across dependent systems and services?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to assess the impact of cryptographic changes on dependent systems" },
    { score: 2, label: 'Developing', text: "Informal or ad-hoc assessments of major dependencies when changes are planned" },
    { score: 3, label: 'Established', text: "Structured methodology to evaluate the effects of algorithm, certificate, or key changes across known dependencies" },
    { score: 4, label: 'Advanced', text: "Comprehensive modeling and scenario analysis to predict system-wide impacts of cryptographic transitions, including business and operational consequences" }
    ]
  },
  { id: 24, dimension: 'CVI', practice: '1.3', stream: 'A',
    question: "How does your organization validate the accuracy and completeness of cryptographic dependency mapping?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to verify cryptographic dependency data" },
    { score: 2, label: 'Developing', text: "Manual spot-checks of selected dependencies in critical systems" },
    { score: 3, label: 'Established', text: "Structured validation process using technical methods to confirm system-to-system cryptographic relationships" },
    { score: 4, label: 'Advanced', text: "Automated validation with continuous monitoring and detection of missing or outdated dependencies across all environments" }
    ]
  },
  { id: 25, dimension: 'CVI', practice: '1.3', stream: 'A',
    question: "How does your organization keep cryptographic dependency information current as systems evolve?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to update cryptographic dependency information over time" },
    { score: 2, label: 'Developing', text: "Dependency records are updated manually when major changes are noticed or reported" },
    { score: 3, label: 'Established', text: "Regular updates are performed through scheduled reviews and integrated with change management processes" },
    { score: 4, label: 'Advanced', text: "Dependency information is continuously updated using automated discovery, monitoring, and integration with asset and configuration systems" }
    ]
  },
  { id: 26, dimension: 'CVI', practice: '1.3', stream: 'B',
    question: "How is cryptographic dependency information used to inform migration planning and operational risk management?",
    options: [
    { score: 1, label: 'Basic', text: "Dependency data is not used in planning or risk discussions" },
    { score: 2, label: 'Developing', text: "Known critical dependencies are considered during informal planning" },
    { score: 3, label: 'Established', text: "Structured transition planning uses documented dependencies to guide sequencing and risk evaluation" },
    { score: 4, label: 'Advanced', text: "Dependency models are integrated into simulation tools and strategic risk assessments for quantum transition" }
    ]
  },
  { id: 27, dimension: 'CVI', practice: '1.3', stream: 'B',
    question: "How does your organization manage cryptographic dependencies in software build systems and code-signing infrastructure?",
    options: [
    { score: 1, label: 'Basic', text: "Cryptographic use in build systems or code-signing infrastructure is not tracked" },
    { score: 2, label: 'Developing', text: "Some known dependencies (e.g., code-signing certificates) are documented, but not consistently updated or mapped" },
    { score: 3, label: 'Established', text: "Cryptographic dependencies across CI/CD pipelines and signing systems are documented and reviewed as part of upgrade planning" },
    { score: 4, label: 'Advanced', text: "Dependency-aware tooling continuously monitors and validates signing workflows, with cryptographic upgrade paths coordinated across software delivery systems" }
    ]
  },
  { id: 28, dimension: 'CVI', practice: '1.3', stream: 'B',
    question: "How does your organization assess cryptographic dependencies and transition constraints in operational technology (OT) and industrial control environments?",
    options: [
    { score: 1, label: 'Basic', text: "No assessment of cryptographic dependencies or constraints in OT or industrial systems" },
    { score: 2, label: 'Developing', text: "Some OT systems are reviewed manually for cryptographic use, but dependencies and limitations are undocumented" },
    { score: 3, label: 'Established', text: "OT and industrial crypto dependencies are documented, including protocol use and upgrade limitations" },
    { score: 4, label: 'Advanced', text: "Cryptographic transition plans for OT systems include detailed dependency maps, hardware constraints, and coordinated timelines with operational risk modeling" }
    ]
  },
  { id: 29, dimension: 'CVI', practice: '1.3', stream: 'B',
    question: "How are cryptographic dependencies evaluated for architectural complexity and transition fragility?",
    options: [
    { score: 1, label: 'Basic', text: "No evaluation of cryptographic complexity or fragility" },
    { score: 2, label: 'Developing', text: "Informal review of major dependencies without complexity analysis" },
    { score: 3, label: 'Established', text: "Structured assessment of dependency complexity and upgrade risk" },
    { score: 4, label: 'Advanced', text: "Simulations and metrics guide architecture hardening and migration design" }
    ]
  },
  { id: 30, dimension: 'CVI', practice: '1.3', stream: 'B',
    question: "How are cryptographic dependencies tracked across CI/CD pipelines, shared libraries, and external APIs?",
    options: [
    { score: 1, label: 'Basic', text: "No visibility into cryptographic use across pipelines, libraries, or APIs" },
    { score: 2, label: 'Developing', text: "Some known crypto dependencies are documented, but tracking is manual or incomplete" },
    { score: 3, label: 'Established', text: "Dependency tracking is structured and includes libraries, signing workflows, and key interfaces" },
    { score: 4, label: 'Advanced', text: "Continuous monitoring tracks cryptographic components across build systems, shared code, and third-party integrations" }
    ]
  },
  { id: 31, dimension: 'SGRM', practice: '2.1', stream: 'A',
    question: "How is quantum risk oversight structured at the executive level?",
    options: [
    { score: 1, label: 'Basic', text: "No formal quantum risk oversight exists" },
    { score: 2, label: 'Developing', text: "Quantum risks managed within existing security governance" },
    { score: 3, label: 'Established', text: "Dedicated quantum readiness steering committee established" },
    { score: 4, label: 'Advanced', text: "Board-level quantum security governance with executive accountability" }
    ]
  },
  { id: 32, dimension: 'SGRM', practice: '2.1', stream: 'A',
    question: "How comprehensive is your quantum risk policy framework?",
    options: [
    { score: 1, label: 'Basic', text: "No policies exist that mention or address quantum computing risks." },
    { score: 2, label: 'Developing', text: "Quantum risks are briefly acknowledged in existing cybersecurity or risk management policies, without dedicated guidance or implementation details." },
    { score: 3, label: 'Established', text: "Dedicated quantum risk policy documents exist, covering risk recognition, impact assessment, and transition planning guidelines." },
    { score: 4, label: 'Advanced', text: "Comprehensive quantum policy framework governs organization-wide activities, is regularly updated, and includes mandates for technical, legal, vendor, and audit requirements related to quantum readiness." }
    ]
  },
  { id: 33, dimension: 'SGRM', practice: '2.1', stream: 'A',
    question: "How are quantum security initiatives funded and resourced?",
    options: [
    { score: 1, label: 'Basic', text: "No dedicated funding allocated" },
    { score: 2, label: 'Developing', text: "Project-by-project funding requests" },
    { score: 3, label: 'Established', text: "Annual budget with defined allocation" },
    { score: 4, label: 'Advanced', text: "Multi-year investment program with return-on-investment (ROI) tracking" }
    ]
  },
  { id: 34, dimension: 'SGRM', practice: '2.1', stream: 'A',
    question: "How do you measure quantum risk governance effectiveness?",
    options: [
    { score: 1, label: 'Basic', text: "No effectiveness measurements in place" },
    { score: 2, label: 'Developing', text: "Informal or manual compliance tracking" },
    { score: 3, label: 'Established', text: "Formal metrics framework used across key governance areas" },
    { score: 4, label: 'Advanced', text: "Automated reporting with real-time dashboards and trend analysis" }
    ]
  },
  { id: 35, dimension: 'SGRM', practice: '2.1', stream: 'A',
    question: "How does leadership drive quantum security innovation?",
    options: [
    { score: 1, label: 'Basic', text: "No innovation direction provided" },
    { score: 2, label: 'Developing', text: "Leadership monitors industry trends with limited internal activity" },
    { score: 3, label: 'Established', text: "Leadership supports structured research and development programs" },
    { score: 4, label: 'Advanced', text: "Leadership champions a dedicated innovation function with external collaborations and continuous advancement" }
    ]
  },
  { id: 36, dimension: 'SGRM', practice: '2.1', stream: 'B',
    question: "How is quantum risk integrated into organizational strategy and long-term planning?",
    options: [
    { score: 1, label: 'Basic', text: "No strategic integration of quantum risk" },
    { score: 2, label: 'Developing', text: "Quantum risk considered during IT or security planning only" },
    { score: 3, label: 'Established', text: "Quantum risk integrated into enterprise risk and business planning cycles" },
    { score: 4, label: 'Advanced', text: "Quantum considerations influence cross-business strategy, investment, and innovation planning" }
    ]
  },
  { id: 37, dimension: 'SGRM', practice: '2.1', stream: 'B',
    question: "How are quantum security policies reviewed and maintained over time?",
    options: [
    { score: 1, label: 'Basic', text: "No process for reviewing or updating quantum-related policies" },
    { score: 2, label: 'Developing', text: "Manual reviews conducted annually with limited scope or documentation" },
    { score: 3, label: 'Established', text: "Structured quarterly review process with stakeholder input and documented revisions" },
    { score: 4, label: 'Advanced', text: "Automated and continuous policy maintenance integrated with threat intelligence and compliance triggers" }
    ]
  },
  { id: 38, dimension: 'SGRM', practice: '2.1', stream: 'B',
    question: "How is executive leadership kept informed and prepared to guide quantum security strategy?",
    options: [
    { score: 1, label: 'Basic', text: "No awareness or education program exists for leadership" },
    { score: 2, label: 'Developing', text: "Annual briefings on quantum computing developments are conducted" },
    { score: 3, label: 'Established', text: "Regular education programs with role-specific content and strategic implications" },
    { score: 4, label: 'Advanced', text: "Executive simulations, dashboards, and decision-support tools are in place to enable quantum-resilient leadership" }
    ]
  },
  { id: 39, dimension: 'SGRM', practice: '2.1', stream: 'B',
    question: "How do you monitor and manage progress across your quantum readiness program and cryptographic transition activities?",
    options: [
    { score: 1, label: 'Basic', text: "No tracking or progress monitoring in place" },
    { score: 2, label: 'Developing', text: "Manual milestone tracking performed on select activities" },
    { score: 3, label: 'Established', text: "Comprehensive dashboards used to track progress across multiple quantum readiness workstreams" },
    { score: 4, label: 'Advanced', text: "Real-time automated tracking with integration into crypto inventory, DevSecOps pipelines, and resource planning" }
    ]
  },
  { id: 40, dimension: 'SGRM', practice: '2.1', stream: 'B',
    question: "How does your organization contribute to shaping industry-wide quantum security and cryptographic agility practices?",
    options: [
    { score: 1, label: 'Basic', text: "No involvement in industry quantum security or cryptographic agility initiatives" },
    { score: 2, label: 'Developing', text: "Passive participation in industry working groups or forums related to PQC, cryptographic agility, or interoperability" },
    { score: 3, label: 'Established', text: "Active contributions to industry standards, knowledge-sharing sessions, or multi-stakeholder planning for cryptographic agility and PQC migration" },
    { score: 4, label: 'Advanced', text: "Leadership in shaping quantum security and cryptographic agility practices through published methodologies, toolkits, and coordination across sectors or regulators" }
    ]
  },
  { id: 41, dimension: 'SGRM', practice: '2.2', stream: 'A',
    question: "How comprehensive is your quantum risk assessment methodology?",
    options: [
    { score: 1, label: 'Basic', text: "No formal quantum risk assessment methodology exists" },
    { score: 2, label: 'Developing', text: "Informal or ad hoc quantum risk identification is performed without structured categorization or prioritization" },
    { score: 3, label: 'Established', text: "Structured quantum risk assessment framework is implemented with defined risk categories, scoring methods, and linkage to cryptographic planning" },
    { score: 4, label: 'Advanced', text: "An automated and continuously updated quantum risk analysis system informs cryptographic agility, asset prioritization, and strategic transition planning" }
    ]
  },
  { id: 42, dimension: 'SGRM', practice: '2.2', stream: 'A',
    question: "How automated is your quantum risk monitoring and integration into cryptographic transition planning?",
    options: [
    { score: 1, label: 'Basic', text: "No automated monitoring or integration with cryptographic planning exists" },
    { score: 2, label: 'Developing', text: "Tracking tools are used manually to observe quantum computing developments" },
    { score: 3, label: 'Established', text: "Comprehensive monitoring system captures quantum threat signals and informs cryptographic exposure tracking" },
    { score: 4, label: 'Advanced', text: "An AI-supported platform continuously monitors quantum risk indicators and dynamically adjusts cryptographic transition priorities" }
    ]
  },
  { id: 43, dimension: 'SGRM', practice: '2.2', stream: 'A',
    question: "How do you quantify quantum risk exposure?",
    options: [
    { score: 1, label: 'Basic', text: "No formal quantification of quantum risk exposure exists" },
    { score: 2, label: 'Developing', text: "Informal impact assessments are performed without consistent scoring methods" },
    { score: 3, label: 'Established', text: "Structured scoring methodology is used to evaluate exposure based on algorithm strength, data sensitivity, and asset value" },
    { score: 4, label: 'Advanced', text: "An automated modeling system is used to quantify risk exposure across assets, factoring in cryptographic agility, business impact, and data protection timelines" }
    ]
  },
  { id: 44, dimension: 'SGRM', practice: '2.2', stream: 'A',
    question: "How do you validate the effectiveness of quantum risk controls?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists for quantum risk controls" },
    { score: 2, label: 'Developing', text: "Testing of selected controls is performed manually and inconsistently" },
    { score: 3, label: 'Established', text: "Regular assessments are conducted using defined effectiveness metrics, procedures, and responsible roles" },
    { score: 4, label: 'Advanced', text: "Continuous and automated validation of quantum risk controls is implemented across domains with feedback loops into strategy and cryptographic agility planning" }
    ]
  },
  { id: 45, dimension: 'SGRM', practice: '2.2', stream: 'A',
    question: "How do you update your quantum risk assessment methodology as new threats and cryptographic developments emerge?",
    options: [
    { score: 1, label: 'Basic', text: "No update process exists" },
    { score: 2, label: 'Developing', text: "Annual assessment updates performed based on informal review of new threats" },
    { score: 3, label: 'Established', text: "Quarterly revisions conducted with structured input from research and intelligence sources" },
    { score: 4, label: 'Advanced', text: "Monthly integration of quantum threat analysis and cryptographic transition insights into a dynamic, automated risk assessment framework" }
    ]
  },
  { id: 46, dimension: 'SGRM', practice: '2.2', stream: 'B',
    question: "How mature is your quantum security compliance program?",
    options: [
    { score: 1, label: 'Basic', text: "No quantum-specific compliance program or requirements exist" },
    { score: 2, label: 'Developing', text: "Informal or ad hoc compliance checks are conducted without consistent documentation" },
    { score: 3, label: 'Established', text: "Structured compliance framework governs quantum cryptographic controls and is reviewed regularly" },
    { score: 4, label: 'Advanced', text: "Quantum compliance is continuously monitored and enforced through automated tools integrated with policy, PKI, and DevSecOps processes" }
    ]
  },
  { id: 47, dimension: 'SGRM', practice: '2.2', stream: 'B',
    question: "How does your organization adapt cryptographic practices in response to evolving quantum security standards and regulatory requirements?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to track or adapt to quantum-related regulatory changes" },
    { score: 2, label: 'Developing', text: "Ad hoc reviews of major PQC guidance are conducted with limited updates to practices" },
    { score: 3, label: 'Established', text: "Structured tracking and impact analysis informs scheduled updates to cryptographic policies and controls" },
    { score: 4, label: 'Advanced', text: "Regulatory intelligence feeds are integrated into crypto control systems, triggering change workflows and agility simulations across systems" }
    ]
  },
  { id: 48, dimension: 'SGRM', practice: '2.2', stream: 'B',
    question: "How do you track and map compliance across quantum-relevant controls and systems?",
    options: [
    { score: 1, label: 'Basic', text: "No mapping or tracking of quantum compliance requirements exists" },
    { score: 2, label: 'Developing', text: "Quantum compliance documentation is maintained manually with limited structure" },
    { score: 3, label: 'Established', text: "Compliance requirements are tracked through a structured system, linking them to policies, controls, and asset owners" },
    { score: 4, label: 'Advanced', text: "Compliance mapping is automated, with tooling that traces requirements to cryptographic enforcement points and flags misalignments" }
    ]
  },
  { id: 49, dimension: 'SGRM', practice: '2.2', stream: 'B',
    question: "How do you measure cryptographic remediation progress for regulated domains?",
    options: [
    { score: 1, label: 'Basic', text: "No formal tracking of remediation progress for cryptographic systems in regulated domains exists" },
    { score: 2, label: 'Developing', text: "Informal milestone tracking is performed manually for select domains like PKI or TLS" },
    { score: 3, label: 'Established', text: "Structured tracking system monitors remediation progress across regulated cryptographic domains, linked to controls and policies" },
    { score: 4, label: 'Advanced', text: "Real-time platform integrates cryptographic remediation metrics across PKI, TLS, code signing, and supply chain, with dashboards, alerts, and audit traceability" }
    ]
  },
  { id: 50, dimension: 'SGRM', practice: '2.2', stream: 'B',
    question: "How do you ensure quantum security requirements are integrated into audits and control testing?",
    options: [
    { score: 1, label: 'Basic', text: "Quantum-related controls are not included in audit scopes or security testing" },
    { score: 2, label: 'Developing', text: "Manual or ad hoc testing of quantum-related controls occurs during general security reviews" },
    { score: 3, label: 'Established', text: "Quantum security requirements are embedded in audit plans and control testing procedures across regulated and cryptographic systems" },
    { score: 4, label: 'Advanced', text: "Automated testing of quantum-related enforcement points and audit criteria is integrated into CI/CD, control libraries, and third-party assurance processes" }
    ]
  },
  { id: 51, dimension: 'SGRM', practice: '2.3', stream: 'A',
    question: "How comprehensive is your assessment of vendor quantum readiness and cryptographic agility?",
    options: [
    { score: 1, label: 'Basic', text: "No evaluation of vendor quantum readiness or cryptographic agility is performed" },
    { score: 2, label: 'Developing', text: "Vendors are asked basic security questions, with occasional reference to PQC readiness" },
    { score: 3, label: 'Established', text: "Structured assessment framework evaluates vendor quantum readiness, agility posture, and coverage of key cryptographic systems" },
    { score: 4, label: 'Advanced', text: "Quantum readiness is monitored using automated tools or vendor risk platforms where critical exposure warrants it" }
    ]
  },
  { id: 52, dimension: 'SGRM', practice: '2.3', stream: 'A',
    question: "How do you manage quantum security and cryptographic agility requirements for vendors handling sensitive systems?",
    options: [
    { score: 1, label: 'Basic', text: "No defined quantum or cryptographic agility requirements are communicated to vendors" },
    { score: 2, label: 'Developing', text: "Contracts include basic security clauses referencing quantum readiness or PQC transition" },
    { score: 3, label: 'Established', text: "Structured requirement framework covers quantum-safe controls, cryptoagility posture, and applies to critical vendor systems" },
    { score: 4, label: 'Advanced', text: "Automated verification and enforcement of quantum and agility requirements are built into procurement, onboarding, and vendor monitoring processes" }
    ]
  },
  { id: 53, dimension: 'SGRM', practice: '2.3', stream: 'A',
    question: "How do you audit vendor controls for quantum security in critical systems?",
    options: [
    { score: 1, label: 'Basic', text: "No audit or validation of vendor controls related to quantum security is performed" },
    { score: 2, label: 'Developing', text: "Vendor-provided attestations or security reviews include limited references to quantum-relevant controls" },
    { score: 3, label: 'Established', text: "Structured audits validate post-quantum controls in high-risk vendor domains, with standardized checklists and escalation paths" },
    { score: 4, label: 'Advanced', text: "Technical verification of PQC and agility controls is integrated into vendor assurance processes for critical systems (e.g., code signing, PKI, CI/CD), with enforcement tied to contract terms or tooling" }
    ]
  },
  { id: 54, dimension: 'SGRM', practice: '2.3', stream: 'A',
    question: "How does your organization enforce and validate vendor cryptographic agility under real-world constraints?",
    options: [
    { score: 1, label: 'Basic', text: "No validation or enforcement of vendor cryptographic agility is performed" },
    { score: 2, label: 'Developing', text: "Vendors provide attestations or documentation of cryptographic agility capabilities without verification" },
    { score: 3, label: 'Established', text: "Vendor agility operations are validated through structured tests or review of agility enforcement in critical systems" },
    { score: 4, label: 'Advanced', text: "Vendors are contractually required to demonstrate live agility operations under constrained conditions, with enforcement integrated into onboarding, monitoring, and assurance processes" }
    ]
  },
  { id: 55, dimension: 'SGRM', practice: '2.3', stream: 'A',
    question: "How do you evaluate vendor support for hardware dependencies?",
    options: [
    { score: 1, label: 'Basic', text: "No evaluation of vendors’ hardware security capabilities is performed" },
    { score: 2, label: 'Developing', text: "Vendors self-attest to basic hardware use" },
    { score: 3, label: 'Established', text: "Structured assessments verify vendor support for hardware-backed key generation and cryptographic operations" },
    { score: 4, label: 'Advanced', text: "Vendor reviews include formal validation of hardware compatibility with PQC implementation plans, cryptographic agility requirements, and integration into DevSecOps and cryptographic lifecycle workflows" }
    ]
  },
  { id: 56, dimension: 'SGRM', practice: '2.3', stream: 'B',
    question: "How does your organization assess and manage quantum-related risks across its supply chain?",
    options: [
    { score: 1, label: 'Basic', text: "No supply chain risk assessment or management for quantum threats exists" },
    { score: 2, label: 'Developing', text: "Informal or ad hoc identification of vendors or systems with quantum exposure" },
    { score: 3, label: 'Established', text: "Structured risk management framework is in place for assessing quantum vulnerabilities in the supply chain" },
    { score: 4, label: 'Advanced', text: "Advanced modeling and dynamic risk scoring are used to assess and respond to quantum threats across the supply chain" }
    ]
  },
  { id: 57, dimension: 'SGRM', practice: '2.3', stream: 'B',
    question: "How does your organization perform technical evaluation of quantum risk across individual supply chain vendors and components?",
    options: [
    { score: 1, label: 'Basic', text: "No technical evaluation of quantum risks is performed for supply chain components" },
    { score: 2, label: 'Developing', text: "Basic reviews are conducted for select vendors or services without standardized analysis" },
    { score: 3, label: 'Established', text: "Structured risk evaluation is applied to vendors and components using defined criteria, scoring, and technical cryptographic review" },
    { score: 4, label: 'Advanced', text: "Technical risk analysis is automated and adaptive, incorporating telemetry, cryptographic exposure mapping, and supply chain intelligence feeds" }
    ]
  },
  { id: 58, dimension: 'SGRM', practice: '2.3', stream: 'B',
    question: "How do you identify and prioritize supply chain systems that could delay or block enterprise cryptographic transitions?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to identify supply chain systems that block or delay cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Systems are identified reactively during cryptographic implementation or vendor onboarding" },
    { score: 3, label: 'Established', text: "Structured process identifies, assesses, and prioritizes systems and vendors that lack support for PQC, algorithm agility, or required crypto changes" },
    { score: 4, label: 'Advanced', text: "Cryptographic blockers in the supply chain are continuously tracked, risk-scored, and integrated into transition roadmaps and vendor engagement strategies" }
    ]
  },
  { id: 59, dimension: 'SGRM', practice: '2.3', stream: 'B',
    question: "How does your organization evaluate fallback or downgrade risks in supply chain cryptographic protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No evaluation of fallback or downgrade risks in vendor cryptographic protocols is performed" },
    { score: 2, label: 'Developing', text: "Fallback risks are informally noted during vendor security reviews" },
    { score: 3, label: 'Established', text: "Structured assessments identify downgrade mechanisms in critical vendor protocols and systems" },
    { score: 4, label: 'Advanced', text: "Fallback risk detection is automated and integrated into vendor assurance and transition planning processes" }
    ]
  },
  { id: 60, dimension: 'SGRM', practice: '2.3', stream: 'B',
    question: "How does your organization improve vendor risk practices?",
    options: [
    { score: 1, label: 'Basic', text: "Basic practices are followed with no focus on continuous improvement" },
    { score: 2, label: 'Developing', text: "Industry best practices are informally adopted without customization or feedback loops" },
    { score: 3, label: 'Established', text: "Regular contributions are made to refine vendor risk methodologies and apply lessons learned across engagements" },
    { score: 4, label: 'Advanced', text: "Novel approaches to quantum vendor risk management are developed, shared, and adopted across industries or standards bodies" }
    ]
  },
  { id: 61, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization identify data requiring quantum-resistant protection?",
    options: [
    { score: 1, label: 'Basic', text: "No data identification process exists" },
    { score: 2, label: 'Developing', text: "Manual identification of sensitive data types in high-value or regulated systems" },
    { score: 3, label: 'Established', text: "Structured classification using protection timeframes and long-term confidentiality tags" },
    { score: 4, label: 'Advanced', text: "Automated discovery and classification with integrated quantum risk scoring" }
    ]
  },
  { id: 62, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization classify data based on quantum risk?",
    options: [
    { score: 1, label: 'Basic', text: "No classification system exists" },
    { score: 2, label: 'Developing', text: "Basic sensitivity levels defined without considering quantum-specific threats" },
    { score: 3, label: 'Established', text: "Structured classification incorporating protection duration and sensitivity to quantum risk" },
    { score: 4, label: 'Advanced', text: "Automated classification system with integrated quantum risk scoring and exposure modeling" }
    ]
  },
  { id: 63, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization implement quantum-resistant controls?",
    options: [
    { score: 1, label: 'Basic', text: "No specific controls implemented" },
    { score: 2, label: 'Developing', text: "Hybrid algorithms of classical and quantum-resistant cryptography applied to select high-sensitivity data" },
    { score: 3, label: 'Established', text: "Structured control framework aligned with data classifications and quantum protection needs that determines how hybrid algorithms are applied" },
    { score: 4, label: 'Advanced', text: "Automated enforcement of quantum-resistant controls across all data states with continuous validation" }
    ]
  },
  { id: 64, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization validate protection controls?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists" },
    { score: 2, label: 'Developing', text: "Manual testing of protection controls with limited coverage or frequency" },
    { score: 3, label: 'Established', text: "Structured validation process using tools and regular test schedules for all implemented controls" },
    { score: 4, label: 'Advanced', text: "Continuous automated validation integrated with control monitoring and quantum-aware threat modeling" }
    ]
  },
  { id: 65, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization tailor data protection requirements for constrained or specialized environments?",
    options: [
    { score: 1, label: 'Basic', text: "No distinction is made for environment-specific protection needs" },
    { score: 2, label: 'Developing', text: "Ad-hoc adjustments to protection requirements in constrained systems" },
    { score: 3, label: 'Established', text: "Defined protection profiles per environment (e.g., cloud, IoT, OT) with risk-based exceptions" },
    { score: 4, label: 'Advanced', text: "Centralized policy engine that enforces environment-aware protection requirements and supports automated updates" }
    ]
  },
  { id: 66, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization define protection strategies based on data lifecycle and retention needs?",
    options: [
    { score: 1, label: 'Basic', text: "No strategy exists to align protection with data lifecycle or retention needs" },
    { score: 2, label: 'Developing', text: "Retention durations are tracked, but not tied to protection strength or algorithm choice" },
    { score: 3, label: 'Established', text: "Strategy maps data types to protection durations based on classification and quantum risk" },
    { score: 4, label: 'Advanced', text: "Lifecycle-driven protection strategies with automated tagging, enforcement, and retirement policies" }
    ]
  },
  { id: 67, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization define protection strategies for unstructured or semi-structured data?",
    options: [
    { score: 1, label: 'Basic', text: "No strategy exists for protecting unstructured or semi-structured data" },
    { score: 2, label: 'Developing', text: "General protections applied without specific quantum-related considerations" },
    { score: 3, label: 'Established', text: "Strategy defines classification and protection guidelines for unstructured data formats" },
    { score: 4, label: 'Advanced', text: "Quantum-risk-aware tools and policies are applied to unstructured data discovery, tagging, and control enforcement" }
    ]
  },
  { id: 68, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization measure the effectiveness of data protection controls?",
    options: [
    { score: 1, label: 'Basic', text: "No measurement process exists for protection control effectiveness" },
    { score: 2, label: 'Developing', text: "Manual tracking of basic coverage metrics for critical systems" },
    { score: 3, label: 'Established', text: "Structured measurement framework assessing protection adequacy by classification, algorithm, and data state" },
    { score: 4, label: 'Advanced', text: "Automated effectiveness monitoring with analytics to identify protection gaps, misalignments, and future risks" }
    ]
  },
  { id: 69, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization identify opportunities to improve data protection controls?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists for identifying improvements to protection controls" },
    { score: 2, label: 'Developing', text: "Improvements are made on an ad-hoc basis in response to specific issues" },
    { score: 3, label: 'Established', text: "Structured process exists to evaluate improvements through testing, technology tracking, and design review" },
    { score: 4, label: 'Advanced', text: "Automated tools and analytics continuously identify protection improvement opportunities based on risk, performance, and cryptographic readiness" }
    ]
  },
  { id: 70, dimension: 'DPE', practice: '3.1', stream: 'B',
    question: "How does your organization assess the performance of data protection controls?",
    options: [
    { score: 1, label: 'Basic', text: "No performance testing or monitoring of data protection controls exists" },
    { score: 2, label: 'Developing', text: "Informal performance observations are made during implementation or deployment" },
    { score: 3, label: 'Established', text: "Structured performance testing is conducted to evaluate protection control impact across key environments" },
    { score: 4, label: 'Advanced', text: "Ongoing performance monitoring and benchmarking inform protection control tuning, design decisions, and trade-offs" }
    ]
  },
  { id: 71, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization ensure that symmetric encryption for sensitive stored data is secure against quantum algorithms?",
    options: [
    { score: 1, label: 'Basic', text: "No symmetric encryption controls are implemented for stored data" },
    { score: 2, label: 'Developing', text: "Standard encryption is applied but key sizes are not quantum-resistant and storage systems lack support for future upgrades" },
    { score: 3, label: 'Established', text: "Symmetric encryption with quantum-resistant key sizes is used and storage platforms support upgrades to algorithms or key lengths" },
    { score: 4, label: 'Advanced', text: "Symmetric encryption controls are enforced through automated policies with built-in cryptographic agility for key size updates and algorithm evolution" }
    ]
  },
  { id: 72, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization manage encryption keys for stored data in an agile manner?",
    options: [
    { score: 1, label: 'Basic', text: "No formal key management process exists for stored data" },
    { score: 2, label: 'Developing', text: "Keys are manually handled with limited support for rotation or upgrades" },
    { score: 3, label: 'Established', text: "Structured key management system supports key generation, secure storage, and rotation" },
    { score: 4, label: 'Advanced', text: "Automated key lifecycle management is implemented with cryptographic agility for key formats, wrapping, and dynamic upgrades" }
    ]
  },
  { id: 73, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization ensure strong, adaptable protection and recoverability for backup and archived data?",
    options: [
    { score: 1, label: 'Basic', text: "No cryptographic protections are applied to backup or archived data" },
    { score: 2, label: 'Developing', text: "Backups are encrypted, but protection does not account for long-term retention needs or future cryptographic changes" },
    { score: 3, label: 'Established', text: "Structured framework applies strong encryption and retention-aware protection policies to backup and archival systems" },
    { score: 4, label: 'Advanced', text: "Backup systems enforce encryption and key lifecycle policies that support long-term recoverability and cryptographic adaptability" }
    ]
  },
  { id: 74, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization ensure long-term cryptographic integrity of stored and archived data?",
    options: [
    { score: 1, label: 'Basic', text: "No integrity protections are applied to stored or archived data" },
    { score: 2, label: 'Developing', text: "Hashing or signing is applied inconsistently without consideration of retention duration or algorithm longevity" },
    { score: 3, label: 'Established', text: "Integrity protections are systematically applied using cryptographic algorithms selected for long-term effectiveness" },
    { score: 4, label: 'Advanced', text: "Integrity mechanisms are paired with time-stamping or re-signing strategies and support upgrades as cryptographic standards evolve" }
    ]
  },
  { id: 75, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization test whether storage encryption and key management controls are strong enough for long-term resilience, including future quantum threats?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists for storage cryptographic protections" },
    { score: 2, label: 'Developing', text: "Manual checks are performed on encryption configuration without quantum-specific considerations" },
    { score: 3, label: 'Established', text: "Structured testing process validates encryption algorithms, key sizes, and storage-specific controls against quantum risk factors" },
    { score: 4, label: 'Advanced', text: "Automated validation processes continuously assess storage protections and flag deviations from quantum-resilient standards" }
    ]
  },
  { id: 76, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How is your organization’s storage security strategy designed to support long-term data protection and resilience?",
    options: [
    { score: 1, label: 'Basic', text: "No strategic storage protection planning is in place" },
    { score: 2, label: 'Developing', text: "General storage encryption guidelines exist, but retention and long-term protection needs are not addressed" },
    { score: 3, label: 'Established', text: "Structured storage security strategy accounts for retention timelines, encryption strength, and business risk" },
    { score: 4, label: 'Advanced', text: "Storage protection strategy integrates retention-aware encryption, cryptographic lifecycle planning, and agility across storage environments" }
    ]
  },
  { id: 77, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization assess the upgrade and cryptographic support constraints of storage systems?",
    options: [
    { score: 1, label: 'Basic', text: "No assessment of storage system compatibility with encryption requirements exists" },
    { score: 2, label: 'Developing', text: "Informal assessments are performed for select systems only" },
    { score: 3, label: 'Established', text: "Structured process evaluates cryptographic capabilities, upgrade feasibility, and rekeying constraints across storage platforms" },
    { score: 4, label: 'Advanced', text: "Cryptographic support and upgrade limitations are routinely evaluated and integrated into refresh planning, procurement, and protection strategies" }
    ]
  },
  { id: 78, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization measure the effectiveness of encryption and key management controls used to protect stored data?",
    options: [
    { score: 1, label: 'Basic', text: "No measurement process exists for evaluating storage security controls" },
    { score: 2, label: 'Developing', text: "Manual tracking of encryption and key use with limited assessment of adequacy or coverage" },
    { score: 3, label: 'Established', text: "Structured measurement framework assesses control effectiveness by algorithm strength, coverage, and retention alignment" },
    { score: 4, label: 'Advanced', text: "Effectiveness metrics are integrated into ongoing review processes and used to adjust protections based on control performance, risk, and cryptographic evolution" }
    ]
  },
  { id: 79, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization identify opportunities to improve the security of encryption and key management for stored data?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists for identifying improvements to storage encryption or key management" },
    { score: 2, label: 'Developing', text: "Improvements are made informally in response to known weaknesses or incidents" },
    { score: 3, label: 'Established', text: "Structured process is used to evaluate encryption and key management improvements through testing, benchmarking, or architectural review" },
    { score: 4, label: 'Advanced', text: "Improvement opportunities are identified based on control validation results, monitoring data, and anticipated shifts in cryptographic or operational requirements" }
    ]
  },
  { id: 80, dimension: 'DPE', practice: '3.2', stream: 'B',
    question: "How does your organization enhance its storage encryption and key management capabilities over time?",
    options: [
    { score: 1, label: 'Basic', text: "No structured enhancement of storage security capabilities is performed" },
    { score: 2, label: 'Developing', text: "Capability updates are applied as needed, without a formal review process" },
    { score: 3, label: 'Established', text: "Enhancements are driven by regular assessments of security needs, system performance, and cryptographic alignment" },
    { score: 4, label: 'Advanced', text: "Storage security capabilities are continuously improved through structured planning, periodic reviews, and targeted adoption of features aligned with evolving data protection needs" }
    ]
  },
  { id: 81, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization implement cryptographic protections within data-in-transit protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No cryptographic protections are applied to data in transit" },
    { score: 2, label: 'Developing', text: "Standard transit protocols with default cryptographic settings are used" },
    { score: 3, label: 'Established', text: "Transit protocols are configured with strong cryptographic settings, aligned with policy and coverage expectations" },
    { score: 4, label: 'Advanced', text: "Cryptographic protections are consistently applied and validated across protocols, with automated configuration enforcement and cryptographic agility support" }
    ]
  },
  { id: 82, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization manage secure communication protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No protocol management exists" },
    { score: 2, label: 'Developing', text: "Secure protocols are used, but configurations vary and are not centrally managed" },
    { score: 3, label: 'Established', text: "Structured protocol management approach ensures standardization and proper configuration across systems" },
    { score: 4, label: 'Advanced', text: "Protocol configurations are centrally managed and continuously enforced using automation and monitoring tools" }
    ]
  },
  { id: 83, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization ensure trusted identity and authentication in secure network communications?",
    options: [
    { score: 1, label: 'Basic', text: "No authentication or identity validation is used in network communications" },
    { score: 2, label: 'Developing', text: "Authentication is implemented using default or self-managed certificates" },
    { score: 3, label: 'Established', text: "Trusted identity is enforced through structured certificate management and authenticated protocol configurations" },
    { score: 4, label: 'Advanced', text: "Authentication and trust models are centrally managed with automated issuance, validation, and revocation across the network environment" }
    ]
  },
  { id: 84, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization enforce minimum cryptographic standards to prevent downgrade attacks in data-in-transit protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No controls exist to prevent the use of insecure or deprecated protocols" },
    { score: 2, label: 'Developing', text: "Protocols support secure options, but fallback to weaker settings is not restricted" },
    { score: 3, label: 'Established', text: "Enforcement mechanisms ensure that insecure protocol versions or ciphers are disabled and downgrade attempts are logged" },
    { score: 4, label: 'Advanced', text: "Centralized controls and monitoring systems detect and block protocol downgrade behavior with real-time enforcement and analytics" }
    ]
  },
  { id: 85, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization validate the effectiveness of cryptographic protections used in transit protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists for cryptographic protections in transit protocols" },
    { score: 2, label: 'Developing', text: "Functional testing is performed, but cryptographic settings and security assumptions are not consistently verified" },
    { score: 3, label: 'Established', text: "Structured validation process tests encryption strength, authentication mechanisms, and protocol configurations across communication channels" },
    { score: 4, label: 'Advanced', text: "Transit security validations are automated, integrated into system testing, and continuously updated to reflect evolving cryptographic requirements" }
    ]
  },
  { id: 86, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization define its approach to protecting data in transit?",
    options: [
    { score: 1, label: 'Basic', text: "No defined approach or documentation exists for securing data in transit" },
    { score: 2, label: 'Developing', text: "Fundamental security guidelines exist, but they are informal or applied inconsistently" },
    { score: 3, label: 'Established', text: "Documented approach guides the use of transit protection protocols and cryptographic settings across the organization" },
    { score: 4, label: 'Advanced', text: "The transit security approach is updated based on evolving requirements, technical assessments, and integration with broader security planning" }
    ]
  },
  { id: 87, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization prioritize communication channels for enhanced cryptographic protection?",
    options: [
    { score: 1, label: 'Basic', text: "No prioritization process exists for securing communication channels" },
    { score: 2, label: 'Developing', text: "General criteria are used to guide which communications should be protected, but prioritization is informal or inconsistent" },
    { score: 3, label: 'Established', text: "Structured prioritization framework evaluates communication paths based on risk, sensitivity, and operational requirements" },
    { score: 4, label: 'Advanced', text: "Multi-factor prioritization model is used to guide deployment of transit protections based on real-time risk, value, and system context" }
    ]
  },
  { id: 88, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization manage and validate trust anchors for secure communication protocols?",
    options: [
    { score: 1, label: 'Basic', text: "Trust anchors and certificate validation are not actively managed" },
    { score: 2, label: 'Developing', text: "Default or unmanaged trust stores are used, with minimal oversight" },
    { score: 3, label: 'Established', text: "Trust anchors are reviewed and managed using structured procedures for validation, rotation, and revocation" },
    { score: 4, label: 'Advanced', text: "Certificate and trust anchor management is automated, regularly audited, and integrated with real-time revocation and alerting mechanisms" }
    ]
  },
  { id: 89, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization assess and enforce cryptographic protections in third-party or externally managed communication channels?",
    options: [
    { score: 1, label: 'Basic', text: "No visibility or validation of cryptographic protections for third-party or vendor-managed communication paths" },
    { score: 2, label: 'Developing', text: "Reliance on third-party assurances or default encryption settings without active validation" },
    { score: 3, label: 'Established', text: "Cryptographic requirements are defined and enforced through contracts, technical assessments, or integration standards" },
    { score: 4, label: 'Advanced', text: "External communication protections are continuously monitored, tested, and governed through security SLAs, audits, and automated trust enforcement" }
    ]
  },
  { id: 90, dimension: 'DPE', practice: '3.3', stream: 'B',
    question: "How does your organization plan for interoperability and backward compatibility during cryptographic transitions in transit protocols?",
    options: [
    { score: 1, label: 'Basic', text: "No consideration is given to interoperability during cryptographic upgrades" },
    { score: 2, label: 'Developing', text: "Compatibility issues are handled informally or reactively during transitions" },
    { score: 3, label: 'Established', text: "Upgrade planning includes documented strategies for backward compatibility" },
    { score: 4, label: 'Advanced', text: "Cryptographic transitions are guided by interoperability testing, staged rollouts, and automated fallback strategies" }
    ]
  },
  { id: 91, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization assess the cryptographic agility and quantum readiness of its technical infrastructure?",
    options: [
    { score: 1, label: 'Basic', text: "No infrastructure assessment is performed for cryptographic agility or quantum readiness" },
    { score: 2, label: 'Developing', text: "Ad-hoc reviews identify some cryptographic limitations, but do not evaluate agility or upgrade support" },
    { score: 3, label: 'Established', text: "Structured methodology evaluates infrastructure components for cryptographic agility and upgrade constraints" },
    { score: 4, label: 'Advanced', text: "Continuously updated assessment program identifies cryptographic limitations and supports agile, standards-aligned transition planning" }
    ]
  },
  { id: 92, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization plan infrastructure upgrades to support cryptographic agility and quantum readiness?",
    options: [
    { score: 1, label: 'Basic', text: "No planning exists to support cryptographic upgrades or agility" },
    { score: 2, label: 'Developing', text: "Preliminary upgrade planning considers critical systems but lacks cryptographic flexibility or timelines" },
    { score: 3, label: 'Established', text: "Structured upgrade procedures address cryptographic agility and include timelines and dependency mapping" },
    { score: 4, label: 'Advanced', text: "Comprehensive infrastructure upgrade program incorporates algorithm agility, resource alignment, and coordinated rollout scenarios" }
    ]
  },
  { id: 93, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization evaluate cryptographic hardware readiness for quantum-era requirements?",
    options: [
    { score: 1, label: 'Basic', text: "No evaluation of cryptographic hardware readiness is performed" },
    { score: 2, label: 'Developing', text: "Basic documentation identifies which systems rely on cryptographic hardware, but quantum or agility support is not considered" },
    { score: 3, label: 'Established', text: "Structured assessments verify cryptographic agility features, PQC roadmap alignment, and hardware constraints" },
    { score: 4, label: 'Advanced', text: "Comprehensive evaluation integrates vendor capability tracking, firmware upgrade planning, and fallback scenarios into system architecture and procurement" }
    ]
  },
  { id: 94, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization identify and address cryptographic upgrade blockers in legacy or third-party systems?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to identify or manage upgrade blockers across systems" },
    { score: 2, label: 'Developing', text: "Blockers are discovered reactively during upgrades, without centralized tracking" },
    { score: 3, label: 'Established', text: "Structured assessments and system reviews proactively flag upgrade blockers and inform remediation planning" },
    { score: 4, label: 'Advanced', text: "Upgrade blockers are continuously monitored and integrated into system lifecycle management, procurement, and roadmap planning" }
    ]
  },
  { id: 95, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization incorporate cryptographic agility requirements into system and software design processes?",
    options: [
    { score: 1, label: 'Basic', text: "Cryptographic design flexibility is not considered in system or software planning" },
    { score: 2, label: 'Developing', text: "Some systems support cryptographic configuration" },
    { score: 3, label: 'Established', text: "Architecture and design standards require support for algorithm agility" },
    { score: 4, label: 'Advanced', text: "Cryptographic agility requirements are embedded into architecture templates, design reviews, and development frameworks across all systems" }
    ]
  },
  { id: 96, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization plan for cryptographic upgrade sequencing and dependency management?",
    options: [
    { score: 1, label: 'Basic', text: "No planning is done to manage dependencies or sequence cryptographic upgrades" },
    { score: 2, label: 'Developing', text: "Informal sequencing occurs reactively during transitions, based on known issues" },
    { score: 3, label: 'Established', text: "Structured planning accounts for technical dependencies, interoperability constraints, and critical path systems" },
    { score: 4, label: 'Advanced', text: "Cryptographic upgrade sequencing is driven by modeling tools, dependency maps, and coordination with internal and external stakeholders" }
    ]
  },
  { id: 97, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization provide technical environments and tooling to support cryptographic transition planning and implementation?",
    options: [
    { score: 1, label: 'Basic', text: "No dedicated environments or tools exist for cryptographic testing or transition simulation" },
    { score: 2, label: 'Developing', text: "Ad-hoc test setups are created manually, with limited support for modern cryptographic libraries or PQC experimentation" },
    { score: 3, label: 'Established', text: "Dedicated environments and tooling support cryptographic upgrade validation, protocol testing, and hybrid certificate workflows" },
    { score: 4, label: 'Advanced', text: "Standardized cryptographic test environments are available on demand, with automated test harnesses, toolchains, and CI/CD integrations for crypto transitions" }
    ]
  },
  { id: 98, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization embed cryptographic agility into system architecture design?",
    options: [
    { score: 1, label: 'Basic', text: "Cryptographic flexibility is not considered in architectural design decisions" },
    { score: 2, label: 'Developing', text: "Some system designs support algorithm changes, but agility is not standardized across the architecture" },
    { score: 3, label: 'Established', text: "Architectural patterns require cryptographic abstraction and support for algorithm agility, with guidance integrated into system design" },
    { score: 4, label: 'Advanced', text: "Cryptographic agility is a core architectural principle, enforced through design reviews, templates, and automated architecture validation" }
    ]
  },
  { id: 99, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization define and measure technical milestones for cryptographic transitions?",
    options: [
    { score: 1, label: 'Basic', text: "No technical milestones are defined for cryptographic transition" },
    { score: 2, label: 'Developing', text: "Basic milestones are documented, but not tied to cryptographic risk or agility goals" },
    { score: 3, label: 'Established', text: "Structured cryptographic transition milestones are tracked across systems and aligned to business or regulatory priorities" },
    { score: 4, label: 'Advanced', text: "Cryptographic transition milestones are managed through integrated dashboards with risk-weighted timelines and system-level dependencies" }
    ]
  },
  { id: 100, dimension: 'ITR', practice: '4.1', stream: 'B',
    question: "How does your organization contribute to the development and advancement of technical standards for cryptographic agility and quantum-resistant implementations?",
    options: [
    { score: 1, label: 'Basic', text: "No engagement with cryptographic standards related to agility or quantum resistance" },
    { score: 2, label: 'Developing', text: "Participation in working groups or community discussions, but no technical contribution" },
    { score: 3, label: 'Established', text: "Technical contributions to cryptographic standards or specifications focused on agility or quantum resistance" },
    { score: 4, label: 'Advanced', text: "Leadership role in shaping cryptographic agility or PQC transition standards, including development of reference implementations, testing frameworks, or interoperability models" }
    ]
  },
  { id: 101, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization define the technical capabilities required to support quantum-resistant implementation?",
    options: [
    { score: 1, label: 'Basic', text: "No capability requirements have been defined for quantum or cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Initial requirements are identified, but coverage is limited and not linked to specific systems or roles" },
    { score: 3, label: 'Established', text: "Structured capability model defines technical roles, tools, and implementation processes needed for quantum-resistant upgrades" },
    { score: 4, label: 'Advanced', text: "Capability requirements are embedded into workforce development, procurement, and delivery planning, with ongoing tracking and refinement" }
    ]
  },
  { id: 102, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization allocate and protect specialized resources for cryptographic implementation and transition efforts?",
    options: [
    { score: 1, label: 'Basic', text: "No specific resources are allocated for cryptographic implementation or agility-related work" },
    { score: 2, label: 'Developing', text: "Resource needs are documented, but staff or tools are reassigned or under-resourced due to competing priorities" },
    { score: 3, label: 'Established', text: "Dedicated cryptographic implementation teams, tools, and infrastructure are prioritized for transition projects and protected from disruption" },
    { score: 4, label: 'Advanced', text: "Resource prioritization for cryptographic implementation is embedded in strategic planning, with protected capacity across teams, secure environments, and dedicated tooling" }
    ]
  },
  { id: 103, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization ensure the quality and correctness of cryptographic implementations?",
    options: [
    { score: 1, label: 'Basic', text: "No quality assurance processes are applied to cryptographic implementations" },
    { score: 2, label: 'Developing', text: "Basic code reviews or testing are performed, but cryptographic logic is not systematically verified" },
    { score: 3, label: 'Established', text: "Structured quality program includes cryptographic-specific review, testing, and validation processes across systems" },
    { score: 4, label: 'Advanced', text: "Cryptographic quality is continuously monitored and verified through automated analysis, misuse detection, and secure implementation tooling" }
    ]
  },
  { id: 104, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization monitor the operational impact of cryptographic implementations after deployment?",
    options: [
    { score: 1, label: 'Basic', text: "No monitoring is performed after cryptographic changes are deployed" },
    { score: 2, label: 'Developing', text: "Basic monitoring captures performance issues, but is not linked to cryptographic changes" },
    { score: 3, label: 'Established', text: "Structured monitoring processes evaluate the operational effects of cryptographic upgrades and inform remediation" },
    { score: 4, label: 'Advanced', text: "Cryptographic implementation impact is continuously tracked using telemetry, with proactive tuning and adaptive rollout strategies" }
    ]
  },
  { id: 105, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization ensure cryptographic implementation libraries, patterns, and tools remain up to date with evolving standards?",
    options: [
    { score: 1, label: 'Basic', text: "No process exists to update cryptographic implementation tools or patterns" },
    { score: 2, label: 'Developing', text: "Updates are applied reactively or informally, without consistent review or tracking" },
    { score: 3, label: 'Established', text: "Structured maintenance processes regularly update crypto libraries, APIs, coding guidance, and implementation templates" },
    { score: 4, label: 'Advanced', text: "Cryptographic libraries, patterns, and tooling are continuously monitored, tested, and updated through automated or lifecycle-integrated processes" }
    ]
  },
  { id: 106, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How structured is your delivery process for implementing cryptographic changes?",
    options: [
    { score: 1, label: 'Basic', text: "No defined delivery process exists to support cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Cryptographic changes are delivered informally or within general-purpose project processes, without crypto-specific considerations" },
    { score: 3, label: 'Established', text: "Structured delivery methodology exists that includes cryptographic implementation steps, roles, and transition requirements" },
    { score: 4, label: 'Advanced', text: "Cryptographic transition delivery is supported by a formal, integrated framework designed to accommodate algorithm agility, hybrid models, and PQC migration scenarios" }
    ]
  },
  { id: 107, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization ensure consistent implementation of cryptographic practices across systems?",
    options: [
    { score: 1, label: 'Basic', text: "No measures are in place to promote consistency in cryptographic implementation" },
    { score: 2, label: 'Developing', text: "Basic guidance or templates exist, but usage is informal and not systematically verified" },
    { score: 3, label: 'Established', text: "Structured program defines and enforces consistent cryptographic practices across systems, supported by review or tooling" },
    { score: 4, label: 'Advanced', text: "Cryptographic consistency is continuously maintained through automated validation, shared modules, and conformance monitoring across the environment" }
    ]
  },
  { id: 108, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization identify and manage risks associated with cryptographic transitions?",
    options: [
    { score: 1, label: 'Basic', text: "No risk management activities are in place for cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Risks are tracked informally during implementation with limited cryptographic specificity" },
    { score: 3, label: 'Established', text: "Structured risk management framework addresses cryptographic implementation risks, including incompatibility, tooling gaps, and fallback failure" },
    { score: 4, label: 'Advanced', text: "Cryptographic risk management is integrated with project delivery, including automated tracking, proactive mitigation, and crypto-specific impact modeling" }
    ]
  },
  { id: 109, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization track and benchmark cryptographic delivery outcomes across implementation projects?",
    options: [
    { score: 1, label: 'Basic', text: "No tracking or benchmarking is performed for cryptographic implementation outcomes" },
    { score: 2, label: 'Developing', text: "Delivery success or delay is recorded informally, without standardized metrics" },
    { score: 3, label: 'Established', text: "Structured metrics are used to evaluate cryptographic delivery performance across projects, with comparisons across teams or systems" },
    { score: 4, label: 'Advanced', text: "Cryptographic delivery metrics are continuously tracked, benchmarked, and used to optimize implementation planning, tooling, and rollout strategies" }
    ]
  },
  { id: 110, dimension: 'ITR', practice: '4.2', stream: 'B',
    question: "How does your organization enforce cryptographic change readiness and agility through its CI/CD and software delivery pipelines?",
    options: [
    { score: 1, label: 'Basic', text: "No governance or verification in delivery workflows for cryptographic changes" },
    { score: 2, label: 'Developing', text: "Cryptographic requirements are applied manually or inconsistently during implementation" },
    { score: 3, label: 'Established', text: "Delivery pipelines include structured enforcement of cryptographic settings, supported algorithms, and secure usage patterns" },
    { score: 4, label: 'Advanced', text: "Cryptographic readiness is fully integrated into CI/CD with automated policy enforcement, rollback testing, hybrid readiness checks, and agility-aware gating" }
    ]
  },
  { id: 111, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How comprehensive is your testing strategy for cryptographic transitions and quantum-resistant implementations?",
    options: [
    { score: 1, label: 'Basic', text: "No testing strategy exists for cryptographic transitions or quantum-resistant implementations" },
    { score: 2, label: 'Developing', text: "Basic test procedures are in place, but do not address cryptographic changes or PQC-specific concerns" },
    { score: 3, label: 'Established', text: "Structured testing framework defines how quantum-safe and agile cryptographic systems will be tested, including algorithm-specific test planning and fallback scenarios" },
    { score: 4, label: 'Advanced', text: "Standards-aligned testing strategy exists that covers quantum-resistant and hybrid implementations, with continuous updates based on emerging requirements and automated testing capabilities" }
    ]
  },
  { id: 112, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization validate cryptographic fallback mechanisms and recovery readiness during transition testing?",
    options: [
    { score: 1, label: 'Basic', text: "No validation of fallback or cryptographic recovery behavior is performed" },
    { score: 2, label: 'Developing', text: "Basic negative test cases are created, but do not represent real-world failure scenarios or critical crypto edge cases" },
    { score: 3, label: 'Established', text: "Structured testing includes rollback paths, fallback scenarios, and resilience under cryptographic failure conditions" },
    { score: 4, label: 'Advanced', text: "Cryptographic transitions are tested using failure injection, downgrade simulation, and automated validation of rollback paths and hybrid interoperability" }
    ]
  },
  { id: 113, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization test the performance and scalability of cryptographic implementations under realistic and constrained conditions?",
    options: [
    { score: 1, label: 'Basic', text: "No performance testing is performed on cryptographic implementations" },
    { score: 2, label: 'Developing', text: "Basic performance testing is conducted, but does not reflect real-world constraints or cryptographic transition impact" },
    { score: 3, label: 'Established', text: "Structured testing includes performance profiling of cryptographic operations under realistic loads, network conditions, and device constraints" },
    { score: 4, label: 'Advanced', text: "Comprehensive performance testing simulates quantum-era conditions across environments, with automated stress testing, telemetry integration, and continuous profiling" }
    ]
  },
  { id: 114, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization generate and manage assurance evidence from cryptographic testing activities?",
    options: [
    { score: 1, label: 'Basic', text: "No structured outputs are generated from cryptographic testing" },
    { score: 2, label: 'Developing', text: "Basic logs or manual notes are captured, but not consistently tied to cryptographic validation requirements" },
    { score: 3, label: 'Established', text: "Structured cryptographic testing produces repeatable, reviewable artifacts (e.g., trace logs, verification reports, test case outputs) aligned to crypto assurance goals" },
    { score: 4, label: 'Advanced', text: "Cryptographic test results are systematically captured, reviewed, and used to generate assurance evidence for internal governance, audits, or external certification" }
    ]
  },
  { id: 115, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization adapt cryptographic testing practices in response to evolving threats, implementation risks, and post-quantum developments?",
    options: [
    { score: 1, label: 'Basic', text: "Testing practices are static and updated only during major reviews" },
    { score: 2, label: 'Developing', text: "Updates are made manually in response to known test failures or external recommendations" },
    { score: 3, label: 'Established', text: "Testing is regularly enhanced based on crypto-specific feedback, standards evolution, and integration results" },
    { score: 4, label: 'Advanced', text: "Testing is proactively updated in response to cryptographic lifecycle changes, vulnerability disclosures, and PQC-related protocol shifts, with formal integration into test maintenance cycles" }
    ]
  },
  { id: 116, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How structured is your validation process for cryptographic transitions?",
    options: [
    { score: 1, label: 'Basic', text: "No validation process exists for cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Basic validation steps are performed, but without standardized procedures" },
    { score: 3, label: 'Established', text: "Structured validation framework is used across cryptographic transitions, with defined roles, criteria, and repeatable processes" },
    { score: 4, label: 'Advanced', text: "Cryptographic validation is integrated with deployment workflows, using tooling, traceability, and continuous refinement" }
    ]
  },
  { id: 117, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization ensure consistent validation practices across cryptographic transitions and systems?",
    options: [
    { score: 1, label: 'Basic', text: "No consistency measures exist for validation of cryptographic transitions" },
    { score: 2, label: 'Developing', text: "Basic validation procedures are shared informally, but applied inconsistently across teams or systems" },
    { score: 3, label: 'Established', text: "Structured validation framework enforces consistent practices, acceptance criteria, and test case reuse for cryptographic changes" },
    { score: 4, label: 'Advanced', text: "Validation processes are standardized and automatically applied across environments, with tooling to detect deviations and enforce conformance" }
    ]
  },
  { id: 118, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization ensure validation of cryptographic implementations aligns with regulatory, industry, and internal compliance requirements?",
    options: [
    { score: 1, label: 'Basic', text: "No compliance requirements are considered during cryptographic validation" },
    { score: 2, label: 'Developing', text: "Basic validation checks exist, but are not mapped to specific cryptographic compliance obligations" },
    { score: 3, label: 'Established', text: "Structured compliance process ensures cryptographic validation activities meet applicable regulatory and industry requirements" },
    { score: 4, label: 'Advanced', text: "Cryptographic validation is integrated with compliance management systems, with automated checks, evidence collection, and ongoing regulatory alignment" }
    ]
  },
  { id: 119, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization assess cryptographic weaknesses or downgrade risks in third-party and externally managed systems during implementation testing?",
    options: [
    { score: 1, label: 'Basic', text: "No validation is performed on the cryptographic behavior of third-party or externally managed systems" },
    { score: 2, label: 'Developing', text: "Third-party systems are assumed to be secure, with limited cryptographic validation during integration" },
    { score: 3, label: 'Established', text: "Structured cryptographic testing is performed on third-party endpoints and integrations, including downgrade attempts and configuration scanning" },
    { score: 4, label: 'Advanced', text: "Cryptographic behavior of third-party systems is continuously tested and monitored using automated validation, downgrade probes, and integration testing frameworks" }
    ]
  },
  { id: 120, dimension: 'ITR', practice: '4.3', stream: 'B',
    question: "How does your organization contribute to industry standards or best practices for validating cryptographic implementations?",
    options: [
    { score: 1, label: 'Basic', text: "No participation in cryptographic validation standards or best practices" },
    { score: 2, label: 'Developing', text: "Occasional participation in industry groups or review of draft validation guidance" },
    { score: 3, label: 'Established', text: "Active contributions to validation guidance, test frameworks, or community validation efforts" },
    { score: 4, label: 'Advanced', text: "Leadership in developing validation standards, tools, or frameworks adopted by other organizations" }
    ]
  }
];

// ═══════════════════════════════════════════════════
// QUICK ASSESSMENT — 12 representative questions (3 per dimension)
// One from each practice per dimension
// ═══════════════════════════════════════════════════
QG.QUICK_QUESTIONS = QG.QUESTIONS.filter(q => [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111].includes(q.id));

// ═══════════════════════════════════════════════════
// COMPLIANCE FRAMEWORKS
// ═══════════════════════════════════════════════════
QG.COMPLIANCE_FRAMEWORKS = [
  { id: 'nist_pqc', name: 'NIST PQC', fullName: 'NIST Post-Quantum Cryptography Standards',
    description: 'FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA), NIST SP 800-131A Rev. 2, NIST IR 8547',
    mappedPractices: ['1.1', '1.2', '1.3', '3.1', '3.2', '3.3', '4.1', '4.2', '4.3'] },
  { id: 'cmmc', name: 'CMMC 2.0', fullName: 'Cybersecurity Maturity Model Certification',
    description: 'Level 1: Foundational (17 practices), Level 2: Advanced (110 practices), Level 3: Expert (110+)',
    mappedPractices: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '4.1'] },
  { id: 'fedramp', name: 'FedRAMP', fullName: 'Federal Risk and Authorization Management Program',
    description: 'Low (125 controls), Moderate (325 controls), High (421 controls)',
    mappedPractices: ['1.1', '1.3', '2.2', '3.1', '3.2', '3.3', '4.2', '4.3'] },
  { id: 'fisma', name: 'FISMA', fullName: 'Federal Information Security Management Act',
    description: 'NIST SP 800-53 Rev. 5, FIPS 199, FIPS 200',
    mappedPractices: ['2.1', '2.2', '2.3', '3.2', '4.1', '4.2'] }
];

// Make available globally
if (typeof window !== 'undefined') window.QG = QG;
if (typeof module !== 'undefined') module.exports = QG;

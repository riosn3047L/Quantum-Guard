# QuantumGuard - Scoring Methodology

## Assessment Structure

```
QuantumGuard Assessment
├── Dimension 1: CVI (Cryptographic Visibility & Inventory)
│   ├── Practice 1.1: Discovery & Inventory Management (10 questions)
│   ├── Practice 1.2: Vulnerability Assessment & Classification (10 questions)
│   └── Practice 1.3: Cryptographic Dependency Mapping (10 questions)
├── Dimension 2: SGRM (Strategic Governance & Risk Management)
│   ├── Practice 2.1: Executive Leadership & Policy (10 questions)
│   ├── Practice 2.2: Risk Assessment & Compliance (10 questions)
│   └── Practice 2.3: Third-Party & Supply Chain Risk (10 questions)
├── Dimension 3: DPE (Data Protection Engineering)
│   ├── Practice 3.1: Data Classification & Protection (10 questions)
│   ├── Practice 3.2: Storage Security & Encryption (10 questions)
│   └── Practice 3.3: Transit Security & Protocol (10 questions)
└── Dimension 4: ITR (Implementation & Technical Readiness)
    ├── Practice 4.1: Infrastructure Assessment & Planning (10 questions)
    ├── Practice 4.2: Implementation Capability (10 questions)
    └── Practice 4.3: Testing & Validation (10 questions)
```

## Scoring Formula

### Question Level
- Each question has 4 answer options scored 1-4
- 1 = Basic (least mature)
- 4 = Advanced/Optimizing (most mature)

### Practice Score
```
Practice Score = Average of answered question scores in that practice
```
Range: 1.0 - 4.0 (0 if no questions answered)

### Dimension Score
```
Dimension Score = MIN(Practice_1, Practice_2, Practice_3)
```
**Weakest link principle**: The dimension score equals the lowest practice score. A dimension cannot be stronger than its weakest practice.

### Overall Score
```
Overall Score = Average of all 4 dimension scores
```
Range: 1.0 - 4.0

### Maturity Level Mapping
| Level | Name | Score Range | Color |
|---|---|---|---|
| 1 | Basic | 1.0 - 1.4 | Red (#FF5252) |
| 2 | Developing | 1.5 - 2.4 | Orange (#FFB74D) |
| 3 | Established | 2.5 - 3.4 | Blue (#4FC3F7) |
| 4 | Advanced | 3.5 - 3.9 | Green (#81C784) |
| 5 | Optimizing | 4.0 | Purple (#CE93D8) |

## Risk Multiplier

The organization profile adjusts the assessment context through a composite risk multiplier:

```
Risk Multiplier = (Industry_Weight × Industry_Value) + 
                  (DataSensitivity_Weight × DataSensitivity_Value) +
                  (Regulatory_Weight × Regulatory_Value) +
                  (GeoScope_Weight × GeoScope_Value) +
                  (OrgSize_Weight × OrgSize_Value)
```

| Factor | Weight | Values |
|---|---|---|
| Industry | 0.30 | Financial/Healthcare/Defense=1.5, Tech/Energy=1.3, Others=1.0 |
| Data Sensitivity | 0.25 | Highly Classified=1.5, Confidential=1.3, Internal/Public=1.0 |
| Regulatory | 0.20 | Multiple Frameworks=1.5, Single=1.3, Minimal=1.0 |
| Geographic Scope | 0.15 | Global=1.5, Multi-region=1.3, Regional/Single=1.0 |
| Org Size | 0.10 | Fortune 500=1.5, Large=1.3, Mid/Small=1.0 |

Range: 1.0 - 1.5

**Note**: The risk multiplier is calculated and displayed but is NOT currently applied to the scoring calculation. It's stored in the org profile but the scoring engine doesn't use it to adjust scores. This is a gap.

## TLS Quantum Readiness Score

The backend SSLyze scanner calculates a separate 0-100 score:

| Component | Max Points | Criteria |
|---|---|---|
| Protocol Version | 25 | TLS 1.3 + no deprecated = 25, TLS 1.3 with deprecated = 15, TLS 1.2 only = 15, TLS 1.2 with deprecated = 8 |
| Cipher Strength | 20 | 256-bit = 20, weak ciphers = 5, 128-bit = 12 |
| Key Exchange | 25 | PQC key exchange = 25, quantum-vulnerable = 5, no data = 0 |
| Certificate | 15 | PQC cert = 10, RSA-4096 = 8, RSA-2048 = 5, EC = 7, trust store bonus +5 |
| Vulnerabilities | 15 | Start at 15, -5 per vulnerability detected |

## Compliance Coverage

Compliance coverage per framework is calculated as:
```
Coverage = Average(practice_scores_for_mapped_practices) / 4.0 × 100
```

If no mapped practices have scores, falls back to overall score percentage.

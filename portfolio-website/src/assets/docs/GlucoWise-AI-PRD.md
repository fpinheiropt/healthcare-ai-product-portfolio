# Product Requirements Document (PRD): GlucoWise AI

**Version**: 1.0  
**Status**: Final  
**Date**: November 29, 2025  
**Author**: Francisco Pinheiro, MD

---

## 1. Executive Summary

**GlucoWise AI** is an intelligent coaching platform designed to help patients with Type 2 Diabetes (T2D) understand the relationship between their lifestyle choices and glucose levels. Unlike traditional logbooks that just record data, GlucoWise uses AI to identify patterns (e.g., "Your glucose spikes 2 hours after eating pasta") and provides personalized, actionable recommendations to improve glycemic control.

### The Problem
- **Data Overload**: Patients generate hundreds of glucose data points but lack the expertise to interpret them.
- **Generic Advice**: "Eat better" is too vague. Patients need specific feedback based on their unique metabolic response.
- **High Friction**: Manual logging is tedious and leads to abandonment.

### The Solution
A "smart" diabetes companion that:
1.  **Simplifies Logging**: Uses computer vision (simulated) to log meals via photos.
2.  **Connects the Dots**: Correlates specific foods with glucose excursions.
3.  **Nudges Behavior**: Suggests specific food swaps to flatten glucose curves.

---

## 2. User Personas

### Primary Persona: "David" (The Newly Diagnosed)
- **Profile**: 55-year-old accountant, recently diagnosed with T2D.
- **Pain Point**: Overwhelmed by dietary restrictions. Doesn't know which foods spike his sugar.
- **Goal**: Lower HbA1c below 7.0% without giving up all his favorite foods.
- **Quote**: *"My doctor said 'watch your carbs,' but I don't know if that means no bread or just less bread."*

### Secondary Persona: "Dr. Lee" (The Endocrinologist)
- **Profile**: Busy specialist with 15-minute appointment slots.
- **Pain Point**: Patients bring in messy paper logs or raw CSV files that take too long to analyze.
- **Goal**: Quickly identify adherence issues and patterns to adjust medication.
- **Quote**: *"I don't need to see every number. I need to know if they're spiking after dinner or waking up high."*

---

## 3. Functional Requirements

### 3.1 Patient Mobile App

| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Smart Meal Logging** | User takes a photo or types a description. AI extracts macronutrients (Carbs, Protein, Fat). | P0 |
| **Glucose Tracking** | Manual entry of finger-stick readings or sync with CGM data (simulated). | P0 |
| **Pattern Recognition** | "Insight Engine" that flags correlations (e.g., "Pizza dinners lead to >180 mg/dL next morning"). | P1 |
| **Food Swaps** | Recommendation engine suggesting lower-GI alternatives (e.g., "Try quinoa instead of white rice"). | P2 |

### 3.2 Provider Dashboard

| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Glycemic Variability** | Visual graphs showing Time-in-Range (TIR) vs. Hyper/Hypoglycemia. | P0 |
| **Adherence Score** | Metric tracking logging frequency and medication compliance. | P1 |
| **Red Flag Alerts** | Notifications for severe hypoglycemia (<70 mg/dL) or sustained hyperglycemia (>250 mg/dL). | P1 |

---

## 4. AI/ML Capabilities

### 4.1 Natural Language Processing (NLP) for Food
- **Input**: "Turkey sandwich on whole wheat with mayo"
- **Model**: Named Entity Recognition (NER) to extract ingredients.
- **Output**: {Carbs: 30g, Protein: 25g, Fat: 15g}

### 4.2 Glucose Pattern Clustering
- **Algorithm**: K-Means Clustering on post-prandial glucose curves.
- **Goal**: Group meals into "Green" (stable response), "Yellow" (moderate spike), and "Red" (severe spike) categories.

### 4.3 Recommendation Engine
- **Logic**: Collaborative filtering based on successful swaps from similar users.
- **Example**: If User A stabilized glucose by switching to sourdough, suggest sourdough to User B who spikes on white bread.

---

## 5. Success Metrics

### 5.1 Clinical Outcomes
- **HbA1c Reduction**: Target 0.5% reduction in 3 months.
- **Time-in-Range (TIR)**: Increase % of time glucose is 70-180 mg/dL.

### 5.2 Engagement Metrics
- **Daily Active Users (DAU)**: % of users logging at least 1 meal/day.
- **Logging Friction**: Average time to log a meal (Target: <30 seconds).

### 5.3 Behavioral Metrics
- **Swap Acceptance Rate**: % of AI-suggested food swaps accepted by the user.

---

## 6. Roadmap

### Phase 1: MVP (Current)
- Manual glucose and meal logging.
- Basic trend visualization.
- Rule-based insights (e.g., "High glucose detected").

### Phase 2: Intelligence Layer
- Integration of NLP for automated macro estimation.
- "Traffic Light" system for logged meals based on historical response.

### Phase 3: Connected Ecosystem
- Real-time CGM integration (Dexcom/Libre APIs).
- Apple Health / Google Fit sync for activity data.

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Inaccurate Macro Estimation** | User relies on wrong carb counts for insulin dosing. | **Disclaimer**: "Estimates for educational purposes only." Manual override option. |
| **Alert Fatigue** | User ignores constant notifications. | **Smart Throttling**: Limit non-critical alerts to 1/day. |
| **Data Privacy** | Leak of sensitive health data. | HIPAA-compliant encryption; local-first data storage where possible. |

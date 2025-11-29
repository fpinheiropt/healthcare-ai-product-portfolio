# Building 3 AI Healthcare MVPs in 3 Weeks: A Product Manager's Journey

**Date**: November 29, 2025  
**Author**: Francisco Pinheiro, MD

---

## The Challenge

Breaking into AI Product Management without traditional PM experience is like trying to get your first job when every posting requires "3-5 years experience." The advice is always the same: *build something, show don't tell*. But here's the problem—most people build one thing, write a case study, and hope it's enough.

I decided to take a different approach: **build three AI healthcare MVPs in three weeks**. Not because I'm a masochist, but because I wanted to demonstrate something crucial for any PM role—the ability to ship, iterate, and prioritize ruthlessly across different problem spaces.

This is the story of building [HeartGuide AI](https://heartguide-ai.vercel.app), [BreathEasy AI](https://breatheasy-ai.vercel.app), and [GlucoWise AI](https://glucowise-ai.vercel.app).

---

## The Strategy: Why 3 MVPs?

**Breadth over depth.** I wanted to show I could identify problems, design solutions, and execute across different healthcare verticals—not just obsess over one idea for months.

**Why Healthcare AI?** Two reasons:
1. **Personal**: As a physician with a Master's in Biomedical Engineering, I've seen firsthand how broken healthcare workflows are. I know where the pain points live.
2. **Market**: Digital health is exploding, but most solutions are either too clinical (doctors hate them) or too consumer-y (they don't work). There's a massive opportunity for products that bridge both worlds.

**The 3-Week Timeline** was intentional. It forced me to make hard trade-offs. No feature creep. No "maybe we should add..." conversations with myself at 2 AM. Ship or die.

---

## Week 1: HeartGuide AI - Heart Failure Readmission Prevention

### The Problem
30-day heart failure readmissions cost the U.S. healthcare system **$17 billion annually**. Hospitals get penalized. Patients suffer. The core issue? **Reactive care**. By the time a patient shows up to the ER, it's too late.

### The Solution
A clinical decision support system with:
- **Patient-facing app**: Daily symptom check-ins, weight tracking, medication reminders
- **Provider dashboard**: Risk stratification, real-time alerts, trend analysis

### The Technical Challenge
I didn't have access to real patient data (HIPAA, duh). So I built a **realistic data simulator** that generates patient profiles with varying risk levels. The key was making the data *believable*—not just random numbers, but patterns that mirror actual clinical deterioration.

### The PM Lesson
**Start with the provider workflow, not the algorithm.** 

I initially wanted to dive into building a fancy ML model. But after sketching out user flows, I realized the real value wasn't in prediction accuracy—it was in **surfacing the right information at the right time**. A simple risk score (Green/Yellow/Red) based on rule-based logic was enough for the MVP. The AI could come later.

---

## Week 2: BreathEasy AI - Smart Asthma Management

### The Problem
Asthma affects 260 million people globally, yet management is still reactive. Patients don't track triggers. Doctors rely on recall bias during 6-month checkups. **Environmental factors** (pollen, air quality, weather) are known triggers, but nobody's connecting the dots in real-time.

### The Solution
A platform that correlates patient-reported outcomes (Peak Flow, symptoms) with real-time environmental data:
- **Patient app**: Quick daily logging, environmental alerts, medication tracking
- **Provider dashboard**: Trigger identification, exacerbation prediction

### The Technical Challenge
Integrating **live weather and pollen APIs** (OpenWeatherMap, IQAir) and making the data *actionable*. It's one thing to show "AQI is 150 today." It's another to say "Your asthma symptoms worsen when AQI > 100. Avoid outdoor exercise today."

### The PM Lesson
**Hardware-free MVP > waiting for partnerships.**

I originally wanted to integrate with smart inhalers (Bluetooth sensors). But that would've required partnerships, regulatory approvals, and months of waiting. Instead, I focused on **manual entry + environmental context**. It's not as sexy, but it's shippable. And it proves the core value prop: *personalized trigger identification*.

---

## Week 3: GlucoWise AI - Type 2 Diabetes Coaching

### The Problem
Type 2 diabetes management is all about lifestyle—diet, exercise, stress. But most apps are either glorified food diaries or overly complex clinical tools. Patients need **simple, actionable insights**, not 47 different metrics.

### The Solution
A coaching platform that combines:
- **Meal logging**: Quick photo + description (no calorie counting)
- **Glucose trend analysis**: Visual patterns, not raw numbers
- **AI-driven recommendations**: Personalized tips based on user data

### The Technical Challenge
Balancing **simplicity with clinical accuracy**. I could've built a complex carb-counting algorithm, but that's not how real people use apps. Instead, I focused on *trend detection*—flagging patterns like "Your glucose spikes after pasta dinners" rather than "You ate 45g of carbs."

### The PM Lesson
**"Good enough" data beats perfect data that doesn't exist.**

I didn't train a real ML model (yet). I used rule-based logic to simulate insights. Why? Because the goal wasn't to build production-ready AI—it was to **validate the product hypothesis**: *Can we help T2D patients make better decisions with minimal friction?* The answer is yes. The AI can be swapped in later.

---

## The Tech Stack (And Why It Matters)

- **Frontend**: React + TypeScript + Tailwind CSS
  - *Why?* Speed. I can prototype UI fast, and TypeScript catches bugs before they become problems.
- **Deployment**: Vercel
  - *Why?* One-click deploys. No DevOps rabbit holes.
- **AI Simulation**: Rule-based logic + mock data
  - *Why?* Real ML models require data, training, and time. For an MVP, simulated intelligence is enough to prove the concept.

**The PM takeaway**: Choose tools that let you move fast. Perfection is the enemy of shipping.

---

## Key Takeaways for Aspiring PMs

### 1. Scope Ruthlessly
The 80/20 rule on steroids. Each MVP had **one core feature**. Everything else was noise. HeartGuide = risk alerts. BreathEasy = trigger correlation. GlucoWise = meal insights. That's it.

### 2. Design for Demos
Every screen should tell a story. When a recruiter clicks through your app, they should immediately understand:
- What problem you're solving
- Who it's for
- Why it matters

### 3. Document as You Go
I wrote PRDs for each MVP. Not because I had to, but because **thinking like a PM means writing like a PM**. Requirements docs force you to clarify your assumptions and edge cases.

### 4. Ship Imperfect
None of these MVPs are perfect. HeartGuide's risk model is simplistic. BreathEasy doesn't have real patient data. GlucoWise's AI is simulated. **And that's okay.** The goal was to demonstrate product thinking, not build unicorns.

---

## What's Next?

I'm transitioning from MVPs to **real user testing**. I want to validate these hypotheses with actual patients and providers. I'm also building out a library of PRDs and product teardowns to showcase my strategic thinking.

**If you're hiring for AI Product Management roles in digital health**, let's talk. I'm ready to take these skills from side projects to real-world impact.

---

## Final Thought

Building 3 MVPs in 3 weeks taught me more about product management than any course or book ever could. It forced me to prioritize, ship, and iterate—the core skills of any great PM.

If you're trying to break into PM, stop waiting for permission. **Build something. Ship it. Learn from it.** Repeat.

---

**Connect with me:**
- [LinkedIn](https://linkedin.com/in/fmmpinheiro)
- [GitHub](https://github.com/fpinheiropt)
- [Portfolio](https://portfolio-website-franciscos-projects-73f8717a.vercel.app)

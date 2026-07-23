# Kevin - Interview Prep Plan for September 10, 2026

You have about 7 weeks from July 23 to September 10. The goal is not to relearn everything from zero. The goal is to recall the topics your resume already claims, rebuild confidence, and prepare answers that sound like your real project experience.

## Resume-Based Interview Focus

Your resume will likely create questions in these areas:

1. JavaScript fundamentals
2. React.js and Next.js
3. Node.js, Express.js, REST APIs
4. SQL, Sequelize, Knex, MySQL
5. MongoDB and Redis
6. WebSockets and real-time features
7. Authentication, JWT, permissions, RBAC
8. Microservices and micro-frontends
9. Deployment with NGINX, PM2, Jenkins
10. Git, Agile, debugging, production support
11. Flutter basics, because you mention published apps
12. Project explanation: LMS, RM-Portal, Auction System

## Priority Order

### Must Be Strong

- JavaScript: scope, closure, promises, async/await, event loop, array/object methods
- React: hooks, state, props, lifecycle with hooks, Redux, performance basics
- Node.js: middleware, routing, error handling, API structure, authentication
- SQL: joins, indexes, transactions, normalization, query optimization basics
- Project explanations: architecture, your role, hard problem, result, trade-offs

### Should Be Comfortable

- Next.js routing, SSR/SSG basics, API routes, SEO
- WebSockets: connection flow, events, scaling basics
- Redis: caching, sessions, queues/pub-sub basics
- Microservices: why, communication, failure handling
- CI/CD: Jenkins pipeline idea, deployment flow, PM2 and NGINX basics

### Refresh Only

- Flutter widgets, state, build/release flow
- MongoDB aggregation basics
- Advanced DSA unless the company specifically asks for it

## 7-Week Study Plan

### Week 1: JavaScript Recall

- var, let, const
- scope, hoisting, closure
- this, bind, call, apply
- promises, async/await
- event loop, microtasks, macrotasks
- map, filter, reduce, find, some, every
- deep copy vs shallow copy
- debouncing and throttling

Practice:
- Explain closure with one real example.
- Write promise chaining and async/await versions.
- Solve 5 small JS coding questions daily.

### Week 2: React and Redux

- component rendering flow
- useState, useEffect, useMemo, useCallback, useRef
- controlled vs uncontrolled components
- prop drilling vs Redux/context
- Redux store, actions, reducers, selectors
- React performance: memoization, lazy loading, key prop
- forms, validation, API loading states

Practice:
- Build one small CRUD screen.
- Explain the LMS micro-frontend shell from your resume.
- Prepare answer for: "How did you manage shared state across modules?"

### Week 3: Node.js and APIs

- Express app structure
- middleware
- request validation
- REST API design
- centralized error handling
- JWT auth flow
- role-based permissions
- file uploads and Excel uploads
- Nodemailer email flow

Practice:
- Build login + protected route.
- Build one CRUD API with pagination, search, and sorting.
- Explain RM-Portal Excel upload and how it reduced manual work.

### Week 4: Database

- SQL joins: inner, left, right
- indexes and when to use them
- transactions
- normalization
- pagination
- Sequelize and Knex differences
- MongoDB document model
- Redis caching and invalidation

Practice:
- Write queries for user, role, permission, course, test tables.
- Explain why you used SQL in some projects and MongoDB/Redis in others.

### Week 5: System Design for Your Projects

- LMS architecture
- RM-Portal architecture
- Auction platform architecture
- WebSocket flow for proctoring/chat/notifications
- microservices communication
- logging, monitoring, debugging
- handling high traffic
- deployment flow

Practice:
- Draw each project architecture.
- Prepare 2-minute and 5-minute versions of each project explanation.
- Prepare one failure/debugging story from production.

### Week 6: DevOps, Next.js, Flutter, Polish

- NGINX reverse proxy
- PM2 process management
- Jenkins CI/CD basics
- Linux deployment commands
- Next.js SSR/SSG/client rendering
- Flutter widget tree, state, API integration, app store release steps

Practice:
- Explain your deployment flow from Git to server.
- Explain what happens when a user opens a deployed web app.
- Prepare Flutter app publishing story.

### Week 7: Mock Interviews and Revision

- Daily 45-minute mock interview
- Revise weak topics
- Practice project storytelling
- Practice HR answers
- Practice common coding rounds
- Finalize resume explanation

Mock topics:
- Day 1: JavaScript + React
- Day 2: Node + SQL
- Day 3: Project deep dive
- Day 4: System design
- Day 5: Coding round
- Day 6: HR + salary + notice period
- Day 7: Full mock

## Project Story Template

Use this for every project:

1. What was the business problem?
2. Who were the users?
3. What modules did you build?
4. What was your exact role?
5. What tech stack did you use and why?
6. What was the hardest issue?
7. How did you improve performance/security/usability?
8. What was the final impact?

## Your Three Main Project Pitches

### LMS Platform

"I worked on a full-scale Learning Management System with Admin, Trainer, and Learner workflows. The platform included user management, asset management, test management, course management, and real-time proctoring. On the frontend, we used React with a shell application to coordinate independent micro-frontends. Redux helped maintain unified state and navigation. On the backend, Node.js and Knex handled modular services and complex SQL queries. I also worked on WebSocket-based monitoring and permission middleware for secure role-based access."

### RM-Portal

"RM-Portal was built for Relationship Managers across multiple Shriram Group divisions. It handled authentication, scheduling, distributor assignment, Excel-based uploads, email notifications, and reporting. I worked with Next.js, React, Redux, Node.js, Sequelize, MySQL, Redis, and Nodemailer. One important improvement was reducing manual work through Excel upload automation, which reduced reporting errors and improved productivity."

### Vehicle Auction Platform

"This project is a web-based automobile auction and service management system. Buyers can participate in auctions and place bids on vehicles. I worked on responsive React interfaces, Node.js REST APIs, SQL integration, and modules for parking management, documentation, and value-added services. I collaborated with the client during Agile sprints and continuously improved usability and performance."

## Daily Routine

Minimum daily plan:

- 30 minutes: revise one core topic
- 45 minutes: code one small problem or feature
- 30 minutes: explain one resume project aloud
- 15 minutes: write notes from memory

Best daily plan:

- 60 minutes: technical concept
- 60 minutes: hands-on coding
- 30 minutes: project explanation
- 30 minutes: interview Q&A revision

## Common Questions You Must Prepare

- Tell me about yourself.
- Explain your current project.
- What is your role in the LMS/RM/Auction project?
- Why React? Why Next.js?
- How do hooks work?
- How does Redux work?
- How do you secure APIs?
- Explain JWT authentication.
- What is middleware in Express?
- How do you handle errors in Node.js?
- Difference between Sequelize and Knex.
- How do you optimize SQL queries?
- Why use Redis?
- How do WebSockets work?
- How do you deploy Node apps?
- What is the role of NGINX and PM2?
- Explain a difficult bug you solved.
- Explain a performance improvement you made.
- How do you work in Agile?

## Resume Improvements To Consider

- Add actual LinkedIn and GitHub URLs instead of plain text.
- Keep experience and project dates consistent.
- If the interview is for full-stack roles, keep Flutter as secondary, not the main story.
- For each project, remember exact database tables/modules/APIs you worked on.
- Be ready to defend "microservices" and "micro-frontends" with real architecture details.
- Be honest about what you personally built versus what the team built.

## First 3 Days Starting Now

### Day 1

- JavaScript: let/const/var, hoisting, closure
- React: useState and useEffect
- Project: Explain LMS in 2 minutes

### Day 2

- JavaScript: promises, async/await, event loop
- Node: Express routes and middleware
- Project: Explain RM-Portal in 2 minutes

### Day 3

- SQL: joins, indexes, transactions
- Auth: JWT and RBAC
- Project: Explain Auction project in 2 minutes


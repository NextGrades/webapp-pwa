# NextGrades UI Components & Pages

Complete UI implementation for NextGrades - an AI-powered exam prep platform for university students.

## 📁 Project Structure

```
nextgrades/
├── components/
│   ├── Button.tsx          # Primary, secondary, ghost, danger variants
│   ├── Card.tsx           # Reusable card with header, title, description, content
│   ├── Input.tsx          # Form input with label, error, helper text
│   ├── CourseCard.tsx     # Course display card with validation badge
│   ├── Skeleton.tsx       # Loading skeletons for different components
│   ├── ProgressBar.tsx    # Animated progress indicator
│   └── Badge.tsx          # Status badges (success, warning, error, info)
├── pages/
│   ├── LandingPage.tsx        # Hero, features, course preview
│   ├── CourseLibraryPage.tsx  # Browse courses with filters
│   ├── CourseDetailPage.tsx   # View subtopics, select modes
│   ├── DashboardPage.tsx      # User dashboard with progress
│   ├── ExamModePage.tsx       # Exam interface with questions
│   ├── MiniTutorPage.tsx      # AI chat tutor interface
│   └── ExamResultsPage.tsx    # Results with review
├── style.css              # Design system & utility classes
├── Header.tsx            # Navigation header
└── index.ts              # Component exports
```

## 🎨 Design System

### Typography
- **Display Font:** Lexend (headings, brand name)
- **Body Font:** Quicksand (content, UI text)
- **Mono Font:** JetBrains Mono (code, numbers)

### Colors (Academic Navy Theme)
```css
Primary: #2563eb (Navy Blue)
Accent: #f59e0b (Amber)
Success: #059669 (Green)
Error: #dc2626 (Red)
Warning: #f59e0b (Amber)
Background: #fafaf9 (Off-white)
Surface: #ffffff (White)
```

### Spacing Scale
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px

## 🧩 Components

### Button
```tsx
<Button variant="primary" size="lg" loading={false}>
  Click Me
</Button>
```
**Variants:** primary, secondary, ghost, danger  
**Sizes:** sm, md, lg

### Card
```tsx
<Card hover onClick={handleClick}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Input
```tsx
<Input 
  label="Email" 
  error="Invalid email" 
  helperText="We'll never share your email"
/>
```

### CourseCard
```tsx
<CourseCard
  courseCode="EEE211"
  courseName="Electrical Engineering"
  faculty="Engineering"
  subtopicCount={12}
  studentCount={243}
  isValidated={true}
  onClick={handleClick}
/>
```

### ProgressBar
```tsx
<ProgressBar 
  progress={67} 
  color="success" 
  showLabel={true}
/>
```

### Badge
```tsx
<Badge variant="success">
  <CheckCircle size={14} />
  Validated
</Badge>
```

### Skeleton
```tsx
<Skeleton width="200px" height="24px" />
<CourseCardSkeleton />
<DashboardCardSkeleton />
```

## 📄 Pages

### 1. Landing Page
**Route:** `/`  
**Features:**
- Hero section with CTA
- 3 feature cards
- Course preview carousel
- Footer

**Dummy Data:** Featured courses (3 courses)

### 2. Course Library
**Route:** `/courses` or `/lesson/subjects`  
**Features:**
- Search bar
- Faculty filter (sidebar on desktop, modal on mobile)
- Course grid (responsive: 1-2-3 columns)
- Empty state when no results

**Dummy Data:** 8 courses across different faculties

### 3. Course Detail
**Route:** `/course/:id`  
**Features:**
- Course header with validation badge
- Progress bar (logged-in users)
- Expandable subtopic list
- Mode selection (Exam/Tutor) on expand
- Difficulty badges

**Dummy Data:** 5 subtopics with different difficulties

### 4. Dashboard (Registered Users)
**Route:** `/dashboard`  
**Features:**
- Welcome message with streak
- Continue learning cards (3 recent courses)
- Weekly stats (4 metric cards)
- Performance chart (7-day trend)
- AI recommendations

**Dummy Data:** User progress, recent courses, weekly scores

### 5. Exam Mode
**Route:** `/exam/:courseId/:subtopicId`  
**Features:**
- Timer with color coding
- Question display with radio options
- Flag for review
- Navigation sidebar with question dots
- Exit confirmation modal
- Auto-save indicator

**Dummy Data:** 3 sample questions

### 6. Mini Tutor
**Route:** `/tutor/:courseId/:subtopicId`  
**Features:**
- Chat interface (AI + user bubbles)
- Quick action buttons
- Typing indicator
- Export chat function
- Auto-scroll to latest message

**Dummy Data:** Initial AI greeting, sample responses

### 7. Exam Results
**Route:** `/results/:examId`  
**Features:**
- Score display with celebration
- Stats cards (correct, incorrect, time, score)
- Performance by subtopic breakdown
- Question review (expandable)
- Filter: show only incorrect
- Retake button

**Dummy Data:** 85% score, 10 questions with explanations

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 1024px (lg)
- Hamburger menu on mobile
- Stacked layouts on small screens

### Accessibility
- Focus states on all interactive elements
- ARIA labels on icon buttons
- Keyboard navigation support
- Color contrast meets WCAG AA

### Animations
- Smooth transitions (200-300ms)
- Hover effects on cards
- Progress bar fill animations
- Chat message slide-in
- Loading skeletons pulse

### State Management
- Loading states (skeletons)
- Empty states (helpful messages)
- Error states (inline errors)
- Success states (confetti on high scores)

## 🚀 Usage

### Prerequisites
```bash
npm install lucide-react @tanstack/react-router
```

### Import Styles
```tsx
import './style.css';
```

### Use Components
```tsx
import { Button, Card, CourseCard } from './components';
import { LandingPage, DashboardPage } from './pages';

function App() {
  return <LandingPage />;
}
```

## 📊 Dummy Data Structure

All pages use realistic dummy data that can easily be replaced with API calls:

```typescript
// Course
{
  id: string;
  courseCode: string; // "EEE211"
  courseName: string;
  faculty: string;
  subtopicCount: number;
  studentCount: number;
  isValidated: boolean;
}

// Subtopic
{
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionCount: number;
  userAvgScore: number; // 0-100
  isCompleted: boolean;
}

// Question
{
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index
}
```

## 🎨 Custom CSS Classes

Defined in `style.css`:

```css
.btn-primary        /* Primary button styles */
.btn-secondary      /* Secondary button styles */
.card              /* Card component styles */
.input-field       /* Input field styles */
.course-card       /* Course card with hover effect */
.progress-bar      /* Progress bar container */
.progress-bar-fill /* Animated fill */
.question-dot      /* Exam navigation dots */
.chat-bubble       /* Tutor chat bubbles */
.badge-validated   /* Validation badge */
.skeleton          /* Loading skeleton */
```

## 🔄 Next Steps (Integration)

1. **API Integration:** Replace dummy data with real API calls
2. **Authentication:** Add login/register functionality
3. **State Management:** Implement Redux/Zustand for global state
4. **Routing:** Set up proper routes with @tanstack/react-router
5. **Form Validation:** Add react-hook-form or similar
6. **AI Integration:** Connect to Claude API for tutor responses
7. **Analytics:** Add tracking for user interactions
8. **Testing:** Add unit tests with Jest/Vitest

## 📝 Notes

- All components use TypeScript for type safety
- Icons from `lucide-react` (tree-shakeable)
- Tailwind CSS for utility classes
- Custom CSS variables for design tokens
- Mobile-responsive by default
- Accessibility-first approach

## 🎓 PRD Alignment

This implementation follows the NextGrades PRD specifications:
- ✅ All required pages from section 3 (Screen-by-Screen UI)
- ✅ Design system from section 4 (Typography, Colors, Spacing)
- ✅ Component library from section 4.4 (Buttons, Cards, Inputs)
- ✅ User flows from section 2 (Unregistered & Registered)
- ✅ Responsive behavior from section 5
- ✅ Accessibility requirements from section 7

---

**Built with ❤️ for NextGrades**

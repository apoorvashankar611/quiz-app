# Quiz Application

A clean, functional quiz application built with React and Vite that fetches trivia questions from the Open Trivia Database API. This project demonstrates core React concepts, state management, and API integration in a practical, real-world application.

##  Overview

This is a fully functional quiz application where users can:
- Enter their email to start the quiz
- Answer 15 trivia questions within a 30-minute time limit
- Navigate between questions freely
- Track their progress with a visual overview panel
- View detailed results with correct answers after submission

##  Tech Stack

- **React 18** - Frontend library
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling (no frameworks)
- **Open Trivia Database API** - Question source

##  Project Structure

```
quiz-app/
├── src/
│   ├── App.jsx          # Main component with all logic
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

##  Design Decisions & Approach

### Architecture Choices

**Single File Component Structure**: I chose to keep all components in `App.jsx` because:
- The application is relatively small and self-contained
- It makes the code easier to review for an assignment
- Components are still modular and could easily be split into separate files if needed

**State Management**: Used React's built-in `useState` and `useEffect` hooks:
- No external state management library needed for this scope
- State is lifted to the main App component and passed down as props
- Simple and straightforward to understand

**API Integration**: 
- Fetch API used instead of axios (no external dependencies)
- Questions are fetched once at the start and stored in state
- Error handling included for failed API requests

### Key Features Implementation

**Email Validation**: 
- Simple regex pattern validation
- Prevents empty or invalid email formats
- Clear error messaging

**Question Shuffling**:
- Options are shuffled using Fisher-Yates algorithm
- Ensures randomization while maintaining correct answer tracking
- Done once when questions are fetched to maintain consistency

**Timer Implementation**:
- Uses `setInterval` with proper cleanup
- Persists across question navigation
- Automatically submits quiz when time expires
- Visual warning when under 5 minutes remain

**Navigation System**:
- Previous/Next buttons for sequential navigation
- Overview panel for direct question access
- Visual indicators for current, answered, and unanswered questions

**HTML Entity Decoding**:
- Questions from API contain HTML entities (e.g., `&quot;`, `&#039;`)
- Created a utility function to properly decode these for display

##  UI/UX Decisions

- **Clean, professional design**: Simple color scheme that's easy on the eyes
- **Mobile-responsive**: Works well on phones, tablets, and desktops
- **Clear visual feedback**: Selected answers, current question, and answered status are clearly indicated
- **Accessible colors**: Good contrast ratios for readability
- **No distracting animations**: Smooth transitions without being overwhelming

##  Assumptions Made

1. **No backend required**: Email is stored in state, not persisted
2. **No authentication**: Anyone can take the quiz
3. **Single attempt**: No retry mechanism after submission
4. **No question bookmarking**: Users can't flag questions for review
5. **Auto-submit on timeout**: Quiz automatically submits when timer reaches 0
6. **No pause functionality**: Timer runs continuously once started

##  Challenges & Solutions

### Challenge 1: HTML Entities in Questions
**Problem**: Questions from the API contained HTML entities like `&quot;` and `&#039;`  
**Solution**: Created a `decodeHTML` utility function using a temporary textarea element to decode entities

### Challenge 2: Maintaining Timer State
**Problem**: Timer needed to persist while navigating between questions  
**Solution**: Lifted timer state to the QuizPage component level and used useEffect with proper cleanup

### Challenge 3: Option Randomization
**Problem**: Correct answer position was predictable  
**Solution**: Implemented Fisher-Yates shuffle algorithm to randomize options while preserving answer tracking

### Challenge 4: Responsive Overview Panel
**Problem**: Overview panel needed to work on mobile and desktop  
**Solution**: Used CSS Grid with responsive breakpoints and a toggle button for mobile

##  Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts (defaults work fine)

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to any static hosting service
3. Configure the hosting to serve `index.html` for all routes

##  Environment Variables

This project doesn't require any environment variables. The API endpoint is public and doesn't need authentication.

##  API Reference

**Endpoint**: `https://opentdb.com/api.php?amount=15`

**Response Structure**:
```json
{
  "response_code": 0,
  "results": [
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What does CPU stand for?",
      "correct_answer": "Central Processing Unit",
      "incorrect_answers": [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit"
      ]
    }
  ]
}
```

## Known Limitations

- No local storage persistence (refresh loses progress)
- No ability to pause the quiz
- Questions are random each time (no question bank selection)
- No difficulty level selection
- No category filtering

##  Future Enhancements

If I had more time, I would add:
- Category and difficulty selection
- Local storage to save progress
- Pause/resume functionality
- Better accessibility (ARIA labels, keyboard navigation)
- Score history tracking
- Social sharing of results

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Questions provided by [Open Trivia Database](https://opentdb.com/)
- Built as a Software Engineer Intern assignment

---

**Author**: Vishlavath Apoorva  
**Date**: January 2026  
**Contact**: apoorvashankar611@gmail.com

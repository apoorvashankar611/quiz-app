import React, { useState, useEffect } from "react";

// Mock questions as fallback if API fails
const getMockQuestions = () => [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "easy",
    question: "What is the largest ocean on Earth?",
    correct_answer: "Pacific Ocean",
    incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question: "In which year did World War II end?",
    correct_answer: "1945",
    incorrect_answers: ["1944", "1946", "1943"],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "easy",
    question: "Who directed the movie 'Jurassic Park'?",
    correct_answer: "Steven Spielberg",
    incorrect_answers: ["James Cameron", "George Lucas", "Ridley Scott"],
  },
  {
    category: "Science: Nature",
    type: "multiple",
    difficulty: "easy",
    question: "What is the fastest land animal?",
    correct_answer: "Cheetah",
    incorrect_answers: ["Lion", "Leopard", "Tiger"],
  },
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "How many players are on a basketball team on the court?",
    correct_answer: "5",
    incorrect_answers: ["6", "7", "4"],
  },
  {
    category: "Mathematics",
    type: "multiple",
    difficulty: "easy",
    question: "What is 7 multiplied by 8?",
    correct_answer: "56",
    incorrect_answers: ["54", "63", "48"],
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "medium",
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Michelangelo", "Raphael", "Donatello"],
  },
  {
    category: "Science: Chemistry",
    type: "multiple",
    difficulty: "easy",
    question: "What is the chemical symbol for gold?",
    correct_answer: "Au",
    incorrect_answers: ["Go", "Gd", "Ag"],
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "Which band released the album 'Abbey Road'?",
    correct_answer: "The Beatles",
    incorrect_answers: ["The Rolling Stones", "Led Zeppelin", "Pink Floyd"],
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "Who is the Greek god of the sea?",
    correct_answer: "Poseidon",
    incorrect_answers: ["Zeus", "Hades", "Apollo"],
  },
  {
    category: "Animals",
    type: "multiple",
    difficulty: "easy",
    question: "How many legs does a spider have?",
    correct_answer: "8",
    incorrect_answers: ["6", "10", "12"],
  },
  {
    category: "Politics",
    type: "multiple",
    difficulty: "medium",
    question: "How many states are in the United States?",
    correct_answer: "50",
    incorrect_answers: ["48", "52", "51"],
  },
  {
    category: "Literature",
    type: "multiple",
    difficulty: "medium",
    question: "Who wrote 'Romeo and Juliet'?",
    correct_answer: "William Shakespeare",
    incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"],
  },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        backgroundColor: [
          "#2196F3",
          "#4CAF50",
          "#FFC107",
          "#E91E63",
          "#9C27B0",
        ][Math.floor(Math.random() * 5)],
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="confetti-container">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            backgroundColor: piece.backgroundColor,
          }}
        />
      ))}
    </div>
  );
};

const StartPage = ({ onStart, darkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    onStart(email);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="start-page">
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☀️" : "🌙"}
      </button>
      <div className="start-container">
        <h1>Welcome to the Quiz</h1>
        <p>Test your knowledge with 15 questions</p>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="your.email@example.com"
            className={error ? "error" : ""}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <button onClick={handleSubmit} className="btn-primary">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`timer ${timeLeft < 300 ? "timer-warning" : ""}`}>
      <span className="timer-label">Time Left:</span>
      <span className="timer-value">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span>Progress</span>
        <span className="progress-count">
          {current}/{total}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const OverviewPanel = ({
  questions,
  currentIndex,
  answers,
  bookmarked,
  onNavigate,
}) => {
  return (
    <div className="overview-panel">
      <h3>Question Overview</h3>
      <div className="question-grid">
        {questions.map((_, index) => {
          const isAnswered = answers[index] !== null;
          const isCurrent = index === currentIndex;
          const isBookmarked = bookmarked.includes(index);

          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`question-number ${isCurrent ? "current" : ""} ${
                isAnswered ? "answered" : ""
              } ${isBookmarked ? "bookmarked" : ""}`}
            >
              {index + 1}
              {isBookmarked && <span className="bookmark-indicator">🔖</span>}
            </button>
          );
        })}
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-box current"></span>
          <span>Current</span>
        </div>
        <div className="legend-item">
          <span className="legend-box answered"></span>
          <span>Answered</span>
        </div>
        <div className="legend-item">
          <span className="legend-box bookmarked"></span>
          <span>Bookmarked</span>
        </div>
      </div>
    </div>
  );
};

const QuizPage = ({ email, questions, onSubmit, darkMode, toggleDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [bookmarked, setBookmarked] = useState([]);
  const [showOverview, setShowOverview] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState({});
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    setQuestionTimes({
      ...questionTimes,
      [currentIndex]: timeTaken,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const toggleBookmark = () => {
    if (bookmarked.includes(currentIndex)) {
      setBookmarked(bookmarked.filter((i) => i !== currentIndex));
    } else {
      setBookmarked([...bookmarked, currentIndex]);
    }
  };

  const handleSubmitQuiz = () => {
    const unanswered = answers.filter((a) => a === null).length;
    const hasBookmarked = bookmarked.length > 0;

    let message = "";
    if (unanswered > 0 && hasBookmarked) {
      message = `You have ${unanswered} unanswered questions and ${bookmarked.length} bookmarked questions. Do you want to submit anyway?`;
    } else if (unanswered > 0) {
      message = `You have ${unanswered} unanswered questions. Do you want to submit anyway?`;
    } else if (hasBookmarked) {
      message = `You have ${bookmarked.length} bookmarked questions. Do you want to submit anyway?`;
    }

    if (message && !window.confirm(message)) return;

    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    onSubmit(answers, totalTime, questionTimes);
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const isBookmarked = bookmarked.includes(currentIndex);

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="user-info">
          <span>{email}</span>
        </div>
        <Timer initialTime={1800} onTimeUp={() => handleSubmitQuiz()} />
      </div>

      <ProgressBar current={answeredCount} total={questions.length} />

      <div className="quiz-content">
        <div className="quiz-main">
          <div className="question-header">
            <h2>
              Question {currentIndex + 1} of {questions.length}
            </h2>
          </div>

          <button
            onClick={toggleBookmark}
            className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
          >
            {isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
          </button>

          <div className="question-card">
            <h3 className="question-text">
              {decodeHTML(currentQuestion.question)}
            </h3>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`option ${
                    answers[currentIndex] === option ? "selected" : ""
                  }`}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{decodeHTML(option)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="btn-secondary"
            >
              Previous
            </button>
            <button
              onClick={() => setShowOverview(!showOverview)}
              className="btn-secondary btn-overview"
            >
              {showOverview ? "Hide" : "Show"} Overview
            </button>
            {currentIndex === questions.length - 1 ? (
              <button onClick={handleSubmitQuiz} className="btn-primary">
                Submit Quiz
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            )}
          </div>
        </div>

        {showOverview && (
          <OverviewPanel
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            bookmarked={bookmarked}
            onNavigate={(index) => {
              setCurrentIndex(index);
              setQuestionStartTime(Date.now());
              setShowOverview(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
const ReportPage = ({
  email,
  questions,
  answers,
  totalTime,
  questionTimes,
  darkMode,
  toggleDarkMode,
}) => {
  const score = answers.reduce((acc, answer, index) => {
    return answer === questions[index].correct_answer ? acc + 1 : acc;
  }, 0);

  const percentage = ((score / questions.length) * 100).toFixed(1);
  const showConfetti = percentage >= 80;

  const avgTimePerQuestion = totalTime / questions.length;
  const fastestQuestion = Math.min(
    ...Object.values(questionTimes).filter((t) => t > 0)
  );
  const slowestQuestion = Math.max(...Object.values(questionTimes));

  return (
    <div className="report-page">
      {showConfetti && <Confetti />}

      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle report-dark-toggle"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="report-header">
        <h1>Quiz Results</h1>
        <div className="score-card">
          <div className="score-main">
            <span className="score-value">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <div className="score-percentage">{percentage}%</div>
          {showConfetti && (
            <div className="achievement">🎉 Excellent Performance!</div>
          )}
          <div className="user-email">{email}</div>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Performance Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-icon">⏱️</div>
            <div className="analytics-label">Total Time</div>
            <div className="analytics-value">
              {Math.floor(totalTime / 60)}m {totalTime % 60}s
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-icon">⚡</div>
            <div className="analytics-label">Avg Time/Question</div>
            <div className="analytics-value">
              {Math.floor(avgTimePerQuestion)}s
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-icon">🚀</div>
            <div className="analytics-label">Fastest Answer</div>
            <div className="analytics-value">{fastestQuestion}s</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-icon">🐌</div>
            <div className="analytics-label">Slowest Answer</div>
            <div className="analytics-value">{slowestQuestion}s</div>
          </div>
        </div>
      </div>

      <div className="report-content">
        <h2>Detailed Review</h2>
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const correctAnswer = question.correct_answer;
          const isCorrect = userAnswer === correctAnswer;
          const timeTaken = questionTimes[index] || 0;

          return (
            <div key={index} className="report-question">
              <div className="report-question-header">
                <div>
                  <span className="question-number">Question {index + 1}</span>
                  {timeTaken > 0 && (
                    <span className="time-badge">⏱️ {timeTaken}s</span>
                  )}
                </div>
                <span
                  className={`result-badge ${
                    isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              <p className="report-question-text">
                {decodeHTML(question.question)}
              </p>

              <div className="report-answers">
                <div className={`answer-row ${!isCorrect ? "wrong" : ""}`}>
                  <span className="answer-label">Your Answer:</span>
                  <span className="answer-value">
                    {userAnswer ? decodeHTML(userAnswer) : "Not Answered"}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="answer-row correct">
                    <span className="answer-label">Correct Answer:</span>
                    <span className="answer-value">
                      {decodeHTML(correctAnswer)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  const [stage, setStage] = useState("start");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error("API returned error code: " + data.response_code);
      }

      const formattedQuestions = data.results.map((q) => ({
        ...q,
        options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
      }));

      setQuestions(formattedQuestions);
      setStage("quiz");
    } catch (err) {
      console.warn("API fetch failed, using mock questions:", err);

      const mockQuestions = getMockQuestions().map((q) => ({
        ...q,
        options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
      }));

      setQuestions(mockQuestions);
      setStage("quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = (userEmail) => {
    setEmail(userEmail);
    fetchQuestions();
  };

  const handleSubmit = (userAnswers, time, qTimes) => {
    setAnswers(userAnswers);
    setTotalTime(time);
    setQuestionTimes(qTimes);
    setStage("report");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "30px",
          backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "4px solid transparent",
              borderTopColor: "#2196F3",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              width: "80%",
              height: "80%",
              top: "10%",
              left: "10%",
              border: "4px solid transparent",
              borderTopColor: "#64B5F6",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite",
              animationDelay: "-0.5s",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              width: "60%",
              height: "60%",
              top: "20%",
              left: "20%",
              border: "4px solid transparent",
              borderTopColor: "#90CAF9",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite",
              animationDelay: "-1s",
            }}
          ></div>
        </div>
        <p
          style={{
            fontSize: "22px",
            color: darkMode ? "#fff" : "#333",
            fontWeight: "500",
            letterSpacing: "1px",
            animation: "pulse-text 2s infinite",
          }}
        >
          Preparing your quiz
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-text {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {stage === "start" && (
        <StartPage
          onStart={handleStart}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {stage === "quiz" && (
        <QuizPage
          email={email}
          questions={questions}
          onSubmit={handleSubmit}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {stage === "report" && (
        <ReportPage
          email={email}
          questions={questions}
          answers={answers}
          totalTime={totalTime}
          questionTimes={questionTimes}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          transition: background-color 0.3s, color 0.3s;
        }

        body.dark-mode {
          background-color: #1a1a1a !important;
          color: #ffffff;
        }

        .app {
          min-height: 100vh;
          background-color: #f5f5f5;
          transition: background-color 0.3s;
        }

        body.dark-mode .app {
          background-color: #1a1a1a;
        }

        .dark-mode-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #ddd;
          background: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: all 0.3s;
        }

        body.dark-mode .dark-mode-toggle {
          background: #2a2a2a;
          border-color: #444;
        }

        .dark-mode-toggle:hover {
          transform: scale(1.1);
        }

        .report-dark-toggle {
          position: absolute;
          left: 20px;
        }

        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 999;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .progress-bar-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        body.dark-mode .progress-bar-container {
          background: #2a2a2a;
        }

        .progress-bar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 600;
          color: #333;
        }

        body.dark-mode .progress-bar-header {
          color: #fff;
        }

        .progress-count {
          color: #2196F3;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
        }

        body.dark-mode .progress-bar {
          background: #444;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #2196F3 0%, #4CAF50 100%);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .bookmark-btn {
          padding: 8px 16px;
          background: #f0f0f0;
          border: 2px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .bookmark-btn.bookmarked {
          background: #FFF3E0;
          border-color: #FF9800;
          color: #FF9800;
          font-weight: 600;
        }

        body.dark-mode .bookmark-btn {
          background: #333;
          border-color: #555;
          color: #fff;
        }

        body.dark-mode .bookmark-btn.bookmarked {
          background: #4a3800;
          border-color: #FF9800;
        }

        .bookmark-btn:hover {
          transform: scale(1.05);
        }

        .time-badge {
          padding: 4px 10px;
          background: #e3f2fd;
          color: #2196F3;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 8px;
        }

        body.dark-mode .time-badge {
          background: #0d47a1;
          color: #64b5f6;
        }

        .analytics-section {
          max-width: 900px;
          margin: 30px auto;
          padding: 0 20px;
        }

        .analytics-section h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        body.dark-mode .analytics-section h2 {
          color: #fff;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .analytics-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        body.dark-mode .analytics-card {
          background: #2a2a2a;
        }

        .analytics-icon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .analytics-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        body.dark-mode .analytics-label {
          color: #aaa;
        }

        .analytics-value {
          font-size: 24px;
          font-weight: 700;
          color: #2196F3;
        }

        .achievement {
          font-size: 16px;
          color: #4CAF50;
          font-weight: 600;
          margin-top: 10px;
        }

        .bookmark-indicator {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 16px;
        }

        .question-number {
          position: relative;
        }

        .question-number.bookmarked {
          border-color: #FF9800 !important;
          background: #FFF3E0 !important;
          color: #FF9800 !important;
        }

        body.dark-mode .question-number.bookmarked {
          background: #4a3800 !important;
        }

        .legend-box.bookmarked {
          border-color: #FF9800;
          background: #FFF3E0;
        }

        body.dark-mode .legend-box.bookmarked {
          background: #4a3800;
        }

        .start-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f5f5f5;
        }

        body.dark-mode .start-page {
          background-color: #1a1a1a;
        }

        .start-container {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 450px;
          width: 100%;
        }

        body.dark-mode .start-container {
          background: #2a2a2a;
        }

        .start-container h1 {
          font-size: 28px;
          margin-bottom: 10px;
          color: #333;
        }

        body.dark-mode .start-container h1 {
          color: #fff;
        }

        .start-container p {
          color: #666;
          margin-bottom: 30px;
        }

        body.dark-mode .start-container p {
          color: #aaa;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 500;
        }

        body.dark-mode .form-group label {
          color: #fff;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
          background: white;
          color: #333;
        }

        body.dark-mode .form-group input {
          background: #1a1a1a;
          border-color: #444;
          color: #fff;
        }

        .form-group input:focus {
          outline: none;
          border-color: #2196F3;
        }

        .form-group input.error {
          border-color: #f44336;
        }

        .error-message {
          display: block;
          color: #f44336;
          font-size: 14px;
          margin-top: 5px;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background-color: #2196F3;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-primary:hover {
          background-color: #1976D2;
        }

        .btn-primary:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .btn-secondary {
          padding: 10px 20px;
          background-color: #f0f0f0;
          color: #333;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        body.dark-mode .btn-secondary {
          background: #333;
          border-color: #555;
          color: #fff;
        }

        .btn-secondary:hover {
          background-color: #e0e0e0;
          border-color: #ccc;
        }

        body.dark-mode .btn-secondary:hover {
          background: #444;
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quiz-page {
          min-height: 100vh;
          padding: 20px;
          background-color: #f5f5f5;
        }

        body.dark-mode .quiz-page {
          background-color: #1a1a1a;
        }

        .quiz-header {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        body.dark-mode .quiz-header {
          background: #2a2a2a;
        }

        .user-info {
          font-weight: 500;
          color: #333;
        }

        body.dark-mode .user-info {
          color: #fff;
        }

        .timer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        body.dark-mode .timer {
          color: #fff;
        }

        .timer-warning {
          color: #f44336;
        }

        .timer-value {
          background: #f0f0f0;
          padding: 5px 12px;
          border-radius: 6px;
        }

        body.dark-mode .timer-value {
          background: #444;
        }

        .quiz-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .quiz-main {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        body.dark-mode .quiz-main {
          background: #2a2a2a;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .question-header h2 {
          color: #333;
          font-size: 20px;
        }

        body.dark-mode .question-header h2 {
          color: #fff;
        }

        .question-card {
          margin-bottom: 30px;
        }

        .question-text {
          font-size: 20px;
          color: #333;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        body.dark-mode .question-text {
          color: #fff;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f9f9f9;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          width: 100%;
        }

        body.dark-mode .option {
          background: #1a1a1a;
          border-color: #444;
        }

        .option:hover {
          background: #f0f0f0;
          border-color: #ccc;
        }

        body.dark-mode .option:hover {
          background: #333;
          border-color: #666;
        }

        .option.selected {
          background: #e8f5e9;
          border-color: #4CAF50;
        }

        body.dark-mode .option.selected {
          background: #1b5e20;
          border-color: #4CAF50;
        }

        .option-letter {
          width: 32px;
          height: 32px;
          background: #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        body.dark-mode .option-letter {
          background: #444;
          color: #fff;
        }

        .option.selected .option-letter {
          background: #4CAF50;
          color: white;
        }

        .option-text {
          flex: 1;
          font-size: 16px;
          color: #333;
        }

        body.dark-mode .option-text {
          color: #fff;
        }

        .navigation-buttons {
          display: flex;
          gap: 10px;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .btn-overview {
          flex: 1;
          min-width: 150px;
        }

        .overview-panel {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 20px;
        }

        body.dark-mode .overview-panel {
          background: #2a2a2a;
        }

        .overview-panel h3 {
          margin-bottom: 20px;
          color: #333;
        }

        body.dark-mode .overview-panel h3 {
          color: #fff;
        }

        .question-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .question-number {
          aspect-ratio: 1;
          border: 2px solid #ddd;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
          color: #666;
        }

        body.dark-mode .question-number {
          background: #1a1a1a;
          border-color: #444;
          color: #aaa;
        }

        .question-number:hover {
          border-color: #aaa;
        }

        .question-number.current {
          border-color: #2196F3;
          background: #e3f2fd;
          color: #2196F3;
        }

        body.dark-mode .question-number.current {
          background: #0d47a1;
        }

        .question-number.answered {
          border-color: #4CAF50;
          background: #e8f5e9;
          color: #4CAF50;
        }

        body.dark-mode .question-number.answered {
          background: #1b5e20;
        }

        .legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #666;
        }

        body.dark-mode .legend-item {
          color: #aaa;
        }

        .legend-box {
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        body.dark-mode .legend-box {
          background: #1a1a1a;
          border-color: #444;
        }

        .legend-box.current {
          border-color: #2196F3;
          background: #e3f2fd;
        }

        body.dark-mode .legend-box.current {
          background: #0d47a1;
        }

        .legend-box.answered {
          border-color: #4CAF50;
          background: #e8f5e9;
        }

        body.dark-mode .legend-box.answered {
          background: #1b5e20;
        }

        .report-page {
          min-height: 100vh;
          padding: 20px;
          position: relative;
          background-color: #f5f5f5;
        }

        body.dark-mode .report-page {
          background-color: #1a1a1a;
        }

        .report-header {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin-bottom: 30px;
        }

        body.dark-mode .report-header {
          background: #2a2a2a;
        }

        .report-header h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 30px;
        }

        body.dark-mode .report-header h1 {
          color: #fff;
        }

        .score-card {
          display: inline-block;
          background: #f9f9f9;
          padding: 30px 50px;
          border-radius: 8px;
        }

        body.dark-mode .score-card {
          background: #1a1a1a;
        }

        .score-value {
      font-size: 56px;
      font-weight: 700;
      color: #4CAF50;
    }

    .score-total {
      font-size: 32px;
      color: #666;
    }

    body.dark-mode .score-total {
      color: #aaa;
    }

    .score-percentage {
      font-size: 24px;
      color: #666;
      margin-bottom: 15px;
    }

    body.dark-mode .score-percentage {
      color: #aaa;
    }

    .user-email {
      color: #999;
      font-size: 14px;
    }

    .report-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .report-content h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 25px;
    }

    body.dark-mode .report-content h2 {
      color: #fff;
    }

    .report-question {
      background: white;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    body.dark-mode .report-question {
      background: #2a2a2a;
    }

    .report-question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .result-badge {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
    }

    .result-badge.correct {
      background: #e8f5e9;
      color: #4CAF50;
    }

    body.dark-mode .result-badge.correct {
      background: #1b5e20;
    }

    .result-badge.incorrect {
      background: #ffebee;
      color: #f44336;
    }

    body.dark-mode .result-badge.incorrect {
      background: #b71c1c;
    }

    .report-question-text {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    body.dark-mode .report-question-text {
      color: #fff;
    }

    .report-answers {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .answer-row {
      display: flex;
      gap: 10px;
      padding: 12px;
      background: #f9f9f9;
      border-radius: 6px;
    }

    body.dark-mode .answer-row {
      background: #1a1a1a;
    }

    .answer-row.wrong {
      background: #ffebee;
    }

    body.dark-mode .answer-row.wrong {
      background: #4a1a1a;
    }

    .answer-row.correct {
      background: #e8f5e9;
    }

    body.dark-mode .answer-row.correct {
      background: #1a4a1a;
    }

    .answer-label {
      font-weight: 600;
      color: #666;
      min-width: 130px;
    }

    body.dark-mode .answer-label {
      color: #aaa;
    }

    .answer-value {
      color: #333;
      flex: 1;
    }

    body.dark-mode .answer-value {
      color: #fff;
    }

    .error-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 20px;
      background-color: #f5f5f5;
    }

    body.dark-mode .error-screen {
      background-color: #1a1a1a;
    }

    .error-screen p {
      color: #f44336;
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .quiz-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .dark-mode-toggle {
        top: 10px;
        left: 10px;
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      .quiz-main {
        padding: 20px;
      }

      .question-text {
        font-size: 18px;
      }

      .navigation-buttons {
        flex-direction: column;
      }

      .btn-overview {
        order: -1;
        width: 100%;
      }

      .start-container {
        padding: 30px 20px;
      }

      .report-header {
        padding: 30px 20px;
      }

      .score-card {
        padding: 20px 30px;
      }

      .report-question {
        padding: 20px 15px;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 1024px) {
      .quiz-content {
        grid-template-columns: 1fr 350px;
      }
    }
  `}</style>
    </div>
  );
}
export default App;

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import QuestionCard from "./components/QuestionsCard";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch questions from The Trivia API
  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions?limit=10&categories=technology")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((q) => ({
          question: q.question.text,
          options: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          answer: q.correctAnswer,
        }));
        setQuestions(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Handle answer selection
  const handleAnswer = (option) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  // ✅ Move to next question
  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  // ✅ Restart Quiz (refetch new random questions)
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
    setLoading(true);

    fetch("https://the-trivia-api.com/v2/questions?limit=10&categories=technology")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((q) => ({
          question: q.question.text,
          options: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          answer: q.correctAnswer,
        }));
        setQuestions(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error refetching questions:", err);
        setLoading(false);
      });
  };

  // ✅ Progress bar calculation
  // const calculateProgress = () => {
  //   if (isFinished) return 100;
  //   const baseProgress = (currentQuestion / questions.length) * 100;
  //   const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;
  //   return baseProgress + questionProgress;
  // };

  // const percentage = (score / questions.length) * 100;
  // const showConfetti = isFinished && percentage > 50;

  // ✅ Show loading screen
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-white text-xl bg-gray-900">
  //       Loading Questions...
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">React Quiz</h1>
        <p className="text-gray-400">Test your Computer Science Knowledge</p>
      </div>

      <div className="w-full max-w-xl mb-6">
        <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-purple-600 duration-500 ease-out transition-all"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {!isFinished ? (
        <>
          <QuestionCard
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            data={questions[currentQuestion]}
            current={currentQuestion}
            total={questions.length}
            selected={selectedAnswer}
          />
          <div className="mt-6 min-h-[60px]">
            {showFeedback && (
              <button
                className="bg-linear-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
                onClick={goToNext}
              >
                {currentQuestion + 1 < questions.length
                  ? "Continue"
                  : "See Results"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            You scored <span>{score}</span> out of{" "}
            <span className="font-bold">{questions.length}</span> (
            {Math.round((score / questions.length) * 100)}%)
          </p>
          <button
            className="bg-linear-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

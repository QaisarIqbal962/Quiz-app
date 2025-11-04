import { useState } from "react";
import QuestionsCard from "./components/QuestionsCard";
import { questions } from "./data/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col  items-center justify-center " >
    <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Quiz App</h1>
      <p className="text-gray-400">Test your knowledge</p> 
    </div>
    <QuestionsCard data = {questions[currentQuestion]}/>
    </div>
  );
}

export default App;

import React from 'react'

const QuestionsCard = ({data}) => {
    const {question,options,answer} = data;
  return (
    <div className='bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-700'>
    QuestionCard {question}
    </div>
  )
}

export default QuestionsCard

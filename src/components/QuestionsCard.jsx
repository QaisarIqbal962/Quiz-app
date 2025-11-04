import React from 'react'

const QuestionsCard = ({data}) => {
    const {question,options,answer} = data;
  return (
    <div>
    QuestionCard {question}
    </div>
  )
}

export default QuestionsCard

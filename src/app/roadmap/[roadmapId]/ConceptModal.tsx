'use client';

import { useState } from 'react';
import { Concept, Quiz } from '@/types/database.types';
import { X, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';

interface ConceptModalProps {
  concept: Concept;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (conceptId: string, score: number) => void;
  isCompleted: boolean;
}

export default function ConceptModal({
  concept,
  isOpen,
  onClose,
  onComplete,
  isCompleted,
}: ConceptModalProps) {
  const [currentTab, setCurrentTab] = useState<'article' | 'quiz'>('article');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const quiz: Quiz | null = concept.quiz ? (concept.quiz as unknown as Quiz) : null;

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (!quizSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }));
    }
  };

  const handleQuizSubmit = () => {
    if (!quiz) return;

    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 80) {
      onComplete(concept.id, score);
    }
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const canSubmitQuiz = quiz && Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-xl font-semibold">{concept.title}</h2>
            {isCompleted && (
              <CheckCircle2 className="h-5 w-5 text-green-300" />
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setCurrentTab('article')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                currentTab === 'article'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Learn
            </button>
            {quiz && (
              <button
                onClick={() => setCurrentTab('quiz')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  currentTab === 'quiz'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Quiz
              </button>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {currentTab === 'article' && (
            <div className="prose prose-indigo max-w-none">
              {concept.article_content ? (
                <div
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: concept.article_content }}
                />
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Article content for this concept will be available soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {currentTab === 'quiz' && quiz && (
            <div className="space-y-6">
              {quizSubmitted && quizScore !== null && (
                <div className={`p-4 rounded-lg ${
                  quizScore >= 80 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-yellow-100 border border-yellow-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${
                        quizScore >= 80 ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                        {quizScore >= 80 ? 'Congratulations!' : 'Keep trying!'}
                      </h3>
                      <p className={`text-sm ${
                        quizScore >= 80 ? 'text-green-700' : 'text-yellow-700'
                      }`}>
                        You scored {quizScore}% {quizScore >= 80 ? '- Concept unlocked!' : '- You need 80% to pass.'}
                      </p>
                    </div>
                    {quizScore < 80 && (
                      <button
                        onClick={handleQuizReset}
                        className="flex items-center space-x-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Try Again</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {quiz.questions.map((question, questionIndex) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {questionIndex + 1}. {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[question.id] === optionIndex;
                      const isCorrect = optionIndex === question.correctAnswer;
                      const showResult = quizSubmitted;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(question.id, optionIndex)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded border transition-colors ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : isSelected
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-white border-gray-200 text-gray-600'
                              : isSelected
                              ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {!quizSubmitted && (
                <div className="flex justify-end">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!canSubmitQuiz}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

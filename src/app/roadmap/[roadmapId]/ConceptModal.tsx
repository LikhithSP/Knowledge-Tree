'use client';

import { useState } from 'react';
import { Concept, Quiz } from '@/types/database.types';
import { X, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-yellow-100">
        {/* Header */}
        <div className="bg-yellow-200 text-gray-900 p-5 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-7 w-7 text-yellow-700" />
            <h2 className="text-2xl font-bold tracking-tight">{concept.title}</h2>
            {isCompleted && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition-colors rounded-full p-1"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex px-6 pt-2">
            <button
              onClick={() => setCurrentTab('article')}
              className={`px-6 py-2 text-base font-semibold rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2 ${
                currentTab === 'article'
                  ? 'bg-white text-yellow-600 shadow'
                  : 'bg-transparent text-gray-500 hover:text-yellow-600'
              }`}
            >
              Learn
            </button>
            {quiz && (
              <button
                onClick={() => setCurrentTab('quiz')}
                className={`px-6 py-2 text-base font-semibold rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  currentTab === 'quiz'
                    ? 'bg-white text-yellow-600 shadow'
                    : 'bg-transparent text-gray-500 hover:text-yellow-600'
                }`}
              >
                Quiz
              </button>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)] bg-white">
          {currentTab === 'article' && (
            <div className="max-w-none">
              {concept.article_content ? (
                <div
                  className="article-content text-gray-800"
                  dangerouslySetInnerHTML={{ __html: concept.article_content }}
                />
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Article content for this concept will be available soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {currentTab === 'quiz' && quiz && (
            <div className="space-y-8">
              {quizSubmitted && quizScore !== null && (
                <div className={`p-5 rounded-2xl flex items-center justify-between mb-6 ${
                  quizScore >= 80 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div>
                    <h3 className={`font-bold text-lg ${
                      quizScore >= 80 ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {quizScore >= 80 ? 'Congratulations!' : 'Keep trying!'}
                    </h3>
                    <p className={`text-base ${
                      quizScore >= 80 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      You scored {quizScore}% {quizScore >= 80 ? '- Concept unlocked!' : '- You need 80% to pass.'}
                    </p>
                  </div>
                  {quizScore < 80 && (
                    <button
                      onClick={handleQuizReset}
                      className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                    >
                      <RotateCcw className="h-5 w-5" />
                      <span>Try Again</span>
                    </button>
                  )}
                </div>
              )}

              {quiz.questions.map((question, questionIndex) => (
                <div key={question.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                    {questionIndex + 1}. {decodeHtmlEntities(question.question)}
                  </h4>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[question.id] === optionIndex;
                      const isCorrect = optionIndex === question.correctAnswer;
                      const showResult = quizSubmitted;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(question.id, optionIndex)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-4 rounded-xl border font-medium transition-colors text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : isSelected
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-white border-gray-200 text-gray-600'
                              : isSelected
                              ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-yellow-50'
                          }`}
                        >
                          {decodeHtmlEntities(option)}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && question.explanation && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-300 rounded-xl">
                      <p className="text-base text-yellow-800">
                        <strong>Explanation:</strong> {decodeHtmlEntities(question.explanation)}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {!quizSubmitted && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!canSubmitQuiz}
                    className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-bold shadow hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
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

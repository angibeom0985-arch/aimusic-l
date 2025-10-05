import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepTitle }) => {
  return (
    <div className="text-center mb-6">
      <p className="text-sm text-pink-500 font-semibold tracking-wider">
        단계 {currentStep} / {totalSteps}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mt-1">{stepTitle}</h2>
    </div>
  );
};

export default StepIndicator;
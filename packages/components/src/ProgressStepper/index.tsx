import React, { CSSProperties } from 'react';

export interface Step {
  label: string;
  description?: string;
}

export interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
}) => {
  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          const circleStyle: CSSProperties = {
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: isCompleted || isCurrent ? '#3182f6' : '#e5e8eb',
            color: isCompleted || isCurrent ? '#ffffff' : '#8b95a1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 500,
            flexShrink: 0,
          };

          const labelStyle: CSSProperties = {
            fontSize: 12,
            fontWeight: isCurrent ? 500 : 400,
            color: isCurrent ? '#191f28' : '#4e5968',
            marginLeft: 12,
            alignSelf: 'center',
          };

          const connectorStyle: CSSProperties = {
            width: 2,
            height: 24,
            backgroundColor: isCompleted ? '#3182f6' : '#e5e8eb',
            marginLeft: 11,
          };

          return (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={circleStyle}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div>
                  <div style={labelStyle}>{step.label}</div>
                  {step.description && (
                    <div style={{ fontSize: 11, color: '#8b95a1', marginLeft: 12 }}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {!isLast && <div style={connectorStyle} />}
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        const circleStyle: CSSProperties = {
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: isCompleted || isCurrent ? '#3182f6' : '#e5e8eb',
          color: isCompleted || isCurrent ? '#ffffff' : '#8b95a1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          flexShrink: 0,
        };

        const labelStyle: CSSProperties = {
          fontSize: 12,
          fontWeight: isCurrent ? 500 : 400,
          color: isCurrent ? '#191f28' : '#4e5968',
          marginTop: 6,
          textAlign: 'center',
        };

        return (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', flex: isLast ? 0 : 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={circleStyle}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <div style={labelStyle}>{step.label}</div>
            </div>
            {!isLast && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: isCompleted ? '#3182f6' : '#e5e8eb',
                  marginTop: 11,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

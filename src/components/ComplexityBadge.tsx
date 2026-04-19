import React from 'react';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  type: 'time' | 'space';
}

const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ label, value, type }) => {
  const bgColor = type === 'time' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';
  
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bgColor}`}>
      <span className="opacity-70 mr-1">{label}:</span>
      <code>{value}</code>
    </div>
  );
};

export default ComplexityBadge;

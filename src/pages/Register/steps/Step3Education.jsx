import React from 'react';
import { Select } from '../../../components/ui/Input.jsx';

/**
 * Step 3 — Education System (auto-filled from country)
 *
 * The educationSystem object comes from countryData.js → getEducationSystem(countryCode).
 * All dropdowns are generated dynamically — every country has different levels, grades,
 * and qualifications.
 *
 * Props:
 *   data              object   — form state
 *   setData           fn       — state setter
 *   errors            object   — validation errors
 *   educationSystem   object   — result of getEducationSystem(countryCode)
 */
export default function Step3Education({ data, setData, errors, educationSystem }) {

  const handleLevelChange = (e) => {
    // Reset grade when level changes
    setData((prev) => ({ ...prev, study_level: e.target.value, grade: '' }));
  };

  const handleGradeChange = (e) => {
    setData((prev) => ({ ...prev, grade: e.target.value }));
  };

  const handleQualificationClick = (q) => {
    setData((prev) => ({ ...prev, target_qualification: q }));
  };

  const grades = educationSystem?.grades?.[data.study_level] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Auto-detected system banner */}
      {educationSystem && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          background: 'rgba(16,185,129,0.07)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 'var(--r-lg)', padding: '14px 16px',
        }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--text-c)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>
              Your education system
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>
              {educationSystem.system}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-b)', lineHeight: 1.6 }}>
              {educationSystem.description}
            </div>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: 9, flexShrink: 0 }}>✓ Auto-filled</span>
        </div>
      )}

      {/* Level of study */}
      <Select
        label="Level of study"
        name="study_level"
        value={data.study_level}
        onChange={handleLevelChange}
        options={educationSystem?.levels || []}
        placeholder="— Select your current level —"
        error={errors.study_level}
        required
        hint={educationSystem
          ? `Based on the ${educationSystem.system} in your country.`
          : 'Detected from your phone number country.'}
      />

      {/* Grade / Year — shown after level is picked */}
      {data.study_level && grades.length > 0 && (
        <Select
          label={`${educationSystem?.gradeLabel || 'Grade'} / Year`}
          name="grade"
          value={data.grade}
          onChange={handleGradeChange}
          options={grades.map((g) => ({ value: g, label: g }))}
          placeholder={`— Select your ${educationSystem?.gradeLabel || 'grade'} —`}
          error={errors.grade}
        />
      )}

      {/* Qualifications — click to select target */}
      {educationSystem?.qualifications?.length > 0 && (
        <div>
          <div className="input-label" style={{ marginBottom: 10 }}>
            Target qualification <span style={{ color: 'var(--text-c)', fontWeight: 400 }}>(optional)</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {educationSystem.qualifications.map((q) => (
              <span
                key={q}
                onClick={() => handleQualificationClick(q)}
                className={`badge ${data.target_qualification === q ? 'badge-amber' : 'badge-neutral'}`}
                style={{ cursor: 'pointer', fontSize: 11, padding: '6px 13px', transition: 'all 0.18s' }}
              >
                {data.target_qualification === q ? '✓ ' : ''}{q}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-c)', marginTop: 8 }}>
            Tap a qualification to set your learning goal. We'll align your AI study plan to it.
          </div>
        </div>
      )}

    </div>
  );
}
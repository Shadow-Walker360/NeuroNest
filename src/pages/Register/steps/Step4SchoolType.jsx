import React from 'react';
import { Select } from '../../../components/ui/Input.jsx';

/**
 * Step 4 — School Type
 *
 * Key distinction:
 *   - "Normal school" = single school (student/teacher view)
 *   - "Group of schools" = network/chain/district (admin dashboard, bulk tools)
 *
 * The school types come from educationSystem.schoolTypes (country-specific).
 * Every country has its own terminology (e.g. "National School" in Kenya,
 * "Gymnasium" in Germany, "Multi-Academy Trust" in the UK).
 *
 * Props:
 *   data              object  — form state
 *   setData           fn      — state setter
 *   educationSystem   object  — result of getEducationSystem(countryCode)
 */

const SCHOOL_ICONS = {
  public_school:    '🏫', private_school:  '🏛️', charter_school: '📐',
  homeschool:       '🏠', school_district: '🌐', university:     '🎓',
  community_college:'📚', state_school:    '🏫', academy:        '🏅',
  grammar_school:   '📜', independent:     '🏛️', sixth_form:     '📖',
  multi_academy:    '🌐', national_school: '🇰🇪', county_school:  '🏫',
  group_schools:    '🌐', tvet_institution:'🔧', government:     '🏛️',
  cbse:             '📘', icse:            '📗', private:        '🏠',
  kendriya:         '🇮🇳', catholic:       '✝️', mission_school: '⛪',
  unity_school:     '🇳🇬', tafe:           '🔧', model_c:        '🏫',
  schulverbund:     '🌐', grundschule:     '🏫', hauptschule:    '📓',
  realschule:       '📗', gymnasium:       '🏛️', gesamtschule:   '🌐',
  model_school:     '⭐', tvet:            '🔧',
};

const ROLES = [
  { value: 'student',  label: '🎓 Student' },
  { value: 'teacher',  label: '👩‍🏫 Teacher / Tutor' },
  { value: 'parent',   label: '👨‍👩‍👧 Parent / Guardian' },
  { value: 'admin',    label: '🏢 School Administrator' },
];

export default function Step4SchoolType({ data, setData, educationSystem }) {
  const types = educationSystem?.schoolTypes || [];

  const selectType = (value) => setData((p) => ({ ...p, school_type: value }));
  const setRole    = (e)     => setData((p) => ({ ...p, role: e.target.value }));
  const setAgreed  = (e)     => setData((p) => ({ ...p, agreed: e.target.checked }));

  // Separate "group" types from "single school" types for visual grouping
  const isGroup = (t) =>
    t.value.includes('group') ||
    t.value.includes('district') ||
    t.value.includes('multi') ||
    t.value.includes('schulverbund') ||
    t.value.includes('circuit');

  const singleTypes = types.filter((t) => !isGroup(t));
  const groupTypes  = types.filter((t) =>  isGroup(t));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Explainer */}
      <div style={{
        background: 'var(--surface-b)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: '12px 16px',
        fontSize: 12, color: 'var(--text-b)', lineHeight: 1.7,
      }}>
        🏫 This affects your dashboard layout. <strong style={{ color: 'var(--text)' }}>Individual schools</strong> get a
        streamlined student/teacher view, while{' '}
        <strong style={{ color: 'var(--text)' }}>groups or networks of schools</strong> get
        an admin dashboard with analytics across all campuses, bulk student onboarding, and management tools.
      </div>

      {/* Single school types */}
      {singleTypes.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-c)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Individual school
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 10 }}>
            {singleTypes.map((t) => (
              <SchoolTypeCard
                key={t.value}
                type={t}
                selected={data.school_type === t.value}
                onClick={() => selectType(t.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Group types */}
      {groupTypes.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-c)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Group / network of schools
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 10 }}>
            {groupTypes.map((t) => (
              <SchoolTypeCard
                key={t.value}
                type={t}
                selected={data.school_type === t.value}
                onClick={() => selectType(t.value)}
                isGroup
              />
            ))}
          </div>
        </div>
      )}

      {/* Role */}
      <Select
        label="Your role"
        name="role"
        value={data.role || 'student'}
        onChange={setRole}
        options={ROLES}
        hint="Determines your dashboard features and onboarding flow."
      />

      {/* Terms */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <input
          type="checkbox"
          id="reg-terms"
          checked={!!data.agreed}
          onChange={setAgreed}
          style={{ width: 16, height: 16, accentColor: 'var(--amber)', marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
        />
        <label htmlFor="reg-terms" style={{ fontSize: 12, color: 'var(--text-b)', lineHeight: 1.7, cursor: 'pointer' }}>
          I agree to the{' '}
          <span style={{ color: 'var(--amber)' }}>Terms of Service</span> and{' '}
          <span style={{ color: 'var(--amber)' }}>Privacy Policy</span>.
          I understand that LearnVerse will personalise my experience based on my country's
          education system.
        </label>
      </div>

    </div>
  );
}

/* ── School Type Card ── */
function SchoolTypeCard({ type, selected, onClick, isGroup }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected
          ? isGroup ? 'rgba(56,189,248,0.1)' : 'var(--amber-g)'
          : 'var(--surface)',
        border: `1px solid ${selected
          ? isGroup ? 'rgba(56,189,248,0.4)' : 'rgba(245,158,11,0.45)'
          : 'var(--border)'}`,
        borderRadius: 'var(--r-xl)',
        padding: '14px 12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        boxShadow: selected ? (isGroup ? '0 0 14px rgba(56,189,248,0.1)' : '0 0 14px rgba(245,158,11,0.1)') : 'none',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--border-h)';
          e.currentTarget.style.background = 'var(--surface-b)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.background = 'var(--surface)';
        }
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>
        {SCHOOL_ICONS[type.value] || '🏫'}
      </div>
      <div style={{
        fontSize: 11, fontWeight: 600,
        color: selected ? (isGroup ? 'var(--sky)' : 'var(--amber)') : 'var(--text-b)',
        lineHeight: 1.4,
      }}>
        {type.label}
      </div>
    </div>
  );
}
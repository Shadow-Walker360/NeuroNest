/**
 * LearnVerse Country & Education Data
 * ─────────────────────────────────────
 * Maps country dial codes → country info → education system.
 * Used in registration Step 2 & 3 to auto-fill education fields.
 */

// ── COUNTRY DIAL CODES ──────────────────────────────────────────────────────
export const COUNTRY_CODES = [
  { code: '+1',   country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+1',   country: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: '+44',  country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+61',  country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+64',  country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+27',  country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+233', country: 'GH', flag: '🇬🇭', name: 'Ghana' },
  { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco' },
  { code: '+20',  country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+91',  country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+92',  country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94',  country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+86',  country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81',  country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+82',  country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+65',  country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60',  country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+66',  country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+62',  country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+63',  country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+49',  country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+34',  country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+39',  country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+31',  country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+46',  country: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47',  country: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: '+45',  country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: '+55',  country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+54',  country: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+52',  country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+57',  country: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+98',  country: 'IR', flag: '🇮🇷', name: 'Iran' },
  { code: '+90',  country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+7',   country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+48',  country: 'PL', flag: '🇵🇱', name: 'Poland' },
];

// ── EDUCATION SYSTEMS BY COUNTRY ───────────────────────────────────────────
/**
 * Each entry defines:
 *  - system:        name of the national education system
 *  - levels:        array of study levels (shown as dropdown)
 *  - qualifications: major exit qualifications
 *  - schoolTypes:   types of schools in that country
 *  - gradeLabel:    what they call "grade" (Year, Form, Grade, Class…)
 *  - description:   short description shown to user
 */
export const EDUCATION_SYSTEMS = {
  // ── USA ──
  US: {
    system: 'US K-12 + Higher Education',
    description: 'Standard American education system with grades K–12 then college.',
    gradeLabel: 'Grade',
    levels: [
      { value: 'elementary', label: 'Elementary School (K–5)' },
      { value: 'middle',     label: 'Middle School (6–8)' },
      { value: 'high',       label: 'High School (9–12)' },
      { value: 'undergrad',  label: 'Undergraduate (College)' },
      { value: 'postgrad',   label: 'Postgraduate' },
      { value: 'lifelong',   label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      elementary: ['Kindergarten','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5'],
      middle:     ['Grade 6','Grade 7','Grade 8'],
      high:       ['Grade 9 (Freshman)','Grade 10 (Sophomore)','Grade 11 (Junior)','Grade 12 (Senior)'],
      undergrad:  ['Freshman','Sophomore','Junior','Senior'],
      postgrad:   ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['SAT', 'ACT', 'AP Exams', 'IB', 'High School Diploma', "Bachelor's", "Master's", 'PhD'],
    schoolTypes: [
      { value: 'public_school',   label: 'Public School' },
      { value: 'private_school',  label: 'Private School' },
      { value: 'charter_school',  label: 'Charter School' },
      { value: 'homeschool',      label: 'Homeschool' },
      { value: 'school_district', label: 'School District / Group of Schools' },
      { value: 'university',      label: 'University / College' },
      { value: 'community_college',label: 'Community College' },
    ],
  },

  // ── UK ──
  GB: {
    system: 'England & Wales National Curriculum',
    description: 'Key Stages 1–5, GCSEs, A-Levels, then Higher Education.',
    gradeLabel: 'Year',
    levels: [
      { value: 'ks1', label: 'Key Stage 1 (Years 1–2, ages 5–7)' },
      { value: 'ks2', label: 'Key Stage 2 (Years 3–6, ages 7–11)' },
      { value: 'ks3', label: 'Key Stage 3 (Years 7–9, ages 11–14)' },
      { value: 'ks4', label: 'Key Stage 4 — GCSE (Years 10–11)' },
      { value: 'ks5', label: 'Key Stage 5 — A-Level / Sixth Form (Years 12–13)' },
      { value: 'undergrad',  label: 'Undergraduate (University)' },
      { value: 'postgrad',   label: 'Postgraduate' },
      { value: 'lifelong',   label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      ks1: ['Year 1','Year 2'],
      ks2: ['Year 3','Year 4','Year 5','Year 6'],
      ks3: ['Year 7','Year 8','Year 9'],
      ks4: ['Year 10','Year 11'],
      ks5: ['Year 12 (Lower Sixth)','Year 13 (Upper Sixth)'],
      undergrad: ['Year 1','Year 2','Year 3','Year 4'],
      postgrad: ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['GCSEs','A-Levels','BTEC','IB','Scottish Highers','Foundation Degree',"Bachelor's","Master's",'PhD'],
    schoolTypes: [
      { value: 'state_school',    label: 'State / Comprehensive School' },
      { value: 'academy',         label: 'Academy' },
      { value: 'grammar_school',  label: 'Grammar School' },
      { value: 'independent',     label: 'Independent / Private School' },
      { value: 'sixth_form',      label: 'Sixth Form College' },
      { value: 'multi_academy',   label: 'Multi-Academy Trust (Group of Schools)' },
      { value: 'university',      label: 'University' },
    ],
  },

  // ── KENYA ──
  KE: {
    system: 'Kenya CBC & 8-4-4 Systems',
    description: 'Kenya uses the Competency Based Curriculum (CBC) for new students and 8-4-4 for older ones.',
    gradeLabel: 'Grade',
    levels: [
      { value: 'early_years',  label: 'Early Years / Pre-Primary (PP1–PP2)' },
      { value: 'lower_primary',label: 'Lower Primary (Grades 1–3, CBC)' },
      { value: 'upper_primary',label: 'Upper Primary (Grades 4–6, CBC)' },
      { value: 'junior_school',label: 'Junior Secondary (Grades 7–9, CBC)' },
      { value: 'senior_school',label: 'Senior Secondary (Grades 10–12, CBC)' },
      { value: 'secondary_844',label: 'Secondary School (Form 1–4, 8-4-4)' },
      { value: 'university',   label: 'University / Tertiary' },
      { value: 'tvet',         label: 'TVET / Technical Training' },
      { value: 'lifelong',     label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      early_years:   ['PP1','PP2'],
      lower_primary: ['Grade 1','Grade 2','Grade 3'],
      upper_primary: ['Grade 4','Grade 5','Grade 6'],
      junior_school: ['Grade 7','Grade 8','Grade 9'],
      senior_school: ['Grade 10','Grade 11','Grade 12'],
      secondary_844: ['Form 1','Form 2','Form 3','Form 4'],
      university:    ['Year 1','Year 2','Year 3','Year 4'],
      tvet:          ['Year 1','Year 2','Year 3'],
    },
    qualifications: ['KCPE','KCSE','Kenya National Examinations','Diploma','Degree',"Master's",'PhD'],
    schoolTypes: [
      { value: 'public_school',   label: 'Public / Government School' },
      { value: 'private_school',  label: 'Private School' },
      { value: 'national_school', label: 'National School' },
      { value: 'county_school',   label: 'County School' },
      { value: 'group_schools',   label: 'Group / Network of Schools' },
      { value: 'university',      label: 'University / College' },
      { value: 'tvet_institution',label: 'TVET Institution' },
    ],
  },

  // ── NIGERIA ──
  NG: {
    system: '6-3-3-4 Nigerian System',
    description: 'Nigeria uses 6 years primary, 3 years junior secondary, 3 years senior secondary, 4 years university.',
    gradeLabel: 'Class',
    levels: [
      { value: 'primary',    label: 'Primary School (Primary 1–6)' },
      { value: 'jss',        label: 'Junior Secondary School (JSS 1–3)' },
      { value: 'sss',        label: 'Senior Secondary School (SSS 1–3)' },
      { value: 'undergrad',  label: 'University / Polytechnic' },
      { value: 'postgrad',   label: 'Postgraduate' },
      { value: 'lifelong',   label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      primary:   ['Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6'],
      jss:       ['JSS 1','JSS 2','JSS 3'],
      sss:       ['SSS 1','SSS 2','SSS 3'],
      undergrad: ['100 Level','200 Level','300 Level','400 Level','500 Level'],
      postgrad:  ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['FSLC','BECE','WAEC','NECO','SSCE','OND','HND',"Bachelor's",'NYSC'],
    schoolTypes: [
      { value: 'public_school',  label: 'Public / Government School' },
      { value: 'private_school', label: 'Private School' },
      { value: 'unity_school',   label: 'Federal Government / Unity School' },
      { value: 'mission_school', label: 'Mission / Church School' },
      { value: 'group_schools',  label: 'Group / Chain of Schools' },
      { value: 'university',     label: 'University / Polytechnic' },
    ],
  },

  // ── GHANA ──
  GH: {
    system: 'Ghanaian Education System',
    description: 'Ghana uses the JHS–SHS system with BECE and WASSCE exams.',
    gradeLabel: 'Class',
    levels: [
      { value: 'primary',   label: 'Primary School (Primary 1–6)' },
      { value: 'jhs',       label: 'Junior High School (JHS 1–3)' },
      { value: 'shs',       label: 'Senior High School (SHS 1–3)' },
      { value: 'undergrad', label: 'University / Polytechnic' },
      { value: 'postgrad',  label: 'Postgraduate' },
      { value: 'lifelong',  label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      primary:  ['Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6'],
      jhs:      ['JHS 1','JHS 2','JHS 3'],
      shs:      ['SHS 1','SHS 2','SHS 3'],
      undergrad:['Level 100','Level 200','Level 300','Level 400'],
      postgrad: ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['BECE','WASSCE','Diploma','HND',"Bachelor's","Master's",'PhD'],
    schoolTypes: [
      { value: 'public_school',  label: 'Public / Government School' },
      { value: 'private_school', label: 'Private School' },
      { value: 'model_school',   label: 'Model / Experimental School' },
      { value: 'group_schools',  label: 'Group / Network of Schools' },
      { value: 'university',     label: 'University / Polytechnic' },
    ],
  },

  // ── SOUTH AFRICA ──
  ZA: {
    system: 'South African National Curriculum (CAPS)',
    description: 'South Africa uses CAPS with Grades R–12 and National Senior Certificate (NSC).',
    gradeLabel: 'Grade',
    levels: [
      { value: 'foundation', label: 'Foundation Phase (Grades R–3)' },
      { value: 'intermediate',label: 'Intermediate Phase (Grades 4–6)' },
      { value: 'senior',     label: 'Senior Phase (Grades 7–9)' },
      { value: 'fet',        label: 'FET Phase / Matric (Grades 10–12)' },
      { value: 'undergrad',  label: 'University / TVET College' },
      { value: 'postgrad',   label: 'Postgraduate' },
      { value: 'lifelong',   label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      foundation:   ['Grade R','Grade 1','Grade 2','Grade 3'],
      intermediate: ['Grade 4','Grade 5','Grade 6'],
      senior:       ['Grade 7','Grade 8','Grade 9'],
      fet:          ['Grade 10','Grade 11','Grade 12 (Matric)'],
      undergrad:    ['1st Year','2nd Year','3rd Year','4th Year'],
      postgrad:     ["Honours","Master's",'PhD'],
    },
    qualifications: ['NSC / Matric','NCV','NC(V)','Diploma','Degree',"Honours","Master's",'PhD'],
    schoolTypes: [
      { value: 'public_school',   label: 'Public / Government School' },
      { value: 'private_school',  label: 'Private / Independent School' },
      { value: 'model_c',        label: 'Former Model C School' },
      { value: 'group_schools',   label: 'Group / Circuit of Schools' },
      { value: 'university',      label: 'University' },
      { value: 'tvet',           label: 'TVET College' },
    ],
  },

  // ── INDIA ──
  IN: {
    system: 'Indian National Education System (NEP 2020)',
    description: 'India uses a 5+3+3+4 structure under NEP 2020, with CBSE, ICSE, and State Boards.',
    gradeLabel: 'Class',
    levels: [
      { value: 'foundational', label: 'Foundational Stage (Classes 1–2 / LKG–UKG)' },
      { value: 'preparatory',  label: 'Preparatory Stage (Classes 3–5)' },
      { value: 'middle',       label: 'Middle Stage (Classes 6–8)' },
      { value: 'secondary',    label: 'Secondary Stage (Classes 9–12)' },
      { value: 'undergrad',    label: 'Undergraduate (UG)' },
      { value: 'postgrad',     label: 'Postgraduate (PG)' },
      { value: 'lifelong',     label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      foundational: ['LKG','UKG','Class 1','Class 2'],
      preparatory:  ['Class 3','Class 4','Class 5'],
      middle:       ['Class 6','Class 7','Class 8'],
      secondary:    ['Class 9','Class 10','Class 11','Class 12'],
      undergrad:    ['1st Year','2nd Year','3rd Year','4th Year'],
      postgrad:     ['1st Year PG','2nd Year PG','PhD'],
    },
    qualifications: ['SSC (Class 10)','HSC (Class 12)','CBSE','ICSE','JEE','NEET','UPSC','BA/BSc/BCom',"MA/MSc",'PhD'],
    schoolTypes: [
      { value: 'government',    label: 'Government / State Board School' },
      { value: 'cbse',          label: 'CBSE Affiliated School' },
      { value: 'icse',          label: 'ICSE / ISC School' },
      { value: 'private',       label: 'Private / Unaided School' },
      { value: 'kendriya',      label: 'Kendriya Vidyalaya' },
      { value: 'group_schools', label: 'Chain / Group of Schools' },
      { value: 'university',    label: 'University / College' },
    ],
  },

  // ── AUSTRALIA ──
  AU: {
    system: 'Australian Curriculum (Foundation–Year 12)',
    description: 'Australia uses Foundation to Year 12 with HSC / VCE exit qualifications.',
    gradeLabel: 'Year',
    levels: [
      { value: 'primary',   label: 'Primary School (Foundation–Year 6)' },
      { value: 'middle',    label: 'Middle School (Years 7–9)' },
      { value: 'senior',    label: 'Senior Secondary (Years 10–12)' },
      { value: 'undergrad', label: 'Undergraduate (University)' },
      { value: 'postgrad',  label: 'Postgraduate' },
      { value: 'lifelong',  label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      primary:  ['Foundation','Year 1','Year 2','Year 3','Year 4','Year 5','Year 6'],
      middle:   ['Year 7','Year 8','Year 9'],
      senior:   ['Year 10','Year 11','Year 12'],
      undergrad:['1st Year','2nd Year','3rd Year','4th Year'],
      postgrad: ['Honours','Graduate Diploma',"Master's",'PhD'],
    },
    qualifications: ['NAPLAN','HSC','VCE','ATAR','QCE','SACE','WACE',"Bachelor's","Master's",'PhD'],
    schoolTypes: [
      { value: 'government',    label: 'Government / Public School' },
      { value: 'catholic',      label: 'Catholic / Religious School' },
      { value: 'independent',   label: 'Independent / Private School' },
      { value: 'group_schools', label: 'Group / Network of Schools' },
      { value: 'university',    label: 'University' },
      { value: 'tafe',          label: 'TAFE / Vocational' },
    ],
  },

  // ── GERMANY ──
  DE: {
    system: 'German Education System (Bildungssystem)',
    description: 'Germany has differentiated schooling: Hauptschule, Realschule, Gymnasium leading to Abitur.',
    gradeLabel: 'Klasse',
    levels: [
      { value: 'grundschule',  label: 'Grundschule / Primary (Klasse 1–4)' },
      { value: 'sekundarstufe1', label: 'Sekundarstufe I (Klasse 5–10)' },
      { value: 'gymnasium',    label: 'Gymnasium / Abitur (Klasse 11–13)' },
      { value: 'undergrad',    label: 'Universität / FH (Undergraduate)' },
      { value: 'postgrad',     label: 'Postgraduate / Promotion (PhD)' },
      { value: 'lifelong',     label: 'Lifelong / Berufliche Weiterbildung' },
    ],
    grades: {
      grundschule:    ['Klasse 1','Klasse 2','Klasse 3','Klasse 4'],
      sekundarstufe1: ['Klasse 5','Klasse 6','Klasse 7','Klasse 8','Klasse 9','Klasse 10'],
      gymnasium:      ['Klasse 11','Klasse 12','Klasse 13'],
      undergrad:      ['1. Semester','2. Semester','3. Semester','4. Semester','5. Semester','6. Semester'],
      postgrad:       ['Master 1. Semester','Master 2. Semester','Promotion'],
    },
    qualifications: ['Hauptschulabschluss','Realschulabschluss','Abitur','Bachelor','Master','Promotion (PhD)'],
    schoolTypes: [
      { value: 'grundschule',  label: 'Grundschule (Primary)' },
      { value: 'hauptschule',  label: 'Hauptschule' },
      { value: 'realschule',   label: 'Realschule' },
      { value: 'gymnasium',    label: 'Gymnasium' },
      { value: 'gesamtschule', label: 'Gesamtschule / Comprehensive' },
      { value: 'schulverbund', label: 'Schulverbund (Group of Schools)' },
      { value: 'university',   label: 'Universität / Fachhochschule' },
    ],
  },

  // ── UAE ──
  AE: {
    system: 'UAE National Curriculum / MOE',
    description: 'UAE Ministry of Education curriculum, Grades 1–12, with international schools also common.',
    gradeLabel: 'Grade',
    levels: [
      { value: 'primary',     label: 'Primary (Grades 1–5)' },
      { value: 'preparatory', label: 'Preparatory (Grades 6–9)' },
      { value: 'secondary',   label: 'Secondary (Grades 10–12)' },
      { value: 'undergrad',   label: 'University (Undergraduate)' },
      { value: 'postgrad',    label: 'Postgraduate' },
      { value: 'lifelong',    label: 'Lifelong / Professional' },
    ],
    grades: {
      primary:     ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5'],
      preparatory: ['Grade 6','Grade 7','Grade 8','Grade 9'],
      secondary:   ['Grade 10','Grade 11','Grade 12'],
      undergrad:   ['Year 1','Year 2','Year 3','Year 4'],
      postgrad:    ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['EmSAT','UAE MOE Certificate','IGCSE','A-Level','IB',"Bachelor's","Master's",'PhD'],
    schoolTypes: [
      { value: 'government',    label: 'Government School' },
      { value: 'private_moe',   label: 'Private School (MOE Curriculum)' },
      { value: 'british',       label: 'British Curriculum School' },
      { value: 'american',      label: 'American Curriculum School' },
      { value: 'ib_school',     label: 'IB School' },
      { value: 'group_schools', label: 'Group / Chain of Schools' },
      { value: 'university',    label: 'University' },
    ],
  },

  // ── DEFAULT FALLBACK ──
  DEFAULT: {
    system: 'International / Custom',
    description: 'General international education structure.',
    gradeLabel: 'Year / Grade',
    levels: [
      { value: 'primary',   label: 'Primary / Elementary School' },
      { value: 'middle',    label: 'Middle / Junior Secondary' },
      { value: 'secondary', label: 'Secondary / High School' },
      { value: 'undergrad', label: 'Undergraduate / University' },
      { value: 'postgrad',  label: 'Postgraduate' },
      { value: 'lifelong',  label: 'Lifelong / Professional Learner' },
    ],
    grades: {
      primary:   ['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6'],
      middle:    ['Year 7','Year 8','Year 9'],
      secondary: ['Year 10','Year 11','Year 12'],
      undergrad: ['Year 1','Year 2','Year 3','Year 4'],
      postgrad:  ["Master's Year 1","Master's Year 2",'PhD'],
    },
    qualifications: ['National Certificate','Diploma',"Bachelor's","Master's",'PhD'],
    schoolTypes: [
      { value: 'public_school',  label: 'Public / Government School' },
      { value: 'private_school', label: 'Private School' },
      { value: 'group_schools',  label: 'Group / Network of Schools' },
      { value: 'university',     label: 'University / College' },
      { value: 'vocational',     label: 'Vocational / Technical' },
    ],
  },
};

/**
 * Get education system for a country code.
 * Falls back to DEFAULT if country not found.
 */
export function getEducationSystem(countryCode) {
  return EDUCATION_SYSTEMS[countryCode] || EDUCATION_SYSTEMS.DEFAULT;
}

/**
 * Get grades for a specific level within a country.
 */
export function getGrades(countryCode, level) {
  const system = getEducationSystem(countryCode);
  return system.grades[level] || [];
}

/**
 * Find country info from dial code selection.
 */
export function getCountryByDialCode(dialCode, countryCode) {
  return COUNTRY_CODES.find(
    (c) => c.code === dialCode && c.country === countryCode
  ) || null;
}
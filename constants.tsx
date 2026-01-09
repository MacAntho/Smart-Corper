
import { GraduationCap, FileText, Tent, Briefcase, Users, CheckCircle, Award } from 'lucide-react';
import { Stage, User, Article, Deadline, StateGuide, CDSProject, PPAOrg, CareerJob, DownloadableResource, NYSCDocument } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Chioma Adebayo',
  email: 'chioma@example.com',
  batch: '2024 Batch A',
  stateCode: 'LA/24A/1234',
  deploymentState: 'Lagos',
  currentStage: 'ppa',
  isPro: false,
  avatarInitials: 'CA'
};

export const NYSC_STAGES: Stage[] = [
  {
    id: 's1',
    slug: 'final_year',
    name: 'Final Year Prep',
    icon: GraduationCap,
    color: 'bg-stage-final-year',
    overview: 'The foundation of your NYSC journey. Ensure your academic records are perfectly aligned with JAMB and your institution.',
    duration: '3-6 Months before graduation',
    estimatedCosts: '₦2,000 - ₦5,000',
    progress: 100,
    checklist: [
      { id: 'c1', task: 'Check JAMB Matriculation List', isCompleted: true, isMandatory: true, description: 'Verify you are officially recognized as a student on the JAMB portal.' },
      { id: 'c2', task: 'Verify Senate List Name', isCompleted: true, isMandatory: true, description: 'Ensure your school has uploaded your correct name to the NYSC portal.' },
      { id: 'c101', task: 'Clear all Carry-overs', isCompleted: true, isMandatory: true },
      { id: 'c102', task: 'Sort Statement of Result', isCompleted: true, isMandatory: true },
    ],
    dos: [
      'Confirm your name matches across all documents (JAMB, School, WAEC).',
      'Follow up with your school Student Affairs unit regularly.',
      'Check the NYSC portal frequently for Senate List updates.',
      'Keep your school ID card safe; you will need for camp.'
    ],
    donts: [
      'Do not assume your name is on the list because you graduated.',
      'Do not wait until the last minute to fix carry-over issues.',
      'Avoid using nicknames or unofficial names in school records.'
    ],
    mistakes: [
      { title: 'Inconsistent Names', explanation: 'Difference between JAMB name and School name can delay mobilization by months.' },
      { title: 'Ignoring Matriculation List', explanation: 'If you aren\'t on JAMB\'s matric list, you cannot be mobilized.' }
    ],
    documents: [
      { name: 'School ID Card', spec: 'Original & Photocopies', source: 'Your Institution' },
      { name: 'Statement of Result', spec: 'Signed by Registrar', source: 'Your Institution' }
    ],
    costBreakdown: [
      { item: 'Data & Printing', range: '₦500 - ₦1,500' },
      { item: 'Institution Processing', range: '₦1,000 - ₦3,000' }
    ]
  },
  {
    id: 's2',
    slug: 'mobilization',
    name: 'Mobilization',
    icon: FileText,
    color: 'bg-stage-mobilization',
    overview: 'Online registration, payment, and biometric verification. This is where you formally enter the NYSC database.',
    duration: '2-4 Weeks',
    estimatedCosts: '₦3,000 - ₦5,000',
    progress: 100,
    checklist: [
      { id: 'c3', task: 'Complete Online Registration', isCompleted: true, isMandatory: true },
      { id: 'c4', task: 'Thumbprint at Cafe', isCompleted: true, isMandatory: true },
      { id: 'c5', task: 'Print Green Card', isCompleted: true, isMandatory: true },
      { id: 'c103', task: 'Print Call-up Letter', isCompleted: true, isMandatory: true },
    ],
    dos: [
      'Use a functional and private email address.',
      'Ensure your thumbprints are clear and captured correctly.',
      'Print multiple copies of your Green Card immediately.'
    ],
    donts: [
      'Do not share your portal login details with strangers.',
      'Do not register at unverified cyber cafes.',
      'Avoid choosing "difficult" states if you have health issues.'
    ],
    mistakes: [
      { title: 'Wrong Date of Birth', explanation: 'Errors here are very difficult and slow to correct after submission.' },
      { title: 'Poor Passport Photo', explanation: 'A bad photo will be on your discharge certificate forever.' }
    ],
    documents: [
      { name: 'Green Card', spec: 'Color Printed', source: 'NYSC Portal' },
      { name: 'Call-up Letter', spec: 'Color Printed', source: 'NYSC Portal' }
    ],
    costBreakdown: [
      { item: 'Online Payment', range: '₦3,000' },
      { item: 'Cafe Services', range: '₦1,000 - ₦2,000' }
    ]
  },
  {
    id: 's3',
    slug: 'camp',
    name: 'Orientation Camp',
    icon: Tent,
    color: 'bg-stage-camp',
    overview: 'The most intense and memorable 21 days. Paramilitary drills, social events, and final registration.',
    duration: '21 Days',
    estimatedCosts: '₦30,000 - ₦60,000',
    progress: 100,
    checklist: [
      { id: 'c6', task: 'Buy White Shorts & T-shirts', isCompleted: true, isMandatory: true },
      { id: 'c7', task: 'Medical Fitness Certificate', isCompleted: true, isMandatory: true },
      { id: 'c8', task: 'Camp Registration', isCompleted: true, isMandatory: true },
      { id: 'c104', task: 'Get State Code', isCompleted: true, isMandatory: true },
    ],
    dos: [
      'Report to camp on the first or second day.',
      'Be active in platoon activities for a better PPA.',
      'Keep your valuables (phones, money) in your waist bag.'
    ],
    donts: [
      'Do not skip drills without a medical excuse.',
      'Do not leave camp without an official exit permit.',
      'Avoid confrontation with soldiers and officials.'
    ],
    mistakes: [
      { title: 'Incomplete File', explanation: 'Missing a single document can result in being sent back home.' },
      { title: 'Oversleeping', explanation: 'Soldiers "whistle" early; being late leads to punishment.' }
    ],
    documents: [
      { name: 'Medical Fitness Cert', spec: 'From Govt Hospital', source: 'Hospital' },
      { name: 'Call-up Letter', spec: 'Original', source: 'Portal' }
    ],
    costBreakdown: [
      { item: 'Whites & Essentials', range: '₦10,000 - ₦20,000' },
      { item: 'Maami Market Spending', range: '₦20,000 - ₦40,000' }
    ]
  },
  {
    id: 's4',
    slug: 'ppa',
    name: 'Primary Assignment (PPA)',
    icon: Briefcase,
    color: 'bg-stage-ppa',
    overview: 'Where you spend 11 months working. Your impact here defines your service year.',
    duration: '11 Months',
    estimatedCosts: '₦50,000 - ₦150,000 (Relocation/Rent)',
    progress: 45,
    checklist: [
      { id: 'c9', task: 'Report to PPA', isCompleted: true, isMandatory: true },
      { id: 'c10', task: 'Submit Acceptance Letter', isCompleted: true, isMandatory: true },
      { id: 'c11', task: 'Open Bank Account for Allawee', isCompleted: true, isMandatory: true },
      { id: 'c12', task: 'Monthly Clearance', isCompleted: false, isMandatory: true },
    ],
    dos: [
      'Be punctual and professional at your PPA.',
      'Request for your "Monthly Clearance" early.',
      'Build networks for life after NYSC.'
    ],
    donts: [
      'Do not travel out of state without permission.',
      'Do not reject PPA postings without a valid backup.',
      'Avoid getting involved in workplace politics.'
    ],
    mistakes: [
      { title: 'Absconding', explanation: 'Leaving your PPA without permission leads to service extension.' },
      { title: 'Missing Clearance', explanation: 'Missing monthly biometric clearance stops your allowance.' }
    ],
    documents: [
      { name: 'Posting Letter', spec: 'Original from Camp', source: 'Camp Officials' },
      { name: 'Acceptance Letter', spec: 'Stamped & Signed', source: 'PPA Boss' }
    ],
    costBreakdown: [
      { item: 'Initial Housing', range: '₦20,000 - ₦100,000' },
      { item: 'Monthly Living', range: '₦30,000 - ₦60,000' }
    ]
  },
  {
    id: 's5',
    slug: 'cds',
    name: 'CDS',
    icon: Users,
    color: 'bg-stage-cds',
    overview: 'Weekly meetings and community-driven projects. This is your chance to lead.',
    duration: 'Continuous',
    estimatedCosts: '₦5,000 - ₦20,000',
    progress: 20,
    checklist: [
      { id: 'c13', task: 'Join a CDS Group', isCompleted: true, isMandatory: true },
      { id: 'c14', task: 'Attend Weekly Meetings', isCompleted: false, isMandatory: true },
      { id: 'c15', task: 'Execute Personal Project', isCompleted: false, isMandatory: false },
    ],
    dos: [
      'Attend CDS meetings every week.',
      'Document your community impacts with photos.',
      'Collaborate with fellow corpers on group projects.'
    ],
    donts: [
      'Do not sign for others in the attendance register.',
      'Do not skip CDS as it affects your final clearance.',
      'Avoid illegal fundraising for projects.'
    ],
    mistakes: [
      { title: 'Forging Signature', explanation: 'If caught, you face severe disciplinary action.' },
      { title: 'Ignoring Meetings', explanation: 'Accumulated absences prevent passing out.' }
    ],
    documents: [
      { name: 'CDS Card', spec: 'Signed Weekly', source: 'LGI' },
      { name: 'Project Approval', spec: 'Official Letter', source: 'NYSC State HQ' }
    ],
    costBreakdown: [
      { item: 'Transportation', range: '₦1,000 - ₦3,000 / mo' },
      { item: 'Project Materials', range: 'Varies' }
    ]
  },
  {
    id: 's6',
    slug: 'clearance',
    name: 'Final Clearance',
    icon: CheckCircle,
    color: 'bg-stage-clearance',
    overview: 'The final administrative hurdles before you receive your certificate.',
    duration: '2-3 Weeks before POP',
    estimatedCosts: '₦5,000 - ₦10,000',
    progress: 0,
    checklist: [
      { id: 'c16', task: 'Employers Final Clearance', isCompleted: false, isMandatory: true },
      { id: 'c17', task: 'Zonal Inspector Clearance', isCompleted: false, isMandatory: true },
      { id: 'c105', task: 'Return NYSC Kit (Optional in some states)', isCompleted: false, isMandatory: false },
    ],
    dos: [
      'Ensure all monthly clearances are up to date.',
      'Submit your final CDS report.',
      'Get a clean recommendation from your PPA.'
    ],
    donts: [
      'Do not wait for the last week to start clearance.',
      'Do not lose your ID card or CDS card.',
      'Avoid travel during the final clearance month.'
    ],
    mistakes: [
      { title: 'Missing Monthly Signoffs', explanation: 'If any month is missing, you can\'t clear for POP.' },
      { title: 'Lost Documents', explanation: 'Losing your ID card now causes massive delays.' }
    ],
    documents: [
      { name: 'Final Clearance Letter', spec: 'Stamped by PPA', source: 'Employer' },
      { name: 'NYSC ID Card', spec: 'Original', source: 'You' }
    ],
    costBreakdown: [
      { item: 'Logistics/Printing', range: '₦2,000 - ₦5,000' },
      { item: 'Administrative', range: '₦3,000 - ₦5,000' }
    ]
  },
  {
    id: 's7',
    slug: 'pop',
    name: 'Passing Out Parade (POP)',
    icon: Award,
    color: 'bg-stage-pop',
    overview: 'The grand finale. Celebrating the end of your service and collecting your certificate.',
    duration: '1 Day',
    estimatedCosts: '₦10,000 - ₦30,000 (Celebration)',
    progress: 0,
    checklist: [
      { id: 'c18', task: 'Collect Certificate', isCompleted: false, isMandatory: true },
      { id: 'c106', task: 'Attend Parade', isCompleted: false, isMandatory: true },
    ],
    dos: [
      'Wear your full uniform with pride.',
      'Confirm the details on your certificate immediately.',
      'Take lots of photos with friends.'
    ],
    donts: [
      'Do not be late to the parade ground.',
      'Do not lose your certificate; it is difficult to replace.',
      'Avoid excessive reckless celebration on roads.'
    ],
    mistakes: [
      { title: 'Wrong Certificate Details', explanation: 'Check name spelling immediately; it can only be fixed now.' },
      { title: 'Missing the Collection', explanation: 'Certificates not collected on POP are sent back to HQ.' }
    ],
    documents: [
      { name: 'Discharge Certificate', spec: 'Original', source: 'NYSC DG' }
    ],
    costBreakdown: [
      { item: 'Celebration Lunch', range: '₦5,000 - ₦20,000' },
      { item: 'Photography', range: '₦2,000 - 10,000' }
    ]
  }
];

export const MOCK_ARTICLES: Article[] = [
  { 
    id: 'a1', 
    slug: 'surviving-maami-market',
    title: 'How to survive Maami Market prices', 
    category: 'Camp Life', 
    readTime: '6 min', 
    riskLevel: 'Low', 
    views: 1542,
    lastVerifiedDate: new Date('2024-07-02'),
    source: 'NYSC Official Protocols & Manuals',
    excerpt: 'Master the Maami Market economy. Learn how to leverage official price controls, find NYSC Ventures products, and avoid common SAED material markups.',
    body: `
      <p>Surviving the <strong>Maami Market</strong> economy requires a combination of pre-camp preparation and an understanding of the internal regulatory bodies designed to protect corps members from exploitation.</p>
      <h2 id="price-controls">Leverage Official Price Controls</h2>
      <p>The most effective way to handle high prices is to know that they are officially regulated. Each camp has a <strong>Camp Market Committee</strong>, typically chaired by the Camp Director and including two corps member representatives. This committee is statutorily responsible for <strong>standardizing the prices of commodities</strong> and ensuring that traders do not exploit members.</p>
      <h2 id="nysc-ventures">Utilize NYSC Ventures</h2>
      <p>To avoid the premium prices often found at independent stalls, look for products supplied by <strong>NYSC Ventures</strong>. The scheme has established its own <strong>water and bakery factories</strong> to provide essential needs at a lower cost.</p>
      <h2 id="saed-markups">Beware of SAED "Material Markups"</h2>
      <p>Some trainers are known to <strong>hike the prices of training materials</strong>. Compare prices with external market rates if possible.</p>
    `
  },
  {
    id: 'a2',
    slug: 'understanding-nysc-bye-laws',
    title: 'Decoding the NYSC Bye-Laws (2024 Edition)',
    category: 'Penalties',
    readTime: '12 min',
    riskLevel: 'High',
    views: 8432,
    lastVerifiedDate: new Date('2024-01-05'),
    source: 'NYSC Official Handbook',
    excerpt: 'Know your rights and the rules that can lead to a service extension. This is mandatory reading for every corper.',
    body: `<h2 id="conduct">Code of Conduct</h2><p>The NYSC Bye-Laws are the legal framework of your service year. Ignorance of these rules is not an excuse at the Zonal office.</p><h3>Key Offenses</h3><ul><li><strong>Unauthorized Travel:</strong> Leaving your state without a signed exit permit from the State Coordinator. Penalty: Extension of service (usually 2-4 weeks).</li><li><strong>Ghosting:</strong> Not reporting to PPA but collecting allowance. Penalty: Complete cancellation of service year and prosecution.</li></ul>`
  },
  {
    id: 'a3',
    slug: 'corpers-rights-and-allowances',
    title: 'Your Statutory Rights and Allowances as a Corp Member',
    category: 'General',
    readTime: '9 min',
    riskLevel: 'Low',
    views: 6420,
    lastVerifiedDate: new Date('2024-08-01'),
    source: 'NYSC Act & 2024 Minimum Wage Directives',
    excerpt: 'A comprehensive guide to your financial entitlements (including the ₦77k allowance), healthcare coverage, and legal protections.',
    body: `
      <p>The NYSC Act and its accompanying Bye-Laws establish a framework of financial entitlements and legal protections.</p>
      <h2 id="allawee">Federal and State Allowances (Allawee)</h2>
      <ul>
        <li><strong>Federal Monthly Allowance:</strong> <strong>₦77,000</strong> following the 2024 approval.</li>
        <li><strong>Payment Schedule:</strong> Typically disbursed between the 25th and 30th.</li>
      </ul>
    `
  },
  {
    id: 'a4',
    slug: 'top-10-mistakes-corps-members-make',
    title: 'Top 10 Mistakes Corps Members Make During Service',
    category: 'Penalties',
    readTime: '10 min',
    riskLevel: 'High',
    views: 456,
    lastVerifiedDate: new Date('2024-06-25'),
    source: 'NYSC Official Handbook & Directives',
    excerpt: 'A critical guide on the 10 most common errors that lead to service extensions, penalties, or disqualification.',
    body: `
      <h2 id="fake-credentials">1. Presentation of Fake Credentials</h2>
      <p>Forging documents leads to expulsion and prosecution.</p>
      <h2 id="age-falsification">2. Falsification of Age</h2>
      <p>NYSC uses WAEC PIN and NIMC linkage to detect fraudulent changes.</p>
    `
  },
  {
    id: 'a15',
    slug: 'rules-for-choosing-personal-cds-project',
    title: 'Rules for Choosing a Personal CDS project',
    category: 'CDS',
    readTime: '8 min',
    riskLevel: 'Medium',
    views: 1240,
    lastVerifiedDate: new Date('2024-08-15'),
    source: 'NYSC Official Bye-Laws & CDS Handbook',
    excerpt: 'Essential guidelines for selecting and executing a personal Community Development Service project that earns official recognition and awards.',
    body: `
      <p>Choosing a <strong>Personal Community Development Service (CDS) project</strong>—also known as an individual or year-round project—is an optional but highly encouraged way for corps members to leave a lasting legacy in their host communities. To ensure a project is officially recognized and eligible for potential awards, you must follow a strict set of rules and administrative protocols.</p>

      <h2 id="felt-need">1. Core Principle: The "Felt-Need" Requirement</h2>
      <p>The most fundamental rule is that a project must be based on the <strong>"felt needs"</strong> of the community rather than the personal preferences of the corps member.</p>
      <ul>
        <li><strong>Needs Assessment:</strong> You are required to identify projects by <strong>observing community challenges</strong>, such as a lack of potable water, medical facilities, or classroom blocks.</li>
        <li><strong>Stakeholder Engagement:</strong> Selection involves a process called <strong>"Community Entry,"</strong> where you must engage traditional, religious, youth, and opinion leaders to jointly identify what the community actually requires.</li>
        <li><strong>Impact:</strong> The project must be designed to improve the socio-economic, health, or educational conditions of the inhabitants.</li>
      </ul>

      <h2 id="smart-test">2. The SMART Test of Selection</h2>
      <p>All proposed projects must pass the <strong>SMART test</strong> of project management to be considered feasible. Under this rule, a project must be:</p>
      <ul>
        <li><strong>Specific:</strong> Clearly defined in its scope.</li>
        <li><strong>Measurable:</strong> Having a visible, quantifiable outcome when completed.</li>
        <li><strong>Achievable:</strong> Possible to execute within the available circumstances.</li>
        <li><strong>Rewarding:</strong> Providing clear benefits to the host community.</li>
        <li><strong>Time-bound:</strong> Capable of being <strong>completed and commissioned within the 11-month service year</strong>.</li>
      </ul>

      <h2 id="admin-approval">3. Mandatory Administrative Approval</h2>
      <p>You cannot start a project without official authorization from the NYSC hierarchy.</p>
      <ul>
        <li><strong>Written Proposal:</strong> A formal proposal stating the project's relevance, location, accessibility, and long-term sustainability must be written.</li>
        <li><strong>Channel of Submission:</strong> This proposal must be addressed to the <strong>NYSC State Coordinator</strong> and submitted through your <strong>Local Government Inspector (LGI) and Zonal Inspector (ZI)</strong>.</li>
        <li><strong>Land Disputes:</strong> Projects must be located in non-disputed areas and remain accessible to all community members.</li>
      </ul>

      <h2 id="financial-rules">4. Financial Prohibitions and Resource Mobilization</h2>
      <p>A critical and often misunderstood rule is that <strong>on no account should a corps member use their personal money</strong> to fund a CDS project.</p>
      <ul>
        <li><strong>Violation of Viability:</strong> Using your own funds is considered to nullify the viability of the project.</li>
        <li><strong>Role as Facilitator:</strong> Your role is to act as a <strong>facilitator</strong> by soliciting funds and materials from corporate organizations, philanthropists, government agencies, or political office holders.</li>
        <li><strong>Accountability:</strong> You must maintain a comprehensive analysis of income and expenditure with all receipts attached for transparency.</li>
      </ul>

      <h2 id="execution-reporting">5. Execution and Reporting Rules</h2>
      <p>Once approved, the execution phase is subject to ongoing monitoring.</p>
      <ul>
        <li><strong>Bimonthly Reports:</strong> You are expected to submit <strong>progress reports featuring documentary and pictorial evidence</strong> every two months until completion.</li>
        <li><strong>Final Documentation:</strong> Upon completion, a <strong>Completion Report</strong> must be submitted to the State Secretariat.</li>
        <li><strong>Commissioning:</strong> The project must be officially commissioned by an NYSC management official, such as the State Coordinator or LGI, before your passing out.</li>
      </ul>
    `
  },
  {
    id: 'a16',
    slug: 'nysc-orientation-packing-list',
    title: 'The Non-Negotiable Packing List for a Stress-Free 21 Days Orientation',
    category: 'Camp Life',
    readTime: '12 min',
    riskLevel: 'High',
    views: 4520,
    lastVerifiedDate: new Date('2024-08-20'),
    source: 'NYSC Official Handbook & Orientation Protocols',
    excerpt: 'A definitive guide to the mandatory documents, kit items, and welfare essentials you must bring for a successful 21-day camp experience.',
    body: `
      <p>For a stress-free experience during the 21-day National Youth Service Corps (NYSC) orientation course, your packing list must prioritize administrative compliance, personal welfare, and safety protocols. Failing to bring the correct original documents can lead to a refusal of entry or the cancellation of your registration.</p>

      <h2 id="mandatory-docs">1. The "Entry Pass" (Mandatory Documentation)</h2>
      <p>The most critical items on your list are the documents required for registration. These must be <strong>originals and not laminated</strong>, as laminated copies will be rejected.</p>
      <ul>
        <li><strong>Call-up Letter:</strong> Must be printed in color from your dashboard.</li>
        <li><strong>Green Card:</strong> The online print-out slip after registration, also in color.</li>
        <li><strong>Statement of Results:</strong> Original degree or HND result plus at least <strong>four photocopies</strong>.</li>
        <li><strong>Final Year ID Card:</strong> Original plus two photocopies.</li>
        <li><strong>Medical Certificate of Fitness:</strong> Must be from a <strong>Government or Military hospital</strong>, stamped, signed, and recent.</li>
        <li><strong>Passport Photographs:</strong> Bring <strong>8 copies</strong> of your most recent photograph with a <strong>white background</strong>.</li>
      </ul>
      <h2 id="clothing-essentials">2. Clothing and Uniform Essentials</h2>
      <p>While the NYSC provides some kit items, you should pack these specific items to ensure you are always properly kitted according to camp regulations.</p>
      <ul>
        <li><strong>White Sportswear:</strong> White round-neck T-shirts and white shorts are the mandatory daily uniform.</li>
        <li><strong>White Canvas and Socks:</strong> Essential for parades and physical training.</li>
        <li><strong>Waist Pouch:</strong> Highly recommended for keeping your phone, ID card, and cash secure while on the parade ground.</li>
      </ul>
      <div class="callout warning-box">
        <p><strong>Strict Prohibitions:</strong> Do not pack items intended to <strong>alter the uniform</strong>, such as tools to create "slim-fit" styles, crop tops, or skirts for drills, as these are prohibited and can lead to being de-kitted.</p>
      </div>
    `
  },
  {
    id: 'a17',
    slug: 'error-free-portal-registration-guide',
    title: 'Error-free Guide to the NYSC Portal Registration Flow',
    category: 'Mobilization',
    readTime: '10 min',
    riskLevel: 'High',
    views: 3120,
    lastVerifiedDate: new Date('2024-08-25'),
    source: 'NYSC Integrated System Portal & Official Guidelines',
    excerpt: 'A step-by-step masterclass on navigating the NYSC online portal, from Senate list verification to printing your Green Card without errors.',
    body: `
      <p>To ensure an <strong>error-free registration</strong> on the National Youth Service Corps (NYSC) portal, prospective corps members (PCMs) must follow a structured flow that begins with institutional verification and ends with the printing of official deployment documents.</p>

      <h2 id="pre-registration">Phase 1: Pre-Registration Verification</h2>
      <ul>
        <li><strong>Institutional Clearance:</strong> You must complete your final clearance at your university or polytechnic before mobilization begins.</li>
        <li><strong>JAMB Matriculation List:</strong> You must verify that your name is on the <strong>JAMB Matriculation List</strong>; failure to appear on this list will make you ineligible to register.</li>
        <li><strong>Senate List Verification:</strong> Visit the official portal and use the <strong>"Check Senate List"</strong> function to confirm your details are present.</li>
      </ul>
      <h2 id="biometrics">Phase 4: Biometrics and Sanity Checks</h2>
      <ul>
        <li><strong>Biometric Capturing:</strong> You must physically visit an <strong>NYSC-accredited Cyber Café</strong> to perform biometric (fingerprint) capturing.</li>
        <li><strong>No Proxy Registration:</strong> Registration by proxy is <strong>strictly prohibited</strong>, as every participant must undergo digital biometric screening.</li>
      </ul>
    `
  },
  {
    id: 'a18',
    slug: 'nigerian-states-additional-allowances',
    title: 'Nigerian States that provide Additional Monthly Allowances to Corps Members',
    category: 'Finance',
    readTime: '7 min',
    riskLevel: 'Low',
    views: 5410,
    lastVerifiedDate: new Date('2024-08-30'),
    source: 'State Government Gazettes & NYSC Secretariat Reports',
    excerpt: 'A breakdown of Nigerian states that provide regular monthly stipends, specialized medical bonuses, and one-time palliatives to corps members.',
    body: `
      <p>Based on the sources, several Nigerian states provide additional monthly allowances or one-time palliatives to supplement the federal stipend, though the consistency and amounts vary by state and sector of service.</p>

      <h2 id="regular-allowances">States Providing Regular Monthly Allowances</h2>
      <ul>
        <li><strong>Akwa Ibom State:</strong> The state government ensures the <strong>prompt payment of a ₦5,000 monthly state allowance</strong> to corps members.</li>
        <li><strong>Bayelsa State:</strong> Members receive a <strong>continuous monthly stipend and dislodgement allowance of ₦5,000</strong> from the state government.</li>
        <li><strong>Sokoto State:</strong> The government sustains the payment of state allowances specifically for corps members <strong>serving in State Government institutions and establishments</strong>.</li>
        <li><strong>Nasarawa State:</strong> Following pressure from the NYSC Secretariat, the state government has <strong>returned to paying monthly allowances</strong> to members.</li>
      </ul>

      <h2 id="specialized-payments">Specialized or One-Time Payments</h2>
      <ul>
        <li><strong>Benue State:</strong> Due to advocacy from the Secretariat, the state approved a specialized <strong>₦100,000 monthly allowance specifically for Corps Doctors</strong>.</li>
        <li><strong>Borno State:</strong> The governor recently donated over ₦36 million to provide <strong>₦30,000 to each corps member</strong> as a one-time palliative to cushion the effects of fuel subsidy removal.</li>
      </ul>

      <h2 id="challenges">States with Payment Challenges or Pending Discussions</h2>
      <ul>
        <li><strong>Rivers State:</strong> The NYSC is currently in advanced discussions with the state government to <strong>ensure the regular payment of monthly allowances</strong>.</li>
        <li><strong>Kwara State:</strong> The sources list <strong>"unpaid State allowances"</strong> as a current challenge facing members in this state.</li>
        <li><strong>Ondo State:</strong> The state has struggled with the <strong>inability to pay allowances</strong> to members serving in public schools, with arrears dating back to 2011.</li>
      </ul>
    `
  },
  {
    id: 'a5',
    slug: 'nysc-medical-report-guide',
    title: 'The Comprehensive Guide to NYSC Medical Reports',
    category: 'Mobilization',
    readTime: '9 min',
    riskLevel: 'High',
    views: 4210,
    lastVerifiedDate: new Date('2024-05-15'),
    source: 'NYSC Medical Directives 2024',
    excerpt: 'Avoid rejection at the camp gate. Learn which hospitals are recognized, what tests are mandatory, and how to verify your report.',
    body: `<h2>Recognized Institutions</h2><p>Only reports from Government-owned hospitals (Federal, State, or General) and Military/Police hospitals are valid. Private hospital reports are strictly rejected.</p><h2>Mandatory Tests</h2><ul><li>Genotype and Blood Group</li><li>Chest X-ray</li><li>Urinalysis</li><li>HIV/Hepatitis Status</li></ul>`
  },
  {
    id: 'a6',
    slug: 'ppa-rejection-survival-kit',
    title: 'Surviving a PPA Rejection: Step-by-Step',
    category: 'PPA',
    readTime: '7 min',
    riskLevel: 'Medium',
    views: 3105,
    lastVerifiedDate: new Date('2024-06-01'),
    source: 'NYSC Field Inspectorate Manual',
    excerpt: 'Don’t panic if your employer rejects your posting. Follow these steps to get a new placement without service delay.',
    body: `<h2 id="reporting">The 48-Hour Rule</h2><p>If you are rejected, you must report back to your Zonal Inspector (ZI) or Local Government Inspector (LGI) within 48 hours with your original rejection letter.</p>`
  },
  {
    id: 'a7',
    slug: 'biometric-clearance-faq',
    title: 'Biometric Monthly Clearance: Everything You Need to Know',
    category: 'Clearance',
    readTime: '11 min',
    riskLevel: 'High',
    views: 7890,
    lastVerifiedDate: new Date('2024-07-10'),
    source: 'NYSC ICT Department Guidelines',
    excerpt: 'The most important process of every month. Learn how to troubleshoot finger-print failures and what to do if you miss your slot.',
    body: `<h2>The Clearance Window</h2><p>Biometric clearance typically opens between the 1st and 10th of every month. Ensure your LGI has marked you present at the CDS meeting before attempting biometrics.</p>`
  },
  {
    id: 'a8',
    slug: 'redeployment-marital-grounds',
    title: 'How to Apply for Relocation on Marital Grounds',
    category: 'Redeployment',
    readTime: '13 min',
    riskLevel: 'Medium',
    views: 2340,
    lastVerifiedDate: new Date('2024-04-12'),
    source: 'NYSC Bye-Laws Section 4',
    excerpt: 'A specialized guide for female corps members seeking to join their husbands in a different state.',
    body: `<h2>Required Documents</h2><ul><li>Marriage Certificate (Court or Church/Mosque with Registry stamp)</li><li>Newspaper Change of Name Publication</li><li>Husband's Utility Bill (Proof of Residence)</li><li>Letter from Husband's Employer</li></ul>`
  },
  {
    id: 'a9',
    slug: 'saed-skills-worth-learning',
    title: 'Top 5 SAED Skills that actually make money in 2024',
    category: 'General',
    readTime: '8 min',
    riskLevel: 'Low',
    views: 5620,
    lastVerifiedDate: new Date('2024-03-20'),
    source: 'NYSC SAED Department Report',
    excerpt: 'Don’t just attend the lectures. Choose a skill that has high market demand in the Nigerian freelance economy.',
    body: `<h2>In-Demand Skills</h2><ol><li>Digital Marketing & Content Creation</li><li>Agro-Allied Ventures (Snail/Poultry)</li><li>Solar Panel Installation</li><li>Fashion & Textile Design</li><li>Graphic Design & UI/UX</li></ol>`
  },
  {
    id: 'a10',
    slug: 'how-to-save-allawee',
    title: 'The Smart Corper’s Guide to Saving your Allowance',
    category: 'General',
    readTime: '6 min',
    riskLevel: 'Low',
    views: 9100,
    lastVerifiedDate: new Date('2024-02-15'),
    source: 'Financial Literacy for Youth Directives',
    excerpt: 'Learn how to survive on the ₦77k allowance while building a small capital for post-NYSC life.',
    body: `<h2>The 50/30/20 Rule for Corpers</h2><p>50% for feeding/rent, 30% for miscellaneous/transport, and 20% for your post-service savings account.</p>`
  },
  {
    id: 'a11',
    slug: 'nysc-uniform-dos-and-donts',
    title: 'Uniform Protocols: Avoiding unnecessary "Double Drills"',
    category: 'Camp Life',
    readTime: '5 min',
    riskLevel: 'Medium',
    views: 4530,
    lastVerifiedDate: new Date('2024-08-05'),
    source: 'NYSC Discipline & Drills Manual',
    excerpt: 'A guide to proper kitting. Learn why "slim-fitting" your khakis can get you into trouble with camp soldiers.',
    body: `<h2 id="khaki">Proper Khaki Dressing</h2><p>The khaki jacket must be tucked in during official ceremonies. The crest must be centered above the left breast pocket.</p>`
  },
  {
    id: 'a12',
    slug: 'passing-out-process-checklist',
    title: 'The Ultimate Passing Out Process (POP) Checklist',
    category: 'Clearance',
    readTime: '15 min',
    riskLevel: 'High',
    views: 12450,
    lastVerifiedDate: new Date('2024-01-20'),
    source: 'NYSC Official Exit Guidelines',
    excerpt: 'Everything you need to do in your 11th month to ensure you get your discharge certificate on the final day.',
    body: `<h2>Final Clearance Steps</h2><p>Ensure your PPA boss has signed your final clearance letter and your CDS card is fully signed for all 11 months.</p>`
  }
];

export const MOCK_DEADLINES: Deadline[] = [
  { id: 'd1', title: 'Monthly Bio-metrics Clearance', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), urgency: 'Critical', stage: 'PPA' },
  { id: 'd2', title: 'Submit CDS Report', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), urgency: 'Medium', stage: 'CDS' },
];

export const MOCK_STATE_GUIDES: StateGuide[] = [
  {
    id: 'sg1',
    slug: 'lagos',
    stateName: 'Lagos',
    flagEmoji: '🇳🇬',
    campLocation: {
      name: 'Iyana Ipaja Orientation Camp',
      address: 'Lagos-Abeokuta Expressway, Iyana Ipaja, Lagos.',
      facilities: [
        { label: 'Accommodation', info: 'Bunk beds in large halls, often crowded but generally well-lit.' },
        { label: 'Bathroom', info: 'Communal toilet/bath blocks.' }
      ],
      survivalTips: [
        'Bring a strong power bank; charging at Maami costs ₦100 per session.',
        'Use mosquito nets.'
      ]
    },
    livingCosts: {
      monthlyRange: '₦60,000 - ₦150,000',
      popularAreas: [
        { name: 'Yaba', distance: '15km to Lagos Island', pros: 'Tech hub, very central.' }
      ],
      accommodation: [{ type: 'Self-contain', price: '₦350k - ₦800k/yr' }],
      transport: [{ mode: 'BRT Bus', avgPrice: '₦300 - ₦800 / trip' }]
    },
    ppaLandscape: {
      orgTypes: [{ type: 'Schools', percentage: 45 }],
      avgSalary: '₦77,000 (Federal) + ₦10k - ₦50k (PPA Allowance)',
      extraAllowances: 'Lagos State pays ₦10k - ₦15k to those in state ministries.',
      topSectors: ['Education', 'Tech', 'Finance'],
      commonLocations: [{ name: 'Ikeja', description: 'Secretariat hub.' }],
      bestSectors: [{ name: 'Fintech', reason: 'High allowance.', difficulty: 'Hard' }]
    },
    safetyCulture: {
      rating: 'Moderate',
      areasToAvoid: ['Oshodi at night'],
      customs: ['"Eko o ni baje" is the spirit.'],
      localPhrases: [{ phrase: 'Owa!', meaning: 'I am here / Stop here.' }],
      emergencyContacts: [{ label: 'Lagos Emergency', phone: '767' }]
    },
    opportunities: {
      sideHustles: [{ title: 'Tutoring', income: '₦20k - ₦60k / mo' }],
      skills: ['Digital Marketing', 'Data'],
      networking: ['Tech Cabal Meetups']
    }
  }
];

export const MOCK_CDS_PROJECTS: CDSProject[] = [
  {
    id: 'cp1',
    title: 'Renovate Local Primary School Library',
    category: 'Education',
    budget: '₦150,000 - ₦200,000',
    duration: '2-3 months',
    difficulty: 'Medium',
    description: 'Repair shelves, paint walls, and source book donations for a dilapidated school library.',
    fullDescription: 'Full renovation of Alimosho Primary Library.',
    beneficiaries: '300+ students',
    beneficiaryDetails: {
      who: 'Students and teaching staff',
      impact: 'Improved access to reading materials.',
      reached: '300 students'
    },
    requirements: ['Head Teacher permission', 'LGI Approval'],
    budgetTable: [{ item: 'Painting', quantity: '5 Buckets', cost: '₦6,000', total: '₦30,000' }],
    timeline: [{ week: 'Month 1', milestone: 'Needs assessment' }],
    approvalTips: ['Take "Before" photos.'],
    successMetrics: ['Library usage statistics']
  }
];

export const MOCK_DOCS: NYSCDocument[] = [
  { 
    id: 'd1', 
    userId: 'u1',
    documentType: 'call_up_letter',
    fileName: 'CallUpLetter_LA_24A.pdf',
    fileUrl: '#',
    fileSize: 1200000,
    mimeType: 'application/pdf',
    uploadDate: new Date('2024-02-15'), 
    category: 'Essential',
    tags: ['important', 'registration'],
    isVerified: true
  },
  { 
    id: 'd2', 
    userId: 'u1',
    documentType: 'camp_discharge',
    fileName: 'Camp_Discharge_Cert.jpg',
    fileUrl: '#',
    fileSize: 850000,
    mimeType: 'image/jpeg',
    uploadDate: new Date('2024-03-01'), 
    category: 'Clearance',
    tags: ['camp', 'clearance'],
    isVerified: true
  }
];

export const MOCK_PPA_DATABASE: PPAOrg[] = [
  {
    id: 'p1',
    name: 'Mainstream Financials',
    state: 'Lagos',
    sector: 'Finance',
    allowance: '₦40,000',
    accommodation: 'No',
    rating: 4.5,
    reviewsCount: 12,
    tags: ['Lekki', 'Free Lunch', 'High Impact'],
    isVerified: true
  }
];

export const MOCK_CAREER_JOBS: CareerJob[] = [
  {
    id: 'j1',
    title: 'Junior Software Engineer',
    company: 'FinTech Hub',
    location: 'Remote / Lagos',
    type: 'Full-time',
    isExCorperFriendly: true,
    salary: '₦250k - ₦400k',
    postedDate: new Date()
  }
];

export const MOCK_DOWNLOADS: DownloadableResource[] = [
  {
    id: 'dr1',
    title: 'NYSC Official Bye-Laws (2024 Revised)',
    description: 'The definitive guide to your rights and responsibilities during service. Includes updated penalty codes.',
    fileSize: '1.2 MB',
    category: 'Official',
    isPremium: false,
    downloadCount: 4500
  },
  {
    id: 'dr2',
    title: 'CDS Project Financial Ledger Template',
    description: 'Professional Excel sheet to track donations and expenses for your community project.',
    fileSize: '450 KB',
    category: 'Templates',
    isPremium: true,
    downloadCount: 890
  }
];

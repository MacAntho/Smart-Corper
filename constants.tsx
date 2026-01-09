
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
      'Do not forge signatures on your CDS attendance card.',
      'Do not skip weekly CDS meetings without official leave.'
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
    title: 'Decoding the NYSC Bye-Laws (2023 Edition)',
    category: 'Penalties',
    readTime: '12 min',
    riskLevel: 'High',
    views: 8432,
    lastVerifiedDate: new Date('2023-11-15'),
    source: 'NYSC Official Handbook & Section 16(2) NYSC Act',
    excerpt: 'The primary operational guidelines for NYSC. Learn about the Code of Conduct, prohibited alterations, and specific penalties for misconduct.',
    body: `
      <p>The <strong>NYSC Bye-Laws</strong> function as the primary operational guidelines for the National Youth Service Corps, derived from the authority granted to the Directorate under <strong>Section 16(2) of the NYSC Act</strong>. While the NYSC Act is the broad enabling legislation, the Bye-Laws provide the specific <strong>Code of Conduct</strong> and administrative rules that govern the daily life of a corps member.</p>

      <h2 id="legal-standing">1. Legal Standing and Administration</h2>
      <p>The Bye-Laws are issued to every corps member upon enrollment to ensure proper administration of the scheme. These laws are not static; proposed <strong>amendments to the 1993 NYSC Bye-Laws</strong> are currently undergoing a review process that requires necessary action from the Presidency. To ensure compliance, the scheme organizes <strong>mandatory lectures</strong> on both the Act and the Bye-Laws during the 21-day orientation course.</p>

      <h2 id="core-components">2. Core Components of the Bye-Laws</h2>
      <p>The Bye-Laws decode the expectations of the scheme across several critical areas:</p>
      <ul>
        <li><strong>Ethos and Identity:</strong> They establish the <strong>NYSC Motto ("Service and Humility")</strong>, the National Pledge, and regulations regarding the use of <strong>Identity Cards</strong>.</li>
        <li><strong>Conduct and Mobility:</strong> The laws strictly prohibit <strong>unauthorized journeys</strong> outside the state of deployment and outline the procedures for a formal <strong>Leave of Absence</strong>.</li>
        <li><strong>Welfare and Life Events:</strong> They provide framework for <strong>medical provisions</strong> and specific protocols for <strong>Maternity Leave</strong> during the service year.</li>
        <li><strong>Administrative Communication:</strong> They dictate the <strong>official channels of communication</strong> through which a member must engage the hierarchy, such as through Local Government Inspectors (LGI).</li>
      </ul>

      <h2 id="discipline-penalties">3. Discipline and Penalties</h2>
      <p>The Bye-Laws are the primary tool for maintaining order, with specific penalties enumerated in clauses such as <strong>3(2) and 10(2j)</strong>.</p>
      <ul>
        <li><strong>Absenteeism:</strong> Frequent missing of <strong>Community Development Service (CDS) meetings</strong> or failing to attend the <strong>monthly clearance</strong> can lead to sanctions, including the withholding of allowances or a formal <strong>extension of service</strong>.</li>
        <li><strong>Serious Misconduct:</strong> Engaging in <strong>political activities</strong> is strictly prohibited and can lead to expulsion.</li>
        <li><strong>Abscondment:</strong> Members who leave their station without permission are declared <strong>deserters</strong>, which may result in the denial of their Certificate of National Service.</li>
      </ul>

      <h2 id="dress-code">4. Strict Dress Code Regulations</h2>
      <p>A significant portion of the Bye-Laws is dedicated to the <strong>NYSC Dress Code</strong>, which is maintained to promote decency and national unity regardless of ethnic or religious background.</p>
      <ul>
        <li><strong>Prohibited Alterations:</strong> Corps members are forbidden from <strong>"slim-fitting" khaki trousers</strong>, creating crop tops, or wearing three-quarter shorts.</li>
        <li><strong>Religious Considerations:</strong> While the <strong>hijab</strong> is permitted for Muslim female members, it must be worn in a manner that does not deface the official uniform. The use of <strong>skirts or gowns</strong> during drills is strictly prohibited.</li>
        <li><strong>Sanctions:</strong> Defacing or abusing the uniform is considered an affront to constituted authority and can lead to a member being <strong>de-kitted and decamped</strong>, as was the case for members in Ebonyi State in 2019.</li>
      </ul>
    `
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
    excerpt: 'A complete breakdown of your ₦77,000 allowance, NHIA healthcare coverage, housing rights at your PPA, and the legal protections afforded by the NYSC Act.',
    body: `
      <p>The National Youth Service Corps (NYSC) Act and its accompanying Bye-Laws establish a comprehensive framework of financial entitlements and legal protections designed to support corps members during their mandatory service year.</p>

      <h2 id="allawee">Federal and State Allowances (Allawee)</h2>
      <ul>
        <li><strong>Federal Monthly Allowance:</strong> Following the 2024 national minimum wage increase, the Federal Government approved a monthly stipend of <strong>₦77,000</strong> for all serving corps members. This is a significant increase from previous rates of ₦33,000 and ₦19,800.</li>
        <li><strong>Payment Schedule:</strong> Allowances are typically disbursed between the <strong>25th and 30th of every month</strong>, provided the member has successfully completed the mandatory <strong>monthly biometric and physical clearance</strong>.</li>
        <li><strong>Non-Regular Allowances:</strong> During the three-week orientation course, members are entitled to "Non-Regular Allowances," which include <strong>transport and bicycle allowances</strong>, as well as a feeding stipend—specifically cited as <strong>₦3,000</strong> in some contexts to assist in reaching the Place of Primary Assignment (PPA).</li>
        <li><strong>State and Local Stipends:</strong> State governments are statutorily required to provide a minimum annual subvention of <strong>₦500,000</strong> to their respective NYSC Governing Boards to cater to member welfare. Specific states provide additional monthly stipends, such as <strong>Akwa Ibom and Bayelsa</strong>, which both offer <strong>₦5,000</strong> monthly.</li>
      </ul>

      <h2 id="health-safety">Statutory Rights to Health and Safety</h2>
      <ul>
        <li><strong>Healthcare Coverage:</strong> All corps members are enrolled in the <strong>National Health Insurance Authority (NHIA)</strong> through the Group Individual Family Social Health Insurance Programme (GIFSHIP-N). This entitles members to <strong>free medical care</strong> at approved hospitals throughout the service year.</li>
        <li><strong>Medical Refunds:</strong> The Scheme maintains a policy of <strong>reimbursing properly certified medical bills</strong> incurred by members during their service.</li>
        <li><strong>Security Protections:</strong> Ensuring the <strong>security of lives and property</strong> is a statutory responsibility shared by the Federal, State, and Local governments. Members have access to a <strong>24-hour Distress Call Centre</strong> to report safety concerns.</li>
        <li><strong>Insurance Benefits:</strong> The NYSC provides life insurance; incapacitated ex-corps members have received benefits up to <strong>₦1,000,000</strong>, and the families of deceased members are entitled to death benefits processed by the scheme's underwriters.</li>
      </ul>

      <h2 id="ppa-rights">Rights in the Workplace (PPA)</h2>
      <ul>
        <li><strong>Employer Obligations:</strong> Under <strong>Section 13(2) of the NYSC Act</strong>, employers are required to provide <strong>habitable accommodation</strong> or pay a minimum of <strong>₦250 per month in lieu</strong>. They must also provide transport or a minimum of <strong>₦150 per month</strong> where transport is not available.</li>
        <li><strong>Harassment-Free Environment:</strong> Every corps member has a statutory right to work in a <strong>respectful and harassment-free environment</strong>. The NYSC maintains a strict "zero tolerance" policy for sexual harassment, and members have the right to choose between formal or informal dispute resolution mechanisms.</li>
        <li><strong>Professional Protection:</strong> Members are covered under the <strong>Public Officers Protection Act</strong> for the duration of their service year.</li>
      </ul>

      <h2 id="legal-admin">Legal and Administrative Rights</h2>
      <ul>
        <li><strong>Legal Aid:</strong> Through the <strong>Corps Legal Aid Scheme (CLAS)</strong>, corps lawyers provide free legal services to indigent members of society and can assist fellow members in understanding their own <strong>civic rights and responsibilities</strong>.</li>
        <li><strong>Leave and Vacation:</strong> Members are entitled to <strong>three weeks of terminal leave</strong> before their final passing-out ceremony.</li>
        <li><strong>Right of Appeal:</strong> Any member aggrieved by a decision made by the NYSC Directorate has the <strong>right to appeal to the Presidency</strong>.</li>
      </ul>
    `
  },
  {
    id: 'a4',
    slug: '10-mistakes-corps-members-make',
    title: '10 Mistakes Corps Members Make During Service',
    category: 'Penalties',
    readTime: '10 min',
    riskLevel: 'High',
    views: 12456,
    lastVerifiedDate: new Date('2024-08-28'),
    source: 'NYSC Official Handbook & Field Inspectorate Manual',
    excerpt: 'Critical guide on the 10 most common errors that lead to service extensions, penalties, or disqualification based on official sources.',
    body: `
      <p>Based on the sources provided, here are the top 10 most critical mistakes corps members make that lead to penalties, extensions, or disqualification, along with how to avoid them.</p>

      <h2 id="fake-credentials">1. Presentation of Fake Credentials or Certificates</h2>
      <p><strong>Why it happens:</strong> Unqualified persons, or those from unaccredited institutions, attempt to enlist in the service to gain the benefits of the certificate.</p>
      <p><strong>How to avoid it:</strong> Ensure your degree is from an accredited Corps Producing Institution (CPI) and present only original documents during camp registration. Forging documents is a criminal offense that leads to expulsion and possible prosecution under the NYSC Act.</p>

      <h2 id="age-falsification">2. Falsification of Age</h2>
      <p><strong>Why it happens:</strong> Graduates over the age of 30 often manipulate their Date of Birth (DOB) on the portal to remain eligible for mobilization rather than receiving an Exemption Certificate.</p>
      <p><strong>How to avoid it:</strong> Be honest during registration. The NYSC uses a WAEC PIN system and links with the National Identity Management Commission (NIMC) to detect fraudulent changes in birth dates.</p>

      <h2 id="absconding">3. Absconding from Service</h2>
      <p><strong>Why it happens:</strong> Frustration from being rejected by a Place of Primary Assignment (PPA) or a personal lack of commitment leads some members to leave their state of deployment without permission.</p>
      <p><strong>How to avoid it:</strong> If a PPA rejects you, report immediately to your Local Government Inspector (LGI) for reposting. Leaving without authorization will result in being declared a deserter, which carries severe disciplinary actions and the denial of a discharge certificate.</p>

      <h2 id="unauthorized-travel">4. Unauthorized Inter-State Travel</h2>
      <p><strong>Why it happens:</strong> Members often travel for social events or family visits without following the official protocol for leaving their duty station.</p>
      <p><strong>How to avoid it:</strong> You must obtain a formal travel permit from your LGI before crossing state lines. Traveling without permission can lead to an extension of service as a penalty.</p>

      <h2 id="dress-code">5. Violation of the Official Dress Code</h2>
      <p><strong>Why it happens:</strong> Members often "slim-fit" or "shape" their khaki trousers, or substitute skirts for trousers based on religious or fashion preferences.</p>
      <p><strong>How to avoid it:</strong> Adhere strictly to the officially sanctioned kit. Altering the uniform is considered an affront to constituted authority and can lead to being de-kitted and decamped from the orientation exercise.</p>

      <h2 id="absenteeism">6. Chronic Absenteeism from CDS Meetings</h2>
      <p><strong>Why it happens:</strong> Some members prioritize private business or side hustles over their weekly Community Development Service (CDS) obligations.</p>
      <p><strong>How to avoid it:</strong> Dedicate the required one day a week (Thursdays or Fridays) to your group CDS. Missing two consecutive weeks without a valid excuse will prevent you from being cleared for your monthly allowance.</p>

      <h2 id="biometric-clearance">7. Failure to Perform Monthly Biometric Clearance</h2>
      <p><strong>Why it happens:</strong> Negligence or traveling outside the Local Government Area during the scheduled clearance period.</p>
      <p><strong>How to avoid it:</strong> Participate in the mandatory monthly biometric and physical clearance at your LGA office. Failure to do so results in your monthly allowance being withheld for that period.</p>

      <h2 id="politics">8. Involvement in Local or National Politics</h2>
      <p><strong>Why it happens:</strong> Members may be tempted by local political figures in their host communities to participate in partisan activities.</p>
      <p><strong>How to avoid it:</strong> Maintain strict neutrality as a corps member. Engaging in political activities is strictly prohibited and can lead to immediate expulsion from the scheme.</p>

      <h2 id="academic-defense">9. Inability to Defend Academic Qualifications</h2>
      <p><strong>Why it happens:</strong> Graduates of poor-quality "miracle centers" or unaccredited foreign schools may be mobilized but cannot communicate effectively in English.</p>
      <p><strong>How to avoid it:</strong> If you are reasonably suspected of possessing a fake certificate, you will be subjected to physical verification and scrutiny. The NYSC has a policy to de-kit and prosecute any member who cannot defend their degree.</p>

      <h2 id="data-discrepancies">10. Discrepancies in Graduation and Personal Data</h2>
      <p><strong>Why it happens:</strong> Institutional errors or deliberate attempts to align graduation dates with mobilization windows.</p>
      <p><strong>How to avoid it:</strong> Carefully cross-check the data on your Call-up Letter against your Statement of Results. If there is a disparity, do not attempt to register with it; contact your institution's Student Affairs Officer (SAO) for correction before reporting to camp.</p>
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
        <li><strong>Wait Pouch:</strong> Highly recommended for keeping your phone, ID card, and cash secure while on the parade ground.</li>
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
    id: 'a10',
    slug: 'how-to-save-allawee',
    title: 'The Smart Corper’s Guide to Saving your Allowance',
    category: 'Finance',
    readTime: '6 min',
    riskLevel: 'Low',
    views: 9100,
    lastVerifiedDate: new Date('2024-02-15'),
    source: 'Financial Literacy for Youth Directives & NYSC Official Manuals',
    excerpt: 'Learn how to view your ₦77,000 monthly allowance as seed capital and master the financial discipline required for life after NYSC.',
    body: `
      <p>To maximize your financial standing during the service year, you must view your <strong>₦77,000 monthly federal allowance</strong> not just as a stipend for living expenses, but as potential <strong>seed capital</strong> for your future.</p>

      <h2 id="financial-discipline">1. Mastering Financial Discipline</h2>
      <ul>
        <li><strong>Rudiments of Management:</strong> Success begins with embracing the <strong>rudiments of financial discipline</strong> and management to actively avoid "recklessness and wastages".</li>
        <li><strong>Developing a Budget:</strong> You are encouraged to <strong>develop a personal budget</strong> to learn how to live strictly within your income.</li>
        <li><strong>Necessity as a Teacher:</strong> Distant postings away from home often force "smart corpers" to adapt to low-budget living, which serves as a practical lesson in <strong>financial management</strong>.</li>
      </ul>

      <h2 id="startup-fund">2. Saving for Your Post-Service Business</h2>
      <ul>
        <li><strong>The Startup Fund:</strong> The NYSC officially encourages you to <strong>save a portion of your monthly stipends</strong> specifically to raise capital for an enterprise after your service year.</li>
        <li><strong>The SAED Connection:</strong> These savings are intended to fund the implementation of vocational skills acquired through the <strong>Skill Acquisition and Entrepreneurship Development (SAED)</strong> programme.</li>
        <li><strong>Foundational Capital:</strong> While the allowance may seem "meager," saving it consistently creates a <strong>financial foundation</strong> that can later be supplemented by soft or interest-free loans from partners like the <strong>Bank of Industry (BOI)</strong> or the <strong>Central Bank of Nigeria (CBN)</strong>.</li>
      </ul>

      <h2 id="supplemental-income">3. Generating Supplemental Income</h2>
      <ul>
        <li><strong>Monetizing Soft Skills:</strong> You can increase your savings potential by <strong>monetizing skills learned during orientation</strong>, such as professional CV writing or digital skills, and offering these services to other corps members.</li>
        <li><strong>Ventures Training:</strong> Participating in <strong>NYSC Ventures</strong> allows you to learn revenue-generating trades without paying training fees, often providing small upkeep stipends that further boost your ability to save.</li>
      </ul>

      <h2 id="protect-savings">4. Protecting Your Savings from CDS Projects</h2>
      <ul>
        <li><strong>Prohibition on Personal Funding:</strong> A critical rule for high-performing corpers is that you are <strong>strictly prohibited from using your personal money</strong> to fund Community Development Service (CDS) projects.</li>
        <li><strong>Resource Mobilization:</strong> Instead of spending your "minor income," you must act as a facilitator to <strong>mobilize funds from community stakeholders</strong> and sponsors.</li>
        <li><strong>Preserving Viability:</strong> Using your own allowance to fund a project is considered a <strong>violation of the project's viability</strong> and should be avoided to protect your personal savings.</li>
      </ul>
    `
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
    source: 'NYSC Official Exit Guidelines & WUP Protocols',
    excerpt: 'Everything you need to do in your 11th month to ensure you get your discharge certificate on the final day.',
    body: `
      <p>The <strong>Winding-Up and Passing-Out (WUP/POP)</strong> exercise is the fourth and final cardinal phase of the NYSC service year. It is designed as a transitional period where corps members reassemble to share experiences, reappraise the service year, and prepare for entry into the labor market.</p>
      
      <h2 id="ppa-clearance">1. PPA Clearance and Release</h2>
      <ul>
        <li><strong>Satisfactory Completion:</strong> You must fulfill your 11 months of professional duties at your Place of Primary Assignment (PPA).</li>
        <li><strong>Final Clearance Letter:</strong> Obtain a formal <strong>final clearance letter</strong> from your employer confirming your productivity and satisfactory conduct.</li>
        <li><strong>Official Release:</strong> Ensure your employer formally releases you to participate in the scheduled winding-up activities.</li>
      </ul>

      <h2 id="cds-clearance">2. CDS Clearance and Evaluation</h2>
      <ul>
        <li><strong>Schedule Officer Approval:</strong> You must be cleared by your <strong>CDS Schedule Officer</strong>, verifying that you met all weekly meeting attendance and project participation requirements.</li>
        <li><strong>Resolution of Sanctions:</strong> Ensure you have no outstanding disciplinary issues. Missing CDS meetings for two consecutive weeks in any month can lead to a missed monthly clearance, which may delay your passing out.</li>
        <li><strong>Performance Reports:</strong> Submit all required evaluation forms, such as <strong>Form 4B (opinion survey)</strong>, which is used by the Planning, Research and Statistics (PRS) department to appraise the service year.</li>
      </ul>

      <h2 id="admin-doc">3. Administrative Documentation</h2>
      <ul>
        <li><strong>LGI Verification:</strong> Submit your PPA and CDS clearances to your <strong>Local Government Inspector (LGI)</strong> for final administrative processing.</li>
        <li><strong>Tracking Abscondment:</strong> The NYSC uses biometric data to track abscondees; ensure all your monthly clearances were successfully captured to avoid being flagged as having absconded.</li>
        <li><strong>Identity Card:</strong> Ensure you have your NYSC ID card; if lost, it must be reported and resolved before final clearance.</li>
      </ul>

      <h2 id="ceremonial">4. Ceremonial Preparation and Dress Code</h2>
      <ul>
        <li><strong>Attendance:</strong> Reassemble at the designated venue (often the state capital) for the closing ceremony and debriefing.</li>
        <li><strong>Dress Code (6/7):</strong> You must be fully kitted in the <strong>official 6/7 uniform</strong>, which includes:
          <ul>
            <li>Khaki trousers and crested vest (tucked in).</li>
            <li>NYSC belt and face cap.</li>
            <li>Zebra-striped socks and jungle boots.</li>
          </ul>
        </li>
        <li><strong>Prohibitions:</strong> You are strictly forbidden from wearing <strong>skin-tight "slim-fit" khakis</strong>, skirts, or non-regulation footwear (slippers or cover shoes) during the parade.</li>
      </ul>

      <h2 id="collection">5. Certificate Collection</h2>
      <ul>
        <li><strong>Personal Collection:</strong> You must collect your Certificate of National Service <strong>in person</strong> at the state secretariat or designated distribution point; collection by <strong>proxy is strictly prohibited</strong>.</li>
        <li><strong>Verification of Details:</strong> Certificates now include your <strong>Date of Birth and Course of Study</strong> to prevent forgery. Verify that these details are correct upon receipt.</li>
        <li><strong>Legal Importance:</strong> Guard this document carefully, as employers are statutorily required to demand it before offering you employment.</li>
      </ul>
    `
  },
  {
    id: 'a5',
    slug: 'nysc-medical-report-guide',
    title: 'The Comprehensive Guide to NYSC Medical Reports',
    category: 'Mobilization',
    readTime: '12 min',
    riskLevel: 'High',
    views: 4210,
    lastVerifiedDate: new Date('2024-06-22'),
    source: 'NYSC Medical Directives & Official Protocol',
    excerpt: 'Essential instruments for fitness determination and concessional deployment. Learn mandatory requirements, authorized issuers, and the legal risks of fraud.',
    body: `
      <p>For every prospective corps member (PCM), medical reports are essential instruments used to determine physical fitness for the 21-day orientation course or to justify <strong>concessional deployment</strong> due to serious health challenges.</p>

      <h2 id="mandatory-cert">1. The Mandatory Medical Certificate of Fitness</h2>
      <p>Every PCM must present a <strong>Medical Certificate of Fitness</strong> as a non-negotiable requirement for registration at the orientation camp.</p>
      <ul>
        <li><strong>Authorized Issuers:</strong> This report must be obtained from a <strong>Government or Military hospital</strong>.</li>
        <li><strong>Verification Standards:</strong> To be valid, the certificate must be <strong>stamped, signed, and recent</strong>.</li>
        <li><strong>Purpose:</strong> This document confirms that the PCM is capable of participating in the regimented physical activities of the camp, such as drills, parades, and sports.</li>
      </ul>

      <h2 id="concessional-reports">2. Medical Reports for Concessional Deployment</h2>
      <p>PCMs with chronic or life-threatening health conditions can apply for <strong>concessional deployment</strong> (also known as relocation on health grounds) to serve in states where they can easily access specialized care.</p>
      <ul>
        <li><strong>True Health Status:</strong> It is mandatory for PCMs to indicate their <strong>true health status</strong> during online registration to facilitate proper planning and minimize undue stress.</li>
        <li><strong>Required Documentation:</strong> Applications must include a <strong>medical report from Federal or State General Hospitals</strong>, University Teaching Hospitals, or Military/Mission hospitals.</li>
        <li><strong>Official Signatories:</strong> The report must be signed by a <strong>Chief Medical Officer, Health Officer, or a Consultant</strong>.</li>
        <li><strong>Prohibitions:</strong> The NYSC <strong>does not honor medical reports from private hospitals or clinics</strong> for the purpose of concessional posting.</li>
      </ul>

      <h2 id="fake-reports">3. Integrity and the Crisis of Fake Reports</h2>
      <p>The NYSC has identified a significant crisis regarding the authenticity of medical documentation.</p>
      <ul>
        <li><strong>The "90% Rule":</strong> Management discovered that <strong>over 90% of medical reports</strong> presented during registration are <strong>fake</strong>.</li>
        <li><strong>Sources of Fraud:</strong> Many fraudulent reports are either produced at <strong>cyber cafés</strong> or emanate from hospitals where unauthorized supporting staff issue them for a fee.</li>
        <li><strong>Legal Consequences:</strong> Forging medical documents is a serious offense that can lead to <strong>expulsion, prosecution, or the denial of a Certificate of National Service</strong>.</li>
        <li><strong>Operational Risk:</strong> Fake reports hinder the scheme’s ability to manage members with genuine health problems, potentially putting those members in harm's way during camp activities.</li>
      </ul>

      <h2 id="healthcare-reimbursements">4. Healthcare and Reimbursements During Service</h2>
      <p>Once deployed, medical reports continue to play a role in a corps member's welfare.</p>
      <ul>
        <li><strong>NHIS Enrollment:</strong> All members are enrolled in the <strong>National Health Insurance Scheme (NHIS)</strong> under the GIFSHIP programme, providing access to free basic medical care throughout the service year.</li>
        <li><strong>Emergency Protocols:</strong> Corps members with complicated illnesses that cannot be managed at camp clinics must be <strong>relocated immediately</strong> or referred to tertiary health facilities.</li>
        <li><strong>Medical Refunds:</strong> The NYSC Welfare and Health Services Department processes <strong>medical refunds</strong> for members who incur costs for certified medical interventions. This process requires the submission of <strong>authentic receipts and medical expenses</strong> to the state secretariat.</li>
      </ul>
    `
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
    excerpt: 'The most important process of every month. Learn mandatory requirements, how capturing works, and the link to your monthly allowance.',
    body: `
      <p><strong>Biometric monthly clearance</strong> is a mandatory process implemented by the NYSC to eliminate truancy and "service by proxy". This system serves as a digital verification that a corps member has satisfactorily performed their duties for the month across the cardinal programs of the scheme.</p>
      <p>The following is everything you need to know about the process and its requirements:</p>

      <h2 id="prerequisite-letters">1. The Prerequisite Clearance Letters</h2>
      <p>Before a corps member can undergo biometric capturing, they must be cleared by two separate authorities:</p>
      <ul>
        <li><strong>Employer Clearance:</strong> Your Place of Primary Assignment (PPA) employer must issue a formal <strong>monthly clearance letter</strong> confirming that you have fulfilled your professional duties.</li>
        <li><strong>CDS Clearance:</strong> You must also be cleared by your <strong>Community Development Service (CDS) Schedule Officer</strong>. According to the sources, attending weekly CDS meetings is mandatory; <strong>missing these meetings for two consecutive weeks</strong> in a month will result in being denied your monthly clearance.</li>
      </ul>

      <h2 id="capturing-process">2. The Capturing Process</h2>
      <ul>
        <li><strong>Location:</strong> Capturing typically takes place at the <strong>Local Government Area (LGA) office</strong> under the supervision of the Local Government Inspector (LGI).</li>
        <li><strong>Hardware:</strong> The process utilizes specialized equipment, including laptop computers and <strong>fingerprint scanners</strong> procured by the scheme for this specific purpose.</li>
        <li><strong>Uniform Protocol:</strong> Corps members must be <strong>fully kitted in the official NYSC uniform</strong> to be eligible for clearance activities. Failure to comply with dress code regulations can lead to disciplinary action or the denial of clearance.</li>
      </ul>

      <h2 id="allowance-link">3. Link to Monthly Allowances</h2>
      <p>Completion of the biometric clearance is the <strong>trigger for the payment of your federal allowance</strong>. If a corps member fails to attend or is not cleared, their <strong>allowance will be withheld</strong>. The scheme now uses data from the Integrated System (NIS) to ensure that payments are made only to those who have successfully completed the biometric verification.</p>

      <h2 id="tracking-discipline">4. Tracking and Discipline</h2>
      <p>The biometric system serves as a "think-tank" for tracking the movement and productivity of members:</p>
      <ul>
        <li><strong>Abscondment Tracking:</strong> The system allows for the <strong>efficient tracking of potential abscondees</strong> at the end of each monthly cycle.</li>
        <li><strong>Real-time Data:</strong> Data is transmitted in real-time from the LGA and State Secretariats to the National Directorate Headquarters (NDHQ) to ensure transparency and accountability.</li>
        <li><strong>Sanctions:</strong> Those found to be absent from their duty posts without permission are flagged as "absentees" and are subject to <strong>extensions of service</strong> or other punishments as stipulated in the NYSC Bye-Laws.</li>
      </ul>
    `
  },
  {
    id: 'a8',
    slug: 'redeployment-marital-grounds',
    title: 'How to Apply for Relocation on Marital Grounds',
    category: 'Redeployment',
    readTime: '13 min',
    riskLevel: 'Medium',
    views: 2340,
    lastVerifiedDate: new Date('2024-06-25'),
    source: 'NYSC Bye-Laws & Official Directives',
    excerpt: 'A step-by-step guide for married female corps members seeking concessional deployment to their husband\'s state of residence.',
    body: `
      <p>Applying for relocation on marital grounds is a specific process within the NYSC scheme designed for <strong>married female prospective corps members (PCMs)</strong> who wish to be deployed to the state where their husbands are domiciled. This is formally referred to as a <strong>concessional deployment</strong> or <strong>concessional posting</strong>.</p>
      
      <p>To ensure a successful application, follow these steps and prepare the mandatory documentation:</p>

      <h2 id="timing">1. Timing and Initial Declaration</h2>
      <ul>
        <li><strong>During Online Registration:</strong> PCMs are strongly advised to indicate their <strong>true marital status</strong> during the initial online registration process to facilitate concessional deployment from the start.</li>
        <li><strong>After Deployment:</strong> If you are not originally posted to your husband's state, you cannot redeploy before camp. You must <strong>report to the orientation camp</strong> you were assigned to first, and then apply for relocation through your dashboard while in camp.</li>
        <li><strong>Compassionate Gesture:</strong> Occasionally, the NYSC allows married women not deployed to their husbands' states to proceed directly to the Orientation Camp in their husband's state of residence for registration.</li>
      </ul>

      <h2 id="documentation">2. Mandatory Documentation</h2>
      <p>You must upload or attach the following original documents to your application to justify the concession:</p>
      <ul>
        <li><strong>Marriage Certificate:</strong> A valid copy of your official marriage certificate.</li>
        <li><strong>Evidence of Change of Name:</strong> A newspaper publication confirming your change of name.</li>
        <li><strong>Letter from Husband’s Employer:</strong> An official letter from the organization where your husband works.</li>
        <li><strong>Husband’s Identity Document:</strong> A valid means of identification, such as a <strong>National ID Card</strong> or <strong>Driving License</strong>.</li>
        <li><strong>Evidence of Domicile:</strong> Documentary proof of your husband’s place of residence in the target state.</li>
      </ul>

      <h2 id="flow">3. Application Flow</h2>
      <ol>
        <li><strong>Login:</strong> Access your NYSC portal dashboard using your username and password.</li>
        <li><strong>Submit Request:</strong> Click on the link for <strong>"Application for Relocation"</strong>.</li>
        <li><strong>Upload:</strong> Attach the digital copies of the mandatory documents listed above.</li>
        <li><strong>Verification:</strong> Your request will be reviewed by the <strong>State Coordinator</strong>, who has the authority to approve or disapprove the request.</li>
        <li><strong>Check Status:</strong> You can monitor the progress of your application by checking the <strong>"Relocation Status"</strong> on your dashboard. Approval usually takes a few weeks.</li>
      </ol>

      <h2 id="guarantees">4. Guarantees and Constraints</h2>
      <ul>
        <li><strong>Guaranteed Posting:</strong> Inter-state posting is <strong>guaranteed for married women</strong>, provided they provide all valid marriage documents.</li>
        <li><strong>Award Disqualification:</strong> It is important to note that corps members posted or relocated on concessional grounds are <strong>automatically disqualified</strong> from being selected for the <strong>State or President’s Honours Award</strong>.</li>
      </ul>
    `
  },
  {
    id: 'a9',
    slug: 'saed-skills-worth-learning',
    title: 'Top 5 SAED Skills that actually make money in 2026',
    category: 'General',
    readTime: '8 min',
    riskLevel: 'Low',
    views: 5620,
    lastVerifiedDate: new Date('2024-03-20'),
    source: 'NYSC SAED Department Report',
    excerpt: 'Don’t just attend the lectures. Choose a skill that has high market demand in the Nigerian freelance economy.',
    body: `
      <p>Based on the sources, the Skill Acquisition and Entrepreneurship Development (SAED) programme is designed to shift the mindset of graduates from being "job seekers" to "job creators". While the sources reflect data and trends up to the 2023–2025 strategic window, they highlight several high-growth sectors that are positioned to be highly profitable moving into 2026.</p>
      <p>Here are the top 5 SAED skill areas that show the most significant potential for income generation:</p>

      <h2 id="ict-digital">1. Information and Communication Technology (ICT) and Digital Skills</h2>
      <p>The sources place heavy emphasis on the "ICT revolution" and the "emerging digital economy" as the future of work.</p>
      <ul>
        <li><strong>Profitable Sub-skills:</strong> Data Science, Product Management, Back-end and Front-end Software Development, and Digital Marketing.</li>
        <li><strong>Revenue Potential:</strong> ICT has the potential to power business innovation centers and improve the efficiency of all other industries. Graduates are already establishing themselves as "Digital Economy Ambassadors" who provide high-demand services to large corporations.</li>
      </ul>

      <h2 id="agropreneurship">2. Agropreneurship (Specifically Fish and Poultry Farming)</h2>
      <p>Agriculture is identified as the largest employer of labor in Nigeria and a vital contributor to wealth creation.</p>
      <ul>
        <li><strong>Profitable Sub-skills:</strong> Fish farming (catfish and tilapia) and poultry production.</li>
        <li><strong>Revenue Potential:</strong> Local demand for fish and poultry far outstrips supply, meaning agropreneurs can tap into a massive, consistent market. These sectors are also highly supported by <strong>interest-free loans</strong> from the Bank of Industry (BOI) and the Central Bank of Nigeria (CBN).</li>
      </ul>

      <h2 id="fashion">3. Fashion Design and High-End Tailoring</h2>
      <p>The fashion industry has experienced a "boom" driven by high demand for quality, locally-tailored embroidered fabrics.</p>
      <ul>
        <li><strong>Profitable Sub-skills:</strong> Pattern cutting, embroidery, and apparel production.</li>
        <li><strong>Revenue Potential:</strong> Successful alumni report that this sector is highly lucrative because "no government body" can match the monthly income generated by a private fashion venture. Premium tailoring for prominent clients allows for significant profit margins.</li>
      </ul>

      <h2 id="cosmetology">4. Cosmetology and Organic Skincare Production</h2>
      <p>There is a growing shift toward natural, organic skincare products in Nigeria as safe alternatives to chemical-based products.</p>
      <ul>
        <li><strong>Profitable Sub-skills:</strong> Production of liquid soaps, detergents, and natural organic oils.</li>
        <li><strong>Revenue Potential:</strong> This sector is driven by high demand for daily-use consumables. The make-up industry specifically soars during events like weddings and birthdays, where artists can charge substantial fees for just a few days of work.</li>
      </ul>

      <h2 id="food-processing">5. Food Processing (Bakeries and Confectionaries)</h2>
      <p>Food processing is prioritized because "people have to eat," and the lifestyle shift toward busy urban schedules has increased the demand for ready-made meals and snacks.</p>
      <ul>
        <li><strong>Profitable Sub-skills:</strong> Professional baking, catering, and water bottling.</li>
        <li><strong>Revenue Potential:</strong> The NYSC has proven the profitability of this model through its own ventures; its bread and table water factories generate millions in revenue by supplying camps and the general public.</li>
      </ul>
    `
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
    body: `
      <p>Adhering to <strong>NYSC uniform protocols</strong> is not merely about fashion; it is a strict requirement designed to instill discipline, promote national unity, and ensure that every corps member is treated as an equal regardless of their background. Violating these protocols often leads to <strong>sanctions, being sent back from activities, or even being de-kitted</strong>, which effectively forces you into "double drills" of administrative hurdles and wasted time.</p>
      
      <p>To avoid these unnecessary complications, follow these strict kitting guidelines:</p>

      <h2 id="no-alterations">1. Zero Tolerance for Alterations</h2>
      <p>The most common cause for sanction is the unauthorized modification of the uniform.</p>
      <ul>
        <li><strong>No "Slim-Fitting":</strong> You are strictly forbidden from altering your khaki trousers or shirts into <strong>"slim-fit" styles, crop tops, or three-quarter shorts</strong>.</li>
        <li><strong>Tailoring Limits:</strong> While you may adjust over-sized uniforms for a better fit, camp tailors are warned to observe <strong>prescribed limits</strong> or risk being sanctioned themselves.</li>
        <li><strong>Decency Requirements:</strong> Reshaping trousers to be skin-tight is considered an <strong>"affront to decency"</strong> and can lead to being decamped.</li>
      </ul>

      <h2 id="event-protocols">2. Event-Specific Protocols</h2>
      <p>Wearing the wrong combination for a specific event will result in your being barred from participation.</p>
      <ul>
        <li><strong>The 6/7 Look (Ceremonial):</strong> For Swearing-in and Passing-Out Parades, you must wear the <strong>NYSC face cap, crested vest (tucked in), belt, khaki trousers, zebra-striped socks, and jungle boots</strong>.</li>
        <li><strong>The 7/7 Look (Drills):</strong> The complete uniform (adding the khaki shirt) is typically required for <strong>Man O’ War activities and endurance treks</strong>.</li>
        <li><strong>Daily Camp Wear:</strong> The standard is <strong>white shorts, white round-neck T-shirts, white socks, and white canvas</strong>. You must wear your <strong>state tag</strong> at all times.</li>
        <li><strong>CDS Days:</strong> You must be <strong>fully kitted</strong> in the official 6/7 or 7/7 uniform to attend weekly meetings; those in slippers, mufti, or altered uniforms are often <strong>sent home and denied monthly clearance</strong>.</li>
      </ul>

      <h2 id="religious-accoutrements">3. Religious and Professional Accoutrements</h2>
      <p>The NYSC allows for specific religious items, but they must follow strict dimensions to avoid being labeled as "wrong dressing".</p>
      <ul>
        <li><strong>Hijabs and Veils:</strong> Muslim female corps members may wear a <strong>white, shoulder-length hijab</strong>, which must be tucked into the uniform. Catholic reverend sisters are permitted veils of the <strong>same length</strong>.</li>
        <li><strong>Skirts and Gowns:</strong> The use of skirts or gowns during orientation camp drills is <strong>not acceptable</strong> and has previously led to members being de-kitted.</li>
        <li><strong>The Face Cap:</strong> Must be worn <strong>facing forward</strong> at all times, except during specific Man O’ War maneuvers.</li>
      </ul>

      <h2 id="id-docs">4. Documentation and Identification</h2>
      <p>Improper identification is an administrative "drill" you want to avoid.</p>
      <ul>
        <li><strong>Identity Cards:</strong> You must carry your <strong>NYSC ID card</strong> at all times; losing it requires an immediate report and application for a replacement to avoid disciplinary issues.</li>
        <li><strong>Face Masks:</strong> Use of a face mask remains <strong>mandatory</strong> during all camp activities to comply with safety protocols.</li>
      </ul>
    `
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

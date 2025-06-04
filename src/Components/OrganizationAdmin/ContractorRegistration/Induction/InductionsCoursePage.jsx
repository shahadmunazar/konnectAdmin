import React, { useState, useEffect } from 'react';
import { Button, ProgressBar, Container, Form, Row, Col } from 'react-bootstrap';
import logo from '../../../../assets/logoRR.png'; // Update the path accordingly
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    content: (isChecked, setIsChecked) => (
      <div className='mt-4 text-start'>
        <h4>Declaration</h4>
        <p><strong>IMPORTANT:</strong> This induction must only be undertaken and completed by the person who has filled in the registration page and be an authorised person who has been engaged to perform work.</p>
        <Form.Check
          type="checkbox"
          label="I am the registered and authorised person completing the induction."
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className='mt-4 text-start'>
        <h4>Introduction to JMV Policies</h4>
        <p>James Milson Village (JMV) is committed to maintaining a professional and respectful environment for all residents, staff, and contractors. As a contractor, you are required to adhere to the following key policies:</p>
        <ul>
          <li><strong>Code of Conduct:</strong> Treat all residents, staff, and fellow contractors with respect and professionalism. Any form of harassment, discrimination, or inappropriate behavior will not be tolerated and may result in termination of your contract.</li>
          <li><strong>Communication Protocols:</strong> All communication regarding work must go through the designated Manager or Care Manager. Do not discuss resident-related matters with unauthorized personnel.</li>
          <li><strong>Site Access Rules:</strong> Contractors must sign in and out at the reception upon arrival and departure. Access to restricted areas, such as resident rooms, is only permitted with prior approval from the Manager or Care Manager.</li>
        </ul>
        <p>Failure to comply with these policies may lead to disciplinary action, including removal from the site and termination of your contract with JMV.</p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className='mt-4 text-start'>
        <h4>Resident Rights & Privacy</h4>
        <p>Contractors who collect personal information related to residents must collect, use, store and disclose the information in accordance with the relevant requirements of the Australian Privacy Principles.</p>
        <p>The contractor and any subcontractor shall at all times respect the rights of the residents, by ensuring they do not discuss any information gained about residents in the course of their work with anyone not connected with the specific service being provided.</p>
        <p>If a breach of privacy or confidentiality occurs it may have serious implications for the resident or the organisation and will almost certainly result in termination of the agreement.</p>
        <p>Those contractors providing onsite services shall not enter a resident’s room or living area without confirming with the Manager, Care Manager and/or nurse in charge and resident’s. The contractor must maintain a safe and secure worksite at all times.</p>

        <h4>Elder Abuse & Compulsory Reporting</h4>
        <p>Elder abuse is any act occurring within a relationship where there is an implication of trust, which results in harm to the older person. Elder abuse can include physical, verbal, psychological, financial, sexual and social abuse and or neglect.</p>
        <p>JMV does not tolerate abuse of any kind to residents and have procedures in place to reduce the risk of abuse occurring, including mandatory police checks for contractors and their staff/subcontractors for suppliers with unsupervised access to residents.</p>
        <p>Contractors are encouraged to report any concerns they have about resident’s well being or safety to the Manager of the home or Registered Nurse in charge.</p>
        <p>Any allegation or suspicion of elder abuse is treated very seriously and will be followed up through the internal quality system and according to legislative requirements.</p>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Orientation</h4>
        <p>
          All contractors providing onsite services are provided with an orientation relevant to their role and service.
          The site Maintenance Manager/Officer will provide the Orientation and no work is to commence prior to signing in
          and meeting with the Maintenance Manager/Officer.
        </p>
        <p>
          A location map, floor plan and evacuation plan can be provided by the Manager and/or Maintenance Officer.
        </p>
        <p>
          Every contractor must leave a report at reception on completion of each day so staff know what work has been
          carried out, what repairs are in progress, if equipment is repaired and now safe to use. After a job is completed
          a delivery note or job completion note is to be signed by a JMV staff member. This note is to be attached to the
          invoice as proof that the job is complete.
        </p>
        <p>
          Ladders and tools are not to be left unattended inside or outside the facility at any time.
        </p>
        <p>
          Roof safety: no harness - no work.
        </p>
        <p>
          Contractors are requested to contact the site Maintenance Manager/Officer the day before arriving to site to
          clarify and/or inform of the planned work and any projected interruptions to services, staff and/or residents.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Work Health and Safety</h4>
        <p>
          JMV is committed to working safely and efficiently. Management and employees of JMV are dedicated to preventing
          accidents and injuries at all of our places of work, always striving to meet our obligation under the
          Occupational Health and Safety Act (the Act).
        </p>
        <p>
          The Act sets out the key principles, duties and rights in relation to work health and safety. The general nature
          of the duties imposed by the Act means that they cover a very wide variety of circumstances.
        </p>
        <p>
          As such JMV expects every contractor and their employees and visitors to be as dedicated to the prevention of all
          accidents and injuries. Only those contractors that are able to show their dedication to work health safety will
          be considered to work with JMV.
        </p>
        <p>
          Management is committed to the Work Health and Safety of staff, residents, visitors and contractors.
        </p>
        <p>
          The contractor shall ensure a safe and secure work site for residents, staff and visitors of the facility. This
          includes but not limited to the requirements under the Act and regulations relevant to the service being provided
          and any local requirements of the facility.
        </p>
        <p>
          Contractors are required to submit the relevant WHS documentation where relevant and/or required with requested
          work specifications and work in a safe manner as per submitted Safe Work Method Statements and other documented
          safety plans and established Safe Work Procedures.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Work Health and Safety</h4>
        <p>
          James Milson Village is committed to and invested in providing and maintaining, so far as reasonably practicable,
          a safe and healthy workplace for team members, our suppliers, contractors, volunteers and visitors who visit our
          locations, as well as keeping our residents' wellbeing and safety at front and centre of all that we do.
        </p>
        <p>
          Our vision is to cultivate a positive work environment, where our people trust and feel safe to share ideas to
          continuously improve our health and safety culture and practices. We aim to achieve this through ongoing
          engagement and consultation with our workforce and stakeholders.
        </p>

        <h5 className="mt-4">Safety is Everybody's Responsibility</h5>
        <p>Contractor responsibilities include (but are not limited to):</p>
        <ul>
          <li>Following all WHS and related policies and procedures;</li>
          <li>Compliance with any manual handling policies and procedures;</li>
          <li>Ensuring their own and others’ health and safety is not affected by their actions;</li>
          <li>Working with management and colleagues to achieve a safe working environment for all; and</li>
          <li>Reporting all incidents including unsafe work practices, hazards, near misses and injuries.</li>
        </ul>

        <h5 className="mt-4">JMV Responsibilities include (but are not limited to):</h5>
        <ul>
          <li>
            Ensuring, so far as is reasonably practicable, the health and safety of our people and other persons is not put
            at risk from work carried out as part of the conduct of the business or undertaking.
          </li>
          <li>
            Creating, implementing and maintaining an effective Work Health and Safety management process consisting of risk
            management programs that target our core operational risks;
          </li>
          <li>Providing appropriate resources to adequately maintain our WHS management processes;</li>
          <li>
            Keeping abreast of current health and safety legislation, guidance material and aged care industry best practice
            standards;
          </li>
          <li>
            Providing adequate information, instruction, training and supervision to enable our people to carry out their
            tasks safely and without risk to physical and psychological health;
          </li>
          <li>
            Maintaining effective engagement, consultation, cooperation and coordination with key stakeholders on health and
            safety matters, with reporting systems that are available and well known; and
          </li>
          <li>
            Health and safety issues, hazards, incidents are responded to and resolved in a timely and considerate manner.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 7,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Workplace Bullying and Violence</h4>
        <p>
          Workplace bullying is defined as: “…repeated, unreasonable behaviour directed toward an employee, or group of
          employees, that creates a risk to health and safety.”<br />
          <small>
            Fair Work Commissioner, 30 Dec 2013, Guide: Anti-workplace bullying available at: www.fwc.gov.au
          </small>
        </p>
        <p>
          Whilst bullying does not include one-off incidents, any inappropriate behaviour will not be tolerated and will be
          followed up using the <a href="#">Grievance and Disciplinary procedure</a>.
        </p>
        <p>
          Bullying does not include appropriate allocation of tasks, performance management or discipline.
        </p>
        <p>
          Workplace violence is defined as: ‘…any incident where an employee is physically attacked or threatened in the
          workplace.’
        </p>
        <p>
          This includes statements or behaviour that make a staff member believe that she/he is in danger of being directly or
          indirectly physically attacked.
        </p>
        <p>
          JMV has a duty of care related to workplace health and safety whilst staff members have a responsibility to take
          reasonable care for action and or inaction.
        </p>
        <p>
          Staff members have the right to make a complaint about any incident of workplace bullying and or violence without fear
          of victimisation or retribution.
        </p>
        <p>
          Managers will treat any report related to workplace bullying or violence seriously and will respond promptly and
          fairly to resolve the issue.
        </p>
        <p>
          Staff members are encouraged to report all incidents of workplace bullying or violence. This includes staff who have
          experienced or witnessed such incidents.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Equal Employment Opportunity</h4>
        <p>
          James Milson Village is an equal opportunity employer and is committed to providing a positive and safe work environment
          free from unlawful discrimination, harassment, sexual harassment, workplace bullying and victimisation. Any conduct of
          this nature is unacceptable and will not be tolerated in the workplace. This applies to all team members, contractors
          and volunteers and covers all work-related functions and activities and recruitment, selection and promotional decisions.
        </p>

        <h5 className="mt-4">Discrimination</h5>
        <p>
          Unlawful Discrimination means treating a person less favourably because of their personal characteristics which is covered
          by equal opportunity laws. Under both state and federal equal opportunity laws, discrimination based on any of the
          following is unlawful:
        </p>
        <ul>
          <li>Sex</li>
          <li>Relationship status</li>
          <li>Pregnancy</li>
          <li>Breastfeeding</li>
          <li>Age, whether young or old or because of age in general</li>
          <li>Compulsory retirement</li>
          <li>Race, colour, descent, national origin or ethnic background</li>
          <li>Disability, disease or injury, including a work-related injury</li>
          <li>Religious belief or activities</li>
          <li>Political belief or activities</li>
          <li>Trade union or other industrial activity</li>
          <li>Sexual orientation, intersex status, gender identity</li>
          <li>Family or caring responsibilities</li>
          <li>Association with, or relation to a person identified on the basis of any of the above characteristics above</li>
        </ul>

        <p>
          It is JMV’s policy to ensure these characteristics are not taken into account when employment decisions are made and that
          no team member is harassed because of any of the above attributes. All staff should also ensure that no discrimination or
          harassment occurs against residents, their families/representatives or other visitors.
        </p>

        <p>
          It is also illegal to request, demand, provoke, encourage, permit or aid another person to discriminate regardless of the
          intention and doing so could result in action against both parties. Discrimination can result from a person acting alone,
          in a collusion with others, by inaction or exclusion.
        </p>

        <p>Discrimination can occur:</p>
        <ul>
          <li>Directly, when a person or group is treated less favourably than another person or group in a similar situation.</li>
          <li>
            Indirectly, when an unreasonable requirement, condition or practice is imposed that has, or is likely to have, the
            effect of disadvantaging people with a personal characteristic protected by law.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 9,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Bullying and Harassment</h4>
        <p>
          Bullying is repeated, unreasonable behaviour directed toward a worker or group of workers, and where that behaviour
          creates a risk to health and safety. Bullying can be psychological, verbal or social.
        </p>

        <p>Some examples of bullying behaviour may include (but not be limited to):</p>
        <Row>
          <Col md={6}>
            <ul>
              <li>Abusive, insulting or offensive language or comments</li>
              <li>Aggressive and intimidating conduct</li>
              <li>Belittling or humiliating comments</li>
              <li>Victimisation</li>
              <li>Practical jokes</li>
              <li>Unjustified criticism or complaints</li>
              <li>Withholding information that is essential for effective work performance</li>
              <li>Setting tasks that unreasonably blow or beyond a person’s skill level</li>
            </ul>
          </Col>
          <Col md={6}>
            <ul>
              <li>Denying access to information, supervision, consultation or resources to the detriment of the employee</li>
              <li>Spreading misinformation, gossip or malicious rumours</li>
              <li>Changing work arrangements such as rosters and leave to deliberately inconvenience a particular employee or team members</li>
              <li>Physical abuse</li>
              <li>Setting unreasonable timelines or constantly changing deadlines</li>
              <li>Deliberately excluding someone from work-related activities</li>
            </ul>
          </Col>
        </Row>

        <p>Bullying or harassment does <strong>not</strong> include:</p>
        <ul>
          <li>Objective comments made with the intention to provide constructive feedback and assist a staff member with their work</li>
          <li>Performance management, management direction or implementation of policy</li>
          <li>Expressing differences of opinion</li>
          <li>Making a complaint about a manager or another employee’s conduct if the complaint is made in line with the grievance manage processes and in good faith and/or</li>
          <li>Poor communication or disagreements between team members or management</li>
        </ul>

        <p>
          Harassment is defined as derogatory or discriminatory remarks, verbal abuse or physical or sexual advances which:
        </p>
        <ul>
          <li>Are offensive to the individual</li>
          <li>Cause the person to feel threatened, humiliated, patronised or embarrassed</li>
          <li>Interfere with job performance or</li>
          <li>Are irrelevant to the workplace</li>
        </ul>

        <p>
          It is important to recognise that what one person may consider acceptable outside the workplace may not be considered to
          be acceptable in the work environment.
        </p>

        <p>
          Sexual Harassment occurs when a person makes an unwelcome sexual advance, or an unwelcome request for sexual favours or
          engages in other unwelcome conduct of a sexual nature in circumstances which a reasonable person, having regard to the
          circumstances, would anticipate the possibility that the person harassed would feel uncomfortable.
        </p>
      </div>
    ),
  },
  {
    id: 10,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Licensing</h4>
        <p>
          All works must be carried out by licensed persons and copies of all licenses will need to be provided prior to commencement of work at all JMV sites.
        </p>

        <h4 className="mt-4 mb-3">Maintenance Co-ordination</h4>
        <p>
          The contact person is responsible for the co-ordination of maintenance and repairs, and contractors while working in or around the buildings.
        </p>
        <p>
          Contractors are to work closely with the contact person and keep him/her fully informed about the progress of their job. Unless otherwise notified by the Manager of the site, the Maintenance Officer will be the contractor's contact person.
        </p>

        <h4 className="mt-4 mb-3">Quality of Work</h4>
        <p>
          All work undertaken by Contractors shall be of high standard, consistent with current professional practice.
        </p>
        <p>
          Where applicable, materials and standard of work shall be in accordance with the relevant regulation or Australian Standards.
        </p>
        <p>
          In addition, unless otherwise specified, only new materials are to be used and only careful, skilled and experienced people are to be employed by the contractor.
        </p>
        <p>
          The contractor should have quality assurance in place to monitor the quality of goods or service provided and be prepared to participate in quality activities initiated by the facility for example, customer surveys, internal benchmarking.
        </p>
        <p>
          Annual performance evaluation will be conducted by the contact person with consideration of conformance to the agreement and Contractor Handbook expectations.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    content: (
      <div className="mt-4 text-start">
        <h4 className="mb-3">Opportunity to Improve</h4>
        <p>
          JMV management and staff are committed to providing the best care and service to residents. To assist us to ensure our systems are working well contractors are encouraged to complete JMV’s feedback forms when they identify an area in which JMV can improve.
        </p>
        <p>
          Improvement Forms are available at reception of JMV facilities and/or from the Manager. Completed Improvement Forms can be posted to the Manager or placed in the suggestion box located throughout the home.
        </p>
        <p>
          If the contractor has a concern of a serious nature it should be directed to the Manager or Maintenance Officer immediately. If a contact person is not identifiable contact the JMV head office.
        </p>
        <p>
          The Improvement Form is also used for contractor agreement non-compliance. If a contractor has a serious unresolved non-conformance or is unable to provide goods or services according to regulatory requirements the Contractor Agreement will be terminated.
        </p>

        <h4 className="mt-4 mb-3">Attendance and Identification</h4>
        <p>
          The Contractor Attendance log located at reception must be signed at the start of work and on completion of each day. Work is not to commence until the Contractor has signed in and made contact with the Maintenance Officer and/or Manager.
        </p>
        <p>
          Identification badges must be worn by all contractors and their employees when onsite.
        </p>
      </div>
    ),
  },
  {
    id: 12,
    content: (isChecked, setIsChecked) => (
      <div>
        <h4>Final Declaration</h4>
        <p><strong>IMPORTANT:</strong> By completing this induction, I confirm that I have read, understood, and agree to comply with all the policies, procedures, and expectations outlined in this induction course.</p>
        <Form.Check
          type="checkbox"
          label="I acknowledge and agree to the terms of this induction."
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </div>
    ),
  },
  // Add up to 30 steps here as needed
];

const InductionsCoursePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox in steps requiring it
  const [isNextActive, setIsNextActive] = useState(false); // State for Next button activation

    const navigate = useNavigate();
  // Handle Next button logic
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsChecked(false); // Reset checkbox state when moving to the next step
    }
  };

  // Handle Back button
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsChecked(false); // Reset checkbox state when moving back
    }
  };

  // Effect to handle Next button activation
  useEffect(() => {
    // Check if the current step's content is a function (i.e., requires checkbox)
    const stepContent = steps[currentStep].content;
    if (typeof stepContent === 'function') {
      // Steps with a checkbox (e.g., Step 1 and Step 12): Next button depends on checkbox
      setIsNextActive(isChecked);
    } else {
      // Other steps: Next button activates after 10 seconds
      setIsNextActive(false); // Disable Next button initially
      const timer = setTimeout(() => {
        setIsNextActive(true); // Enable Next button after 10 seconds
      }, 10000); // 10 seconds delay

      // Cleanup timer on component unmount or step change
      return () => clearTimeout(timer);
    }
  }, [currentStep, isChecked]);

  const percentComplete = Math.round(((currentStep + 1) / steps.length) * 100);

  const handleFinish = () => {
       navigate('/inductions-finish');
  };

  return (
    <Container className="inductions-container">
      <div className="inductions-card">
        {/* Logo */}
        <img src={logo} alt="James Milson" className="logo" />

        {/* Header Bar */}
        <div className="header-bar">Contractor Induction</div>

        {/* Scrollable Content Area with Fixed Height */}
        <div className="content-wrapper">
          <div className="content">
            {/* Render content based on whether it's a function or JSX */}
            {typeof steps[currentStep].content === 'function'
              ? steps[currentStep].content(isChecked, setIsChecked)
              : steps[currentStep].content}
          </div>
        </div>

        {/* Bottom Section with Navigation, Progress Bar, and Buttons */}
        <div className="bottom-section">
          <div className="navigation-buttons">
            <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
            {currentStep === steps.length - 1 ? (
              <Button variant="success" onClick={handleFinish} disabled={!isNextActive}>Next</Button>
            ) : (
              <Button variant="info" onClick={handleNext} disabled={!isNextActive}>
                Next
              </Button>
            )}
          </div>

          {/* Progress Bar (Full Width) */}
          <div className="progress-section">
            <div className="progress-info">
              <span className="percent-complete">{percentComplete}%</span>
              <ProgressBar now={percentComplete} className="progress-bar" />
              <span className="page-info">Page {currentStep + 1} of {steps.length}</span>
            </div>
          </div>

          <div className="bottom-buttons">
            <div className="reading-time-button">
              <p size="xs">Reasonable Reading Time: 10s</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Global styles for professional look */
        * {
          font-family: "Roboto", "Open Sans", "Arial", sans-serif; /* Professional font stack */
        }

        /* Container for the entire page */
        .inductions-container {
          display: flex;
          justify-content: center;
          align-items: flex-start; /* Align to top for better scrolling */
          padding: 5px;
        }

        /* Card that holds the content */
        .inductions-card {
          background-color: #ffffff; /* White background for the card */
          
          width: 100%;
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* Subtle shadow for elevation */
          padding: 11px 25px;
          display: flex;
          flex-direction: column;
          position: relative; /* For sticky bottom section */
          min-height: 95vh; /* Ensure card takes up most of the viewport height */
        }

        /* Logo at the top */
        .logo {
          height: 77px; /* Slightly smaller for professional look */
          width: 100%; /* Full width for better alignment */
          max-width: 274px; /* Limit max width for logo */
          display: block; /* Ensure logo is block-level for proper alignment */
        }

        /* Header bar */
        .header-bar {
          background-color: #2c3e50; /* Dark blue-gray for professionalism */
          color: #ffffff; /* White text */
          padding: 5px 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 0px;
          border-radius: 8px;
          text-align: left;
          letter-spacing: 0.5px; /* Slight letter spacing for polish */
        }

        /* Navigation buttons at the bottom */
        .navigation-buttons {
          display: flex;
          justify-content: center; /* Space buttons evenly */
          margin-bottom: 5px;
          gap: 10px; /* Reduced gap for smaller buttons */
        }

        .navigation-buttons .btn-secondary {
          background-color: #6c757d; /* Bootstrap secondary gray */
          border: none;
          padding: 6px 15px; /* Smaller padding for smaller button */
          font-size: 14px; /* Smaller font size */
          font-weight: 600;
          border-radius: 6px; /* Slightly smaller radius */
          transition: background-color 0.3s ease;
          letter-spacing: 0.3px;
        }

        .navigation-buttons .btn-secondary:hover {
          background-color: #5a6268; /* Darker gray on hover */
        }

        .navigation-buttons .btn-secondary:disabled {
          background-color: #adb5bd; /* Lighter gray when disabled */
          cursor: not-allowed;
        }

        .navigation-buttons .btn-info {
          background-color: #17a2b8; /* Bootstrap info blue */
          border: none;
          padding: 6px 15px; /* Smaller padding for smaller button */
          font-size: 14px; /* Smaller font size */
          font-weight: 600;
          border-radius: 6px; /* Slightly smaller radius */
          transition: background-color 0.3s ease;
          letter-spacing: 0.3px;
        }

        .navigation-buttons .btn-info:hover {
          background-color: #138496; /* Darker blue on hover */
        }

        .navigation-buttons .btn-info:disabled {
          background-color: #7dc8d5; /* Lighter blue when disabled */
          cursor: not-allowed;
        }

        .navigation-buttons .btn-success {
          background-color: #28a745; /* Bootstrap success green */
          border: none;
          padding: 6px 15px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          transition: background-color 0.3s ease;
          letter-spacing: 0.3px;
        }

        .navigation-buttons .btn-success:hover {
          background-color: #218838; /* Darker green on hover */
        }

        .navigation-buttons .btn-success:disabled {
          background-color: #82c91e; /* Lighter green when disabled */
          cursor: not-allowed;
        }

        /* Progress section (full width) */
        .progress-section {
          margin-bottom: 15px;
        }

        .progress-info {
          display: flex;
          align-items: center;
          gap: 10px; /* Reduced gap for professional look */
          width: 100%;
        }

        .percent-complete {
          font-size: 12px; /* Smaller for secondary text */
          font-weight: 500;
          color: #666; /* Lighter gray for secondary text */
          width: 35px;
          text-align: right;
          letter-spacing: 0.3px;
        }

        .progress-bar {
          flex: 1; /* Take up remaining space */
          height: 8px; /* Slightly thinner for professional look */
          background-color: #e9ecef; /* Light gray background for the bar */
          border-radius: 4px;
        }

        .progress-bar .progress-bar {
          background-color: #28a745; /* Green fill, consistent with WelcomeStart button */
          border-radius: 4px;
        }

        .page-info {
          font-size: 12px; /* Smaller for secondary text */
          font-weight: 500;
          color: #666; /* Lighter gray for secondary text */
          white-space: nowrap; /* Prevent wrapping */
          letter-spacing: 0.3px;
        }

        /* Scrollable content wrapper with fixed height */
        .content-wrapper {
          height: calc(100vh - 225px); /* Adjust based on other elements' heights */
          overflow-y: auto; /* Enable vertical scrolling */
        }

        /* Content area */
        .content {
          color: #333; /* Darker gray for professional body text */
          padding-bottom: 20px; /* Ensure content doesn't overlap bottom section */
        }

        .content h4 {
          font-size: 16px; /* Professional heading size */
          font-weight: 600;
          color: #2c3e50; /* Dark blue-gray for headings */
          margin-top: 20px;
          margin-bottom: 15px;
          letter-spacing: 0.3px;
        }

        .content p {
          font-size: 14px; /* Professional body text size */
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 15px;
          color: #333; /* Darker gray for body text */
        }

        .content strong {
          font-weight: 600;
          color: #2c3e50; /* Match heading color for emphasis */
        }

        .content ul {
          padding-left: 20px;
          margin-bottom: 15px;
        }

        .content li {
          font-size: 14px; /* Professional body text size */
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 10px;
          color: #333; /* Darker gray for body text */
        }

        .content img {
          max-width: 100%;
          height: auto;
          margin-top: 15px;
          border-radius: 8px; /* Slight rounding for images */
        }

        /* Checkbox styling */
        .content .form-check {
          margin-top: 15px;
        }

        .content .form-check-label {
          font-size: 14px; /* Professional body text size */
          font-weight: 400;
          color: #333; /* Darker gray for body text */
        }

        /* Bottom section with Close/Suspend and Reading Time buttons */
        .bottom-section {
          position: sticky;
          bottom: 0;
          background-color: #ffffff; /* Match card background */
          border-top: 1px solid #e0e0e0; /* Subtle divider with professional color */
        }

        .bottom-buttons {
          display: flex;
          justify-content: center; /* Center the buttons */
          gap: 10px; /* Reduced gap for smaller buttons */
          margin: -6px 0; /* Margin for spacing */
        }

        .close-button {
          border: none;
          font-size: 12px; /* Smaller font size for xs buttons */
          font-weight: 600;
          border-radius: 6px; /* Slightly smaller radius */
          transition: background-color 0.3s ease;
          letter-spacing: 0.3px;
        }

        .close-button:hover {
          background-color: lightgray; /* Darker blue on hover */
          cursor: pointer;
        }

        /* Responsive adjustments */
        @media (max-width: 576px) {
          .inductions-card {
            max-width: 90%;
            padding: 20px;
            min-height: 90vh; /* Adjust for smaller screens */
          }

          .logo {
            height: 60px;
          }

          .header-bar {
            font-size: 14px;
            padding: 8px 15px;
          }

          .navigation-buttons {
            gap: 8px;
          }

          .navigation-buttons .btn-secondary,
          .navigation-buttons .btn-info,
          .navigation-buttons .btn-success {
            padding: 5px 12px;
            font-size: 12px;
          }

          .progress-info {
            gap: 8px;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
          }

          .percent-complete, .page-info {
            font-size: 10px;
          }

          .content-wrapper {
            height: calc(100vh - 400px); /* Adjust for smaller screens */
          }

          .content h4 {
            font-size: 14px;
          }

          .content p, .content li, .content .form-check-label {
            font-size: 12px;
          }

          .bottom-buttons {
            flex-direction: column; /* Stack buttons on mobile */
            gap: 8px;
          }

          .close-button .btn-primary,
          .reading-time-button .btn-primary {
            font-size: 10px;
          }
        }
      `}</style>
    </Container>
  );
};

export default InductionsCoursePage;
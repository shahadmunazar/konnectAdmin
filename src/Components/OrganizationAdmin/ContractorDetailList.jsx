import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import logo from "../../assets/logoRR.png";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  border: '1px solid #e3e3e3',
  marginBottom: 24,
  padding: '24px 0',
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr)',
  alignItems: 'center',
  gap: 0,
  width: '100%',
};

const cellStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0 18px',
};

const valueStyle = {
  border: '1px solid #e3e3e3',
  borderRadius: 8,
  padding: '12px 0',
  width: 180,
  textAlign: 'center',
  background: '#fafbfc',
  color: '#888a8d'
};

const statusCell = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0 18px',
};

const statusBox = (type) => ({
  background: type === 'submitted' ? '#bfe2fa' : '#ffb3a7',
  borderRadius: 6,
  padding: "6px 0px 5px 0px",
  paddingLeft: '20px',
  textAlign: 'center',
  marginBottom: 4,
});

const noteStyle = {
  marginTop: 4,
  textAlign: 'center',
  width: 180,
};

const actionSection = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 10,
  marginTop: 8,
};

const actionBtn = (bg) => ({
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '7px 25px',
  fontWeight: 400,
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.2s',
  width: 140,
  marginBottom: 0,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
});

function ContractorDetailList({ onStartNewForm }) {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const contractor_invitation_id = localStorage.getItem("contractor_invitation_id");

  const fetchContractors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/orginazation/check-contractor-register?contractor_invitation_id=${contractor_invitation_id}&t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.data)) {
        setContractors(data.data);
      }
    } catch (error) {
      console.error("Error fetching contractors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractors();
  }, []);

  // Delete handler
  const handleDelete = async (contractorId) => {
    if (!window.confirm("Are you sure you want to delete this contractor?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/orginazation/delete-contractor-records`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractor_id: contractorId }),
      });
      const data = await res.json();

      if (data.status === 200) {
        // Immediately update local state
        setContractors(prevContractors => prevContractors.filter(c => c.id !== contractorId));

        // Then fetch to ensure consistency with server
        setTimeout(() => {
          fetchContractors();
        }, 500);
      } else {
        alert(data.message || "Failed to delete contractor.");
      }
    } catch (err) {
      alert("Error deleting contractor.");
    }
  };

  const getLatestRegistrationInfo = (registrationInfo) => {
    if (!registrationInfo || !Array.isArray(registrationInfo)) return null;
    return registrationInfo[registrationInfo.length - 1];
  };

  return (
    <>
      <style>{`
        .cdl-title {
          font-size: 32px;
          font-weight: 500;
          color: #888a8d;
          letter-spacing: 1px;
          text-align: left;
          width: 100%;
          margin-bottom: 10px;
        }
        .cdl-card-name {
          font-size: 19px;
          font-weight: 700;
          color: #222;
          margin-bottom: 0;
        }
        .cdl-label {
          font-size: 15px;
          font-weight: 500;
          color: #888;
          margin-bottom: 2px;
        }
        .cdl-value {
          font-size: 18px;
          font-weight: 400;
          color: #222;
        }
        .cdl-status-label {
          font-size: 14px;
          font-weight: 500;
          color: #888;
          margin-bottom: 4px;
          text-align: center;
        }
        .cdl-status-box {
          font-size: 16px;
          font-weight: 400;
          color: #222;
        }
        .cdl-note {
          font-size: 14px;
          color: #666;
        }
        .cdl-action-btn {
          font-size: 16px;
          font-weight: 700;
        }
        .continue-btn:hover {
          background: #3bbcb3 !important;
        }
        .delete-btn:hover {
          background: #2d8c99 !important;
        }
        @media (max-width: 900px) {
          .contractor-container {
            max-width: 98vw !important;
            padding-left: 4vw !important;
            padding-right: 4vw !important;
          }
          .cdl-title {
            font-size: 24px !important;
          }
          .contractor-card {
            grid-template-columns: 1fr 1fr 1fr;
            padding: 16px 0 !important;
          }
          .cdl-value, .cdl-status-box {
            width: 100% !important;
            font-size: 16px !important;
          }
        }
        @media (max-width: 700px) {
          .contractor-container {
            max-width: 100vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .cdl-title {
            font-size: 18px !important;
            padding: 0 8px;
          }
          .contractor-card {
            grid-template-columns: 1fr;
            padding: 10px 0 !important;
          }
          .contractor-cell {
            padding: 8px 8px !important;
            align-items: stretch !important;
          }
          .cdl-value, .cdl-status-box {
            width: 100% !important;
            font-size: 15px !important;
          }
          .cdl-action-btn {
            width: 100% !important;
            font-size: 15px !important;
            padding: 10px 0 !important;
          }
        }
        .contractor-cards-wrapper {
          width: 100%;
        }
        .contractor-card {
          width: 100% !important;
        }
      `}</style>
      <div className="contractor-container" style={{ maxWidth: 1200, margin: '0 auto', fontFamily: 'inherit', background: '#fafbfc', minHeight: '70vh', padding: '0 0 40px 0', borderRadius: 10, border: '1px solid #ececec' }}>
        <div style={{ padding: '10px 48px 0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="cdl-title">
            Contractor Pre-qualification Questionnaire
          </div>
          <img src={logo} alt="logo" style={{ height: 70, marginLeft: 16 }} />
        </div>
        <div style={{ borderTop: '1px solid #e3e3e3', margin: '32px 32px 0 32px' }} />
        <div style={{ padding: '28px 48px 0 48px', textAlign: 'left' }}>
          <div style={{ marginBottom: 18, color: '#444', fontSize: 16 }}>
            Please choose an option from below.
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e3e3e3', margin: '0 32px', marginBottom: 0 }} />
        <div className="contractor-cards-wrapper" style={{ width: '100%' }}>
          <div style={{ padding: '18px 32px 0 32px', width: '100%' }}>
            {loading ? (
              <div>Loading...</div>
            ) : contractors.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No contractors found. Please start a new form.
              </div>
            ) : (
              contractors.map((contractor, idx) => {
                return (
                  <div key={contractor.id}>


                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, color: '#222', padding: '0 18px', margin: 0, height: '100%' }}>
                      {contractor.contractor_company_name || 'Unnamed Contractor'}
                    </div>
                    <div key={contractor.id} className="contractor-card" style={cardStyle}>
                      <div className="contractor-cell" style={cellStyle}>
                        <span className="cdl-label">Initial application</span>
                        <span className="cdl-value" style={valueStyle}>{contractor.id || '-'}</span>
                      </div>
                      <div className="contractor-cell" style={cellStyle}>
                        <span className="cdl-label">ABN</span>
                        <span className="cdl-value" style={valueStyle}>{contractor.abn_number || '-'}</span>
                      </div>
                      <div className="contractor-cell" style={cellStyle}>
                        <span className="cdl-label">Most Recent Action</span>
                        <span className="cdl-value" style={valueStyle}>{contractor.lastUpdatedAgo || '-'}</span>
                      </div>
                      <div className="contractor-cell" style={{ ...cellStyle, ...statusBox(contractor.formStatus) }}>
                        <span className="cdl-status-label">Status</span>
                        <span className="cdl-status-box" style={statusBox(contractor.formStatus)}>
                          {contractor.formStatus === "incomplete" ? `Incomplete - page ${contractor.incompletePage}` || 'pending' : contractor.formStatus === "complete" ? "submitted" : contractor.formStatus}
                        </span>
                      </div>
                      <div className="contractor-cell" style={statusCell}>
                        {contractor.formStatus === "incomplete" ? (
                          <div style={actionSection}>
                            <button
                              className="cdl-action-btn continue-btn"
                              style={actionBtn('#4ecdc4')}
                              onClick={() => {
                                onStartNewForm({
                                  isNewForm: false,
                                  contractorId: contractor.id,
                                  incompletePage: contractor.incompletePage,
                                  contractorData: contractor
                                });
                              }}
                            >
                              Continue
                            </button>
                            <button
                              className="cdl-action-btn delete-btn"
                              style={actionBtn('#36a2b6')}
                              onClick={() => handleDelete(contractor.id)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <span className="cdl-note" style={noteStyle}>
                            {contractor.formStatus === "complete" ? "Wait For your administrator" : contractor.formStatus}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e3e3e3', margin: '32px 32px 0 32px' }} />
        <div style={{ padding: '29px 30px 0px', maxWidth: 500, width: ' 100%', textAlign: 'left' }}>
          <div style={{ marginBottom: 16, fontSize: 16, textAlign: 'left', color: '#888a8d' }}>Need to start a new form as a different entity?</div>
          <button
            style={{ background: '#36a2b6', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 400, cursor: 'pointer' }}
            onClick={() => onStartNewForm({ isNewForm: true })}
            className="btn-next"
          >
            Start a new form
          </button>
        </div>
      </div>
    </>
  );
}

export default ContractorDetailList;
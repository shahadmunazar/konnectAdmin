// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import * as Icon from "react-feather";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import "react-perfect-scrollbar/dist/css/styles.css";

// export default function Navbar() {
//   const [isToggled, setIsToggled] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSidebarFolded, setIsSidebarFolded] = useState(false);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//     document.body.classList.toggle("sidebar-folded");
//   };

//   useEffect(() => {
//     const body = document.body;
//     const sidebarFolded = "sidebar-folded";
//     setIsSidebarFolded(body.classList.contains(sidebarFolded));
//   }, []);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     document.body.classList.add("open-sidebar-folded", "overflow-hidden");
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     document.body.classList.remove("open-sidebar-folded", "overflow-hidden");
//   };

//   const navLinkClass = ({ isActive }) =>
//     `nav-link newNav ${isActive ? "active" : ""}`;

//   const textStyle = {
//     fontSize: "15px",
//     fontWeight: "500",
//     fontFamily: "Segoe UI, sans-serif",
//   };

//   return (
//     <div>
//       <nav className="sidebar">
//         <div className="sidebar-header" style={{ backgroundColor: "#f12550" }}>
//           <a href="#" className="sidebar-brand text-black" style={{ ...textStyle, fontSize: "18px", fontWeight: "600" }}>
//             KONNECT
//           </a>
//           <div
//             id="sidebar_t"
//             className={isSidebarFolded ? "sidebar-toggler active" : "sidebar-toggler not-active"}
//             onClick={handleToggle}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>

//         <PerfectScrollbar component="div">
//           <div
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             className="sidebar-body"
//             style={{ backgroundColor: "#f12550" }}
//           >
//             <ul className="nav" style={{ backgroundColor: "#f12550" }}>
//               <li className="nav-item">
//                 <NavLink to="/dashboard" className={navLinkClass}>
//                   <Icon.Home className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Dashboard</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/create-org" className={navLinkClass}>
//                   <Icon.PlusCircle className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Create a new Organization</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/manage-org" className={navLinkClass}>
//                   <Icon.Users className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Organizations Management</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/manage-subs" className={navLinkClass}>
//                   <Icon.DollarSign className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Subscription Management</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/view-subscribers" className={navLinkClass}>
//                   <Icon.BookOpen className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>View Subscribers & Plan D..</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/manage-enquire" className={navLinkClass}>
//                   <Icon.MessageCircle className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Enquiry Management</span>
//                 </NavLink>
//               </li>
//               {/* Optional items below:
//               <li className="nav-item">
//                 <NavLink to="/manage-cms" className={navLinkClass}>
//                   <Icon.Edit3 className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Manage CMS Contents</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/sub-admin-management" className={navLinkClass}>
//                   <Icon.Shield className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Sub Admin Management</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/account-setting" className={navLinkClass}>
//                   <Icon.Settings className="link-icon" color="black" />
//                   <span className="link-title text-black" style={textStyle}>Account Settings</span>
//                 </NavLink>
//               </li>
//               */}
//             </ul>
//           </div>
//         </PerfectScrollbar>
//       </nav>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarFolded, setIsSidebarFolded] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isInductionOpen, setIsInductionOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const orgName = "superadmin";

  const handleToggle = () => {
    setIsToggled(!isToggled);
    document.body.classList.toggle("sidebar-folded", !isSidebarFolded);
    setIsSidebarFolded(!isSidebarFolded);
  };

  const getRole = localStorage.getItem("role");

  useEffect(() => {
    const sidebarFolded = "sidebar-folded";
    if (document.body.classList.contains(sidebarFolded)) {
      setIsSidebarFolded(true);
    }
  }, []);

  useEffect(() => {
    if (isSidebarFolded) {
      document.body.classList.add("sidebar-folded");
    } else {
      document.body.classList.remove("sidebar-folded");
    }
  }, [isSidebarFolded]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.body.classList.add("open-sidebar-folded", "overflow-hidden");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.body.classList.remove("open-sidebar-folded", "overflow-hidden");
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link newNav ${isActive ? "active" : ""}`;

  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar-header" style={{ backgroundColor: "#66d1d1" }}>
          <a
            href="#"
            className="sidebar-brand text-black"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "Segoe UI, sans-serif",
            }}
          >
            KONNECT
          </a>
          <div
            id="sidebar_t"
            className={isSidebarFolded ? "sidebar-toggler active" : "sidebar-toggler not-active"}
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <PerfectScrollbar component="div">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="sidebar-body"
            style={{ backgroundColor: "#66d1d1" }}
          >
            {getRole === "superadmin" ? (
              <ul className="nav" style={{ backgroundColor: "#66d1d1" }}>
                <li className="nav-item mb-1">
                  <NavLink to={`/${orgName}/dashboard`} className={navLinkClass}>
                    <Icon.Home className="me-2" color="black" />
                    <span className="fw-medium text-black">Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/create-org" className={navLinkClass}>
                    <Icon.PlusCircle className="me-2" color="black" />
                    <span className="fw-medium text-black">Create a new Organization</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/manage-org" className={navLinkClass}>
                    <Icon.Users className="me-2" color="black" />
                    <span className="fw-medium text-black">Organizations Management</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/manage-subs" className={navLinkClass}>
                    <Icon.DollarSign className="me-2" color="black" />
                    <span className="fw-medium text-black">Subscription Management</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/view-subscribers" className={navLinkClass}>
                    <Icon.BookOpen className="me-2" color="black" />
                    <span className="fw-medium text-black">View Subscribers & Plan D..</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/manage-enquire" className={navLinkClass}>
                    <Icon.MessageCircle className="me-2" color="black" />
                    <span className="fw-medium text-black">Enquiry Management</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-1">
                  <NavLink to="/account-setting" className={navLinkClass}>
                    <Icon.Settings className="me-2" color="black" />
                    <span className="fw-medium text-black">Account Setting</span>
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="nav flex-column" style={{ backgroundColor: "#66d1d1", padding: "10px" }}>
                <li className="nav-item mb-1">
                  <NavLink to="/organization-dashboard" className={navLinkClass}>
                    <Icon.Home className="me-2" color="black" />
                    <span className="fw-medium text-black">Dashboard</span>
                  </NavLink>
                </li>

                {/* Prequalification Dropdown */}
                <li className="nav-item has-submenu mb-1">
                  <div
                    className="nav-link d-flex justify-content-between align-items-center"
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <Icon.File className="me-2" color="black" />
                      <span className="fw-medium text-black">Prequalification</span>
                    </div>
                    <span>{isSubmenuOpen ? "▾" : "▸"}</span>
                  </div>
                  {isSubmenuOpen && (
                    <ul className="submenu list-unstyled">
                      <li className="mb-1">
                        <NavLink
                          to="/invite-user"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Manage Forms
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/invite-history"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Invite History
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Induction Dropdown */}
                <li className="nav-item has-submenu mb-1">
                  <div
                    className="nav-link d-flex justify-content-between align-items-center"
                    onClick={() => setIsInductionOpen(!isInductionOpen)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <Icon.BookOpen className="me-2" color="black" />
                      <span className="fw-medium text-black">Induction</span>
                    </div>
                    <span>{isInductionOpen ? "▾" : "▸"}</span>
                  </div>
                  {isInductionOpen && (
                    <ul className="submenu list-unstyled">
                      <li className="mb-1">
                        <NavLink
                          to="/inductions-search"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Induction Search
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/inductions-link"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Induction Link
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Induction Dropdown */}
                <li className="nav-item has-submenu mb-1">
                  <div
                    className="nav-link d-flex justify-content-between align-items-center"
                    onClick={() => setIsPending(!isPending)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <Icon.BookOpen className="me-2" color="black" />
                      <span className="fw-medium text-black">Pending Documents</span>
                    </div>
                    <span>{isPending ? "▾" : "▸"}</span>
                  </div>
                  {isPending && (
                    <ul className="submenu list-unstyled">
                      <li className="mb-1">
                        <NavLink
                          to="/company-pending-doc"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Company Documents
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/worker-pending-doc"
                          className={({ isActive }) =>
                            `submenu-link fw-medium ${isActive ? "text-white bg-dark px-2 py-1 rounded" : "text-black"}`
                          }
                        >
                          Worker Documents
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>
        </PerfectScrollbar>
      </nav>
    </div>
  );
}

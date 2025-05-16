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
import { NavLink, useParams } from "react-router-dom";
import * as Icon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export default function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarFolded, setIsSidebarFolded] = useState(true); // Set default to true
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const orgName = "superadmin";
  const handleToggle = () => {
    setIsToggled(!isToggled);
    document.body.classList.toggle("sidebar-folded", !isSidebarFolded);
    setIsSidebarFolded(!isSidebarFolded); // Toggle state for proper class control
  };

  const getRole = localStorage.getItem("role");
  console.log("Role:", getRole);

  useEffect(() => {
    const body = document.body;
    const sidebarFolded = "sidebar-folded";
    // Check if the sidebar is folded when the component mounts
    if (body.classList.contains(sidebarFolded)) {
      setIsSidebarFolded(true);
    }
  }, []);

  useEffect(() => {
    // Set the class when isSidebarFolded changes
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

  const textStyle = {
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "Segoe UI, sans-serif",
  };

  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar-header" style={{ backgroundColor: "#66d1d1" }}>
          <a href="#" className="sidebar-brand text-black" style={{ ...textStyle, fontSize: "18px", fontWeight: "600" }}>
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
                <li className="nav-item">
                  <NavLink to={`/${orgName}/dashboard`} className={navLinkClass}>
                    <Icon.Home className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/create-org" className={navLinkClass}>
                    <Icon.PlusCircle className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Create a new Organization</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/manage-org" className={navLinkClass}>
                    <Icon.Users className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Organizations Management</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/manage-subs" className={navLinkClass}>
                    <Icon.DollarSign className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Subscription Management</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/view-subscribers" className={navLinkClass}>
                    <Icon.BookOpen className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>View Subscribers & Plan D..</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/manage-enquire" className={navLinkClass}>
                    <Icon.MessageCircle className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Enquiry Management</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/account-setting" className={navLinkClass}>
                    <Icon.MessageCircle className="link-icon" color="black" />
                    <span className="link-title text-black" style={textStyle}>Account Setting</span>
                  </NavLink>
                </li>
              </ul>
            ) : <ul className="nav" style={{ backgroundColor: "#66d1d1" }}>
              <li className="nav-item">
                <NavLink to="/organization-dashboard" className={navLinkClass}>
                  <Icon.Home className="link-icon" color="black" />
                  <span className="link-title text-black" style={textStyle}>Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item has-submenu">
                <div
                  className="nav-link "
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                  style={{
                    cursor: "pointer",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon.Home className="link-icon me-2" color="black" />
                    <span className="link-title text-black">Prequalification</span>
                  </div>
                  <span className="dropdown-arrow">{isSubmenuOpen ? "▾" : "▸"}</span>
                </div>

                {isSubmenuOpen && (
                  <ul className="submenu">
                    <li>
                      <NavLink
                        to="/invite-user"
                        className={({ isActive }) =>
                          `submenu-link${isActive ? " active" : ""}`
                        }
                      >
                        Manage Forms
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/invite-history"
                        className={({ isActive }) =>
                          `submenu-link${isActive ? " active" : ""}`
                        }
                      >
                        Invite History
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

            </ul>}
          </div>
        </PerfectScrollbar>
      </nav>
    </div>
  );
}

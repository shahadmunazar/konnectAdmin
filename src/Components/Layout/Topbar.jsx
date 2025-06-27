import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Topbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  console.log("Token from localStorage:", token);

  const logoutSubmit = async (e) => {
    e.preventDefault();
    // navigate("/user/login");

    try {
      if (token) {
        const res = await axios.post(
          `${BASE_URL}/api/logout-for-all`,
          {}, // empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // ✅ Log success response
        console.log("Logout success response:", res.data.status);
        if (res.data.status == "200") {
          localStorage.removeItem("token");
          navigate("/user/login");
        } else {
          console.error("Logout failed:", res.data.message);
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/user/login");
  //   }
  // }, [token, navigate]);

  return (
    <nav className="navbar">
      <a href="#" className="sidebar-toggler">
        <i data-feather="menu"></i>
      </a>
      <div className="navbar-content">
        {/* <form className="search-form">
          <div className="input-group">
            <div className="input-group-text">
              <i data-feather="search"></i>
            </div>
            <input type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form> */}
        <ul className="navbar-nav">
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="flag-icon flag-icon-us mt-1" title="us"></i> <span className="ms-1 me-1 d-none d-md-inline-block">English</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="languageDropdown">
              <a href="{() => false}" className="dropdown-item py-2">
                <i className="flag-icon flag-icon-us" title="us" id="us"></i> <span className="ms-1"> English </span>
              </a>
              <a href="{() => false}" className="dropdown-item py-2">
                <i className="flag-icon flag-icon-fr" title="fr" id="fr"></i> <span className="ms-1"> French </span>
              </a>
              <a href="{() => false}" className="dropdown-item py-2">
                <i className="flag-icon flag-icon-de" title="de" id="de"></i> <span className="ms-1"> German </span>
              </a>
              <a href="{() => false}" className="dropdown-item py-2">
                <i className="flag-icon flag-icon-pt" title="pt" id="pt"></i> <span className="ms-1"> Portuguese </span>
              </a>
              <a href="{() => false}" className="dropdown-item py-2">
                <i className="flag-icon flag-icon-es" title="es" id="es"></i> <span className="ms-1"> Spanish </span>
              </a>
            </div>
          </li> */}
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="appsDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="grid"></i>
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="appsDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p className="mb-0 fw-bold">Web Apps</p>
                <a href="{() => false}" className="text-muted">
                  Edit
                </a>
              </div>
              <div className="row g-0 p-1">
                <div className="col-3 text-center">
                  <a href="../apps/chat.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70">
                    <i data-feather="message-square" className="icon-lg mb-1"></i>
                    <p className="tx-12">Chat</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a href="../apps/calendar.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70">
                    <i data-feather="calendar" className="icon-lg mb-1"></i>
                    <p className="tx-12">Calendar</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a href="../email/inbox.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70">
                    <i data-feather="mail" className="icon-lg mb-1"></i>
                    <p className="tx-12">Email</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a href="profile.html" className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70">
                    <i data-feather="instagram" className="icon-lg mb-1"></i>
                    <p className="tx-12">Profile</p>
                  </a>
                </div>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="{() => false}">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="messageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="mail"></i>
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="messageDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>9 New Messages</p>
                <a href="{() => false}" className="text-muted">
                  Clear all
                </a>
              </div>
              <div className="p-1">
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face2.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Leonardo Payne</p>
                      <p className="tx-12 text-muted">Project status</p>
                    </div>
                    <p className="tx-12 text-muted">2 min ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face3.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Carl Henson</p>
                      <p className="tx-12 text-muted">Client meeting</p>
                    </div>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face4.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Jensen Combs</p>
                      <p className="tx-12 text-muted">Project updates</p>
                    </div>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face5.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Amiah Burton</p>
                      <p className="tx-12 text-muted">Project deatline</p>
                    </div>
                    <p className="tx-12 text-muted">2 hrs ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face6.jpg" alt="userr" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Yaretzi Mayo</p>
                      <p className="tx-12 text-muted">New record</p>
                    </div>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="{() => false}">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i data-feather="bell"></i>
              <div className="indicator">
                <div className="circle"></div>
              </div>
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>6 New Notifications</p>
                <a href="{() => false}" className="text-muted">
                  Clear all
                </a>
              </div>
              <div className="p-1">
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="gift"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New Order Recieved</p>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="alert-circle"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Server Limit Reached!</p>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face6.jpg" alt="userr" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New customer registered</p>
                    <p className="tx-12 text-muted">2 sec ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="layers"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Apps are ready for update</p>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>
                </a>
                <a href="{() => false}" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="icon-sm text-white" data-feather="download"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Download completed</p>
                    <p className="tx-12 text-muted">6 hrs ago</p>
                  </div>
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="{() => false}">View all</a>
              </div>
            </div>
          </li> */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="wd-30 ht-30 rounded-circle" src="assets/images/faces/face1.jpg" alt="profile" />
            </a>
            <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
              <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                <div className="mb-3">
                  <img className="wd-80 ht-80 rounded-circle" src={logo} alt="" />
                </div>
                {/* <div className="text-center">
                  <p className="tx-16 fw-bolder">{auth_name}</p>
                  <p className="tx-12 text-muted">{auth_email}</p>
                </div> */}
              </div>
              <ul className="list-unstyled p-1">
                <li className="dropdown-item py-2">
                  <a href="" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="user"></i>
                    <span>Profile</span>
                  </a>
                </li>
                {/* <li className="dropdown-item py-2">
                  <a href="" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="edit"></i>
                    <span>Edit Profile</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="{() => false}" className="text-body ms-0">
                    <i className="me-2 icon-md" data-feather="repeat"></i>
                    <span>Switch User</span>
                  </a>
                </li> */}
                <li className="dropdown-item py-2 cursor-pointer text-center" onClick={logoutSubmit}>

                  <i className="me-2 icon-md" data-feather="log-out"></i>
                  <span>Log Out</span>

                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

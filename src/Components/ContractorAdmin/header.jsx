import React, { useState } from "react";
import logo from "../../assets/logoRR.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import {
  faAngleDown,
  faHamburger,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
function Header() {
  const [isHelpSliderVisible, setIsHelpSliderVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState({
    detailOne: false,
    detailTwo: false,
    detailThree: false,
  });
  const [isNavVisible, setIsNavVisible] = useState(false);
  function detailHandler(detail) {
    setIsDetailVisible(() => ({
      ...isDetailVisible,
      [detail]: !isDetailVisible[detail],
    }));
  }

  function menuHandler() {
    setIsNavVisible(() => !isNavVisible)(
      isHelpSliderVisible ? setIsHelpSliderVisible(false) : ""
    );
  }
  console.log(isNavVisible);
  return (
    <>
      {/* Nav Container */}
      <div>
        <FontAwesomeIcon
          icon={faHamburger}
          className={`d-lg-none fs-1 position-fixed top-0 start-0 m-3 text-primary ${isNavVisible ? "d-none" : ""}`}
          onClick={menuHandler}
        />
      </div>
      <div
        className={`header-container`}
        style={{
          transform: `${isNavVisible ? "translateX(0%)" : "translateX(-100%)"}`,
        }}
      >
        {/* nav image  */}
        <div>
          <img src={logo} width={120} />
        </div>
        {/* nav links starts from here */}
        <div className="position-relative">
          <ul className="list-unstyled d-flex flex-column align-items-start gap-3 my-5 px-2">
            <li className="w-100">
              <NavLink
                to="/Worker"
                className={({ isActive }) =>
                  `fw-light fs-6 nav-link-custom ${
                    isActive ? "active-link" : "text-white"
                  }`
                }
                onClick={menuHandler}
              >
                Workers
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="/company-info"
                className={({ isActive }) =>
                  `fw-light fs-6 nav-link-custom ${
                    isActive ? "active-link" : "text-white"
                  }`
                }
                 onClick={menuHandler}
              >
                Company Setup
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="/site-history"
                className={({ isActive }) =>
                  `fw-light fs-6 nav-link-custom ${
                    isActive ? "active-link" : "text-white"
                  }`
                }
                 onClick={menuHandler}
              >
                Site History
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="/permit-management"
                className={({ isActive }) =>
                  `fw-light fs-6 nav-link-custom ${
                    isActive ? "active-link" : "text-white"
                  }`
                }
                 onClick={menuHandler}
              >
                Permits
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="/compliance"
                className={({ isActive }) =>
                  `fw-light fs-6 nav-link-custom ${
                    isActive ? "active-link" : "text-white"
                  }`
                }
                 onClick={menuHandler}
              >
                Compliance
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column gap-3">
          <h5 className="fs-4 text-primary">Contractor Portal</h5>
          <div className="d-flex align-items-center gap-2 bg-white py-2 px-1 text-primary">
            <FontAwesomeIcon icon={faUser} size="2xl" />
            <p className="fw-bold">Account</p>
          </div>
        </div>
      </div>
      {/*Help slider start here */}
      <div
        className={`position-fixed top-0 end-0 h-100 help-slider ${
          isHelpSliderVisible ? "help-slider-visible" : "help-slider-novisible"
        }`}
      >
        {/* slider tab */}
        <div
          className={`d-flex  justify-content-center align-items-center rounded-start help-slider-tab ${
            isHelpSliderVisible
              ? "help-sliderTab-visible"
              : "help-sliderTab-novisible"
          }`}
          onClick={() =>
            setIsHelpSliderVisible(
              (isHelpSliderVisible) => !isHelpSliderVisible
            )(isNavVisible ? setIsNavVisible(false) : "")
          }
        >
          <p className="text-center" style={{ transform: "rotate(270deg)" }}>
            help
          </p>
        </div>
        {/* slider header */}
        <div className="p-2 slider-header">
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faXmark}
            size="2xl"
            onClick={() =>
              setIsHelpSliderVisible(
                (isHelpSliderVisible) => !isHelpSliderVisible
              )
            }
          />
          <div className="slider-heading">
            <p className="fs-3 p-2 fw-semiBold text-start">Help</p>
          </div>
        </div>
        {/* sldier detail */}
        <div className="p-3">
          {/* detail one */}
          <div className="bg-white mt-4 p-2 lightBorder">
            <div
              className="d-flex justify-content-between cursor-pointer p-3"
              onClick={() => detailHandler("detailOne")}
            >
              <p className="fs-5">Managing Workers</p>
              <FontAwesomeIcon icon={faAngleDown} size="xl" />
            </div>
            <div
              className="p-2 overflow-hidden tran"
              style={{
                maxHeight: isDetailVisible.detailOne ? "200px" : "0px",
                transition: "all 0.9s",
              }}
            >
              <div className="text-start mt-1">
                <p>
                  Learn how to update workers' details and view their completed
                  inductions and credentials.
                </p>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3 me-4">
                <a href="" className="help-slider-button">
                  more
                </a>
                <a href="" className="help-slider-button">
                  watch
                </a>
              </div>
            </div>
          </div>
          {/* detail two */}
          <div className="bg-white mt-4 p-2 lightBorder">
            <div
              className="d-flex justify-content-between cursor-pointer p-3"
              onClick={() => detailHandler("detailTwo")}
            >
              <p className="fs-5">Managing Workers</p>
              <FontAwesomeIcon icon={faAngleDown} size="xl" />
            </div>
            <div
              className="p-2 overflow-hidden tran"
              style={{
                maxHeight: isDetailVisible.detailTwo ? "200px" : "0px",
                transition: "all 0.9s",
              }}
            >
              <div className="text-start mt-1">
                <p>
                  Learn how to update workers' details and view their completed
                  inductions and credentials.
                </p>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3 me-4">
                <a href="" className="help-slider-button">
                  more
                </a>
                <a href="" className="help-slider-button">
                  watch
                </a>
              </div>
            </div>
          </div>
          {/* detail three */}
          <div className="bg-white mt-4 p-2 lightBorder">
            <div
              className="d-flex justify-content-between cursor-pointer p-3"
              onClick={() => detailHandler("detailThree")}
            >
              <p className="fs-5">Managing Workers</p>
              <FontAwesomeIcon icon={faAngleDown} size="xl" />
            </div>
            <div
              className="p-2 overflow-hidden tran"
              style={{
                maxHeight: isDetailVisible.detailThree ? "200px" : "0px",
                transition: "all 0.9s",
              }}
            >
              <div className="text-start mt-1">
                <p>
                  Learn how to update workers' details and view their completed
                  inductions and credentials.
                </p>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3 me-4">
                <a href="" className="help-slider-button">
                  more
                </a>
                <a href="" className="help-slider-button">
                  watch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

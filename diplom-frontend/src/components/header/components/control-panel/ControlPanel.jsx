import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../selectors";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ROLE } from "../../../../assets/constants";
import { logout } from "../../../../actions";

const ControlPanelContainer = ({ className }) => {
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  return (
    <div className={className}>
      <div className="user">
        {roleId === ROLE.GUEST ? (
          <Link to="/login">
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{ color: "rgb(255, 67, 68)" }}
            />
          </Link>
        ) : (
          <div className="login-panel">
            {login}
            <FontAwesomeIcon
              size="lg"
              icon={faArrowRightFromBracket}
              onClick={() => {
                sessionStorage.removeItem("userData");
                dispatch(logout());
              }}
              style={{ color: "rgb(255, 67, 68)" }}
            />
          </div>
        )}
      </div>
      <div className="shopping-bag">
        <Link to="/bag">
          <FontAwesomeIcon
            size="lg"
            icon={faBagShopping}
            style={{ color: "rgb(255, 67, 68)" }}
          />
        </Link>
      </div>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  justify-content: space-evenly;
  width: 100px;
  margin-right: 50px;

  .login-panel {
    display: flex;
    margin-right: 10px;
    gap: 10px;
  }
`;

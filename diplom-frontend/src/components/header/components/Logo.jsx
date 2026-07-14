import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link className="logo-link" to="/">
        PUDRA
      </Link>
    </div>
  );
};

export const Logo = styled(LogoContainer)`
  font-size: 32px;
  margin-right: 650px;

  .logo-link {
    text-decoration: none;
    &:visited {
      color: var(--brand-color);
    }
  }
`;

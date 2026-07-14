import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = ({ className }) => {
  return (
    <footer className={className}>
      <div>
        <Link className="contacts" to="/">
          КОНТАКТЫ
        </Link>
      </div>
      <div>
        <Link className="brand" to="/">
          БРЕНД
        </Link>
      </div>
    </footer>
  );
};

export const Footer = styled(FooterContainer)`
  background-color: #ffb5b5;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100px;

  .brand,
  .contacts {
    color: var(--choko-color);
    margin: 10px;
    &:hover {
      color: var(--brand-color-hover);
    }
  }
`;

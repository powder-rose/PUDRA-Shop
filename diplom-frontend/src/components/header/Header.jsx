import styled from "styled-components";
import { Logo } from "./components/Logo.jsx";
import { ControlPanel } from "./components/control-panel";

const HeaderContainer = ({ className }) => {
  return (
    <header className={className}>
      <Logo />
      <ControlPanel />
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100px;
  background-color: #ffdbe5;
  font-family: "Aboreto", system-ui;
  color: var(--brand-color);
`;

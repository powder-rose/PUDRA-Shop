import styled from "styled-components";

import { Search } from "../../components";
import { MainContent } from "../../components/main-content/MainContent.jsx";
import { Catalog } from "../catalog/Catalog.jsx";
import { CatalogBlock } from "./components/CatalogBlock.jsx";

const MainPageContainer = ({ className }) => {
  return (
    <div className={className}>
      <Search />
      <div className="hero">
        <CatalogBlock />

        <MainContent />
      </div>
      <Catalog />
    </div>
  );
};

export const MainPage = styled(MainPageContainer)`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  .hero {
    display: flex;
    align-items: stretch;

    width: 100%;
    padding-top: 40px;
  }
`;

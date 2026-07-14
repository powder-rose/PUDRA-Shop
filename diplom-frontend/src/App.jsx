import styled from "styled-components";
import { Header, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  Authorization,
  Registration,
  SettingsPage,
  Product,
  MainPage,
  Catalog,
} from "./pages";
import { useLayoutEffect } from "react";
import { setUser } from "./actions/index.js";
import { useDispatch } from "react-redux";
import { Bag } from "./pages/bag/Bag.jsx";
import { PrivateRoute } from "./components/private-route/PrivateRoute.jsx";
import { ROLE } from "./assets/constants";

const Page = styled.div`
  padding-top: 100px;
  min-height: 88vh;
`;

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      dispatch(setUser({ isAuthChecked: true }));
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
        isAuthChecked: true,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Product />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Authorization />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route path="/bag" element={<Bag />} />
          <Route path="*" element={<div>Такой страницы нет</div>} />
        </Routes>
      </Page>
      <Footer />
    </>
  );
}

export default App;

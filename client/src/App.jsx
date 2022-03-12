import { Route, Routes } from "react-router-dom";

import { Container } from "react-bulma-components";

import { FOSNavbar } from "./organisms/FOSNavbar";
import { FOSFooter } from "./organisms/FOSFooter.jsx";

import { AuthProvider } from "./components/AuthProvider";
import { MessageProvider } from "./components/MessageProvider";
import { MessageContainer } from "./organisms/MessageContainer";

import { RequireAuth } from "./components/RequireAuth";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dalyviai } from "./pages/Dalyviai";

import 'typeface-roboto';
import './App.scss';
import { AddDalyvis } from "./components/AddDalyvis";

function App() {

  return (

    <AuthProvider>
      <MessageProvider>
        <Container className="main-container">

          <FOSNavbar />

          <MessageContainer />

          <Container className="content-container">
            <Routes>

              <Route exact path="/" element={
                <RequireAuth>
                  <Dalyviai />
                </RequireAuth>
              } />

              <Route path="/add" element={
                <RequireAuth>
                  {<AddDalyvis />}
                </RequireAuth>
              } />
              
              <Route exact path="/login" element={
                <Login />
              } />

              <Route exact path="/register" element={
                <Register />
              } />

            </Routes>

          </Container>

          <FOSFooter />

        </Container>

      </MessageProvider>
    </AuthProvider>
  );
}

export default App;


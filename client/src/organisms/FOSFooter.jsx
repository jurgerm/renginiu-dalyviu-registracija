import { Footer, Container, Content } from "react-bulma-components";

export const FOSFooter = () => {
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center'}}>
          © Jurgita Germanavičienė 2022. Visos teisės saugomos.
        </Content>
      </Container>
    </Footer>
  );
};

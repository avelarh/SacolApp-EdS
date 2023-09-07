import theme from "../../global/styles/theme";
import { Container, LoadingIcon } from "./styles";

export function Loading() {
  return (
    <Container>
      <LoadingIcon size="large" color={theme.colors.primary_light} />
    </Container>
  );
}

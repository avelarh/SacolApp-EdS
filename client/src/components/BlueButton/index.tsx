import { ButtonContainer, ButtonContainerBig, ButtonText, ButtonTextBig } from "./styles";

export interface BlueButtonProps {
  buttonText: string;
  action: () => void;
  big?: boolean;
}

export function BlueButton({ buttonText, action, big }: BlueButtonProps) {
  if (big) {
    return (
      <ButtonContainerBig onPress={() => action()}>
        <ButtonTextBig>{buttonText}</ButtonTextBig>
      </ButtonContainerBig>
    );
  }
  return (
    <ButtonContainer onPress={() => action()}>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonContainer>
  );
}

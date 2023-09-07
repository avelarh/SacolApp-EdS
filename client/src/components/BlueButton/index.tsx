import { ButtonContainer, ButtonText } from "./styles";

export interface BlueButtonProps {
  buttonText: string;
  action: () => void;
}

export function BlueButton({ buttonText, action }: BlueButtonProps) {
  return (
    <ButtonContainer onPress={() => action()}>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonContainer>
  );
}

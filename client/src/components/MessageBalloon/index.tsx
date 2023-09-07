import {
  BalloonText,
  ButtonText,
  WhiteBackground,
  ButtonsContainer,
  MiddleLine,
  ButtonTouchable,
  ButtonTouchableFlex,
  Title,
  BalloonContainer,
  BackgroundDark,
} from "./styles";

type MessageBalloon = {
  redConfirm?: boolean;
  title: string;
  text: string;
  hasGoBackButton?: boolean;
  handleConfirmButton: () => void;
  handleCancelButton?: () => void;
};

export function MessageBalloon({
  title,
  text,
  hasGoBackButton,
  handleConfirmButton,
  handleCancelButton = () => {},
  redConfirm = false,
}: MessageBalloon) {
  if (!hasGoBackButton) {
    return (
      <>
        <BalloonContainer>
          <WhiteBackground>
            <Title>{title}</Title>
            <BalloonText>{text}</BalloonText>
            <ButtonsContainer>
              <ButtonTouchable onPress={() => handleConfirmButton()}>
                <ButtonText>OK</ButtonText>
              </ButtonTouchable>
            </ButtonsContainer>
          </WhiteBackground>
        </BalloonContainer>
        <BackgroundDark activeOpacity={0.3} />
      </>
    );
  }

  return (
    <>
      <BalloonContainer>
        <WhiteBackground>
          <Title>{title}</Title>
          <BalloonText>{text}</BalloonText>
          <ButtonsContainer>
            <ButtonTouchableFlex onPress={() => handleCancelButton()}>
              <ButtonText>Cancelar</ButtonText>
            </ButtonTouchableFlex>
            <MiddleLine />
            <ButtonTouchableFlex onPress={() => handleConfirmButton()}>
              <ButtonText redConfirm={redConfirm}>Confirmar</ButtonText>
            </ButtonTouchableFlex>
          </ButtonsContainer>
        </WhiteBackground>
      </BalloonContainer>
      <BackgroundDark
        activeOpacity={0.3}
        onPress={() => handleCancelButton()}
      />
    </>
  );
}

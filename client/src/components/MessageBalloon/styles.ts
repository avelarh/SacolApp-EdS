import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

interface ButtonTextProps {
  redConfirm?: boolean;
}

export const BackgroundDark = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  background-color: black;
  opacity: 0.3;
`;

export const BalloonContainer = styled.View`
  position: absolute;
  top: ${hp("40%")}px;
  z-index: 10;
`;

export const WhiteBackground = styled.View`
  width: ${RFValue(200)}px;
  background-color: ${({ theme }) => theme.colors.ballonBackground};
  border-radius: 10px;
  z-index: 10;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  text-align: center;
  margin-top: ${RFValue(10)}px;
`;

export const BalloonText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
  padding: ${RFValue(10)}px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-top-width: 1px;
  border-top-color: gray;
`;

export const MiddleLine = styled.View`
  background: gray;
  height: 100%;
  width: 1px;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${(props) =>
    props.redConfirm == true
      ? "#FF3B30"
      : ({ theme }) => theme.colors.light_blue};
  font-size: ${RFValue(14)}px;
  text-align: center;
  margin: auto;
`;

export const ButtonTouchable = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: 100%;
`;

export const ButtonTouchableFlex = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: 50%;
`;

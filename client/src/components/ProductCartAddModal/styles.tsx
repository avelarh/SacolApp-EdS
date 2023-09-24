import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const BackgroundDark = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: black;
  opacity: 0.3;
`;

export const Container = styled.View`
  width: 88%;
  height: 60%;
  background-color: #FAFAF7;
  z-index: 3;
  position: absolute;
  top: 20%;
  display: flex;
  align-items: center;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-color: gray;
  border-bottom-width: 2px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
`;

export const XWrapper = styled.View`
  top: 10px;
  right: 10px;
  width: 100%;
  align-items: flex-end;
`;

export const XTouchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 3px;
`;

export const InputTextWrapper = styled.TouchableOpacity`
  margin-bottom: 30px;
  width: 90%;
`;

export const TextAreaWrapper = styled.View`
  margin-bottom: 30px;
  width: 90%;
  height: 25%;
`;

export const TextArea = styled.Text`
  background-color: #f0f0f0;
  width: 100%;
  height: 90%;
  border-radius: 10px;
  padding-left: 10px;
  padding-top: 5px;
`;

export const TextInput = styled.Text`
  display: flex;
  flex-direction: row;
  border-bottom-width: 0.8px;
  border-bottom-color: #333333;
  background-color: #FAFAF7;
  width: 100%;
`;

export const ButtonWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;
import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 0.3;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin: auto;
  z-index: 10;
`;

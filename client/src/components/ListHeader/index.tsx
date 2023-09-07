import { TouchableOpacity } from "react-native";

import { LeftText, HorizontalLine, RightText } from "./styles";

interface ListHeaderProps {
  leftText: string;
  rightText?: string;
  onRightTextPress?: () => void;
}

export function ListHeader({
  leftText,
  rightText,
  onRightTextPress,
}: ListHeaderProps) {
  return (
    <>
      <HorizontalLine>
        <LeftText>{leftText}</LeftText>
        {rightText && (
          <>
            <TouchableOpacity onPress={onRightTextPress}>
              <RightText>{rightText}</RightText>
            </TouchableOpacity>
          </>
        )}
      </HorizontalLine>
    </>
  );
}

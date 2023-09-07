import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import { BackButtonView, Touchable } from "./styles";

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  if (onPress)
    return (
      <BackButtonView>
        <Touchable onPress={onPress}>
          <Entypo name="chevron-left" size={36} color="#007AFF" />
        </Touchable>
      </BackButtonView>
    );
  else
    return (
      <BackButtonView>
        <Touchable onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={36} color="#007AFF" />
        </Touchable>
      </BackButtonView>
    );
}

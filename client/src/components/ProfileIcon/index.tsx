import { ProfileIconView, Touchable } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

export function ProfileIcon() {
  const navigation = useNavigation();

  return (
    <ProfileIconView>
      <Touchable onPress={() => navigation.navigate("Profile")}>
        <Octicons name="person" size={32} color="#14145A" />
      </Touchable>
    </ProfileIconView>
  );
}

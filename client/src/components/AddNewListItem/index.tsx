import { Ionicons } from "@expo/vector-icons";
import { BlueText, TouchableContainer } from "./styles";

interface AddNewListItemProps {
  text: string;
  onPress: () => void;
}

export default function AddNewListItem({ text, onPress }: AddNewListItemProps) {
  return (
    <TouchableContainer onPress={onPress}>
      <Ionicons name="add-circle-sharp" size={28} color="#24203B" />
      <BlueText>{text}</BlueText>
    </TouchableContainer>
  );
}

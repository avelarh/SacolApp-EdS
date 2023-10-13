import { Image, View } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Title, Subtitle, Row, Container } from "./styles";

interface ListItem {
  title: string;
  subtitle?: string;
  date?: string;
  status?: string;
  onPress: () => void;
  amount?: boolean;
}

export function ListItem({
  title,
  status,
  date,
  onPress,
  subtitle,
  amount,
}: ListItem) {
  function limitarTexto(title: string, limite: number) {
    if (title.length > limite) {
      return title.substring(0, limite) + "...";
    } else {
      return title;
    }
  }

  if (amount) {
    return (
      <Container onPress={onPress}>
        <Row>
          <View>
            <Title>{limitarTexto(title, 17)}</Title>
            <Subtitle>Quantidade: {date}</Subtitle>
          </View>
          <Entypo name="chevron-small-right" size={26} color="#3C3C4380" />
        </Row>
      </Container>
    );
  }

  return (
    <Container onPress={onPress}>
      <Row>
        <View>
          <Title>{limitarTexto(title, 17)}</Title>
          <Subtitle>id: {date}</Subtitle>
        </View>
        <Entypo name="chevron-small-right" size={26} color="#3C3C4380" />
      </Row>
    </Container>
  );
}

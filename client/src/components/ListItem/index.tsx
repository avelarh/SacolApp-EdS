import { Image, View } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Title, Subtitle, Row, Container } from "./styles";

interface ListItem {
  title: string;
  subtitle?: string;
  date?: string;
  status?: string;
  onPress: () => void;
}

export function ListItem({ title, status, date, onPress, subtitle }: ListItem) {
  function limitarTexto(title: string, limite: number) {
    if (title.length > limite) {
      return title.substring(0, limite) + "...";
    } else {
      return title;
    }
  }

  return (
    <Container onPress={onPress}>
      <Row>
        <View>
          <Title>{limitarTexto(title, 17)}</Title>
          <Subtitle>Data: {date}</Subtitle>
        </View>
        <Entypo name="chevron-small-right" size={26} color="#3C3C4380" />
      </Row>
    </Container>
  );
}
import { useEffect, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../services/routes";
import { ProfileIcon } from "../../components/ProfileIcon";
import AddNewListItem from "../../components/AddNewListItem";
import { ListHeader } from "../../components/ListHeader";
import { ListItem } from "../../components/ListItem";
import { Loading } from "../../components/Loading";
/* import Select from "../../components/Select"; */

import {
  AddItemWrapper,
  BackgroundDark,
  Container,
  FlatList,
  Subtitle,
  TitleWrapper,
  Title,
} from "./styles";
import { ProductInfoModal } from "../../components/ProductInfoModal";
import { ProductInfoAdminModal } from "../../components/ProductInfoAdminModal";
import { ProductCartAddModal } from "../../components/ProductCartAddModal";

type ScreenRouteProp = RouteProp<RootStackParamList, "HomePage">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

interface FilterType {
  label: string;
  value: string;
}

export function HomePage({ navigation, route }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [noProperties, setNoProperties] = useState<boolean>(false);

  const [newRoomModal, setNewProductModal] = useState<boolean>(false);

  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  const [selectedFilter, setSelectedFilter] = useState<string>("Nenhum");

  const getProperties = async (filter: string) => {
    try {
      setIsLoading(true);

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ProductCartAddModal></ProductCartAddModal>
      {dropdownActive && (
        <BackgroundDark
          activeOpacity={0.3}
          onPress={() => setDropdownActive(false)}
        />
      )}
      <ProfileIcon />
      <TitleWrapper>
        <Title>Carrinho</Title>
      </TitleWrapper>

      {isLoading && <Loading />}

      <>
        <Subtitle>Clique em um produto para editar</Subtitle>
        <AddItemWrapper>
          <AddNewListItem
            onPress={() => setNewProductModal(true)}
            text="Adicionar novo produto"
          />
        </AddItemWrapper>
        <>
          <ListHeader leftText="Produtos do carrinho" />
        </>
        {/* <FlatList
            style={{ marginBottom: 20 }}
            data={properties}
            renderItem={({ item }: ListRenderItemInfo<PropertyDataGet>) =>
              user?.role != "admin" ? (
                <ListItem
                  type={"withArrow"}
                  title={item.ownerName}
                  date={convertDate(item.createdAt)}
                  onPress={() => {
                    navigation.navigate("PropertyOptions", {
                      propertyID: item.id,
                    } as any);
                  }}
                />
              ) : (
                <ListItem
                  type={"withArrow"}
                  title={item.ownerName}
                  date={convertDate(item.createdAt)}
                  onPress={() => {
                    navigation.navigate("PropertyOptions", {
                      propertyID: item.id,
                    } as any);
                  }}
                />
              )
            }
            keyExtractor={(item: PropertyDataGet) => item.id.toString()}
          /> */}
      </>
    </Container>
  );
}
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
import { ProductModal } from "../../components/ProductModal";
import { addProduct } from "../../services/requests/Product/AddProduct";
import { Product } from "../../services/interfaces";
import { productList } from "../../services/requests/Product/ProductList";
import { ProductInfoModal } from "../../components/ProductInfoModal";

type ScreenRouteProp = RouteProp<RootStackParamList, "HomeAdmin">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeAdmin"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

interface FilterType {
  label: string;
  value: string;
}

export function HomeAdmin({ navigation, route }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [noProperties, setNoProperties] = useState<boolean>(false);

  const [newProductModal, setNewProductModal] = useState<boolean>(false);

  const [productInfo, setProductInfo] = useState<boolean>(false);

  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  const [selectedFilter, setSelectedFilter] = useState<string>("Nenhum");

  const [productChoice, setProductChoice] = useState<string>("");

  const [data, setData] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productList();
      if (data) {
        setData(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {newProductModal && (
        <ProductModal
          setVisibility={setNewProductModal}
          onSave={() => getProducts}
        ></ProductModal>
      )}
      {productInfo && (
        <ProductInfoModal
          setVisibility={setNewProductModal}
          onSave={() => getProducts}
          name={productChoice}
        ></ProductInfoModal>
      )}
      {dropdownActive && (
        <BackgroundDark
          activeOpacity={0.3}
          onPress={() => setDropdownActive(false)}
        />
      )}
      <ProfileIcon />
      <TitleWrapper>
        <Title>Produtos cadastrados</Title>
      </TitleWrapper>

      {isLoading && <Loading />}

      <>
        <Subtitle>Clique em um produto para editar</Subtitle>
        <AddItemWrapper>
          <AddNewListItem
            onPress={() => setNewProductModal(true)}
            text="Adicionar novo produto ao sistema"
          />
        </AddItemWrapper>
        <>
          <ListHeader leftText="Produtos cadastrados do sistema" />
        </>
        <FlatList
          style={{ marginBottom: 20 }}
          data={data}
          renderItem={({ item }: ListRenderItemInfo<Product>) => (
            <ListItem
              title={item.name}
              date={item.price.toString()}
              onPress={() => {
                setProductChoice(item.name);
                setProductInfo(true);
              }}
            />
          )}
          keyExtractor={(item: Product) => item.name}
        />
      </>
    </Container>
  );
}

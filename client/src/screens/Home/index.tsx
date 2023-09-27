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
import { Product, ProductCart } from "../../services/interfaces";
import { productListCart } from "../../services/requests/Cart/ListProductsCart";
import { productList } from "../../services/requests/Product/ProductList";

type ScreenRouteProp = RouteProp<RootStackParamList, "HomePage">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export function HomePage({ navigation, route }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<boolean>(false);

  const [data, setData] = useState<ProductCart[]>([]);
  const [storage, setStorage] = useState<Product[]>([]);

  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  const [idChoice, setIdChoice] = useState<number>(0);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productListCart();
      console.log(data);
      if (data) {
        setData(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  const getProductsStore = async () => {
    try {
      setIsLoading(true);
      const data = await productList();
      if (data) {
        setStorage(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getProductsStore();
  }, []);

  return (
    <Container>
      {newProductModal && (
        <ProductCartAddModal
          products={storage}
          setVisibility={setNewProductModal}
          onSave={() => getProducts()}
          id={idChoice}
        />
      )}

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
        <FlatList
          style={{ marginBottom: 20 }}
          data={data}
          renderItem={({ item }: ListRenderItemInfo<ProductCart>) => (
            <ListItem
              title={item.amount}
              date={item.productId.toString()}
              onPress={() => {
                setIdChoice(item.productId);
                setProductInfo(true);
              }}
            />
          )}
        />
      </>
    </Container>
  );
}

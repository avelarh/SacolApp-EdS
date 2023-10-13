import {
  BackgroundDark,
  ButtonWrapper,
  Container,
  InputTextWrapper,
  Row,
  TextArea,
  TextAreaWrapper,
  Title,
  XTouchable,
  TextInput,
  XWrapper,
} from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loading } from "../Loading";
import { AntDesign } from "@expo/vector-icons";

import { BlueButton } from "../BlueButton";
import { MessageBalloon } from "../MessageBalloon";
import { Product, ProductCart } from "../../services/interfaces";
import { SinapiField } from "../SinapiFIeld";
import { addProduct } from "../../services/requests/Product/AddProduct";
import { Dropdown } from "../Dropdown";
import { addProductCart } from "../../services/requests/Cart/AddProductCart";
import { productListCart } from "../../services/requests/Cart/ListProductsCart";
import { getProduct } from "../../services/requests/Product/GetProduct";

interface Props {
  onSave: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  id: number;
  products: Product[];
}

export function ProductCartAddModal({
  setVisibility,
  onSave,
  products,
}: Props) {
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [productChoice, setProductChoice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductCart>({
    productId: 0,
    amount: 1,
    name: "",
    price: 0,
    description: "",
  });

  function updateProduct(newProduct: Partial<ProductCart>) {
    if (!product) return;
    setProduct({ ...product, ...newProduct });
  }

  function IsThereEmptyField() {
    if (product.productId == 0 || product.amount == 0) {
      return true;
    }
    return false;
  }

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProduct(productChoice);
      if (data) {
        updateProduct(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    product.productId = productChoice;
  }, [productChoice]);

  async function handleAddProduct() {
    if (IsThereEmptyField()) {
      setMessage(true);
      return;
    }

    try {
      setIsLoading(true);
      await addProductCart(product);
      onSave();
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  return (
    <>
      {notSavedDataMsg && (
        <MessageBalloon
          hasGoBackButton
          title="Atenção"
          text="Um ou mais itens que não foram salvos serão perdidos com essa ação."
          handleCancelButton={() => setNotSavedDataMsg(false)}
          handleConfirmButton={() => {
            setNotSavedDataMsg(false);
            setVisibility(false);
          }}
        />
      )}
      {isLoading && <Loading />}
      <BackgroundDark
        activeOpacity={0.3}
        onPress={() => setNotSavedDataMsg(true)}
      />

      <Container>
        <LinearGradient
          style={{
            top: 0,
            position: "absolute",
            height: "1.5%",
            width: "100%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          colors={["#342D63", "#342D49"]}
          end={{ x: 0.6, y: 0 }}
        />

        <XWrapper>
          <XTouchable onPress={() => setNotSavedDataMsg(true)}>
            <AntDesign name="close" size={24} color="#AEAEB2" />
          </XTouchable>
        </XWrapper>

        <InputTextWrapper>
          <Dropdown
            placeholder="Selecione um produto"
            width="80"
            setData={setProductChoice}
            items={products}
          ></Dropdown>
        </InputTextWrapper>

        <TextAreaWrapper>
          <Row>
            <Title>Descrição</Title>
          </Row>
          <TextArea style={{ textAlignVertical: "top" }}>
            {product.description}
          </TextArea>
        </TextAreaWrapper>

        <SinapiField
          smallFont
          placeholder=""
          label="Preço unitário"
          value={"R$" + product.price.toString()}
          onChange={(text: any) => {
            updateProduct({ price: text });
          }}
        />

        <SinapiField
          smallFont
          editable
          placeholder="0"
          label="Quantidade"
          value={product.amount.toString()}
          onChange={(text: any) => {
            updateProduct({ amount: text });
          }}
        />

        <SinapiField
          smallFont
          placeholder=""
          label="Total"
          value={"R$" + (product.price * product.amount).toString()}
          onChange={(text: any) => {
            updateProduct({ price: text });
          }}
        />

        <ButtonWrapper>
          <BlueButton action={handleAddProduct} buttonText="Salvar" />
        </ButtonWrapper>
      </Container>

      {message && (
        <MessageBalloon
          title="Atenção"
          text="Você precisa preencher todos campos e colocar uma quantidade válida!"
          handleConfirmButton={() => {
            setMessage(false);
          }}
        />
      )}
    </>
  );
}

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
  DeleteAreaIcon,
} from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loading } from "../Loading";
import { AntDesign } from "@expo/vector-icons";

import { BlueButton } from "../BlueButton";
import { MessageBalloon } from "../MessageBalloon";
import { ProductCart } from "../../services/interfaces";
import { SinapiField } from "../SinapiFIeld";
import { addProduct } from "../../services/requests/Product/AddProduct";
import { Image } from "react-native";
import { getProductCart } from "../../services/requests/Cart/GetProductCart";
import { updateProductCart } from "../../services/requests/Cart/UpdateProductCart";
import { deleteProductCart } from "../../services/requests/Cart/DeleteProductCart";

interface Props {
  onSave: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export function ProductInfoModal({ setVisibility, onSave, id }: Props) {
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [confirmExclusion, setConfirmExclusion] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductCart>({
    productId: 0,
    amount: 0,
    id: 0,
    Product: { description: "", id: 0, name: "", price: 0 },
  });

  function updateProduct(newProduct: Partial<ProductCart>) {
    if (!product) return;
    setProduct({ ...product, ...newProduct });
    setHasUpdate(true);
  }

  function IsThereEmptyField() {
    if (
      product.Product.name == "" ||
      product.Product.description == "" ||
      product.Product.price == 0
    ) {
      return true;
    }
    return false;
  }

  async function handleUpdateProduct() {
    if (IsThereEmptyField()) {
      setMessage(true);
      return;
    }

    try {
      setIsLoading(true);
      const data = await updateProductCart(id, product);
      onSave();
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteProductCart(id);
      onSave();
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  async function getInfo() {
    try {
      setIsLoading(true);
      const data = await getProductCart(id);
      if (data) {
        setProduct(data.cartItem);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

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
          <Title>Nome</Title>
          <TextInput>{product.Product.name}</TextInput>
        </InputTextWrapper>

        <TextAreaWrapper>
          <Row>
            <Title>Descrição</Title>
          </Row>
          <TextArea style={{ textAlignVertical: "top" }}>
            {product.Product.description}
          </TextArea>
        </TextAreaWrapper>

        <SinapiField
          smallFont
          placeholder="R$00,00"
          label="Preço unitário"
          value={"R$" + product.Product.price.toString()}
          /* onChange={(text: any) => {
            updateProduct({ Product: text });
          }} */
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
          placeholder="R$00,00"
          label="Total"
          value={"R$" + (product.Product.price * product.amount).toString()}
          /* onChange={(text: any) => {
            updateProduct({ Product: text });
          }} */
        />

        
          <ButtonWrapper>
            <BlueButton action={handleUpdateProduct} buttonText="Salvar" />
            <DeleteAreaIcon onPress={() => setConfirmExclusion(true)}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../assets/delete-icon.png")}
              />
            </DeleteAreaIcon>
          </ButtonWrapper>
      </Container>
      {message && (
        <MessageBalloon
          title="Atenção"
          text="Você precisa preencher todos campos!"
          handleConfirmButton={() => {
            setMessage(false);
          }}
        />
      )}
      {confirmExclusion && (
        <MessageBalloon
          hasGoBackButton
          title="Atenção!"
          text="Tem certeza que deseja excluir esse item?"
          handleConfirmButton={() => {
            handleDelete();
            setConfirmExclusion(false);
          }}
          handleCancelButton={() => {
            setConfirmExclusion(false);
          }}
        />
      )}
    </>
  );
}

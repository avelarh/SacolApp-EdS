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

interface Props {
  onSave: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  id: string;
}

export function ProductInfoModal({ setVisibility, onSave, id }: Props) {
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [confirmExclusion, setConfirmExclusion] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductCart>({
    id: "",
    name: "",
    description: "",
    price: 0,
    quantidade: "",
  });

  function updateProduct(newProduct: Partial<ProductCart>) {
    if (!product) return;
    setProduct({ ...product, ...newProduct });
  }

  function IsThereEmptyField() {
    if (product.name == "" || product.description == "" || product.price == 0) {
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
      await addProduct(product);
      onSave();
      setVisibility(false);
    } catch (err: any) {
      
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      /* await addProduct(product); */
      onSave();
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  useEffect(() => {}, []);

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
          <TextInput>{product.name}</TextInput>
        </InputTextWrapper>

        <TextAreaWrapper>
          <Row>
            <Title>Descrição</Title>
          </Row>
          <TextArea style={{ textAlignVertical: "top" }}></TextArea>
        </TextAreaWrapper>

        <SinapiField
          smallFont
          placeholder="R$00,00"
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
          value={product.quantidade}
          onChange={(text: any) => {
            updateProduct({ quantidade: text });
          }}
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
        {message && (
          <MessageBalloon
            title="Atenção"
            text="Você precisa preencher todos campos!"
            handleConfirmButton={() => {
              setMessage(false);
            }}
          />
        )}
      </Container>
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

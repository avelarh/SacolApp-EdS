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
import React, { Dispatch, SetStateAction, useState } from "react";
import { Loading } from "../Loading";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { BlueButton } from "../BlueButton";
import { MessageBalloon } from "../MessageBalloon";
import { Product } from "../../services/interfaces";
import { SinapiField } from "../SinapiFIeld";
import { addProduct } from "../../services/requests/Product/AddProduct";

interface Props {
  onSave: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

export function ProductModal({ setVisibility, onSave }: Props) {
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  function updateProduct(newProduct: Partial<Product>) {
    if (!product) return;
    setProduct({ ...product, ...newProduct });
  }

  function IsThereEmptyField() {
    if (product.name == "" || product.description == "" || product.price == 0) {
      return true;
    }
    return false;
  }

  async function handleCreateProduct() {
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
          <TextInput
            placeholder="Digite o nome do produto"
            value={product.name}
            onChangeText={(value: string) => updateProduct({ name: value })}
          />
        </InputTextWrapper>

        <TextAreaWrapper>
          <Row>
            <Title>Descrição</Title>
          </Row>
          <TextArea
            value={product.description}
            placeholder="Digite a descrição do produto"
            onChangeText={(value: string) =>
              updateProduct({ description: value })
            }
            multiline={true}
            style={{ textAlignVertical: "top" }}
          />
        </TextAreaWrapper>

        <SinapiField
          editable
          smallFont
          placeholder="R$00,00"
          label="Preço unitário"
          value={product.price.toString()}
          onChange={(text: any) => {
            updateProduct({ price: text });
          }}
        />

        <ButtonWrapper>
          <BlueButton action={handleCreateProduct} buttonText="Salvar" />
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
    </>
  );
}

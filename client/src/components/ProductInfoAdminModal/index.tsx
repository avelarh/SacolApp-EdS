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
import { Image } from "react-native";
import { BlueButton } from "../BlueButton";
import { MessageBalloon } from "../MessageBalloon";
import { Product } from "../../services/interfaces";
import { SinapiField } from "../SinapiFIeld";
import { addProduct } from "../../services/requests/Product/AddProduct";
import { getProduct } from "../../services/requests/Product/GetProduct";
import { DeleteAreaIcon } from "../ProductInfoModal/styles";
import { deleteProduct } from "../../services/requests/Product/DeleteProduct";
import { updateProductApi } from "../../services/requests/Product/UpdateProduct";

interface Props {
  onSave: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export function ProductInfoAdminModal({ setVisibility, onSave, id }: Props) {
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [confirmExclusion, setConfirmExclusion] = useState<boolean>(false);
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
  });

  function updateProduct(newProduct: Partial<Product>) {
    if (!product) return;
    setProduct({ ...product, ...newProduct });
    setHasUpdate(true);
  }

  async function handleUpdateProduct() {
    if (!hasUpdate) {
      setMessage(true);
      return;
    }

    try {
      setIsLoading(true);
      await updateProductApi(product, id);
      onSave();
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      setVisibility(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  async function getProductInfo() {
    try {
      setIsLoading(true);
      const data = await getProduct(id);
      if (data) {
        setProduct(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductInfo();
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
            text="Você precisa alterar algo para salvar!"
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

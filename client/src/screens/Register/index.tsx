import { useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { CreateUser } from "../../services/requests/User/CreateUser";
import { RootStackParamList } from "../../services/routes";

import { TextField } from "../../components/TextField";
import { BlueButton } from "../../components/BlueButton";
import { MessageBalloon } from "../../components/MessageBalloon";
import { BackButton } from "../../components/BackButton";
import { Loading } from "../../components/Loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { inputMasks } from "../../objects/objects";

import {
  TextFieldWrapper,
  Container,
  WarningText,
  Title,
  SpaceAround,
  ContinueButtonWrapper,
} from "./styles";
import theme from "../../global/styles/theme";
import { UserCreateData } from "../../services/interfaces";

type ScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export function Register({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [accept, setAccept] = useState<boolean>(false);

  const [modalMsg, setModalMsg] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [requiredFieldsMsg, setRequiredFieldsMsg] = useState<boolean>(false);

  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);

  const [sucessMsg, setSucessMsg] = useState<boolean>(false);

  const [passwordMatchMsg, setPasswordMatchMsg] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(true);

  const [registerData, setRegisterData] = useState<UserCreateData>({
    name: "",
    email: "",
    password: "",
  });

  function updateRegisterData(newRegisterData: Partial<UserCreateData>) {
    if (!registerData) return;
    setRegisterData({ ...registerData, ...newRegisterData });
  }

  const handleRegister = async () => {
    if (IsThereEmptyField()) {
      setRequiredFieldsMsg(true);
      return;
    }

    if (registerData.password != password) {
      setPasswordMatchMsg(true);
      return;
    }

    try {
      /* if (!validateCPF(registerData.cpf)) {
        setModalMsg("CPF inválido");
        setErrorMessage(true);
        return;
      } */
      setIsLoading(true);
      await CreateUser(registerData);
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (err: any) {
      if (err.response.data.errors) {
        setModalMsg(err.response.data.errors[0].msg);
      } else {
        setModalMsg(err.response.data);
      }

      setIsLoading(false);
      setErrorMessage(true);
    }
  };

  function IsThereEmptyField() {
    if (
      registerData.name == "" ||
      registerData.password == "" ||
      password == ""
    ) {
      return true;
    }
    return false;
  }

  return (
    <Container>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <BackButton
        onPress={() => {
          setNotSavedDataMsg(true);
        }}
      />
      <Title>Cadastro</Title>
      <SpaceAround>
        <TextFieldWrapper>
          <TextField
            required
            value={registerData.name}
            onChange={(value: string) => updateRegisterData({ name: value })}
            mask={inputMasks.onlyLetters}
            placeholder="Nome"
            autoCapitalize="words"
            textContentType="name"
            autoComplete="name"
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            value={registerData.email}
            onChange={(value: string) => updateRegisterData({ email: value })}
            placeholder="Email"
            autoCapitalize="words"
            textContentType="name"
            autoComplete="name"
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            value={registerData.password}
            onChange={(value: string) =>
              updateRegisterData({ password: value })
            }
            placeholder="Senha"
            secureTextEntry={showPassword}
            autoCapitalize="none"
            textContentType="password"
            autoCorrect={false}
            autoComplete="password"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordButton}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={22}
              color="#24203B"
            />
          </TouchableOpacity>
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            value={password!}
            onChange={(value: string) => setPassword(value)}
            placeholder="Confirmar Senha"
            maxLength={10}
          />
        </TextFieldWrapper>

        <WarningText>
          Atenção: campos marcados com * são obrigatórios.
        </WarningText>

        <ContinueButtonWrapper>
          <BlueButton buttonText="Cadastrar" action={handleRegister} />
        </ContinueButtonWrapper>
      </SpaceAround>
      {isLoading && <Loading />}
      {requiredFieldsMsg && (
        <MessageBalloon
          title="Atenção"
          text="Por favor, preencha os campos obrigatórios antes de tentar efetivar o cadastro."
          handleConfirmButton={() => {
            setRequiredFieldsMsg(false);
          }}
        />
      )}
      {notSavedDataMsg && (
        <MessageBalloon
          hasGoBackButton
          title="Atenção"
          text="Um ou mais itens que não foram salvos serão perdidos com essa ação."
          handleCancelButton={() => setNotSavedDataMsg(false)}
          handleConfirmButton={() => {
            setNotSavedDataMsg(false);
            navigation.goBack();
          }}
        />
      )}
      {sucessMsg && (
        <MessageBalloon
          title="Sucesso!"
          text="✓ Cadastro realizado com sucesso."
          handleConfirmButton={() => {
            setSucessMsg(false);
          }}
        />
      )}
      {passwordMatchMsg && (
        <MessageBalloon
          title="Atenção"
          text="As senhas não coincidem"
          handleConfirmButton={() => {
            setPasswordMatchMsg(false);
          }}
        />
      )}
      {errorMessage && (
        <MessageBalloon
          title="Atenção"
          text={modalMsg}
          handleConfirmButton={() => {
            setErrorMessage(false);
          }}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#34343480",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: 356,
    fontSize: 14.5,
    left: -1.5,
    fontFamily: theme.fonts.regular,
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 15,
    zIndex: 1,
  },
  image: {
    marginBottom: -40,
    width: 250,
    height: 250,
  },
});

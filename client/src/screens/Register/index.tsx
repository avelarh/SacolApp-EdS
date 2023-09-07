import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { UserData } from "../../services/requests/User/CreateUser";
import { RootStackParamList } from "../../services/routes";
import { apiCep } from "../../services/apiCep";

import { TextField } from "../../components/TextField";
import { BlueButton } from "../../components/BlueButton";
import { MessageBalloon } from "../../components/MessageBalloon";
import { BackButton } from "../../components/BackButton";
import { Loading } from "../../components/Loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { validateCPF } from "../../components/ValidaCpf";
import { inputMasks } from "../../objects/objects";

import {
  TextFieldWrapper,
  Container,
  WarningText,
  Subtitle,
  ButtonWrapper,
  SpaceAround,
  ContinueButtonWrapper,
} from "./styles";
import theme from "../../global/styles/theme";
import { Title } from "../Login/styles";

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

  const [requiredFieldsMsg, setRequiredFieldsMsg] = useState<boolean>(false);

  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);

  const [sucessMsg, setSucessMsg] = useState<boolean>(false);

  const [passwordMatchMsg, setPasswordMatchMsg] = useState<boolean>(false);

  const [isRegisterSecondPart, setIsRegisterSecondPart] =
    useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(true);

  const [registerData, setRegisterData] = useState<UserData>({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    password: "",
  });

  const searchCep = async (cep: string) => {
    try {
      const res = await apiCep.get(`${cep}/json/`);
      updateRegisterData({
        cep: res.data.cep,
        street: res.data.logradouro,
        neighborhood: res.data.bairro,
        city: res.data.localidade,
        state: res.data.uf,
      });
    } catch (err) {}
  };

  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  function updateRegisterData(newRegisterData: Partial<UserData>) {
    if (!registerData) return;
    setRegisterData({ ...registerData, ...newRegisterData });
  }

  const handleRegister = async () => {
    if (IsThereEmptyField()) {
      setRequiredFieldsMsg(true);
      return;
    }

    if (registerData.password != passwordConfirmation) {
      setPasswordMatchMsg(true);
      return;
    }

    try {
      if (!validateCPF(registerData.cpf)) {
        setModalMsg("CPF inválido");
        setErrorMessage(true);
        return;
      }
      setIsLoading(true);
      /* await createUser(registerData); */
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
      registerData.cep == "" ||
      registerData.street == "" ||
      registerData.neighborhood == "" ||
      registerData.number == "" ||
      registerData.state == "" ||
      registerData.email == "" ||
      registerData.cpf == "" ||
      registerData.password == "" ||
      passwordConfirmation == ""
    ) {
      return true;
    }
    return false;
  }

  function IsThereEmptyFieldHalf() {
    if (
      registerData.name == "" ||
      registerData.cep == "" ||
      registerData.street == "" ||
      registerData.neighborhood == "" ||
      registerData.number == "" ||
      registerData.state == ""
    ) {
      return true;
    }
    return false;
  }

  return (
    <Container>
      <BackButton
        onPress={() => {
          if (!isRegisterSecondPart) {
            setNotSavedDataMsg(true);
          } else {
            setIsRegisterSecondPart(false);
          }
        }}
      />
      <Title>Cadastro</Title>
      {!isRegisterSecondPart ? (
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
              value={registerData.cep}
              onChange={(value: string) => {
                updateRegisterData({ cep: value });
                searchCep(value);
              }}
              placeholder="CEP"
              mask={inputMasks.cep}
              textContentType="postalCode"
              keyboardType="number-pad"
              autoComplete="postal-code"
              maxLength={9}
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              required
              value={registerData.state}
              onChange={(value: string) => updateRegisterData({ state: value })}
              mask={inputMasks.onlyLetters}
              placeholder="Estado"
              textContentType="addressState"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              required
              value={registerData.city}
              onChange={(value: string) => updateRegisterData({ city: value })}
              mask={inputMasks.onlyLetters}
              placeholder="Cidade"
              textContentType="addressCity"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              required
              value={registerData.neighborhood}
              onChange={(value: string) =>
                updateRegisterData({ neighborhood: value })
              }
              placeholder="Bairro"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              required
              value={registerData.street}
              onChange={(value: string) =>
                updateRegisterData({ street: value })
              }
              placeholder="Rua"
              textContentType="fullStreetAddress"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              required
              value={registerData.number}
              onChange={(value: string) =>
                updateRegisterData({ number: value })
              }
              placeholder="Número"
              keyboardType="number-pad"
              maxLength={10}
            />
          </TextFieldWrapper>

          <WarningText>
            Atenção: campos marcados com * são obrigatórios.
          </WarningText>

          <ContinueButtonWrapper>
            <BlueButton
              buttonText="Continuar"
              action={() =>
                IsThereEmptyFieldHalf()
                  ? setRequiredFieldsMsg(true)
                  : setIsRegisterSecondPart(true)
              }
            />
          </ContinueButtonWrapper>
        </SpaceAround>
      ) : (
        <SpaceAround>
          <Subtitle>Falta pouco para finalizarmos seu cadastro!</Subtitle>
          <TextFieldWrapper>
            <TextField
              required
              value={registerData.email}
              onChange={(value: string) => updateRegisterData({ email: value })}
              placeholder="Email"
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCorrect={false}
              autoComplete="email"
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            <TextField
              required
              value={registerData.cpf}
              onChange={(value: string) => updateRegisterData({ cpf: value })}
              placeholder="CPF"
              mask={inputMasks.cpf}
              keyboardType="number-pad"
              maxLength={14}
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
              value={passwordConfirmation}
              onChange={(value: string) => setPasswordConfirmation(value)}
              placeholder="Digite novamente sua senha"
              secureTextEntry={showPassword}
              autoCapitalize="none"
              textContentType="newPassword"
              autoCorrect={false}
              autoComplete="password-new"
            />
          </TextFieldWrapper>
          <ButtonWrapper>
            <BlueButton buttonText="Cadastrar" action={() => setAccept(true)} />
          </ButtonWrapper>
        </SpaceAround>
      )}
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
});

import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../services/routes";

import { BlueButton } from "../../components/BlueButton";
import { TextField } from "../../components/TextField";
import { Loading } from "../../components/Loading";
import { MessageBalloon } from "../../components/MessageBalloon";

import {
  Container,
  Title,
  TextFieldWrapper,
  ButtonWrapper,
  RegisterContainer,
  RegisterContent,
} from "./styles";
import { LoginUser } from "../../services/requests/User/Login";
import { LoginData } from "../../services/interfaces";
import { useAuth } from "../../services/context/AuthContext";

type ScreenRouteProp = RouteProp<RootStackParamList, "Login">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function Login({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [modalMsg, setModalMsg] = useState<string>("");

  const [showPassword, setShowPassword] = useState(true);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { setIsSignedIn } = useAuth();

  function updateLoginData(newLoginData: Partial<LoginData>) {
    if (!loginData) return;
    setLoginData({ ...loginData, ...newLoginData });
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setIsLoading(false);
      await LoginUser(loginData);
      setIsSignedIn(true);
    } catch (err: any) {
      if (err.response.data.errors) {
        setModalMsg(err.response.data.errors[0].msg);
      } else {
        console.log(err.response.data);
      }

      setIsLoading(false);
      setErrorMessage(true);
    }
  };

  return (
    <Container>
      <Title>Login</Title>

      <TextFieldWrapper>
        <TextField
          value={loginData.email}
          onChange={(value: string) => updateLoginData({ email: value })}
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
          value={loginData.password}
          onChange={(value: string) => updateLoginData({ password: value })}
          secureTextEntry={showPassword}
          placeholder="Senha"
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
        />
      </TextFieldWrapper>

      <ButtonWrapper>
        <BlueButton buttonText="Entrar" action={handleLogin} />
      </ButtonWrapper>

      <RegisterContainer onPress={() => navigation.navigate("Register")}>
        <RegisterContent>Ainda não tem uma conta? Cadastre-se</RegisterContent>
      </RegisterContainer>

      {isLoading && <Loading />}
      {errorMessage && (
        <MessageBalloon
          title="Atenção"
          text={modalMsg}
          handleCancelButton={() => {}}
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
  },
});

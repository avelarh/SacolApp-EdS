import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../services/routes";
import { apiCep } from "../../services/apiCep";

import { Title } from "../Home/styles";
import { BackButton } from "../../components/BackButton";
import { BlueButton } from "../../components/BlueButton";
import { inputMasks } from "../../objects/objects";
import { MessageBalloon } from "../../components/MessageBalloon";
import { Loading } from "../../components/Loading";
import {
  DeleteAccountField,
  LogoutField,
  PasswordField,
  ProfileField,
} from "../../components/ProfileField";

import {
  Container,
  FieldsContainer,
  ButtonWrapper,
  ScrollViewWrapper,
} from "./styles";

import { logout } from "../../services/requests/User/Logout";
import { useAuth } from "../../services/context/AuthContext";
import { myAccount } from "../../services/requests/User/MyAccount";
import { UserGetData } from "../../services/interfaces";
import { editUser } from "../../services/requests/User/EditUser";
import { deleteUser } from "../../services/requests/User/DeleteUser";

type ScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export function Profile({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmExclusion, setConfirmExclusion] = useState<boolean>(false);

  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  const [failedLogout, setFailedLogout] = useState<boolean>(false);

  const [failedExclusion, setFailedExclusion] = useState<boolean>(false);

  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);

  const [hasUpdate, setHasUpdate] = useState<boolean>(false);

  const [modalMsg, setModalMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserGetData>({
    name: "",
    email: "",
    id: 0,
    role: "",
  });

  const { setIsSignedIn } = useAuth();

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const data = await myAccount();
      if (data) {
        setUserData(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      setIsSignedIn(false);
    } catch (err: any) {
      setIsLoading(false);
      setFailedLogout(true);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      await editUser(userData.id, userData);
      setIsLoading(false);
      setHasUpdate(false);
    } catch (err: any) {
      if (err.response.data.errors) {
        setModalMsg(err.response.data.errors[0].msg);
      } else {
        setModalMsg(err.response.data);
      }
      setIsLoading(false);
      setError(true);
    }
  };

  function updateUserData(newLoginData: Partial<UserGetData>) {
    if (!userData) return;
    setUserData({ ...userData, ...newLoginData });
    setHasUpdate(true);
  }

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userData.id!);
      await logout();
      setIsLoading(false);
      setIsSignedIn(false);
    } catch (err: any) {
      setIsLoading(false);
      setFailedExclusion(true);
    }
  };

  function handleBack() {
    if (hasUpdate) {
      setNotSavedDataMsg(true);
    } else {
      navigation.goBack();
    }
  }

  return (
    <Container>
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
      <BackButton onPress={handleBack} />
      <Title>Perfil</Title>
      <ScrollViewWrapper>
        <ScrollView>
          <FieldsContainer>
            <ProfileField
              editable
              label="Nome"
              value={userData.name!}
              mask={inputMasks.onlyLetters}
              placeholder=""
              autoCapitalize="words"
              textContentType="name"
              autoComplete="name"
              onChange={(text: string) => updateUserData({ name: text })}
            />
            <ProfileField
              editable
              label="Email"
              value={userData.email!}
              placeholder=""
              autoCapitalize="words"
              autoComplete="email"
              onChange={(text: string) => updateUserData({ email: text })}
            />
            <LogoutField onPress={() => setConfirmLogout(true)} />
            <DeleteAccountField onPress={() => setConfirmExclusion(true)} />
          </FieldsContainer>
        </ScrollView>
      </ScrollViewWrapper>
      {hasUpdate && (
        <ButtonWrapper>
          <BlueButton buttonText="Salvar" action={() => handleUpdateUser()} />
        </ButtonWrapper>
      )}

      {isLoading && <Loading />}
      {confirmExclusion && (
        <MessageBalloon
          redConfirm
          hasGoBackButton
          title="Atenção"
          text="Tem certeza que deseja excluir sua conta?"
          handleCancelButton={() => setConfirmExclusion(false)}
          handleConfirmButton={() => {
            setConfirmExclusion(false);
            handleDeleteUser();
          }}
        />
      )}
      {confirmLogout && (
        <MessageBalloon
          redConfirm
          hasGoBackButton
          title="Atenção"
          text="Tem certeza que deseja sair da sua conta?"
          handleCancelButton={() => setConfirmLogout(false)}
          handleConfirmButton={() => {
            handleLogout();
            setConfirmLogout(false);
          }}
        />
      )}
      {failedLogout && (
        <MessageBalloon
          title="Atenção"
          text="Não foi possível efeturar o logout."
          handleConfirmButton={() => {
            setFailedLogout(false);
          }}
        />
      )}
      {failedExclusion && (
        <MessageBalloon
          title="Atenção"
          text="Não foi possível excluir a conta."
          handleConfirmButton={() => {
            setFailedExclusion(false);
          }}
        />
      )}
      {error && (
        <MessageBalloon
          title="Atenção"
          text={modalMsg}
          handleConfirmButton={() => {
            setError(false);
          }}
        />
      )}
    </Container>
  );
}

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
import { UserData } from "../../services/requests/User/CreateUser";
import { logout } from "../../services/requests/User/Logout";
import { useAuth } from "../../services/context/AuthContext";

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

  /* const { setIsSignedIn, setUser, user } = useAuth(); */

  const getUserData = async () => {
    /* try {
      setIsLoading(true);
      const data = await getUser();
      if (data) {
        setUserData(data);
        setUserDataEdit(data);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
    } */
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateDataEdit = (newState: any) => {
    const filteredState = Object.keys(newState)
      .filter((key) => userDataEdit.hasOwnProperty(key))
      .reduce((obj: any, key) => {
        obj[key] = newState[key];
        return obj;
      }, {});

    setUserDataEdit({
      ...userDataEdit,
      ...filteredState,
    });

    setHasUpdate(true);
  };

  const [userDataEdit, setUserDataEdit] = useState<UserData>({
    name: "",
    cpf: "",
    email: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    password: ""
  });

  const { setIsSignedIn } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsSignedIn(false);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setFailedLogout(true);
    }
  };

  const handleUpdateUser = async () => {
    /* try {
      setIsLoading(true);
      await editUser(userDataEdit);
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
    } */
  };

  const searchCep = async (cep: string) => {
    try {
      const res = await apiCep.get(`${cep}/json/`);
      updateDataEdit({
        cep: res.data.cep,
        street: res.data.logradouro,
        neighborhood: res.data.bairro,
        city: res.data.localidade,
        state: res.data.uf,
      });
    } catch (err) {}
  };

  const handleDeleteUser = async () => {
    /* try {
      setIsLoading(true);
      await deleteUser(userData.id!);
      await logout();
      setIsLoading(false);
      setIsSignedIn(false);
    } catch (err: any) {
      setIsLoading(false);
      setFailedExclusion(true);
    } */
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
              label="Nome"
              value={userDataEdit.name!}
              mask={inputMasks.onlyLetters}
              placeholder=""
              autoCapitalize="words"
              textContentType="name"
              autoComplete="name"
            />
            <ProfileField
              editable
              label="CEP"
              value={userDataEdit.cep!}
              onChange={(value: string) => {
                updateDataEdit({ cep: value });
                searchCep(value);
              }}
              placeholder=""
              mask={inputMasks.cep}
              textContentType="postalCode"
              keyboardType="number-pad"
              autoComplete="postal-code"
              maxLength={9}
            />
            <ProfileField
              editable
              label="Estado"
              value={userDataEdit.state!}
              onChange={(value: string) => updateDataEdit({ state: value })}
              mask={inputMasks.onlyLetters}
              placeholder=""
              textContentType="addressState"
            />
            <ProfileField
              editable
              label="Cidade"
              placeholder=""
              value={userDataEdit.city!}
              onChange={(value: string) => updateDataEdit({ city: value })}
              mask={inputMasks.onlyLetters}
              textContentType="addressCity"
            />
            <ProfileField
              editable
              label="Rua"
              placeholder=""
              value={userDataEdit.street!}
              onChange={(value: string) => updateDataEdit({ street: value })}
              textContentType="addressCity"
            />
            <ProfileField
              editable
              label="Bairro"
              value={userDataEdit.neighborhood!}
              onChange={(value: string) =>
                updateDataEdit({ neighborhood: value })
              }
              placeholder=""
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

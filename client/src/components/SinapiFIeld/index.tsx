import { Dispatch, SetStateAction, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaskInputProps } from "react-native-mask-input";

import {
  HiddenIcon,
  InputAndIconWrapper,
  InputView,
  Label,
  NameView,
  ProfileFieldWrapper,
  SmallLabel,
  TouchableIconWrapper,
} from "./styles";

interface ProfileFieldProps {
  value: string;
  label: string;
  placeholder: string;
  onChange?: (masked: string, unmasked: string) => void;
  mask?: (any | RegExp)[] | null;
  editable?: boolean;
  smallFont?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode"
    | undefined;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | undefined;
  autoCorrect?: boolean;
  autoComplete?:
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "email"
    | "gender"
    | "name"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "name-middle-initial"
    | "name-prefix"
    | "name-suffix"
    | "password"
    | "password-new"
    | "postal-address"
    | "postal-address-country"
    | "postal-address-extended"
    | "postal-address-extended-postal-code"
    | "postal-address-locality"
    | "postal-address-region"
    | "postal-code"
    | "street-address"
    | "sms-otp"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-device"
    | "username"
    | "username-new"
    | "off";
  maxLength?: number;
  setDropdownState?: Dispatch<SetStateAction<boolean>>;
}

interface Styles {
  inputStyle: MaskInputProps;
  inputStyleSmallFont: MaskInputProps;
}

export function SinapiField({
  value,
  onChange,
  placeholder,
  label,
  editable,
  mask,
  smallFont,
  autoCapitalize = "sentences",
  textContentType = "none",
  keyboardType = "default",
  autoCorrect = true,
  autoComplete = "off",
  maxLength = 50,
  setDropdownState,
}: ProfileFieldProps) {
  const inputRef = useRef<TextInput | null>(null);
  const [editInput, setEditInput] = useState<boolean>(false);
  const [dropdownStatus, setDropdownSytatus] = useState<boolean>(false);

  function handleIconClick() {
    if (!editInput) {
      setEditInput(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 800);
      return;
    }
    setEditInput(false);
  }

  return (
    <>
      <ProfileFieldWrapper>
        <NameView>
          {smallFont ? (
            <SmallLabel>{label}</SmallLabel>
          ) : (
            <Label>{label}</Label>
          )}
        </NameView>

        <InputAndIconWrapper>
          {editable ? (
            <>
              <InputView>
                <MaskInput
                  multiline
                  ref={inputRef}
                  value={value}
                  placeholder={placeholder}
                  style={
                    !smallFont ? styles.inputStyle : styles.inputStyleSmallFont
                  }
                  onChangeText={onChange}
                  editable={editInput}
                  mask={mask}
                  onBlur={() => setEditInput(false)}
                  autoCapitalize={autoCapitalize}
                  textContentType={textContentType}
                  keyboardType={keyboardType}
                  autoCorrect={autoCorrect}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                />
              </InputView>

              <TouchableIconWrapper onPress={handleIconClick}>
                <FontAwesome5 name="edit" size={16} color="black" />
              </TouchableIconWrapper>
            </>
          ) : (
            <>
              <InputView>
                <MaskInput
                  multiline
                  value={value}
                  placeholder={placeholder}
                  style={
                    !smallFont ? styles.inputStyle : styles.inputStyleSmallFont
                  }
                  editable={false}
                  mask={mask}
                  autoCapitalize={autoCapitalize}
                  textContentType={textContentType}
                  keyboardType={keyboardType}
                  autoCorrect={autoCorrect}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                />
              </InputView>

              <HiddenIcon>
                <FontAwesome5 name="edit" size={16} color="black" />
              </HiddenIcon>
            </>
          )}
        </InputAndIconWrapper>
      </ProfileFieldWrapper>
    </>
  );
}

const styles = StyleSheet.create<Styles>({
  inputStyle: {
    marginRight: 15,
    fontSize: RFValue(14),
    color: "black",
    fontWeight: "300",
    textAlign: "left",
  },
  inputStyleSmallFont: {
    marginRight: 15,
    fontSize: RFValue(13),
    color: "black",
    fontWeight: "300",
    textAlign: "left",
  },
});

interface PasswordAndDeleteProps {
  onPress: () => void;
}

export function PasswordField({ onPress }: PasswordAndDeleteProps) {
  return (
    <ProfileFieldWrapper>
      <Label>Senha</Label>
      <TouchableOpacity onPress={onPress}>
        <Entypo name="chevron-right" size={24} color="#3C3C4380" />
      </TouchableOpacity>
    </ProfileFieldWrapper>
  );
}

export function DeleteAccountField({ onPress }: PasswordAndDeleteProps) {
  return (
    <ProfileFieldWrapper>
      <Label>Excluir conta</Label>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </ProfileFieldWrapper>
  );
}

export function LogoutField({ onPress }: PasswordAndDeleteProps) {
  return (
    <ProfileFieldWrapper>
      <Label>Sair</Label>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="back" size={24} color="red" />
      </TouchableOpacity>
    </ProfileFieldWrapper>
  );
}

import GoogleIcon from "@/assets/icons/login/GoogleIcon.png";
import KakaoIcon from "@/assets/icons/login/KakaoIcon.png";
import LGIcon from "@/assets/icons/login/LGIcon.png";
import NaverIcon from "@/assets/icons/login/NaverIcon.png";
import { Button } from "@/components/common/Button";
import StyledInput from "@/components/common/InputField";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import LangToggleComp from "@/components/login/toggle";
import { Colors } from "@/constants/colors.constant";
import { login } from "@/service/auth.service";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Keyboard, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [phone, setPhone] = useState({
    val: "",
    prev: "",
  });
  const [password, setPassword] = useState({
    val: "",
    prev: "",
  });
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const formatPhoneNumber = (number: string): string => {
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return number;
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userData = await login({
        phone_number: formatPhoneNumber(phone.val),
        password: password.val,
      });
      setUser({
        name: userData.name,
        phone_number: userData.phone_number,
        birth_date: userData.birth_date,
        id: userData.id,
      });
      setIsLoading(false);
    } catch (err) {
      console.log("error");
      setLoginError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (phoneError && phone.val.length != phone.prev.length) {
      setPhoneError(false);
    }
    if (passwordError && password.val.length != password.prev.length)
      setPasswordError(false);
  }, [phone.val, password.val]);

  useEffect(() => {
    if (isLoggedIn) {
      const redirect = setTimeout(() => {
        router.push("/(tabs)");
      }, 0);

      return () => clearTimeout(redirect);
    }
  }, [isLoggedIn]);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: Colors.light.background }]}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 20,
          }}
        >
          <LangToggleComp value="Korea, 한국어" />
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            marginBottom: 8,
            paddingTop: 72,
          }}
        >
          <ThemedText type="titleLarge" style={{ color: Colors.light.lowGray }}>
            LG
          </ThemedText>
          <ThemedText type="titleLarge" style={{ color: Colors.light.tint }}>
            {" ALIVE"}
          </ThemedText>
        </ThemedView>

        <ThemedView>
          <ThemedView style={{ marginTop: 32 }}>
            <StyledInput
              label="전화번호"
              value={phone.val}
              onChangeText={(text) =>
                setPhone((prevState) => ({ ...prevState, val: text }))
              }
              type="decimal-pad"
              placeholder="전화번호를 입력하세요"
              error={phoneError}
            />
          </ThemedView>
          <ThemedView style={{ marginTop: 24 }}>
            <StyledInput
              label="비밀번호"
              value={password.val}
              onChangeText={(text) =>
                setPassword((prevState) => ({ ...prevState, val: text }))
              }
              placeholder="비밀번호를 입력하세요"
              secureTextEntry={true}
              type="default"
              error={passwordError}
            />
          </ThemedView>
          <ThemedView>
            {phoneError || passwordError || loginError ? (
              <ThemedText
                type="caption2"
                style={{ marginTop: 16, color: Colors.light.tint }}
              >
                {"아이디 또는 비밀번호를 다시 확인해주세요."}
              </ThemedText>
            ) : (
              <ThemedText
                type="caption2"
                style={{ marginTop: 16, color: Colors.light.tint }}
              ></ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <ThemedView
          style={{
            flexDirection: "row",
            marginTop: 28,
            marginBottom: 40,
            justifyContent: "center",
          }}
        >
          <ThemedText style={styles.settingText}>회원가입</ThemedText>
          <ThemedText style={styles.settingText}> | </ThemedText>
          <ThemedText style={styles.settingText}>비밀번호 재설정</ThemedText>
        </ThemedView>
        <ThemedView>
          <Button
            variant={
              phone.val.length != 11 || password.val.length == 0 || isLoading
                ? "disabled"
                : "filled"
            }
            disabled={
              phone.val.length != 11 || password.val.length == 0 || isLoading
            }
            onPress={handleLogin}
          >
            로그인
          </Button>
        </ThemedView>

        <ThemedView
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <ThemedText type="footnote">또는</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Image source={LGIcon} style={styles.icon} />
          <Image source={GoogleIcon} style={styles.icon} />
          <Image source={KakaoIcon} style={styles.icon} />
          <Image source={NaverIcon} style={styles.icon} />
        </ThemedView>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
  },
  settingText: {
    color: Colors.light.lowGray,
    fontSize: 12,
    lineHeight: 12,
  },
});

import { Image, StyleSheet, View } from "react-native";

import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledInput from "@/components/common/InputField";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/colors.constant";
import LGIcon from "@/assets/icons/login/LGIcon.png";
import GoogleIcon from "@/assets/icons/login/GoogleIcon.png";
import KakaoIcon from "@/assets/icons/login/KakaoIcon.png";
import NaverIcon from "@/assets/icons/login/NaverIcon.png";
import ToggleComp from "@/components/login/toggle";

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

  const handleLogin = () => {
    // 전화번호 검증
    if (phone.val.length !== 11) {
      setPhoneError(true);
      setPhone((prevState) => {
        return { ...prevState, prev: phone.val };
      });
    } else {
      setPhoneError(false);
    }

    // 비밀번호 검증
    if (password.val.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  useEffect(() => {
    if (phoneError && phone.val.length != phone.prev.length) {
      setPhoneError(false);
    }
    if (passwordError && password.val.length != phone.prev.length)
      setPasswordError(false);
  }, [phone.val, password.val]);
  return (
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
        <ToggleComp value="Korea, 한국어" />
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
          {" MACS"}
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
            // validation={(text) => text.length >= 8}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true}
            type="default"
            error={passwordError}
          />
        </ThemedView>
        <ThemedView>
          {phoneError || passwordError ? (
            <ThemedText
              type="caption2"
              style={{ marginTop: 24, color: Colors.light.tint }}
            >
              아이디 또는 비밀번호를 다시 확인해주세요.
            </ThemedText>
          ) : (
            <ThemedText
              type="caption2"
              style={{ marginTop: 24, color: Colors.light.tint }}
            ></ThemedText>
          )}
        </ThemedView>
      </ThemedView>

      <ThemedView
        style={{
          flexDirection: "row",
          marginTop: 40,
          justifyContent: "center",
        }}
      >
        <ThemedText style={styles.settingText}>회원가입</ThemedText>
        <ThemedText style={styles.settingText}> | </ThemedText>
        <ThemedText style={styles.settingText}>비밀번호 재설정</ThemedText>
      </ThemedView>
      <ThemedView style={{ marginTop: 40 }}>
        <Button
          variant={
            phone.val.length == 0 || password.val.length == 0
              ? "outlined"
              : "filled"
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

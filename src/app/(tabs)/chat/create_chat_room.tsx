import Aircontroller_stopped from "@/assets/images/Aircontroller_stopped.png";
import cleaner from "@/assets/images/cleaner.png";
import dryer_stopped from "@/assets/images/dryer_stopped.png";
import TV_bold from "@/assets/images/TV_bold.png";
import washer from "@/assets/images/washer.png";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { getUserDevices, UserDevice } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { TranslateDeviceName } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
export default function CreateChatRoomScreen() {
  const router = useRouter();
  const [selectedDevices, setSelectedDevices] = useState<UserDevice[]>([]);
  const userId = useUserStore((state) => state.user?.id);
  const {
    data: userDevices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDevices", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return getUserDevices(userId);
    },
    enabled: !!userId,
  });

  const toggleDeviceSelection = (device: UserDevice) => {
    setSelectedDevices((prev) =>
      prev.some((d) => d.device_id === device.device_id)
        ? prev.filter((d) => d.device_id !== device.device_id)
        : [...prev, device]
    );
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedDevices([]);
    }, [])
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppBar
        align="left"
        title="채팅방 개설"
        leftIcon={{
          icon: <Feather name="chevron-left" size={24} color={"black"} />,
          onPress: () => router.push("/chat"),
        }}
        rightIcons={[
          {
            icon: (
              <ThemedText
                type="headline"
                color={
                  selectedDevices.length === 0
                    ? Colors.light.textDisabled
                    : Colors.light.black
                }
              >
                다음
              </ThemedText>
            ),
            onPress: () =>
              router.push({
                pathname: "/chat/create_chat_name",
                params: { selectedDevices: JSON.stringify(selectedDevices) },
              }),
            disabled: selectedDevices.length === 0,
          },
        ]}
      />
      <ThemedView style={{ marginTop: 24, marginHorizontal: 16, flex: 1 }}>
        <ThemedText type="title3">대화할 제품을 선택해주세요</ThemedText>
        <FlatList
          data={userDevices}
          renderItem={({ item }) => (
            <SelectDevice
              device={item}
              isSelected={selectedDevices.some(
                (d) => d.device_id === item.device_id
              )}
              toggleSelection={() => toggleDeviceSelection(item)}
            />
          )}
          keyExtractor={(device) => device.device_id}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => (
            <ThemedView
              style={{ backgroundColor: Colors.light.lightGray, height: 0.5 }}
            />
          )}
        />
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
          }}
        >
          <ThemedText type="title3" color={Colors.light.lowGray}>
            찾으시는 제품이 없나요?
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const SelectDevice = ({
  device,
  isSelected,
  toggleSelection,
}: {
  device: UserDevice;
  isSelected: boolean;
  toggleSelection: () => void;
}) => {
  return (
    <ThemedView style={styles.deviceContainer}>
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedView>
          {device.category == "AIR_PURIFIER" ||
          device.category == "AIR_CONDITIONER" ? (
            <>
              {isSelected ? (
                <Image
                  source={{
                    uri: "data:image/gif;base64,R0lGODlhoACgAJECAKampgAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDhGNTY1N0RBNUFEMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDhGNTY1N0VBNUFEMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowOEY1NjU3QkE1QUQxMUVGOTM1NEFFN0U5RDQzRkM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOEY1NjU3Q0E1QUQxMUVGOTM1NEFFN0U5RDQzRkM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUUAAIALAAAAACgAKAAAAL/lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vn8WECg4SFhoeIiYqLjISCjUCBkpOUkJRHmJmVnZo9np+em4AzpKiqlTipraiKPa6mpo8yo7WzNr20pzq5sKuOsL2vsrnCkzbGwac6wsWbzsvNj8LA2bPG09GH2NmrAJo82rMJn9/dnAXE0ObA45nk7sENnufvkQjz6vCc9+j4+8cO6tXycGAF8I9BSuoIuDx+QxvOXwIS1+EiFSrDgxIEZdsxE3qurocdvFkB9HkhSp8aQrkCrLmWypLiVMlAZnlpRpcxTLnPRe8vRX86dOn9iu7MN5SMsqogG6QGPqVNFOL1KhRkU09WpSq1yqIi1ENVHWrmJ3Cj369ay4YGrfsW27NhfcnrXmKpRrl5GovE9P8cXK6S9YS4KbEvn7J7HixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmz6NOrXq1axbu34NO7bs2bRr276Nm0QBACH5BAkUAAIALDEAYgBKABUAAAJZlI+pwerIwpv0xOouhm1z+WieIXql2WXpeGKtuyZvNU+1HY/6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Ko1dFNFQLotF7UlZRdhnnd3FpS7Y2yOtm6Tv+z3qAAAIfkEBRQAAgAsAAAAAKAAoAAAAv+Uj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqbnJ2en5CRoqOkpaanqKmqq6ytrq+gobKztLW2t7i5vrE8Db6/sLHCw8TFwsrGWcrLzM7IvcDB0d/SxdbT1Mfa2tnb3tPZ31LQ6ONW6+3H2uDpy+7h7Q/q4eL2/O1WuBn69Pwd/lLwFgQIEQnHkh+ABhQV77GB5UyMBgBYkDHf6DuIDiBI15ETiWw5gRZEiLFeE9NNlPpAKPCVVCYdngV0OSHWFSsRnRJQKZKXU2wbkSaFChB9ht4bmR6E6jNYOF8ykAaVKmLZ1ekdoUqtWsSpVgXfgVLM2S3SaGbRrnrAO1gLrqegs3rty5dOvavYs3r969fPv6/Qs4sODBhAEVAAAh+QQFFAACACwzAHMAWwAWAAAC4ISFqZsGDJl7sboKg1YXw+5JYNiMlYZupHWsi0lOYUpzLiLfOOzlJ13D6Xw34sq4qAUFlCIloGMeVDFeInXFRncI6HDqPVp/1KZ4u3s6wSst2oxBveCuDpUMDdN7bXmpEVfWInCXIae3R1j4gsf4Zxgm5RKkF+FnYXkZAaMpyQC0FLnXKZIZ2TX3uTiYBXqHqHqKWkJHqhi4aAqk+thqyVGbqxhG7IaW0Tss2wWrYJzkunTMK9S6zEz6HOs6jUslvR0JDrnb7Q3qUT5uzq6Mnh4t3N4d3cc9jw8tr6udr1MAADs=",
                  }}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.loadingImage}
                  source={Aircontroller_stopped}
                />
              )}
            </>
          ) : null}
        </ThemedView>
        <ThemedView>
          {device.category == "TV" ? (
            <>
              {isSelected ? (
                <Image
                  source={{
                    uri: "data:image/gif;base64,R0lGODlhoACgAJECAP///wAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODUzRjJGMENBNUNCMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODUzRjJGMERBNUNCMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NTNGMkYwQUE1Q0IxMUVGOTM1NEFFN0U5RDQzRkM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NTNGMkYwQkE1Q0IxMUVGOTM1NEFFN0U5RDQzRkM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUUAAIALAAAAACgAKAAAAL/lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/R24I7P6/f8vv8PGCjIJzRoeIiYmFio2Oj4aMgIOUk5KVmJmTl4qdnpmcf5KZoZOmoKWXqquhi06uqY+irrFztrC9p6q9tXuzvb6/sKHLw6THxqfDyarPzJ3Nz5DE2aO/1bbS2MnV28zY3s/b0cLu5MXh59jk4NtA7e7j4OH28+T59uf8/+o+8p3R/oH8A/AgfyUmcQUcGEehYyxOPwYYCIDykytJgQo0GN/wM5AvTYD6RCAcFERjrgy6QgBbtUAmKgyyWtBrdkEnpgy2bDCNfyveOpzae8CUH5dbPgSqeGo0ZN4YSgSibOO1CdIrTkYGfWoT64stxTtV5TfDAPbvV3tdHUmWc1gVxLEC4mj3Ljtq3Ese5LvY808t17F1XaTYFPFlY7OOBhwzQpUfx7KGzfxGzLOoZMWGjkxWBXYlasObNl0J45g/7CmOTpOo1LI3DN+ivs16tjG0gt265t1bMX9J6Du7VuOsFNU61T/PNE4KIr/FaTXMLzM9GJ1kZTncJ0MdmdXyfT3MP23eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fz7+wz/D2CAAg5IYIECFgAAIfkEBRQAAgAsJAArAFwARQAAAsWEj6nL7Q+jnLTai7PeR/gPhuJIluaJkkrKtu57rvBM16Ns53qL7/4f6gGHOyHxSDMil7wE8/lSQqciKfUqsGKn2u2z612Cw8cxeWg+/9LqorNNZcNt8nnybWfW81E8v+z3hxYouEZY6IaASLS3aNLoqHIYeadImdhxqQOp+cHZmTUJyvLZWap5eplKuRrZ6vi6GIs4W1grePuXy7eb12v3OxcMN9xWrHZ8lky2HNbs9bwVjTV9VR0nOoqSIcvh0O3NAC5RAAAh+QQFFAACACwzADgAQgAZAAACX5SPqcsID5qctCYIrd4WZw6GhveJZkVG5zqlKgtfaUyPbk27L87evFACzX5ATGjI82mUOCbFGdNtoDCqxLqSLpE1bIObA6NIPy9DXDUr1CKy0E00Hj1Ex8Mkr4d3elgBACH5BAUUAAIALC8AOABGACEAAAJzjI+py+0Po5y0WgTy3Tzl34XXB4omRJJnoK5pa77nW85ySGsujfP73cmtWMKgz3bcFJEp0TKWVEZ7QM7TObVcqU1j1vqd5ADDbWX8q4Jh0LC2loYP54Yu/Y7P6/f8vv8/IgcYyDb4Zmd4KJgotsjYSCZRAAA7",
                  }}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              ) : (
                <Image style={styles.loadingImage} source={TV_bold} />
              )}
            </>
          ) : null}
        </ThemedView>
        <ThemedView>
          {device.category == "DRYER" ? (
            <>
              {isSelected ? (
                <Image
                  source={{
                    uri: "data:image/gif;base64,R0lGODlhoACgAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0UyRUNFODdBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0UyRUNFODhBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NTNGMkYwRUE1Q0IxMUVGOTM1NEFFN0U5RDQzRkM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRTJFQ0U4NkE1Q0YxMUVGOTM1NEFFN0U5RDQzRkM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUUAAEALAAAAACgAKAAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/LP4C6/Y7P6/f8fj3tFyg4GEhGeIiIKJbI2NgH5hgp+fc1adnodamZ2LXpSbj1KVqoNTqooIe6V2rqx4D3mprV6roAayt7RVurahebN7vL90vZe6srvIrru3xslaxsDEB8FwwNnJB7MIx1TWvtLQoe7jlOrml+bpk+KfHJjnmB3r2+UY8s6dFO7ygSCS+IRD9+nErEw6foBCOA3FAURHhqRUKIpFgcYojNIiiC/xVbbKTY8EVEkNFEBuQYEsZJkhljrHz2UmXHKjFd8oJ5U8ZMKjVlPkKpTWdOnjt9piQ61GhJmkVN/mRZrUbTKD2dHp1S1cVUKFk9JpXSVeNTnGOFlkV6VmlQtGm9fqUaNkXcJiNtvuVaV+tcJh+ttoWbV2JgrBfd7l0yUfBgsIkdFoZ6dcRDso8NTma60PJlto3pHKS8mcM/oKHl5SNdmsI90KMtzIP82cE71OoGwq7dmTDuSxh398Xs+/Tt4FufEN83/HhkwMozJ2/eEjj0ytKnL56DPbv27dy7e/8OPrz48eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fz7+wn/D2CAAg6YXgEAIfkEBRQAAQAsQABXAB4ADQAAAi6EHanLvXdcgw4iqezNGicNMGCIjSJYomcnmY9bwYG8qp890Xhu8ZTHqpE8N0QBACH5BAUUAAEALEEATwAcAAoAAAIljG+giu2/1jsRtConRpjpHXQeBIrWFG4mmlZJx4qvi8pzVoNGAQAh+QQFFAABACxDAEUAHAANAAACLgwOocuIvNyBTc5qqbFX8R59SchRIlZCJ+poq5eaMSxpdM2O9mz3fA/0BIeNQAEAOw==",
                  }}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              ) : (
                <Image style={styles.loadingImage} source={dryer_stopped} />
              )}
            </>
          ) : null}
        </ThemedView>
        <ThemedView>
          {device.category == "VACUUM_CLEANER" ? (
            <>
              {isSelected ? (
                <Image
                  source={{
                    uri: "data:image/gif;base64,R0lGODlhoACgAPffAPn5+QEBASIiIhAQEP39/e/v7/z8/Pv7++fn5wkJCZ+fnyEhIdvb29zc3O3t7e7u7tDQ0PX19eHh4bm5udPT0/Pz8ykpKaenp1RUVFZWVvr6+jU1NcHBwfb29isrK/Ly8tHR0fHx8b+/vxcXF9TU1Pf39wcHBwQEBL29vejo6N3d3Y2NjaKiosrKysLCwtfX1zQ0NLa2tj09Pebm5mlpaWdnZ1VVVYKCgn5+fm9vb7W1tYSEhF5eXlhYWBQUFCoqKk1NTS4uLvT09DY2Ntra2vDw8Ds7O9XV1TExMRMTE9/f3wICAg8PDw0NDWxsbAMDA83NzYuLi6ioqKmpqYyMjJiYmGZmZuXl5aOjo8fHx7q6uuzs7Lu7u1dXVy8vLwsLC0VFRZubmz8/Px4eHoeHh9jY2JSUlEtLS76+vs/Pz4CAgLCwsLi4uHh4eKCgoKqqqhsbG3FxcZycnLKysggICHp6eq2trXBwcB8fH0RERODg4Hd3d6+vrxUVFRkZGQYGBhEREevr6wUFBRISEk9PT5WVlSQkJGhoaFxcXDMzMxYWFlBQUMbGxmVlZePj4zw8PCYmJpmZmZaWlkhISNLS0vj4+IaGhhoaGlNTU3t7e56enk5OTjc3NxgYGGtra1JSUnV1dT4+PkpKSnNzc6ampm5ubmFhYcjIyCMjI0xMTOnp6R0dHZGRkUFBQWBgYFtbW4ODgzk5ORwcHNnZ2X9/f11dXXx8fMnJyZOTk6WlpY+PjwwMDLy8vMPDwyUlJczMzIGBgeTk5J2dnVFRUaGhoTo6Oqurq1lZWbe3tzg4OLGxsW1tbZqaml9fX6SkpEZGRmNjY3Jycq6ururq6kJCQi0tLYmJieLi4o6OjiwsLMvLyzAwMA4ODsTExAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MGNjNzNmMS1jNjRlLTRmMTYtODUyYi0xNTBmYmI4ZDM1MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0UyRUNFOENBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0UyRUNFOEJBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZDI2NjQ0OS05NWZlLTRlYzktYWRhYS1iZTIwMGJhMTg2MTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTBjYzczZjEtYzY0ZS00ZjE2LTg1MmItMTUwZmJiOGQzNTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJ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",
                  }}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              ) : (
                <Image style={styles.loadingImage} source={cleaner} />
              )}
            </>
          ) : null}
        </ThemedView>
        <ThemedView>
          {device.category == "WASHING_MACHINE" ? (
            <>
              {isSelected ? (
                <Image
                  source={{
                    uri: "data:image/gif;base64,R0lGODlhoACgAPftAAEBAQICAvb29v39/fj4+AMDA/z8/AsLCwQEBAcHB/v7+/Pz8/n5+fX19fT09Ozs7BISEvf39wgICPLy8iAgIOnp6fr6+sTExBsbG+/v7wkJCa2trejo6DQ0NK+vryEhIdjY2BQUFC0tLRYWFlBQUA0NDQYGBtvb29TU1LKyssLCwoqKisfHx5OTk2JiYlpaWqampkpKSkxMTIaGht3d3VZWVsXFxXBwcO7u7rS0tEVFRTs7OxgYGBMTExkZGQoKCu3t7dLS0vDw8A4ODgUFBcjIyOrq6iMjI7m5ud/f36ysrDU1NdPT07u7u7CwsEtLS4SEhFxcXMHBwX5+foGBga6urh8fH2ZmZmhoaGFhYRoaGikpKQwMDBUVFSYmJubm5hAQEOfn5x0dHdnZ2UJCQqGhodDQ0Li4uJKSkqCgoOLi4pycnMvLy52dnZubm01NTbOzs3x8fMnJyVtbW2RkZGVlZZ6entHR0RERESgoKCoqKlhYWGNjYzg4ODk5OZmZmV9fX0dHRzw8PM/Pz3Nzc0hISJqamvHx8dzc3L+/v0lJSRwcHJWVlRcXF09PT9fX125ubk5OTrW1tTc3N+Hh4URERMDAwHt7e21tbR4eHomJieDg4FlZWcPDw2pqanp6epCQkLa2tre3t9bW1lNTU11dXYiIiD8/P9XV1VVVVaWlpW9vby8vL2tra42NjTo6OpSUlMrKyuPj41JSUuvr63Z2dpaWlg8PD4yMjM7OzldXV8zMzKKiojExMZGRkX9/f729vTY2Ns3NzSQkJIWFhScnJz09Pbq6und3d4+Pj0FBQT4+PkNDQysrK2lpaSwsLNra2qioqHR0dLGxsTIyMr6+vmBgYHFxcWdnZ4KCgry8vKenp+Tk5KSkpKmpqaurqzMzMzAwMN7e3iUlJYeHh8bGxlRUVICAgOXl5Z+fn15eXi4uLgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjkyNzk0YS1hZDFhLTQ1NGItOGZiYy0wMzcxNTJmOTI2OWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0UyRUNFOTBBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0UyRUNFOEZBNUNGMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNjkyNzk0YS1hZDFhLTQ1NGItOGZiYy0wMzcxNTJmOTI2OWUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjY5Mjc5NGEtYWQxYS00NTRiLThmYmMtMDM3MTUyZjkyNjllIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJ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LOHDiOmSTcw4sdjGkA+DjUxZ8OTKmPN+zcwZr1fIBDt77so3dF2DogGTHm16LurUilfffe26IOzYXDXbxj3wdu3crHufFu477mfdAotblq288vHmzplDBy19OuPn1htjz+64OnfC27+D//cu/m94zO1Sn+++MDpw7RKpv0d88Tr5vhvp30euUfL+2Q4J0A4BDY03H34MHTKQEQIN4NByB/J3kCyHKJFGEUygMUMbTRTxkHn//WZQElXcoMMzVsggwiIHbKFFCwswUGBhIRp3kAFmXHFEAAjIFYBcAJAxQwUPIhihageNkYUGfWHQCYEzSpiVkQYx4UIJfkGQhoxFBqcVlQMNgMIVQ/gVwBMXQFTafwdFIM4cPfx1wAoNRCQlVmsWJIwLRADgVwF+JBKfl1MS2k4ELUAg2AceTDCRoVfdyYELg6nj4KMAHqlXQQbA4INgGNhhAUWQWmVoE4X46ZcGWYBgUaZbEf86QBkU/AXAFqKMWhGsX/IqkCFHqNoXJ9zUh2SsvhqBSwF+JdDBGgoYO5ym7BgkACOK8vWDHyksgJGveIKbQwh99TJNf8f2Oi1BBlDxI18uoJPfuurS244FcZjA1wd/1JkRuJGC680WeUlwA4Po2htuugKdEEOPd0EQCkcAmwruITcwaZcGMgBBMcMLKxwBL+TWVYAgKXRUcVWQ7lKJXXisYIDKIAcMLhB7/FBXHlLQXLPFADvxBLNyQfAJkR//zDKkC3gQyAFy+TGKR6UuDakAF2TxARderEJ11VTleRALLUyhygNfrxy22AUxQAAHcN1pM9ggsV2o3SOBeTfedeuMHTLfPgNutd9pC742iCFBiOxgcSter+PfGri45NIyXiPd7bE3ueYfwketf5lHth5l6Yk2enmGH4465HuvTnjrrqs9d+xKP077povdjrthulf71u/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/334Icv/vjkl2/++einr774AQEAIfkECRQA7QAsAAAAAKAAoAAACP8A2wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pd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",
                  }}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              ) : (
                <Image style={styles.loadingImage} source={washer} />
              )}
            </>
          ) : null}
        </ThemedView>
        <ThemedView style={{ flexDirection: "column" }}>
          <ThemedText
            type="callout"
            style={{ fontFamily: "LGEIHeadline-Bold" }}
          >
            {TranslateDeviceName[device.category]}
          </ThemedText>
          <ThemedText type="body">{device.name}</ThemedText>
        </ThemedView>
      </ThemedView>

      <Checkbox
        value={isSelected}
        onValueChange={toggleSelection}
        color={isSelected ? Colors.light.tint : undefined}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  deviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  loadingImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

import Aircontroller_stopped from "@/assets/images/aircon_gray.png";
import cleaner from "@/assets/images/cleaner_gray.png";
import dryer_stopped from "@/assets/images/dryer_gray.png";
import TV_bold from "@/assets/images/tv_gray.png";
import washer from "@/assets/images/washer_gray.png";
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
                    uri: "data:image/gif;base64,R0lGODlhoACgAIABAKUANP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODQyODY4Ni01Y2YwLTQyYzAtYjRmMS1mZjQ4M2NiZjVlZjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzkwN0Q0QkZBNUREMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzkwN0Q0QkVBNUREMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ODQyODY4Ni01Y2YwLTQyYzAtYjRmMS1mZjQ4M2NiZjVlZjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDg0Mjg2ODYtNWNmMC00MmMwLWI0ZjEtZmY0ODNjYmY1ZWYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8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",
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
                    uri: "data:image/gif;base64,R0lGODlhoACgAJECAP///6UANP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzkwN0Q0QkFBNUREMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzkwN0Q0QkJBNUREMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTA3RDRCOEE1REQxMUVGOTM1NEFFN0U5RDQzRkM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3OTA3RDRCOUE1REQxMUVGOTM1NEFFN0U5RDQzRkM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUUAAIALAAAAACgAKAAAAL/lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/R24I7P6/f8vv8PGCjIJzRoeIiYmFio2Oj4aMgIOUk5KVmJmTl4qdnpmcf5KZoZOmoKWXqquhi06uqY+irrFztrC9p6q9tXuzvb6/sKHLw6THxqfDyarPzJ3Nz5DE2aO/1bbS2MnV28zY3s/b0cLu5MXh59jk4NtA7e7j4OH28+T59uf8/+o+8p3R/oH8A/AgfyUmcQUcGEehYyxOPwYYCIDykytJgQo0GN/wM5AvTYD6RCAcFERjrgy6QgBbtUAmKgyyWtBrdkEnpgy2bDCNfyveOpzae8CUH5dbPgSqeGo0ZN4YSgSibOO1CdIrTkYGfWoT64stxTtV5TfDAPbvV3tdHUmWc1gVxLEC4mj3Ljtq3Ese5LvY808t17F1XaTYFPFlY7OOBhwzQpUfx7KGzfxGzLOoZMWGjkxWBXYlasObNl0J45g/7CmOTpOo1LI3DN+ivs16tjG0gt265t1bMX9J6Du7VuOsFNU61T/PNE4KIr/FaTXMLzM9GJ1kZTncJ0MdmdXyfT3MP23eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fz7+wz/D2CAAg5IYIECFgAAIfkEBRQAAgAsJAArAFwARQAAAsWEj6nL7Q+jnLTai7PeR/gPhuJIluaJkkrKtu57rvBM16Ns53qL7/4f6gGHOyHxSDMil7wE8/lSQqciKfUqsGKn2u2z612Cw8cxeWg+/9LqorNNZcNt8nnybWfW81E8v+z3hxYouEZY6IaASLS3aNLoqHIYeadImdhxqQOp+cHZmTUJyvLZWap5eplKuRrZ6vi6GIs4W1grePuXy7eb12v3OxcMN9xWrHZ8lky2HNbs9bwVjTV9VR0nOoqSIcvh0O3NAC5RAAAh+QQFFAACACwzADgAQgAZAAACX5SPqcsID5qctCYIrd4WZw6GhveJZkVG5zqlKgtfaUyPbk27L87evFACzX5ATGjI82mUOCbFGdNtoDCqxLqSLpE1bIObA6NIPy9DXDUr1CKy0E00Hj1Ex8Mkr4d3elgBACH5BAUUAAIALC8AOABGACEAAAJzjI+py+0Po5y0WgTy3Tzl34XXB4omRJJnoK5pa77nW85ySGsujfP73cmtWMKgz3bcFJEp0TKWVEZ7QM7TObVcqU1j1vqd5ADDbWX8q4Jh0LC2loYP54Yu/Y7P6/f8vv8/IgcYyDb4Zmd4KJgotsjYSCZRAAA7",
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
                    uri: "data:image/gif;base64,R0lGODlhoACgAIABAKUANP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYzk2ODU4Ny02MDhlLTQ2NmItYjk0NC0zNTMxNzliOWIyMzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM4QURBOTRBNURFMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM4QURBOTNBNURFMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODIzMzYyMy1jOThiLTQ0ZmUtODc2Ni02ZDFkYTMxNDI3MDQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMDcxNWM2Ni05ZWVlLWVkNDUtOGIzOC00M2M0YzIzMTkxODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFFAABACwAAAAAoACgAAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Pyz+Auv2Oz+v3/H497RcoOBhIRniIiCiWyNjYB+YYKfn3NWnZ6HWpmdi16Um49SlaqDU6qKCHuldq6seA95qa1eq6AGsre0Vbq2oXmze7y/dL2XurK7yK67t8bJWsbAxAfBcMDZyQezCMdU1r7S0KHu45Tq5pfm6ZPinxyY55gd69vlGPLOnRTu8oEgkviEQ/fpxKxMOn6AQjgNxQFER4akVCiKRYHGKIzSIogv8VW2yk2PBFRJDRRAbkGBLGSZIZY6x89lJlxyoxXfKCeVPGTCo1ZT5CqU1nTp47faYkOtRoSZpFTf5kWa1G0yg9nR6dUtXFVChZPSaV0lXjU5xjhZZFelZpULRpvX6lGjZF3CYjbb7lWlfrXCYfrbaFm1diYKwX3e5dMlHwYLCJHRaGenXEQ7KPDU5mutDyZbaN6RykvJnDP6Ch5eUjXZrCPdCjLcyD/NnBO9TqBsKu3Zkw7ksYd/fF7Pv07eBbnxDfN/x4ZMDKMydv3hI49MrSpy+egz279u3cu3v/Dj68+PHky5s/jz69+vXs27t/Dz++/Pn069u/jz+//v38+/sJ/w9ggAIOmF4BACH5BAUUAAEALEAAVwAeAA0AAAIuhB2py713XIMOIqnszRonDTBgiI0iWKJnJ5mPW8GBvKqfPdF4bvGUx6qRPDdEAQAh+QQFFAABACxBAE8AHAAKAAACJYxvoIrtv9Y7EbQqJ0aY6R10HgSK1hRuJppWSceKr4vKc1aDRgEAIfkEBRQAAQAsQwBFABwADQAAAi4MDqHLiLzcgU3OaqmxV/EefUnIUSJWQifqaKuXmjEsaXTNjvZs93wP9ASHjUABADs=",
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
                    uri: "data:image/gif;base64,R0lGODlhoACgALMJAN3d3dvb2/f39/T09Pn5+eHh4efn5/Dw8KUANP///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MGNjNzNmMS1jNjRlLTRmMTYtODUyYi0xNTBmYmI4ZDM1MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM4QURBOENBNURFMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzkwN0Q0QzJBNUREMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NDY3ZDEwMy1iYjRhLTRhOWUtYmJlZi0zMTBjOWUzMDg0NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTBjYzczZjEtYzY0ZS00ZjE2LTg1MmItMTUwZmJiOGQzNTA1Ii8+IDwv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",
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
                    uri: "data:image/gif;base64,R0lGODlhoACgALMJAPj4+Pb29unp6f39/dvb2/Ly8sfHx+zs7KUANP///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjkyNzk0YS1hZDFhLTQ1NGItOGZiYy0wMzcxNTJmOTI2OWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM4QURBOTBBNURFMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM4QURBOEZBNURFMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNjkyNzk0YS1hZDFhLTQ1NGItOGZiYy0wMzcxNTJmOTI2OWUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjY5Mjc5NGEtYWQxYS00NTRiLThmYmMtMDM3MTUyZjkyNjllIi8+IDwv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",
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

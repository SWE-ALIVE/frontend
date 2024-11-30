import Aircontroller_stopped from "@/assets/images/aircon_gray.png";
import dryer_stopped from "@/assets/images/dryer_gray.png";
import cleaner from "@/assets/images/robot(fill)1.png";
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
                    uri: "data:image/gif;base64,R0lGODlhoACgANUvAP///6UCNbUsV6cHOaYFOKYDNqYDN/7+/vr6+vb29qgMPfv7++zs7Pz8/KgKPP39/fn5+acJO+/v7+7u7qkOP+rq6vX19evr6+fn5+bm5vHx8a0aSfj4+PPz87InU6YIOvDw8KoSQqwYR/f397IlUfT09NbW1vLy8uTk5KoQQKYGObAjT60aSOjo6KUANP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjYzcwNzcyNi1lNjc2LTQzYjctOGU0OS0xYTA4ODE4MGZiNWEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTUxMDJDRkVBNzNEMTFFRkE2MjNEMUZDQzk1NDk4NkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTUxMDJDRkRBNzNEMTFFRkE2MjNEMUZDQzk1NDk4NkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYzcwNzcyNi1lNjc2LTQzYjctOGU0OS0xYTA4ODE4MGZiNWEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Y2M3MDc3MjYtZTY3Ni00M2I3LThlNDktMWEwODgxODBmYjVhIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECRQALwAsAAAAAKAAoAAABv/Al3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKTy6Njo+Qjot/kZWWkJN3l5ucjZlxnaGcn2yipqOkZ6erl6lkrLCtrl+xtZWzXLa6t7hXu7+YvVTAxJLCUcXJLseMysnMTM7O0EnS0tRH1tPYRNrX3C/e1uDi39Tl49DokQHE6ugE5r3aAvX2Aunz0gD8/QD1BAooE6aswAB/CPsNEPgMVzICBBJKBACx4SxlAiYmxGcx1cOMGjfGK3axWACQIf0JaEfSFcaUCDm29FjMAEqY/wx0zOTsJkz/ATp3LuqJs5/MmTyJFl3ZiOEvmsXi+dRYz9HIp6SIsXS0VN4kZwKnSny0FesnbTC1QbUm9ui2s9acrjMGVxuBsujWzhWnd6/arN7u+u3r1+vQwnwBI/5bd7FhRY4ZN47sziVloV8vI52sWZdDbQNCix4gmTCx0AhD57Ms7WBC0o85n5YIeyDB1rRjK07mOvXb28pQ+1Ntm1nr0cQx6+tsihzz5s6fowIXTros6tWt88KeXTtd7t21gy/ifdl48tbPZ3uuHgnz9koow4+2eL6Twfab5c2PzBv/Krr9BwUwAtKySoEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHboPeGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkwyGQQAIfkEBRQALwAsAAAAAKAAoAAABv/Al3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur54usrO0tbOwWra6u7W4UrzAwbK+TMLGwcRHx8vIyULM0LzJ0dTSsNXYuq7Z3Nqq3eC9qOHkt6bl6C6l6emj7Oyh7++g8vCx9fab+PKc+/Oa/vhhCmgrALmBAQn8q1RPgMOHAgRSkgegokUADgkUaDcRXYEBF0NaHLARXUdyBAiIXAkgpclJ6QSwFBnxZSR0BGTOpKmwnCT/dAF07rwowKDPm+iEDq1Y8ygkdAaULhVgwKYjdlKHUuV4NeZSovkavcs6s6iskuCe4nRBdqXDWT3TPiJndNZXjAvFptvYNiStunK7vltaT21Dt/gMs0NL0JxgeQQAB1TceB/lyoXn4ouM+TLmvIw++/Ms2mro0pkfo+aqenW4n65N6419ECnt17DlDdjNe0Bq2+x2h9wtEXg6kCJ9gyYNDvnw5cy7Ob+onDXM4CurO2UYfDoA4tZPouvNO+yl29D6oV/Wab2xT+6B0Yu/Kx59cfbvqyOl/xT9VO6tgt42q+GC2jSVOfMMQQoSYVmDRkAHoYOBTehENBZmqOGGHHboM+GHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRNoYBAAh+QQJFAAvACwmACUAUgBUAAAG/8CXcEgsGo9Il1C5RDqf0Kj0qHRZr9jrdMvtvqzfrHjsLZur47QabG4/1/C4ex6O2+X07n2Pz0P5gHZ+b4GFa4NGhoqHiIuOaoOPkmR0k5ZZbmiXm22bnmxen6JMW6OieqafpamnUqyjUa+whLKtSbW2iaYBLgQEAQUFvJ63osKyxZsFKlcAzs8QDL9XAcOKup7Wz9vbWdbXRKIEDwfc5gAux5LYlwUK5+cP6ZbhnwUs8OdW345Dox759BGgt0SUgIDmOBX8hFAfP3CmEjTcdoDTpm8Tt50YOKmOKBQZnYV4iCtQyAMDSj4KmaCAypUTX05quMGAS3Uy92jLh+DDFcyOOfkE4MiBmwAPQSeRHLM0aZpqTkUNdRm1qtWrWLNqFbNw6zWvj7qCBVQvW05/n6BCLVn2kgECEQyordXWEoUWAEYwUOALWRFPE7iBcNH0ErtJELhVJMzqsKRzKV4lWxTAgAsE3Br4dawowIAMDbZ1YJzKiaXKBChMgECt8WTKhWeZzrbWlKuxaabgzq17NxZUvkmt2n0GdyewX+Z4zbO10VVEYs9CRxt0OmfJwq1T36ydCvfus1WBBx42+3jye8KcjyTH/PpI/pqMDwIAIfkECRQALwAsAAAAAKAAoAAABv/Al3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGuS5CycrHTcku0NHS0c1F0C/T2drLxc/b39/C4OPkvOTn6Ljo6+Wz7O/nsvDz46/09+Cr+PvhqPz/2k4BHDiNlDeCCEchXHgtFMOH3DhBfPhpIkWJFi9qyghxI0eNlj5OxCSyY8iJAVwQIBCgQIGUC08+fPlRJsICKqIB2MkTAgP/ltECwLxH6eFQnkiRThtKVNJDAg8OJJ0KwAXNf0UXFlBAleoDqwOdMizAoitVaEz3RYLowexZAmEhQRTgdmpCuQ/rnk3b1NHEBHqRHrjbCCHTwEhPwAX4yCIKxDtD8MXn1yLkAwMIL8oIOUEBzYo4ImZYmXPdDQY+X+VX2qhOswg+RFuMtbDFAIs5JBXgYaTtjJO1BafXmqHQkgV/GyXwGXlDRs5LFo/uGzp1jtOvx2ys3aTy7tuzg2e91vj18guPH0cuFqEBAhEMqBfZniCFFgBGMFCwsuakhRMkBYILwxGUFUEQJDUYgRkdOBBVKWBXCUABGOACAkk14J+D+wQwgUAGDSDVAYMWXTJQhQRQMAEEQTVoU4cFevcihetVR9J48GCEIzud7LhORT6240mQ+ThEZDYKHUlNREYeKZCTqQTJCo72dCdPdNjQwt4t9O0ioy9hMSlOjs9Vg005YppJBDfLpKnmm3DGKeecdNZp55145qnnnnz26eefgAYqKBJBAAAh+QQJFAAvACwAAAAAoACgAAAG/8CXcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusrC5Cr7CtZ68utre4t7Nfti+5v8Cxu1a1wcbGw1LHy8zJS8zQ0c5G0dXN09bZ0M7a3cu73uHHq+LlyKjm6cCn6u25pMXu8qPy9b2h9vnCnPr5n/3++AEMqGmgvoIGCVpK2A8Tw4ML+wVwQYBAgAIFJtaLmC9jQo7yCqi4BaCkSQgMLN4KoDEcpXwtTcqUmaulS0n5CDw4MLMnAP8XHtO9rFdAgU+fD4C2w2mvAIujPm3ZLBdJnweoUQkshaRPANae87jm+xp16k1H/RKQlXkgbCN5NtfKPKFV3SOAKOSWDGFWHFqAeg8McLtooN4EBQgrMijX3l/DXzcYSBzU3GOYJKEi+HCrrtC3AAPU5TBTgIeGoAf2Bbba22V7LB++Sw2TQGLZ9xjhfvh6N2rdvg32Dr7xLnGItI8XH67cclXYwZ/Xix1bNlN5BghEMECd4XV3FFoAGMFAQcWPk+pNmAnCRWt3Q91BmNnW/cD47XymEF5JXQADLiAwUwPo4VdOAANk0IBMHdgH0CXt/EcABRNAsNJ9IB34HnIZ+leH3W8ONaeNQCJa00mJ1fyD4jWerDgOPi7+Qk+MuuwDY4zs4JjKiq40B85x3OzmyzS+8EbkEN4dSY1CSiKxlI1NPjNiblEq0wyUVVYhTCxYZunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihgwYBACH5BAUUAC8ALAAAAACgAKAAAAb/wJdwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+eLrKztLWzsFq2uru1uFK8wMGyvkzCxsHER8fLyMlCzNC8ydHU0rDV2Lqu2dzaqt3gvajh5Lem5egupenpo+zsoe/voPLwsfX2m/jynPvzmv74YQpoKwC5gQEJ/KtUT4DDhwIEUpIHoKJFAA4JFGg3EV2BARdDWhywEV1HcgQIiFwJIKXJSekEsBQZ8WUkdARkzqSpsJwk/3QBdO68KMCgz5vohA6tWPMoJHQGlC4VYMCmI3ZSh1LleDXmUqL5Gr3LOrOorJLgnuJ0QXalw1k90z4iZ3TWV4wLxabb2DYkrbpyu75bWk9tQ7f4DLNDS9CcYHkEAAdU3Hgf5cqF5+KLjPky5ryMPvvzLNpq6NKZH6Pmqnp1uJ+uTeuNfRAp7dew5Q3YzXtAatvsdofcLRF4OpAifYMmDQ758OXMuzm/qJw1zOArqztlGHw6AOLWT6LrzTvspdvQ+qFf1mm9sU/ugdGLvysefXH276sjpf8U/VTurYLeNqvhgto0lTnzDEEKEmFZg0ZAB6GDgU3oRDQWZqjhhhx26DPhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkETaGAQAIfkECRQALwAsJgAlAFIAVAAABv/Al3BILBqPyKFLmWw6n9Ao0UWtWq3SrFZ77XqpwuV2zP2az+R088xui9Vpt5wNJ8/v6DoUz6fr132BX39FgoaDhGGHi12JjI9Vf5CTkWqUl29jmJd2m5xlnp9RoZtSpKWZSaeeT6sBAZhOqy6wsaqhBbWkSLO0obyTuQMZHQcAElW6olPBDgsA0NELFqdGlBEc0drRFVTKkNaPBQ4C2+YAK6zMjK/P5+bItkqPBBjv5w3f4POP7vfbDvQx4vfo37kKBeRRMmiOGpWE+14sZLjNFwFKEiElpFhR4KKMkAhwjHaB1iuMlAogGAnAW69FEkb6ermI4waaixKaaGBQA07ESBpWvkvw4WcgfQomaBNAQoQDo6cIQIQqjqrVq+w8Yj1EQCurrbHAchKLkuwjgmYFoX3p9dDaUydNLqP5KkCEZBjXkarFIAGABwzkKTo1wIU5BXn1hrpormTbO0fgUjGHYObAcKFqmcMwCdjLvyUSF5J8JYCBiJ43vTqd7PEcWXvlik6dNs+e2rZb4UY0ancjUL5TmQpuyTec3ZLIOlKeCOTV5m9fQsf8c3pk6dYBrcquWzD322e/F+cjvrmb8uXfCM8eBAAh+QQJFAAvACwAAAAAoACgAAAG/8CXcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8IuQ87MSi7T1NXV0ULW2tvT2cXc4OHQv+Ll4rvm6ee46u3htO7x67Dy9eCt9vncrPr926r+AlJDJbDgQFIGE44LpTChqIYKQUFs6GkiRU4WKS68lBGipo4BAkTE1NGFyJGWLBY4aTFlSZYoJxlcOSBDhwMAJFCDabDSTP8HCwAIHbrAQkZKBiNwGMp0aIVpPAMiDVjAgYCmWAGs8ChJYMigWbHqjPlIIAEMYbM2iCo1UkGwaZs6YNvPbcG4WSsUIMvIIF6sRqftFWhX4F+sJl0Q6Omo4N7DTRM7bFyQAOShF0yGZNxoJoLLAKBe7JtQwmXJfBE1hLyhZeeZLkw0wKvh6GuFGj6HTfDBNml/URVMYCqAhAgHJSmXnEZgsO9FKpf/uy19uXKLm6tfn0iA7sSy1a1vD/99PPnRv89zBa8ePfXq3utCCp89e8Gu0kMGiLCT83yQ0zCQAAAPMJBaehMN4AJWCvj3X0aLYZVZfO74hN00WCGAmnwyXbhzYFMY3GehdASW4GBhE0UVgAGEkZTiitXYx6FLKWo2mYvt2dNJjvXsyGOFPv6YjkRClvNQkfeMguQ+CC15zSlOArQkP0K6kqMs7cEjXS7icekeLyIa0yM25mAjzTNmpqnmmmy26eabcMYp55x01mnnnXAEAQAh+QQJFAAvACwAAAAAoACgAAAG/8CXcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusrUIuQ7CuaC61tre3s2C4vL21r7pVvsPEssFOxcnFx0nKzsvMRc/TxNHU19C62NvDrdzfvqzg472q5Oe2qOjr6aTs78ah8O+i8/Cg9vOe+fqc/PrxLv2zp2lggAD3MA10gTChJX4FGvJ7uFCiw0nsIg7I0OEAAAm2LLKrlNHBAgAoUy6w8I8SuwgcUspMWaGWyHMuzxVwIGCmT/8AKwhKQnfw5E+fIC8+QkcAw9GfDW7ijLTO6NOZDqSOo7ru6s8KBZQyYufVJ8taYdFxRVfWJ0MXBEY6Whe27cy39OauI2A35QWGB+U2yoigLwCb/ca+k9AXr1hE8+xumDg4owsTDbxqaFkZnobCRxN84KyY3E0FE2QKICHCwUK9C2sRSEt6EcTY5Trjjg2bX+DdvfMR0Jpv6W7ewY8XT648cenmQo1Dd657N/GtkI7//r1uKO6DASKEFJzdYC0GCQA8YPD4eb4BLnwqIF/+X1yff69TI+m7lk8EjmGHUX/xzYRBd/zhpl4J9K2Vz00BGKCWQg9GeAt3AlL0IGB5UTh8HTedfLhNiCLuR2KJzuCDYjL1rNjNKC6G406MuZxCozkxioOiKx8eM501uEUjzWtCDtlekbFMiOQTIy5phTJOfmFMQFFWaeWVWGap5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp559BAAAh+QQJFAAvACwAAAAAoACgAAAG/8CXcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vni6ys7S1s7Batrq7tbhSvMDBsr5MwsbBxEfHy8jJQszQvMnR1NKw1di6rtnc2qrd4L2o4eS3puXoLqXp6aPs7KHv76Dy8LH19pv48pz785r++GEKaCsAuYEBCfyrVE+Aw4cCBFKSB6CiRQAOCRRoNxFdgQEXQ1ocsBFdR3IECIhcCSClyUnpBLAUGfFlJHQEZM6kqbCcJP90AXTuvCjAoM+b6IQOrVjzKCR0BpQuFWDApiN2UodS5Xg15lKi+Rq9yzqzqKyS4J7idEF2pcNZPdM+Imd01leMC8Wm29g2JK26cru+W1pPbUO3+AyzQ0vQnGB5BAAHVNx4H+XKhefii4z5Mua8jD778yzaaujSmR+j5qp6dbifrk3rjX0QKe3XsOUN2M17QGrb7HaH3C0ReDqQIn2DJg0O+fDlzLs5v6icNczgK6s7ZRh8OgDi1k+i68077KXb0PqhX9ZpvbFP7oHRi78rHn1x9u+rI6X/FP1U7q2C3jar4YLaNJU58wxBChJhWYNGQAehg4FN6EQ0Fmao4YYcdugz4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBE2hgEACH5BAUUAC8ALAAAAACgAKAAAAb/wJdwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJik8ujY6PkI6Lf5GVlpCTd5ebnI2ZcZ2hnJ9soqajpGenq5epZKywra5fsbWVs1y2ure4V7u/mL1UwMSSwlHFyS7HjMrJzEzOztBJ0tLUR9bT2ETa19wv3tbg4t/U5ePQ6JEBxOroBOa92gL19gLp89IA/P0A9QQKKBOmrMAAfwj7DRD4DFcyAgQSSgQAseEsZQImJsRnMdXDjBo3xit2sVgAkCH9CWhH0hXGlAg5tvRYzABKmP8MdMzk7CZM/wE6dy7qibOfzJk8iRZd2YjhL5rF4vnUWM/RyKekiLF0tFTeJGcCp0p8tBXrJ20wtUG1JvbotrPWnK4zBlcbgbLo1s4Vp3ev2qze7vrt69fr0MJ8ASP+W3exYUWOGTeO7M4lZaFfLyOdrFmXQ20DQoseIJkwsdAIQ+ezLO1gQtKPOZ+WCHsgwda0YytO5jr129vKUPtTbZtZ69HEMevrbIoc8+bOn6MCF066LOrVrfPCnl07Xe7dtYMv4n3ZePLWz2d7rh4J8/ZKKMOPtni+k8H2m+XNj8wb/yq6/QcFMALSskqBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26D3hhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMMhkEADs=",
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

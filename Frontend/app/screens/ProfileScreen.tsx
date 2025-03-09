import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../context/AuthContext"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { profile } = useAuth()

  const defaultAvatar = require("../assets/default-avatar.png")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Profile photo</Text>
          <TouchableOpacity style={styles.photoContainer} onPress={() => navigation.navigate("EditPhoto" as never)}>
            <Image source={profile?.photoURL ? { uri: profile.photoURL } : defaultAvatar} style={styles.profilePhoto} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoItem} onPress={() => navigation.navigate("EditName" as never)}>
            <Text style={styles.infoLabel}>Name</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{profile?.name || ""}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{profile?.email || ""}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Contact</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{profile?.contact || ""}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{profile?.gender || ""}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#657786",
    marginBottom: 10,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E8ED",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  infoLabel: {
    fontSize: 14,
    color: "#14171A",
  },
  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 14,
    color: "#657786",
    marginRight: 8,
  },
  chevron: {
    fontSize: 18,
    color: "#AAB8C2",
  },
})

export default ProfileScreen


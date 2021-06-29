import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawtoken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );
    return rawtoken ? JSON.parse(rawtoken) : [];
  }

  async setAccessToken(accessToken) {
    const newtoken = accessToken;

    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(newtoken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;

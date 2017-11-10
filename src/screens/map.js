import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.statusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <Text style={Styles.header}>Your Trip</Text>
        <Text style={Styles.subheader}>Navigating to </Text>
        <Text style={Styles.aqi}>Los Angeles.</Text>
        <Text style={Styles.subheader}>Minimum Air Quality</Text>
        <Text style={Styles.aqi}>87.2.</Text>
        <Text style={Styles.subheader}>Air Quality Event in </Text>
        <Text style={Styles.aqi}>13.5 Minutes.</Text>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#212121",
    paddingTop: 40
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  header: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "300"
  },
  subheader: {
    color: "white",
    fontSize: 36
  },
  statusBar: {
    height: 20
  },
  aqi: {
    fontWeight: "800",
    fontSize: 42,
    color: "white",
    marginBottom: 20
  }
});

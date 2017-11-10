import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    let aqi = props.aqi;
    this.state = {
      aqi,
      aqiUnderline: {
        borderBottomWidth: 5,
        borderBottomColor: this.getAqiColor(aqi)
      }
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ aqi: newProps.aqi });
    this.updateAQIColor();
  }
  getAqiColor(aqi) {
    let color;
    if (aqi < 50) color = "#4CD964";
    if (aqi >= 50 && aqi <= 150) color = "#FFCC00";
    if (aqi >= 150) color = "#FF3B30";
    return color;
  }
  updateAQIColor() {
    this.setState({
      aqiUnderline: {
        borderBottomWidth: 5,
        borderBottomColor: this.getAqiColor(this.state.aqi)
      }
    });
  }
  render() {
    let { aqi } = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.statusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <Text style={Styles.header}> Hello John, </Text>
        <Text style={Styles.subheader}>The current AQI is</Text>
        <View style={Styles.row}>
          <View style={this.state.aqiUnderline}>
            <Text style={Styles.aqi}> {aqi.toFixed(2)}</Text>
          </View>
        </View>
        {aqi > this.props.aqiThreshold && (
          <View
            style={Styles.icon}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
          >
            <Icon
              size={42}
              name="ios-car-outline"
              type="ionicon"
              color="#fff"
            />
          </View>
        )}
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
    marginTop: 50,
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
    marginTop: 20,
    fontWeight: "800",
    fontSize: 42,
    color: "white",
    textAlign: "center"
  },
  icon: {
    marginTop: 40,
    flex: 1,
    alignItems: "center"
  }
});

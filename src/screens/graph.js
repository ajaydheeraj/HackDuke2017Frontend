import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Card, Divider, Button } from "react-native-elements";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from "victory-native";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 1, y: 1, label: 1 },
        { x: 2, y: 2, label: 2 },
        { x: 3, y: 3, label: 3 },
        { x: 4, y: 4, label: 4 },
        { x: 5, y: 5, label: 5 },
        { x: 6, y: 6, label: 6 },
        { x: 7, y: 7, label: 7 },
        { x: 8, y: 8, label: 8 }
      ]
    };
  }
  componentWillReceiveProps(newProps) {
    let { aqiHistorical } = this.props;
    aqiHistorical = aqiHistorical.slice(Math.max(1, aqiHistorical.length - 7));
    let data = aqiHistorical.map((item, i) => {
      return {
        x: i,
        y: item,
        label: item.toFixed(1)
      };
    });
    this.setState({ data });
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.statusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <Text style={Styles.header}> AQI Data </Text>
        <VictoryChart>
          <VictoryAxis domain={{ x: [0, 6], y: [0, 300] }} />
          <VictoryBar
            style={{
              data: {
                fill: "deeppink",
                stroke: "deeppink",
                fillOpacity: 0.7,
                strokeWidth: 3
              },
              labels: {
                fill: "#fff"
              }
            }}
            alignment={"end"}
            data={this.state.data}
          />
        </VictoryChart>
        <Button
          buttonStyle={Styles.button}
          raised
          icon={{ name: "ios-send", type: "ionicon" }}
          large
          title="EXPORT DATA"
        />
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
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingTop: 5,
    paddingBottom: 5
  },
  header: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "300"
  },
  subheader: {
    color: "white",
    fontSize: 18
  },
  statusBar: {
    height: 20
  },
  aqi: {
    fontWeight: "800",
    fontSize: 42,
    color: "white",
    textAlign: "center"
  },
  card: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 5
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15
  },
  buttonStyle: {
    width: "95%",
    backgroundColor: "deeppink"
  }
});

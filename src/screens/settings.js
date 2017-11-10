import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Switch,
  Slider,
  FlatList
} from "react-native";
import { Header } from "react-native-elements";
import { Card, Divider, Button } from "react-native-elements";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: false,
      temp: 45
    };
  }
  _keyExtractor = (item, index) => item;
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Settings</Text>
        <View style={Styles.statusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <FlatList
          keyExtractor={this._keyExtractor}
          styles={{ flex: 1 }}
          data={[1, 2, 3]}
          renderItem={({ item }) => {
            switch (item) {
              case 1:
                return (
                  <View style={Styles.row}>
                    <Text style={Styles.subheader}> Car Controls</Text>
                    <Switch
                      onValueChange={() =>
                        this.setState({ car: !this.state.car })}
                      value={this.state.car}
                    />
                  </View>
                );
              case 2:
                return (
                  <View style={Styles.row}>
                    <Text style={Styles.subheader}>
                      Temperature Cutoff - {this.state.temp}
                    </Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={100}
                      onValueChange={val => {
                        this.setState({ temp: val });
                      }}
                      step={1}
                      style={{ width: 300 }}
                    />
                  </View>
                );
              case 3:
                return (
                  <View style={Styles.row}>
                    <Text style={Styles.subheader}>
                      AQI Threshold - {this.props.aqiThreshold}
                    </Text>
                    <Slider
                      minimumValue={50}
                      maximumValue={200}
                      onValueChange={val => {
                        this.props.updateAQI(val);
                      }}
                      step={1}
                      style={{ width: 300 }}
                    />
                  </View>
                );
            }
          }}
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
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
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
  itemBox: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  },
  titleBox: {
    flex: 1,
    marginLeft: 15,
    flexDirection: "row"
  },
  titleText: {
    flex: 1,
    alignSelf: "center"
  },
  rightSide: {
    marginRight: 15,
    alignSelf: "center"
  },
  editableText: {
    flex: 1,
    textAlign: "right",
    marginRight: 15
  }
});

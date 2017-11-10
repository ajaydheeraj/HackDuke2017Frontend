import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Home, Graph, Map, Settings } from "./src/screens";
import TabNavigator from "react-native-tab-navigator";
import { Icon } from "react-native-elements";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "settings",
      aqi: 40,
      theta: 0,
      aqiHistorical: [40],
      aqiThreshold: 75
    };
  }
  componentDidMount() {
    this.sine();
  }
  update(update) {
    this.setState(update);
  }
  flashHeadlights() {
    if (Math.random() < 0.025) {
      fetch("http://localhost:5000/data")
        .then(res => res.text())
        .catch(err => err);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.aqi > this.state.aqiThreshold) {
      this.flashHeadlights();
    }
    if (prevState.aqi != this.state.aqi) {
      let aqiHistorical = this.state.aqiHistorical.concat([this.state.aqi]);
      this.setState({ aqiHistorical });
    }
  }
  sine() {
    let theta = this.state.theta;
    theta += 0.02;
    let aqi = 40 + Math.abs(Math.sin(theta) * 200);
    this.setState({ aqi, theta });
    setTimeout(() => this.sine(), 200);
  }
  render() {
    return (
      <TabNavigator tabBarStyle={Styles.tabBar}>
        <TabNavigator.Item
          selected={this.state.selectedTab === "home"}
          title="Home"
          renderIcon={() => (
            <Icon name="ios-home-outline" type="ionicon" color="white" />
          )}
          renderSelectedIcon={() => (
            <Icon name="ios-home" type="ionicon" color="deeppink" />
          )}
          onPress={() => this.setState({ selectedTab: "home" })}
          selectedTitleStyle={Styles.tabSelected}
          titleStyle={Styles.tab}
        >
          <Home aqi={this.state.aqi} aqiThreshold={this.state.aqiThreshold} />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === "map"}
          title="Map"
          renderIcon={() => (
            <Icon name="ios-podium-outline" type="ionicon" color="white" />
          )}
          renderSelectedIcon={() => (
            <Icon name="ios-podium" type="ionicon" color="deeppink" />
          )}
          onPress={() => this.setState({ selectedTab: "map" })}
          selectedTitleStyle={Styles.tabSelected}
          titleStyle={Styles.tab}
        >
          <Map />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === "graph"}
          title="Graph"
          renderIcon={() => (
            <Icon name="ios-map-outline" type="ionicon" color="white" />
          )}
          renderSelectedIcon={() => (
            <Icon name="ios-map" type="ionicon" color="deeppink" />
          )}
          onPress={() => this.setState({ selectedTab: "graph" })}
          selectedTitleStyle={Styles.tabSelected}
          titleStyle={Styles.tab}
        >
          <Graph aqiHistorical={this.state.aqiHistorical} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === "settings"}
          renderIcon={() => (
            <Icon name="ios-settings-outline" type="ionicon" color="white" />
          )}
          renderSelectedIcon={() => (
            <Icon name="ios-settings-outline" type="ionicon" color="deeppink" />
          )}
          title="Settings"
          onPress={() => this.setState({ selectedTab: "settings" })}
          selectedTitleStyle={Styles.tabSelected}
          titleStyle={Styles.tab}
        >
          <Settings
            aqiThreshold={this.state.aqiThreshold}
            updateAQI={val => this.update({ aqiThreshold: val })}
          />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
const Styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000"
  },
  tabSelected: {
    color: "deeppink"
  },
  tab: {
    color: "white"
  }
});

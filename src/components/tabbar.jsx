import React from "react";

export default class Tabbar extends React.Component {
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === "home"}
          title="Home"
          badgeText="1"
          onPress={() => this.setState({ selectedTab: "home" })}
        >
          {homeView}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

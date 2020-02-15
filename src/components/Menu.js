import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../data/dishes";
import { View, Text, SafeAreaView } from "react-native";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  static navigationOptions = {
    title: "Menu"
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
          leftAvatar={{ source: require("../assets/uthappizza.png") }}
        />
      );
    };
    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default Menu;

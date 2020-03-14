import React from "react";
import { FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { DISHES } from "../data/dishes";
import { connect } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

class MenuComponent extends React.Component {
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
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate("Dishdetail", { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  };
};

export default connect(mapStateToProps)(MenuComponent);

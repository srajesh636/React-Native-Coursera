import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../data/dishes";
import { LEADERS } from "../data/leaders";
import { PROMOTIONS } from "../data/promotions";
import { connect } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

function RenderItem(props) {
  const item = props?.item;

  if (props.isLoading) {
    return (
      <Card>
        <Loading />
      </Card>
    );
  } else if (props.errMess) {
    return (
      <Card>
        <Text style={{ textAlign: "center" }}>{props.errMess}</Text>
      </Card>
    );
  } else {
    if (item) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: `${baseUrl}${item.image}` || "" }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View />;
    }
  }
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          erreMess={this.props.dishes.erreMess}
        />
        <RenderItem
          item={
            this.props?.promotions?.promotions?.filter(
              promo => promo.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          erreMess={this.props.promotions.erreMess}
        />
        <RenderItem
          item={
            this.props?.leaders?.leaders?.filter(leader => leader.featured)[0]
          }
          isLoading={this.props.leaders.isLoading}
          erreMess={this.props.leaders.erreMess}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(HomeComponent);

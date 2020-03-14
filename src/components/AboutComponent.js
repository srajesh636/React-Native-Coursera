import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { LEADERS } from "../data/leaders";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const History = ({ data }) => (
  <Card title="Our History">
    <Text>{data}</Text>
  </Card>
);

class AboutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: `Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
        \n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`,
      leaders: LEADERS
    };
  }

  static navigationOptions = {
    title: "About Us"
  };

  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
          titleStyle={{ fontWeight: "bold" }}
        />
      );
    };

    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <History />
          <Card title="Corporate Leadership">
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={1000} delay={1000}>
            <History data={this.state.history} />
            <Card title="Corporate Leadership">
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
            <History data={this.state.history} />
            <Card title="Corporate Leadership">
              <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
              />
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  };
};

export default connect(mapStateToProps)(AboutComponent);

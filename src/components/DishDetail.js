import React from "react";
import { Card, Text, Icon } from "react-native-elements";
import { View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DISHES } from "../data/dishes";
import { COMMENTS } from "../data/comments";
import { connect } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId))
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish) {
    return (
      <Card featuredTitle={dish?.name} image={{ uri: baseUrl + dish?.image }}>
        <Text style={{ margin: 10 }}>{dish?.description}</Text>
        <Icon
          raised
          reverse
          name={props?.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log("Already favorited") : props.onPress()
          }
        />
      </Card>
    );
  } else {
    alert("Bastard");
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  if (comments) {
    const renderCommentItem = ({ item, index }) => {
      return (
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
          <Text style={{ fontSize: 12 }}>
            {"-- " + item.author + ", " + item.date}{" "}
          </Text>
        </View>
      );
    };

    return (
      <View>
        <Card title="Comments">
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </View>
    );
  } else {
    return <View></View>;
  }
}

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: []
    };
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    if (this.props.dishes.isLoading) {
      return <View></View>;
    } else if (this.props.dishes) {
      return (
        <>
          <ScrollView>
            <RenderDish
              dish={this.props.dishes.dishes[dishId]}
              favorite={this.props.favorites?.some(el => el === dishId)}
              onPress={() => this.markFavorite(dishId)}
            />
            <RenderComments
              comments={this.props?.comments?.comments.filter(
                comment => comment.dishId === dishId
              )}
            />
          </ScrollView>
        </>
      );
    } else {
      return <View></View>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

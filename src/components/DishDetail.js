import React from "react";
import { Card, Text, Icon, Rating, Input } from "react-native-elements";
import {
  View,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DISHES } from "../data/dishes";
import { COMMENTS } from "../data/comments";
import { connect } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish) {
    return (
      <Card featuredTitle={dish?.name} image={{ uri: baseUrl + dish?.image }}>
        <Text style={{ margin: 10 }}>{dish?.description}</Text>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Icon
            raised
            reverse
            name={props?.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite
                ? console.log("Already favorited")
                : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.openCommentForm()}
          />
        </View>
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
      showCommentForm: false,
      author: "",
      comment: "",
      rating: 3,
      favorites: []
    };
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  setRating(rating) {
    this.setState({ rating });
  }

  setAuthor(author) {
    this.setState({ author });
  }

  setComment(comment) {
    this.setState({ comment });
  }

  openCommentForm() {
    this.setState({ showCommentForm: true });
  }

  resetCommentForm() {
    this.setState({
      author: "",
      rating: 3,
      comment: "",
      showCommentForm: false
    });
  }

  handleComment(dishId) {
    const { postComment } = this.props;
    const { author, comment, rating } = this.state;
    postComment(dishId, rating, author, comment);
    this.resetCommentForm();
  }

  handleComment(dishId) {
    const { postComment } = this.props;
    const { author, comment, rating } = this.state;
    postComment(dishId, rating, author, comment);
    this.resetCommentForm();
  }

  render() {
    const { showCommentForm } = this.state;
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
              openCommentForm={() => this.openCommentForm()}
            />
            <RenderComments
              comments={this.props?.comments?.comments.filter(
                comment => comment.dishId === dishId
              )}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={showCommentForm}
              onDismiss={() => this.resetCommentForm()}
              onRequestClose={() => this.resetCommentForm()}
            >
              <SafeAreaView>
                <View style={styles.modal}>
                  <Rating
                    minValue={1}
                    startingValue={3}
                    fractions={0}
                    showRating
                    onFinishRating={rating => this.setRating(rating)}
                  />
                  <Input
                    placeholder="Author"
                    leftIcon={<Icon name="user-o" type="font-awesome" />}
                    onChangeText={author => this.setAuthor(author)}
                    leftIconContainerStyle={{
                      padding: 2,
                      marginRight: 12
                    }}
                    inputContainerStyle={{ marginTop: 10 }}
                  />
                  <Input
                    placeholder="Comment"
                    leftIcon={<Icon name="comment-o" type="font-awesome" />}
                    onChangeText={comment => this.setComment(comment)}
                    leftIconContainerStyle={{
                      padding: 2,
                      marginRight: 12
                    }}
                    inputContainerStyle={{ marginTop: 10 }}
                  />
                  <Button
                    onPress={() => this.handleComment(dishId)}
                    color="#512DA8"
                    title="SUBMIT"
                    buttonStyle={{backgroundColor:'#512DA8',width:'80%'}}
                    containerStyle={{backgroundColor:'#512DA8',width:'80%'}}
                  />
                  <Button
                    onPress={() => this.resetCommentForm()}
                    color="#6c757d"
                    title="CANCEL"
                    type="solid"
                  />
                </View>
              </SafeAreaView>
            </Modal>
          </ScrollView>
        </>
      );
    } else {
      return <View></View>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

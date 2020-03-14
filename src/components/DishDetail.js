import React from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, Icon, Input, Rating, Text } from "react-native-elements";
import { connect } from "react-redux";
import { COMMENTS } from "../data/comments";
import { DISHES } from "../data/dishes";
import { postComment, postFavorite } from "../redux/ActionCreators";
import { baseUrl } from "../utils/baseUrl";

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

const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
  if (dx < -200) return true;
  else return false;
};

const recognizeComment = ({ dx }) => {
  if (dx > 200) return true;
  return false;
};

function RenderDish(props) {
  const dish = props.dish;
  const handleViewRef = null;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => this.handleViewRef.rubberBand(1000),
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.name + " to favorite?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        openCommentForm();
      }

      return true;
    }
  });

  if (dish) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        handleViewRef={ref => (this.view = ref)}
        {...panResponder.panHandlers}
      >
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
      </Animatable.View>
    );
  } else {
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
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title="Comments">
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </Animatable.View>
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
                    buttonStyle={{ backgroundColor: "#512DA8", width: "80%" }}
                    containerStyle={{
                      backgroundColor: "#512DA8",
                      width: "80%"
                    }}
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

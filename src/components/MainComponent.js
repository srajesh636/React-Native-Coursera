import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Dishdetail from "./DishDetail";
import MenuComponent from "./MenuComponent";
import HomeComponent from "./HomeComponent";
import ContactComponent from "./ContactComponent";
import AboutComponent from "./AboutComponent";
import { Icon } from "react-native-elements";

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: MenuComponent,
      navigationOptions: ({ navigationOptions }) => ({
        headerLeft: <Icon name="menu" size={24} color="white" />
      })
    },
    Dishdetail: { screen: Dishdetail }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const ContactUsNavigator = createStackNavigator(
  {
    ContactUs: { screen: ContactComponent }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff"
    })
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: HomeComponent }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff"
    })
  }
);

const AboutUsNavigator = createStackNavigator(
  {
    AboutUs: { screen: AboutComponent }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerTitleAlign: "left"
    })
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor, focused }) => (
          <Icon name="home" size={24} color={tintColor} />
        )
      }
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ tintColor, focused }) => (
          <Icon name="home" size={24} color={tintColor} />
        )
      }
    },
    ContactUs: {
      screen: ContactUsNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor, focused }) => (
          <Icon name="home" size={24} color={tintColor} />
        )
      }
    },
    AboutUs: {
      screen: AboutUsNavigator,
      navigationOptions: {
        title: "About Us",
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor, focused }) => (
          <Icon name="home" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    drawerBackgroundColor: "#D1C4E9"
  }
);

class Main extends Component {
  render() {
    return <MainNavigator />;
  }
}

export default Main;

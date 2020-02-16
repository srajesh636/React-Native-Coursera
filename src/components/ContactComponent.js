import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

const ContactComponent = () => {
  const contactUs = {
    address: `121, Clear Water Bay Road \n\nClear Water Bay, Kowloon\n\nHONG KONG`,
    tel: "+852 1234 5678",
    fax: "+852 8765 4321",
    email: "confusion@food.net"
  };
  const { address, tel, fax, email } = contactUs;
  const textStyles = {
    marginBottom: 15
  };

  return (
    <View>
      <Card title="Contact Information">
        <Text style={textStyles}>{address}</Text>
        <Text style={textStyles}>{`Tel : ${tel}`}</Text>
        <Text style={textStyles}>{`Fax : ${fax}`}</Text>
        <Text style={textStyles}>{`Email : ${email}`}</Text>
      </Card>
    </View>
  );
};

ContactComponent["navigationOptions"] = _ => ({
  title: "Contact Us"
});

export default ContactComponent;

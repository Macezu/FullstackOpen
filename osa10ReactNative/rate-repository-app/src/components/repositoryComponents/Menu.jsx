import React from "react";
import { Picker } from "@react-native-picker/picker";

const Menu = ({ setOrderBy, orderBy, orderChange }) => {
  return (
    <Picker
      selectedValue={orderBy}
      onValueChange={(itemValue) => orderChange(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="Latest" />
      <Picker.Item label="Highest rated repositories" value="Highest" />
      <Picker.Item label="Lowest rated repositories" value="Lowest" />
    </Picker>
  );
};

export default Menu;
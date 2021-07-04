import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const MenuComponent = ({ handleOrderChange }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => handleOrderChange("CREATED AT")} title="CREATED AT" />
          <Menu.Item onPress={() => handleOrderChange("RATING AVERAGE")} title="RATING AVERAGE" />
          <Divider />
          <Menu.Item onPress={() => handleOrderChange("ASC")} title="ASC" />
          <Menu.Item onPress={() => console.log('CLLICK')} title="dsafds" />
          <Menu.Item onPress={() => handleOrderChange("DESC")} title="DESC" />
        </Menu>
      </View>
    </Provider>
  );
};

export default MenuComponent;
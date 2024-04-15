import { Link } from 'react-router-native';
import { StyleSheet } from 'react-native';

import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const RepositoriesTab = ({ name, target, onPress }) => {
  return (
    <Link to={`/${target}`} onPress={onPress}>
      <Text
        color='light'
        backgroundColor='dark'
        fontWeight='bold'
        fontSize='subheading'
        style={styles.container}
      >
        {name}
      </Text>
    </Link>
  );
};

export default RepositoriesTab;

import { useFormik } from 'formik';
import { StyleSheet, View, Pressable } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Text from './Text';
import theme from '../theme';
import { TextInput } from 'react-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: theme.colors.backgroundWhite,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 4,
    margin: 10,
    fontSize: theme.fontSizes.subheading,
  },
  inputValid: {
    borderColor: 'grey',
  },
  inputError: {
    borderColor: theme.colors.textError,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    margin: 10,
    backgroundColor: theme.colors.backgroundBlue,
  },
});

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signIn({ username, password });
      console.log(response);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? styles.inputError
            : styles.inputValid,
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color='error'>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? styles.inputError
            : styles.inputValid,
        ]}
        secureTextEntry
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='error'>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='subheading' color='light'>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

import { useFormik } from 'formik';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Text from './Text';
import theme from '../theme';
import { TextInput } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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
  password: yup.string().required('Password is required').min(5).max(50),
  confirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  username: yup.string().required('Username is required').min(5).max(30),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmation: '',
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
      <TextInput
        style={[
          styles.input,
          formik.touched.confirmation && formik.errors.confirmation
            ? styles.inputError
            : styles.inputValid,
        ]}
        secureTextEntry
        placeholder='Password confirmation'
        value={formik.values.confirmation}
        onChangeText={formik.handleChange('confirmation')}
      />
      {formik.touched.confirmation && formik.errors.confirmation && (
        <Text color='error'>{formik.errors.confirmation}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='subheading' color='light'>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signUp({ username, password });
      console.log(response);
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', JSON.stringify(e.message), [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

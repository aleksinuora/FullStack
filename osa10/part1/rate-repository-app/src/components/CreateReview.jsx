import { useFormik } from 'formik';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Text from './Text';
import theme from '../theme';
import { TextInput } from 'react-native';
import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      review: '',
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
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.inputError
            : styles.inputValid,
        ]}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color='error'>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.inputError
            : styles.inputValid,
        ]}
        secureTextEntry
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color='error'>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating
            ? styles.inputError
            : styles.inputValid,
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.repositoryName && formik.errors.rating && (
        <Text color='error'>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, styles.inputValid]}
        placeholder='Review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='subheading' color='light'>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await createReview(values);
      console.log(response);
      navigate(`/Repository/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', JSON.stringify(e.message), [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

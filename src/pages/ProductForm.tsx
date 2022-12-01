import { ErrorMessage, Field, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import images from '../assets';
import { createProduct, initializeProducts } from '../store/products.slice';
import { useAppDispatch } from '../store/store';
import { ProductCourseType } from '../types/product.types';
import {
  StyledForm,
  StyledImgCtn,
  StyledInnerDiv,
  StyledMessageCtn,
} from './styles/form.styles';

import {
  StyledPhotoContainer,
  StyledProductMain,
} from './styles/productForm.styles';

interface IFormValues {
  name: string;
  price: string;
  productCourseType: string;
  image: File | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name'),
  price: Yup.number().required('Please enter a price'),
  productCourseType: Yup.string().matches(
    /(starter|main|desert|drink|side|other)/
  ),
  image: Yup.mixed()
    .test('required', 'Please provide a file', (file) => {
      if (file && file.size) {
        return true;
      }
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      return file && file.size <= 20000000;
    })
    .test(
      'fileType',
      'Incorrect file type',
      (file) =>
        file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
    ),
});

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState('');
  const initialValues: IFormValues = {
    name: '',
    price: '',
    productCourseType: 'starter',
    image: null,
  };

  return (
    <StyledProductMain>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const input = new FormData();
          if (values.image) {
            input.append('image', values.image, values.image.name);
          }
          input.append('name', values.name);
          input.append('price', values.price);
          input.append('productCourseType', values.productCourseType);

          try {
            await dispatch(createProduct(input)).unwrap();
            await dispatch(initializeProducts()).unwrap();
            actions.resetForm({ values: { ...initialValues } });
            setUrl('');
            URL.revokeObjectURL(url);
            actions.setSubmitting(false);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(formik) => (
          <StyledForm onSubmit={formik.handleSubmit}>
            {url ? (
              <StyledPhotoContainer>
                <img id="photo" src={url} alt="" />
              </StyledPhotoContainer>
            ) : (
              <StyledImgCtn>
                <img src={images['logo.blue.XS.png']} alt="" />
              </StyledImgCtn>
            )}
            <StyledInnerDiv>
              <label htmlFor="name">Product name:</label>
              <Field type="text" name="name" />
              <StyledMessageCtn>
                <ErrorMessage name="name" />
              </StyledMessageCtn>
            </StyledInnerDiv>
            <StyledInnerDiv>
              <label htmlFor="price">Product price:</label>
              <Field type="number" name="price" />
              <StyledMessageCtn>
                <ErrorMessage name="price" />
              </StyledMessageCtn>
            </StyledInnerDiv>
            <StyledInnerDiv>
              <Field name="productCourseType" as="select">
                <option value="" disabled={true}>
                  --select a type--
                </option>
                {Object.values(ProductCourseType).map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Field>
            </StyledInnerDiv>
            <StyledInnerDiv>
              <input
                type="file"
                name="image"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(event: any) => {
                  const imgEl = document.getElementById(
                    'photo'
                  ) as HTMLImageElement;
                  URL.revokeObjectURL(imgEl?.src);
                  const file = event.currentTarget.files[0];
                  if (file) {
                    formik.setFieldValue('image', file);
                    setUrl(() => URL.createObjectURL(file));
                  } else {
                    setUrl(() => '');
                  }
                }}
              />
              <StyledMessageCtn>
                <ErrorMessage name="image" />
              </StyledMessageCtn>
            </StyledInnerDiv>
            <StyledInnerDiv>
              <button type="submit">Create product</button>
            </StyledInnerDiv>
          </StyledForm>
        )}
      </Formik>
    </StyledProductMain>
  );
};

export default ProductForm;

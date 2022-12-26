import { ErrorMessage, Field, Formik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import images from '../assets';
import { createProduct, updateProduct } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { IProduct, ProductCourseType } from '../types/product.types';
import {
  StyledForm,
  StyledImgCtn,
  StyledInnerDiv,
  StyledMessageCtn,
} from '../pages/styles/form.styles';

import { StyledPhotoContainer } from '../pages/styles/productForm.styles';
import { useSelector } from 'react-redux';
import {
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';
import Notification from './Notification';
import { StyledSharedColoredBtn } from '../pages/styles/shared.styles';

interface IFormValues {
  name: string;
  price: string;
  productCourseType: ProductCourseType | 'starter';
  image: File | null;
  editing: boolean;
}

interface IProps {
  existingProduct?: IProduct;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name'),
  price: Yup.number().required('Please enter a price'),
  productCourseType: Yup.string()
    .oneOf(['starter', 'main', 'desert', 'drink', 'side', 'other'])
    .required('Please select a product course type'),
  image: Yup.mixed()
    .when('editing', {
      is: false,
      then: Yup.mixed().test('required', 'Please provide a file', (file) => {
        if (file && file.size) {
          return true;
        }
        return false;
      }),
    })
    .test(
      'fileSize',
      'The file is too large',
      (file) => !file || (file && file.size <= 20000000)
    )
    .test(
      'fileType',
      'Incorrect file type',
      (file) =>
        !file ||
        (file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type))
    ),
});

const ProductForm = ({ existingProduct }: IProps) => {
  const [url, setUrl] = useState('');
  const notification = useSelector((state: RootState) => state.notification);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const initialValues: IFormValues = {
    name: existingProduct?.name || '',
    price: existingProduct?.price.toString() || '',
    productCourseType: existingProduct?.productCourseType || 'starter',
    image: null,
    editing: Boolean(existingProduct),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const input = new FormData();
        values.image && input.append('image', values.image, values.image?.name);
        values.name && input.append('name', values.name);
        values.price && input.append('price', values.price);
        values.productCourseType &&
          input.append('productCourseType', values.productCourseType);

        dispatch(setNotification({ type: 'loading', text: 'Loading' }));
        try {
          if (existingProduct) {
            await dispatch(
              updateProduct({ input, id: existingProduct.id })
            ).unwrap();
          } else {
            await dispatch(createProduct(input)).unwrap();
          }
          dispatch(
            setAsyncNotification({
              type: 'success',
              text: 'Product saved!',
              time: 5,
            })
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          dispatch(
            setAsyncNotification({
              type: 'error',
              text: err?.message,
              time: 6,
            })
          );
        }

        actions.resetForm({ values: { ...initialValues } });
        inputRef.current?.form && inputRef.current.form.reset();
        URL.revokeObjectURL(url);
        setUrl('');
        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <Notification notification={notification} />
          {url ? (
            <StyledPhotoContainer>
              <img id="photo" src={url} alt="" />
            </StyledPhotoContainer>
          ) : existingProduct?.image ? (
            <StyledPhotoContainer>
              <img id="photo" src={existingProduct?.image.secure_url} alt="" />
            </StyledPhotoContainer>
          ) : (
            <StyledImgCtn>
              <img src={images['logo.png']} alt="" />
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
              id="file"
              ref={inputRef}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                URL.revokeObjectURL(url);
                const file = event.target.files && event.target.files[0];
                if (file) {
                  formik.setFieldValue('image', file);
                  setUrl(() => URL.createObjectURL(file));
                } else {
                  event.target.value = '';
                  setUrl(() => '');
                }
              }}
            />
            <StyledMessageCtn>
              <ErrorMessage name="image" />
            </StyledMessageCtn>
          </StyledInnerDiv>
          <StyledInnerDiv>
            <StyledSharedColoredBtn bgColor="MINT" type="submit">
              {existingProduct ? 'Update Product' : 'Create Product'}
            </StyledSharedColoredBtn>
          </StyledInnerDiv>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ProductForm;

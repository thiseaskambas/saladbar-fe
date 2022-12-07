import { ErrorMessage, Field, Formik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import images from '../assets';
import { updateProduct } from '../store/products.slice';
import { useAppDispatch } from '../store/store';
import { IProduct, ProductCourseType } from '../types/product.types';
import {
  StyledForm,
  StyledImgCtn,
  StyledInnerDiv,
  StyledMessageCtn,
} from './styles/form.styles';

import { StyledPhotoContainer } from './styles/productForm.styles';

interface IFormValues {
  name: string;
  price: string;
  productCourseType: string;
  image: File | null;
}

interface IProps {
  existingProduct: IProduct;
  onEndSubmit: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name'),
  price: Yup.number().required('Please enter a price'),
  productCourseType: Yup.string().matches(
    /(starter|main|desert|drink|side|other)/
  ),
  image: Yup.mixed()
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

const ProductUpdateForm = ({ existingProduct, onEndSubmit }: IProps) => {
  const [url, setUrl] = useState('');
  const dispatch = useAppDispatch();
  //TODO: check if useRef is needed
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialValues: IFormValues = {
    name: existingProduct.name || '',
    price: existingProduct.price.toString() || '',
    productCourseType: existingProduct.productCourseType || 'starter',
    image: null,
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
        try {
          await dispatch(
            updateProduct({ input, id: existingProduct.id })
          ).unwrap();
          actions.resetForm({ values: { ...initialValues } });
          URL.revokeObjectURL(url);
          setUrl('');
          actions.setSubmitting(false);
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          onEndSubmit();
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
          ) : existingProduct.image ? (
            <StyledPhotoContainer>
              <img id="photo" src={existingProduct.image.secure_url} alt="" />
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
            <button type="submit">Update Product</button>
          </StyledInnerDiv>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ProductUpdateForm;

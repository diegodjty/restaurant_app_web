import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const Newdish = () => {
  const [imgUpload, setImgUpload] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Storage

  const navigate = useNavigate();

  // Validate and read data from from
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Minumum 3 characters')
        .required('Name is required'),
      price: Yup.number().min(1, 'Add a price').required('Price is required'),
      image: Yup.string().required('Image required'),
      category: Yup.string().required('Category is required'),
      description: Yup.string()
        .min(10, 'Minumum 10 characters')
        .required('Description is required'),
    }),
    onSubmit: (dish) => {
      let image = '';
      //Reference to image and give it a random name
      const imgRef = ref(storage, `products/${imgUpload.name + v4()}`);
      uploadBytes(imgRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            image = url;
          })
          .then(() => {
            dish.inStock = true;
            dish.image = image;
            addDoc(collection(db, 'products'), dish);
            navigate('/');
          });
      });
    },
  });
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add Dish</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3x">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2
              "
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="Name of the Dish"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 "
                role={'alert'}
              >
                <p className="font-bold">An error occured:</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2
              "
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                placeholder="$20"
                min="0"
                onChange={formik.handleChange}
                value={formik.values.price}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 "
                role={'alert'}
              >
                <p className="font-bold">An error occured:</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2
              "
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                onBlur={formik.handleBlur}
              >
                <option value="">==SELECT==</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="drink">Drinks</option>
                <option value="desert">Desert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 "
                role={'alert'}
              >
                <p className="font-bold">An error occured:</p>
                <p>{formik.errors.category}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2
              "
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
                id="image"
                onChange={(e) => {
                  formik.handleChange(e);
                  setImgUpload(e.target.files[0]);
                }}
                value={formik.values.image}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2
              "
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Dish description"
                onChange={formik.handleChange}
                value={formik.values.textarea}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 "
                role={'alert'}
              >
                <p className="font-bold">An error occured:</p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold pointer"
              value={'Add Dish'}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Newdish;

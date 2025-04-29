"use client";

/* eslint-disable @next/next/no-img-element */
import "swiper/css";
import "swiper/css/navigation";

import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperRef  } from "swiper/react";


import DeleteIcon from "@/src/assets/icons/delete.svg";
import { CREATE_BARCODE, UPLOAD_BARCODE_IMAGES } from "@/src/lib/mutations/CreateBarcode";
import { CATEGORIES_QUERY } from "@/src/lib/query/Categories";

import Button from "../../base/Button/Button";
import type { SelectOption } from "../../CustomSelect/CustomSelect";
import CustomSelect from "../../CustomSelect/CustomSelect";
import TextField from "../../TextField/TextField";
import css from "./CreateProduct.module.scss";

interface Filter {
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  cost: string;
  sellingPrice: string;
  discountedPrice: string;
  sizes: { name: string; value: string }[];
  tags: string;
  images: File[];
  characteristics: { key: string; value: string }[];
}

const initialState: Filter = {
  title: "",
  description: "",
  categoryId: "",
  categoryName: "",
  cost: "",
  sellingPrice: "",
  discountedPrice: "",
  sizes: [{ name: "кол-во", value: "" }],
  tags: "",
  images: [],
  characteristics: [{ key: "", value: "" }],
};

const CreateProduct = () => {
  const sliderRef = useRef<SwiperRef>(null);
  const [inputValues, setInputValues] = useState<Filter>(initialState);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [createBarcode] = useMutation(CREATE_BARCODE);
  const [uploadImages] = useMutation(UPLOAD_BARCODE_IMAGES);
  const { data: dataCategories } = useQuery(CATEGORIES_QUERY);
  const [shopId, setShopId] = useState<string>("");
  const [storageId, setStorageId] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userParse = JSON.parse(userString);
      setShopId(userParse.id?.toString());
      setStorageId(userParse.storages[0].id.toString());
    }
  }, []);

  const handleCreateBarcode = async () => {
    try {
      let imageUrls: any = [];

      if (inputValues.images.length > 0) {
        const uploadPromises = inputValues.images.map((file) => {
          return uploadImages({
            variables: { files: [file] },
            context: {
              hasUpload: true,
            },
          });
        });

        const uploadResults = await Promise.all(uploadPromises);
        console.log(uploadResults);

        imageUrls = uploadResults
          .map((result) => +result.data.uploadImages.images[0].id)
          .flat()
          .filter(Boolean);

        if (imageUrls.length === 0) {
          throw new Error("Image upload failed");
        }
      }

      const characteristicObject = {
        characteristics: inputValues.characteristics,
      };

      const imagesInput = imageUrls.map((id) => id);

      const response = await createBarcode({
        variables: {
          categoryId: +inputValues.categoryId,
          characteristic: JSON.stringify(characteristicObject),
          description: inputValues.description,
          images: imagesInput,
          sellingPrice: parseFloat(inputValues.sellingPrice),
          shopId,
          storageId,
          sizes: [{ name: "кол-во", value: inputValues.sizes[0].value }],
          title: inputValues.title,
          barcodeValue: "",
          cost: parseFloat(inputValues.cost),
          discountedPrice: parseFloat(inputValues.discountedPrice),
          tags: inputValues.tags,
        },
      });

      console.log("Barcode created:", response.data);

      setInputValues(initialState);
      setImagePreviews([]);
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }

      console.log("Товар успешно добавлен!");
    } catch (err) {
      console.error("Error creating barcode:", err);
      console.log("Произошла ошибка при добавлении товара. Пожалуйста, попробуйте снова.");
    }
  };

  const onChange = (
    value: SelectOption<string> | null | string | Date | any,
    name?: string,
    index?: number,
    fieldType?: "characteristics" | "sizes"
  ) => {
    if (fieldType === "characteristics" && typeof index === "number") {
      setInputValues((prevValues) => {
        const updatedCharacteristics = [...prevValues.characteristics];
        if (name) {
          updatedCharacteristics[index] = {
            ...updatedCharacteristics[index],
            [name]: value,
          };
        }
        return {
          ...prevValues,
          characteristics: updatedCharacteristics,
        };
      });
    } else if (fieldType === "sizes" && typeof index === "number") {
      setInputValues((prevValues) => {
        const updatedSizes = [...prevValues.sizes];
        if (name) {
          updatedSizes[index] = {
            ...updatedSizes[index],
            [name]: value,
          };
        }
        return {
          ...prevValues,
          sizes: updatedSizes,
        };
      });
    } else if (name === "categoryId") {
      setInputValues((prevValues) => ({
        ...prevValues,
        categoryId: value?.value,
        categoryName: value?.label,
      }));
    } else if (name) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const addCharacteristic = () => {
    setInputValues((prevValues) => ({
      ...prevValues,
      characteristics: [...prevValues.characteristics, { key: "", value: "" }],
    }));
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileArray = Array.from(files);
      setInputValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...fileArray],
      }));

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setInputValues((prevValues) => {
      const updatedPhotos = prevValues.images.filter((_, i) => i !== index);
      return {
        ...prevValues,
        images: updatedPhotos,
      };
    });
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleRemoveCharacteristic = (index: number) => {
    setInputValues((prevValues) => {
      const updatedCharacteristics = prevValues.characteristics.filter((_, i) => i !== index);
      return {
        ...prevValues,
        characteristics: updatedCharacteristics,
      };
    });
  };

  const triggerFileInput = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  return (
    <div className={css.createWrapper}>
      <div className={css.createContainer}>
        <h1 className={css.createTitle}>Добавление товара</h1>
        <div className={css.createBlokcs}>
          <div className={css.createBlokcsCol}>
            <TextField
              label={"Название товара"}
              placeholder={"Введите название"}
              value={inputValues.title}
              onChange={onChange}
              width={"100%"}
              name="title"
            />
            <TextField
              label={"Описание товара"}
              placeholder={"Введите описание товара"}
              value={inputValues.description}
              onChange={onChange}
              rows={1}
              width={"100%"}
              name="description"
            />
            <CustomSelect
              options={dataCategories?.categories?.map((item) => ({
                label: item.name,
                value: item.id,
                children: item?.children?.map((child) => ({
                  label: child.name,
                  value: child.id,
                  children: child?.children,
                })),
              }))}
              placeholder={"Выберите категорию"}
              label="Категория"
              value={{
                label: inputValues.categoryName,
                value: inputValues.categoryId,
              }}
              onChange={onChange}
              name="categoryId"
            />
            <div className={css.createBlokcsCell}>
              <TextField
                label={"Себестоимость"}
                placeholder={"1000"}
                value={inputValues.cost}
                onChange={onChange}
                width={"100%"}
                name="cost"
                type="number"
              />
              <TextField
                label={"Цена продажи"}
                placeholder={"1000"}
                value={inputValues.sellingPrice}
                onChange={onChange}
                width={"100%"}
                type="number"
                name="sellingPrice"
              />
              <TextField
                label={"Цена продажи со скидкой"}
                placeholder={"1000"}
                value={inputValues.discountedPrice}
                onChange={onChange}
                width={"100%"}
                type="number"
                name="discountedPrice"
              />
            </div>
            <TextField
              label={"Количество"}
              placeholder={"10"}
              value={inputValues.sizes[0].value}
              onChange={(value) => onChange(value, "value", 0, "sizes")}
              type="number"
              width={"100%"}
              name="sizes"
            />
            <TextField
              label={"Тэги"}
              placeholder={"холодильники, lg"}
              value={inputValues.tags}
              onChange={onChange}
              width={"100%"}
              name="tags"
              rows={1}
            />
          </div>
          <div className={css.createBlokcSsecond}>
            <div className={css.createBlokcImages}>
              <p className={css.createBlokcsImagesTitle}> Фото товара</p>
              <div className={css.swiperContainer}>
                <Swiper
                  ref={sliderRef}
                  modules={[Navigation]}
                  className={css.createBlokcsImage}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                >
                  {imagePreviews.map((preview, index) => (
                    <SwiperSlide key={index} className={css.photoWrapper}>
                      <img src={preview} alt={`Фото ${index + 1}`} className={css.photo} />
                      <Button
                        className={css.removePhotoBtn}
                        leftIcon={<DeleteIcon />}
                        onClick={() => handleRemovePhoto(index)}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-prev" onClick={handlePrev}></div>
                  <div className="swiper-button-next" onClick={handleNext}></div>
                </Swiper>
              </div>

              <input
                type="file"
                placeholder=""
                multiple
                onChange={handleAddPhoto}
                ref={photoInputRef}
                className={css.photoInput}
              />
              <button className={css.createBlokcImageBtn} onClick={triggerFileInput}>
                + Добавить фото
              </button>
            </div>
            <div className={css.createBlokcImages}>
              <p className={css.createBlokcsImagesTitle}>Характеристика</p>
              {inputValues.characteristics.map((char, index) => (
                <div key={index} className={css.createBlokcCharactBlokcs}>
                  <TextField
                    label={"Название"}
                    placeholder={"Цвет"}
                    value={char.key}
                    onChange={(v) => onChange(v, "key", index, "characteristics")}
                    width={"100%"}
                    name="key"
                  />
                  <TextField
                    label={"Значение"}
                    placeholder={"Белый"}
                    value={char.value}
                    onChange={(v) => onChange(v, "value", index, "characteristics")}
                    width={"100%"}
                    name="value"
                  />
                  {index !== 0 && (
                    <Button
                      leftIcon={<DeleteIcon />}
                      onClick={() => handleRemoveCharacteristic(index)}
                    />
                  )}
                </div>
              ))}
              <button className={css.createBlokcImageBtn} onClick={addCharacteristic}>
                + Добавить
              </button>
            </div>
          </div>
        </div>
        <Button
          text="Добавить"
          variant="blue"
          className={css.createBtnSave}
          onClick={handleCreateBarcode}
        />
      </div>
    </div>
  );
};

export default CreateProduct;

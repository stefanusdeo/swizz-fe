import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import useGeneral from '@/stores/hooks/general';
import { useProduct } from '@/stores/hooks/product';
import useSubCategory from '@/stores/hooks/subCategory';
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Slider,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { NumericFormat } from 'react-number-format';
import Filter from '@/component/filter';
import NavProduct from '@/component/navProduct';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidSlug, setIsValidSlug] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<number>(0);
  const [slugSub, setSlugSub] = useState<string>('');
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 100]);
  const [filterSelect, setfilterSelect] = React.useState<number[]>([0]);

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const router = useRouter();

  const { managementSubCategoryState, handleGetSubCategoryDetail } =
    useSubCategory();

  const { managementGeneralState } = useGeneral();

  const { managementProductState, handleGetProductList } = useProduct();

  useEffect(() => {
    if (isValidSlug === true) {
      handleGetProductList(slugSub, isCustom).then((res) => {
        setIsLoading(false);
      });
    }
  }, [isValidSlug]);

  useEffect(() => {
    let query = router.query;
    let subSlug = query['subcategory'];
    let type = query['type'];
    if (subSlug && type) {
      let stringType = type.toString();
      if (stringType === 'classic') {
        setIsCustom(0);
      } else if (stringType === 'custom') {
        setIsCustom(1);
      } else {
        router.push('/404');
      }
      setSlugSub(subSlug?.toString());
      handleGetSubCategoryDetail(subSlug?.toString())
        .then((res) => {
          if (res.code === 200) {
            setIsValidSlug(true);
          } else {
            router.push('/404');
          }
        })
        .catch((e) => {
          router.push('/404');
        });
    }
  }, [router]);

  return (
    <BlockUi
      tag="div"
      renderChildren={false}
      blocking={isLoading}
      loader={<div className="spinner"></div>}
    >
      <Navigation />

      <NavProduct
        filterSelect={{ val: filterSelect, set: setfilterSelect }}
        handleChangeRange={handleChangeRange}
        priceRange={priceRange}
      />
      <div className="pt-[135px] w-full h-[100vh] px-8 lg2:px-16 content-layer">
        <div className="mt-16 uppercase font-bold text-xl">
          {`${managementSubCategoryState.subCategory?.name} ${
            isCustom ? 'Custom' : 'Classic'
          }`}
        </div>
        <div className="flex w-full my-5 md:my-12 lg:my-12  lg2:my-12">
          <Filter
            filterSelect={{ val: filterSelect, set: setfilterSelect }}
            handleChangeRange={handleChangeRange}
            priceRange={priceRange}
          />

          <div className=" w-[95%] lg:px-10">
            <div className=" hidden lg:flex md:flex lg2:flex text-[18px] justify-between py-4">
              <div>{managementProductState.productList?.length} products</div>
              <div>Sort By</div>
            </div>

            <div className="md:hidden lg:hidden lg2:hidden text-center my-3">
              {managementProductState.productList?.length} products
            </div>

            <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
              {(managementProductState.productList ?? []).map((prod, i) => (
                <div
                  onClick={() => router.push(`/product/${prod.slug}`)}
                  key={prod.id}
                  className="cursor-pointer "
                >
                  <div className="w-full h-[30vw] lg:h-[19vw] md:h-[14vh]">
                    <img
                      src={prod.main_img}
                      alt={prod.name}
                      className={`h-[90%] hover:p-5 w-full bg-gray-300 px-5 md:px-6 lg:px-10 lg2:px-10  object-contain object-center`}
                    />
                  </div>
                  <div className="text-center lg:-mt-4 text-[17px]  font-bold">
                    {prod.name}
                  </div>
                  <div className="text-center  text-[17px]  font-bold">
                    {managementGeneralState.country?.currency === 'EUR' && (
                      <NumericFormat
                        displayType="text"
                        value={prod.price_eur}
                        thousandSeparator={','}
                        decimalSeparator="."
                        suffix={` ${managementGeneralState.country.currencyLogo}`}
                      />
                    )}
                    {managementGeneralState.country?.currency === 'CHF' && (
                      <NumericFormat
                        displayType="text"
                        value={prod.price_chf}
                        thousandSeparator={','}
                        decimalSeparator="."
                        suffix={` ${managementGeneralState.country.currencyLogo}`}
                      />
                    )}
                    {managementGeneralState.country?.currency === 'USD' && (
                      <NumericFormat
                        displayType="text"
                        value={prod.price_dolar}
                        thousandSeparator={','}
                        decimalSeparator="."
                        suffix={` ${managementGeneralState.country.currencyLogo}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Foooter />
    </BlockUi>
  );
}

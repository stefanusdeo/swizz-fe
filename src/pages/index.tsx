import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import useSubCategory from '@/stores/hooks/subCategory';
import { IProductDetail, IProductImage } from '@/stores/types/productTypes';
import { useProduct } from '@/stores/hooks/product';
import { NumericFormat } from 'react-number-format';
import useGeneral from '@/stores/hooks/general';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { content1, content2, madeBy } from '@/component/content';

import Content1Image from '@/assets/content1.jpg';
import Content2Image from '@/assets/content2.jpg';
import MadeByImage from '@/assets/made-by.jpg';
import Link from 'next/link';

export default function Home() {
  const { managementSubCategoryState } = useSubCategory();

  const {
    handleGetProductList,
    handleGetProductDetail,
    handleGetProductImage,
  } = useProduct();

  const { managementGeneralState, handleGetBanner } = useGeneral();

  const router = useRouter();
  const [subCategoryTabs, setSubCategoryTabs] = useState<number>(0);
  const [isGettingProduct, setIsGettingProduct] = useState<boolean>(false);
  const [productListSub, setProductListSub] = useState<Array<IProductDetail[]>>(
    []
  );
  const [productHome, setProductHome] = useState<IProductDetail | null>(null);
  const [imageSource, setImageSource] = useState<IProductImage>({
    id: '',
    imageBase64: '',
  });
  const [imageListProduct, setImageListProduct] = useState<IProductImage[]>([]);

  useEffect(() => {
    handleGetBanner();
    handleGetProductDetail(process.env.NEXT_PUBLIC_HOME_PRODUCT ?? '').then(
      (res) => {
        if (res.data?.productDetail) {
          setProductHome(res.data?.productDetail);
          handleGetProductImage(
            res.data?.productDetail?.id ?? 1,
            res.data?.productDetail
          ).then((img) => {
            if (
              img.data?.productDetail?.productImage &&
              img.data?.productDetail?.productImage.length > 0
            ) {
              setImageListProduct(img.data?.productDetail?.productImage);
              setImageSource(img.data?.productDetail?.productImage[0]);
            }
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (
      managementSubCategoryState.subCategoryList &&
      managementSubCategoryState.subCategoryList?.length > 0 &&
      isGettingProduct === false
    ) {
      setIsGettingProduct(true);
      let tabList: Array<IProductDetail[]> = [];
      managementSubCategoryState.subCategoryList.map((subCat) => {
        handleGetProductList(subCat.slug, null, 1, 8).then((res) => {
          if (res.code === 200 && res.data?.productList) {
            let product = res.data?.productList;
            tabList.push(product);
          }
        });
      });
      setProductListSub(tabList);
    }
  }, [managementSubCategoryState.subCategoryList]);

  const renderProduct = (index: number) => {
    let collect = 3;
    let collectComp: React.ReactNode[] = [];
    let articleComp: React.ReactNode[] = [];
    let listProd: IProductDetail[] = productListSub[index] ?? [];
    listProd.map((prod, index) => {
      if (index === collect || index === listProd.length - 1) {
        collectComp.push(
          <div key={prod.id} className="w-full">
            <img
              src={prod.main_img}
              className="w-full h-auto object-cover object-center"
            />
            <h1 className="text-center tracking-[1.5px] mt-3">{prod.name}</h1>
            <h1 className="text-center tracking-[1.5px] mt-3">
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
            </h1>
          </div>
        );
        let renderComp = (
          <div className="grid grid-cols-4 gap-10 min-[263px]">
            {collectComp}
          </div>
        );
        articleComp.push(renderComp);
        collect = collect + 3;
        collectComp = [];
      } else {
        collectComp.push(
          <div key={prod.id} className="w-full">
            <img
              src={prod.main_img}
              className="w-full h-auto object-cover object-center"
            />
            <h1 className="text-center tracking-[1.5px] mt-3">{prod.name}</h1>
            <h1 className="text-center tracking-[1.5px] mt-3">
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
            </h1>
          </div>
        );
      }
    });
    return articleComp;
  };

  return (
    <div>
      <Navigation />
      <section id="banner">
        <div className="pt-[130px]">
          <div className="w-full h-[80vh] background-banner">
            <div className="overlay-banner px-8 md:px-16 w-full h-full">
              <Carousel indicators={false} animation={'slide'}>
                {(managementGeneralState.bannerTop ?? []).map(
                  (banner, index) => {
                    return (
                      <div className="w-full m-auto py-[35px] lg2:px-20 lg2:py-10 flex items-center banner-container">
                        <div className="w-full h-[70vh] flex justify-between items-center align-middle">
                          <div>
                            <h1 className="text-white text-[16px]">
                              Take A Look A Our
                            </h1>
                            <h2 className="text-white pt-2 text-[36px] lg:text-[56px] font-bold">
                              {banner.product.product_name}
                            </h2>
                            <img
                              src={banner.image}
                              className="w-3/5 lg:hidden md:hidden h-auto object-contain object-center"
                            />
                            <button
                              onClick={() =>
                                router.push(`product/${banner.product.slug}`)
                              }
                              className="mt-6 lg:mt-2 md:mt-2 px-6 py-2 rounded-xl bg-black text-[#b2edbd] text-[26px]"
                            >
                              Buy Now
                            </button>
                          </div>
                          <img
                            src={banner.image}
                            className="hidden lg:block md:block w-3/5 h-[60vh] object-contain object-center"
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* custom product */}
      <div className="w-full my-20 px-7 lg:px-16 md:px-16 lg2:px-16">
        <h1 className="text-center font-bold text-[16px]">
          TEST OUR CUSTOMIZE
        </h1>
        <h2 className="text-center font-bold text-[36px] lg:text-[46px] mt-5">
          CUSTOMIZE YOUR PAIR
        </h2>

        <div className="w-full lg:flex lg:flex-row lg:mt-10 gap-10">
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[20vh] lg:h-[40vw]">
              <img
                src={imageSource.imageBase64}
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full max-w-none object-contain object-center"
              />
            </div>
            <div className="inline-flex w-full gap-4 align-middle items-center mt-5">
              {imageListProduct.map((prodImage) => (
                <div
                  key={prodImage.id}
                  onClick={() => setImageSource(prodImage)}
                  className={`cursor-pointer ${
                    prodImage.id === imageSource.id
                      ? 'border border-solid rounded-lg p-1 border-black'
                      : ''
                  } `}
                >
                  <img
                    src={prodImage.imageBase64}
                    alt="Front of men&#039;s Basic Tee in black."
                    className="max-w-none w-[50px] h-[50px] object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="font-semibold">SHINCUSTOM</h1>
            <h2 className="mt-3 text-[30px] font-extrabold ">
              {productHome?.name}
            </h2>
            <h3 className="text-[24px] mt-3 pb-3 border-b border-solid border-gray-400">
              {managementGeneralState.country?.currency === 'EUR' && (
                <NumericFormat
                  displayType="text"
                  value={productHome?.price_eur}
                  thousandSeparator={','}
                  decimalSeparator="."
                  suffix={` ${managementGeneralState.country.currencyLogo}`}
                />
              )}
              {managementGeneralState.country?.currency === 'CHF' && (
                <NumericFormat
                  displayType="text"
                  value={productHome?.price_chf}
                  thousandSeparator={','}
                  decimalSeparator="."
                  suffix={` ${managementGeneralState.country.currencyLogo}`}
                />
              )}
              {managementGeneralState.country?.currency === 'USD' && (
                <NumericFormat
                  displayType="text"
                  value={productHome?.price_dolar}
                  thousandSeparator={','}
                  decimalSeparator="."
                  suffix={` ${managementGeneralState.country.currencyLogo}`}
                />
              )}
            </h3>
            <Link
              href={`/product/${productHome?.slug}`}
              className="bg-[#f5dc00] font-bold text-[16px] w-full text-center py-3 mt-5 inline-block"
            >
              GO TO CUSTOMIZE
            </Link>
          </div>
        </div>
      </div>
      {/* custom product */}

      <div className="w-full flex flex-col-reverse lg:flex-row align-middle items-center gap-16 my-20 px-7 md:px-16 lg:px-16 lg2:px-16">
        <div className="w-full lg:w-1/2">
          <h1 className="font-bold text-[16px] tracking-[1.5px] uppercase">
            {managementGeneralState.language === 'en' && content1.en.headerText}
            {managementGeneralState.language === 'es' && content1.es.headerText}
            {managementGeneralState.language === 'fr' && content1.fr.headerText}
            {managementGeneralState.language === 'gr' && content1.gr.headerText}
          </h1>
          <h2 className="font-bold text-[36px] tracking-[1px] uppercase mt-3">
            {managementGeneralState.language === 'en' &&
              content1.en.subHeaderText}
            {managementGeneralState.language === 'es' &&
              content1.es.subHeaderText}
            {managementGeneralState.language === 'fr' &&
              content1.fr.subHeaderText}
            {managementGeneralState.language === 'gr' &&
              content1.gr.subHeaderText}
          </h2>
          <p className="mt-3 tracking-[0.5px] font-medium pb-5">
            {managementGeneralState.language === 'en' &&
              content1.en.descriptionText}
            {managementGeneralState.language === 'es' &&
              content1.es.descriptionText}
            {managementGeneralState.language === 'fr' &&
              content1.fr.descriptionText}
            {managementGeneralState.language === 'gr' &&
              content1.gr.descriptionText}
          </p>
          <Link
            href={`product/${content1.en.productSlug}`}
            className="px-8 py-5 mt-8 bg-[#f5dc00] font-bold text-[14px] tracking-[1.5px] uppercase"
          >
            {managementGeneralState.language === 'en' && content1.en.buttonText}
            {managementGeneralState.language === 'es' && content1.es.buttonText}
            {managementGeneralState.language === 'fr' && content1.fr.buttonText}
            {managementGeneralState.language === 'gr' && content1.gr.buttonText}
          </Link>
        </div>
        <Image
          src={Content1Image}
          className=" lg:h-[35pc] md:h-[35pc] lg2:h-[50pc]  w-[45pc] object-contain object-center"
          alt="content-image"
        />
      </div>

      <div className="w-full my-20 px-7 lg:px-16 lg2:px-16 ">
        <div className="relative w-full">
          <Image
            src={MadeByImage}
            alt="made-by-image"
            className=" lg:h-[35pc] md:h-[38pc] lg2:h-[50pc]  w-[45pc] object-contain object-center"
          />
          <div className="w-[80%] md:w-[50%] lg:w-[35%] p-5 lg:p-10 bg-black text-white absolute lg:top-1/4 top-3/4 md:top-5px  lg2:top-[300px] right-8 md:right-52 lg:right-60 lg2:right-[600px] text-center">
            <h1 className="uppercase font-extrabold text-[26px] lg:text-[36px] -tracking-[1px]">
              {managementGeneralState.language === 'en' && madeBy.en.headerText}
              {managementGeneralState.language === 'es' && madeBy.es.headerText}
              {managementGeneralState.language === 'fr' && madeBy.fr.headerText}
              {managementGeneralState.language === 'gr' && madeBy.gr.headerText}
            </h1>
            <p className="mt-5 lg:tracking-[0.5px]">
              {managementGeneralState.language === 'en' &&
                madeBy.en.descriptionText}
              {managementGeneralState.language === 'es' &&
                madeBy.es.descriptionText}
              {managementGeneralState.language === 'fr' &&
                madeBy.fr.descriptionText}
              {managementGeneralState.language === 'gr' &&
                madeBy.gr.descriptionText}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:flex lg:flex-row align-middle items-center gap-16  mt-36 lg:mt-0 my-20 px-8 md:px-16 lg2:px-16">
        <Image
          src={Content2Image}
          className=" h-[35pc] w-[45pc] lg2:h-[50pc]  object-contain object-center"
          alt="content-image"
        />
        <div className="w-full lg:w-1/2 md:mt-20 text-center">
          <h1 className="font-bold text-[16px] tracking-[1.5px] uppercase">
            {managementGeneralState.language === 'en' && content2.en.headerText}
            {managementGeneralState.language === 'es' && content2.es.headerText}
            {managementGeneralState.language === 'fr' && content2.fr.headerText}
            {managementGeneralState.language === 'gr' && content2.gr.headerText}
          </h1>
          <h2 className="font-bold text-[36px] tracking-[1px] uppercase mt-3">
            {managementGeneralState.language === 'en' &&
              content2.en.subHeaderText}
            {managementGeneralState.language === 'es' &&
              content2.es.subHeaderText}
            {managementGeneralState.language === 'fr' &&
              content2.fr.subHeaderText}
            {managementGeneralState.language === 'gr' &&
              content2.gr.subHeaderText}
          </h2>
          <p className="mt-3 tracking-[0.5px] font-medium">
            {managementGeneralState.language === 'en' &&
              content2.en.descriptionText}
            {managementGeneralState.language === 'es' &&
              content2.es.descriptionText}
            {managementGeneralState.language === 'fr' &&
              content2.fr.descriptionText}
            {managementGeneralState.language === 'gr' &&
              content2.gr.descriptionText}
          </p>
          <button
            onClick={() => router.push(`product/${content2.en.productSlug}`)}
            className="px-8 py-5 mt-8 bg-[#f5dc00] font-bold text-[14px] tracking-[1.5px] uppercase"
          >
            {managementGeneralState.language === 'en' && content2.en.buttonText}
            {managementGeneralState.language === 'es' && content2.es.buttonText}
            {managementGeneralState.language === 'fr' && content2.fr.buttonText}
            {managementGeneralState.language === 'gr' && content2.gr.buttonText}
          </button>
        </div>
      </div>

      <div className="w-full mt-20 mb-28 px-8 lg2:px-16">
        <h1 className="text-center font-bold text-[36px] tracking-[1px] uppercase mt-3">
          OUR PRODUCT
        </h1>
        <div className="w-full mx-auto mt-5">
          {/* Centered Tabs */}
          <div className="flex justify-center">
            {(managementSubCategoryState.subCategoryList ?? []).map(
              (subCat, index) => (
                <div
                  className={`cursor-pointer px-4 py-2 text-[16px] font-bold uppercase ${
                    subCategoryTabs === index
                      ? 'border-b-2 border-solid border-black text-black'
                      : 'border-b border-solid border-gray-500 text-gray-500'
                  }`}
                  onClick={() => setSubCategoryTabs(index)}
                >
                  {subCat.name}
                </div>
              )
            )}
          </div>

          {/* Content for each tab */}
          <div className="mt-4">
            <div className="w-full mt-6">
              <Carousel
                animation={'slide'}
                indicators={false}
                navButtonsAlwaysVisible={true}
              >
                {renderProduct(subCategoryTabs)}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  mt-5">
        <div className="w-full  h-[80vh] background-banner">
          <div className="overlay-banner px-8 w-full h-full">
            <Carousel indicators={false} animation={'slide'}>
              {(managementGeneralState.bannerTop ?? []).map((banner, index) => {
                return (
                  <div className="w-full m-auto py-[35px] lg2:px-20 lg2:py-10 flex items-center banner-container">
                    <div className="w-full h-[70vh] flex justify-between items-center align-middle">
                      <div>
                        <h1 className="text-white text-[16px]">
                          Take A Look A Our
                        </h1>
                        <h2 className="text-white pt-2 text-[36px] lg:text-[56px] font-bold">
                          {banner.product.product_name}
                        </h2>
                        <img
                          src={banner.image}
                          className="w-3/5 lg:hidden md:hidden h-auto object-contain object-center"
                        />
                        <button
                          onClick={() =>
                            router.push(`product/${banner.product.slug}`)
                          }
                          className="mt-6 lg:mt-2 md:mt-2 px-6 py-2 rounded-xl bg-black text-[#b2edbd] text-[26px]"
                        >
                          Buy Now
                        </button>
                      </div>
                      <img
                        src={banner.image}
                        className="hidden lg:block md:block w-3/5 h-[60vh] object-contain object-center"
                      />
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
      <Foooter />
    </div>
  );
}

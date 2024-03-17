import { Badge, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';

import { FaShoppingCart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { listLanguage } from '@/translation/i18n';
import useGeneral from '@/stores/hooks/general';
import { useTranslation } from 'react-i18next';
import useSubCategory from '@/stores/hooks/subCategory';
import ShinLogo from '@/assets/shinlogo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { listCountry } from './constant';
import useOrder from '@/stores/hooks/order';
import { ICart, ICustom } from '@/stores/types/orderTypes';
import { NumericFormat } from 'react-number-format';
import Link from 'next/link';

interface ICartSide extends ICart {
  subTotal: number;
}

export default function Navigation() {
  const { t } = useTranslation();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openCountry, setOpenCountry] = useState<boolean>(false);
  const [cartSideBar, setCartSideBar] = useState<ICartSide[]>([]);
  const [prevCartSideBar, setPrevCartSideBar] = useState<ICartSide[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { managementGeneralState } = useGeneral();

  const { managementSubCategoryState } = useSubCategory();
  const { managementOrderState, handleModifyCartList } = useOrder();

  const onChangeLang = (lang: string) => {
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  const onChangeCountry = (country: string) => {
    localStorage.setItem('country', country);
    window.location.reload();
  };

  useEffect(() => {
    if (openCart === true) {
      refreshCart();
    }
  }, [openCart]);

  useEffect(() => {
    if (prevCartSideBar.length != 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(async () => {
        const modifiedObjects = cartSideBar.map(
          ({ subTotal, ...rest }) => rest
        );
        await handleModifyCartList(modifiedObjects);
      }, 2000);

      setTimeoutId(newTimeoutId);
    }

    if (cartSideBar.length > 0) {
      let total = 0;
      cartSideBar.map((x) => {
        total = total + x.subTotal;
      });
      setGrandTotal(total);
    }
  }, [cartSideBar]);

  const onPlusCart = (index: number) => {
    let tempCartSideBar = cartSideBar.map((obj) => ({ ...obj }));
    tempCartSideBar[index].qty = (tempCartSideBar[index].qty ?? 0) + 1;
    let subTotal: number = 0;
    if (managementGeneralState.country?.currency === 'CHF') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_chf);
    }
    if (managementGeneralState.country?.currency === 'EUR') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_eur);
    }
    if (managementGeneralState.country?.currency === 'USD') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_dolar);
    }
    tempCartSideBar[index].subTotal = subTotal;
    setCartSideBar(tempCartSideBar);
  };

  const onMinusCart = (index: number) => {
    let tempCartSideBar = cartSideBar.map((obj) => ({ ...obj }));
    tempCartSideBar[index].qty = (tempCartSideBar[index].qty ?? 0) - 1;
    if (tempCartSideBar[index].qty ?? 0 > 0) {
      let subTotal: number = 0;
      if (managementGeneralState.country?.currency === 'CHF') {
        subTotal =
          (tempCartSideBar[index].qty ?? 1) *
          Number(tempCartSideBar[index].product?.price_chf);
      }
      if (managementGeneralState.country?.currency === 'EUR') {
        subTotal =
          (tempCartSideBar[index].qty ?? 1) *
          Number(tempCartSideBar[index].product?.price_eur);
      }
      if (managementGeneralState.country?.currency === 'USD') {
        subTotal =
          (tempCartSideBar[index].qty ?? 1) *
          Number(tempCartSideBar[index].product?.price_dolar);
      }
      tempCartSideBar[index].subTotal = subTotal;
      setCartSideBar(tempCartSideBar);
    }
  };

  const onRemove = (index: number) => {
    let tempCartSideBar = cartSideBar.filter((obj, i) => i !== index);

    tempCartSideBar.length <= 0 && setGrandTotal(0);

    setCartSideBar(tempCartSideBar);
  };

  const onChangeCart = (index: number, qty: number) => {
    let tempCartSideBar = cartSideBar.map((obj) => ({ ...obj }));
    tempCartSideBar[index].qty = qty;
    let subTotal: number = 0;
    if (managementGeneralState.country?.currency === 'CHF') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_chf);
    }
    if (managementGeneralState.country?.currency === 'EUR') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_eur);
    }
    if (managementGeneralState.country?.currency === 'USD') {
      subTotal =
        (tempCartSideBar[index].qty ?? 1) *
        Number(tempCartSideBar[index].product?.price_dolar);
    }
    tempCartSideBar[index].subTotal = subTotal;
    setCartSideBar(tempCartSideBar);
  };

  const refreshCart = () => {
    let cartList: ICart[] = managementOrderState.cartList ?? [];
    let tempCartSideBar: ICartSide[] = [];
    cartList.map((cart) => {
      let subTotal: number = 0;
      if (managementGeneralState.country?.currency === 'CHF') {
        subTotal = (cart.qty ?? 1) * Number(cart.product?.price_chf);
      }
      if (managementGeneralState.country?.currency === 'EUR') {
        subTotal = (cart.qty ?? 1) * Number(cart.product?.price_eur);
      }
      if (managementGeneralState.country?.currency === 'USD') {
        subTotal = (cart.qty ?? 1) * Number(cart.product?.price_dolar);
      }
      let ObjCart: ICartSide = {
        ...cart,
        subTotal: subTotal,
      };
      tempCartSideBar.push(ObjCart);
    });
    setCartSideBar(tempCartSideBar);
    setPrevCartSideBar(tempCartSideBar);
  };

  // Fungsi untuk mengecek perubahan setiap 2 detik

  const customDetail = (cart: ICartSide) => {
    let collectComp: React.ReactNode[] = [];
    let prefix: string = '';
    cart.customList?.map((x: ICustom) => {
      if (
        x.customProperty.includes('ight') ||
        x.customProperty.includes('eft')
      ) {
        collectComp.push(
          <div className="limited-lines">
            {x.customProperty} : {x.customValue}
            <br />
          </div>
        );
        prefix = x.customProperty;
      } else {
        collectComp.push(
          <div className="limited-lines">
            {prefix !== '' ? `${prefix} - ` : ''}
            {x.customProperty} : {x.customValue}
            <br />
          </div>
        );
      }
    });
    return collectComp;
  };
  return (
    <>
      <div className="fixed w-full z-10">
        <div className="flex align-middle items-center bg-black px-16 py-4">
          <div className="flex gap-10 lg2:w-5/12">
            <div
              onClick={() => setMenu(!menu)}
              className="block lg2:hidden cursor-pointer"
            >
              <FiMenu className="w-6 h-6" color="white" />
            </div>
            {(managementSubCategoryState.subCategoryList ?? []).map((sub) => (
              <div
                key={sub.id}
                onClick={() => router.push(`/collection/${sub.slug}`)}
                className="uppercase hidden lg2:block cursor-pointer pb-1 text-white text-[16px] hover:border-b hover:border-solid hover:border-white"
              >
                {/* SHIN<span className="text-[#b2edbd]">GUARD</span> */}
                {sub.name}
              </div>
            ))}
          </div>
          <Link
            href={'/'}
            className="m-auto flex align-middle items-center lg2:w-2/12"
          >
            <Image
              src={ShinLogo}
              alt={'logo'}
              className="cursor-pointer w-[100px] h-[100px] mx-auto"
            />
          </Link>

          <div className="flex gap-10 lg2:w-5/12 justify-end">
            <div className="group hidden lg2:inline-block relative">
              <div className="cursor-pointer">
                <span className="text-white text-[16px] group-hover:text-[#b2edbd]">
                  {managementGeneralState.country?.textShow}
                </span>
              </div>

              <div className="hidden group-hover:block absolute mt-1 bg-white border rounded-lg shadow-md w-[282px] -ml-[80px] z-20">
                <ul>
                  {listCountry.map((count) => (
                    <li
                      onClick={() => onChangeCountry(count.id)}
                      key={count.id}
                      className="py-2 px-4 hover:bg-gray-200 cursor-pointer flex gap-2"
                    >
                      {count.textShow}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="group hidden lg2:inline-block relative">
              <div className="cursor-pointer">
                <span className="text-white text-[16px] group-hover:text-[#b2edbd]">
                  {managementGeneralState.languageText}
                </span>
              </div>

              <div className="hidden group-hover:block absolute mt-1 bg-white border rounded-lg shadow-md w-[200px] -ml-[80px] z-20">
                <ul>
                  {listLanguage.map((lang) => (
                    <li
                      key={lang.id}
                      onClick={() => onChangeLang(lang.id)}
                      className="py-3 px-4 hover:bg-gray-200 cursor-pointer flex align-middle items-center gap-3"
                    >
                      <span>{lang.text}</span>
                      {lang.id === managementGeneralState.language && (
                        <FaCheck className="h-3 w-3" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              onClick={() => router.push('/contact-us')}
              className="hidden lg2:block cursor-pointer pb-1 text-white text-[16px] hover:border-b hover:border-solid hover:border-white"
            >
              {t('contact')}
            </div>
            <Badge
              badgeContent={managementOrderState.cartList?.length ?? 0}
              color="primary"
              onClick={() => setOpenCart(!openCart)}
            >
              <div className="hidden lg:block cursor-pointer pb-1 text-white text-[16px] hover:border-b hover:border-solid hover:border-white">
                Cart
              </div>

              <FaShoppingCart className="lg:hidden cursor-default w-6 h-6 text-white" />
            </Badge>
          </div>
        </div>
      </div>
      <Drawer
        anchor={'left'}
        open={menu}
        onClose={() => setMenu(false)}
        className="drawer cursor-pointer"
      >
        <div className="w-[50vw]">
          <IoMdClose
            className="w-6 h-8 mt-5 ml-5"
            onClick={() => setMenu(false)}
          />
          <div className="px-6 py-5 bg-white">
            <div className="align-middle items-center gap-4">
              <ul>
                {(managementSubCategoryState.subCategoryList ?? []).map(
                  (sub) => (
                    <li
                      key={sub.id}
                      onClick={() => router.push(`/collection/${sub.slug}`)}
                    >
                      <div className="uppercase cursor-pointer pb-5 text-black text-[20px] font-bold border-b border-solid py-5 ">
                        {sub.name}
                      </div>
                    </li>
                  )
                )}

                <li>
                  <div className="cursor-pointer pb-5 text-black text-[20px] font-bold py-5">
                    CONTACT
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-[20px] left-0 w-full border-t border-solid  flex gap-8 justify-center">
            <div
              className="cursor-pointer mt-6"
              onClick={() => setOpenCountry(!openCountry)}
            >
              <span className="text-black text-[16px] group-hover:text-[#b2edbd]">
                {managementGeneralState.country?.textShow}
              </span>
            </div>
            <div
              className="cursor-pointer mt-6"
              onClick={() => setOpenLanguage(!openLanguage)}
            >
              <span className="text-black text-[16px] w-[100px] group-hover:text-[#b2edbd] mt-[20px]">
                {managementGeneralState.languageText}
              </span>
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openCountry}
        onClose={() => setOpenCountry(!openCountry)}
        className="text-center"
      >
        <div className="top-0 border-b border-solid px-6 py-5 bg-white z-10">
          <div
            className="flex justify-end gap-4"
            onClick={() => setOpenCountry(!openCountry)}
          >
            <IoMdClose className="w-8 h-8" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-[24px] font-bold">COUNTRY/REGION</span>
          </div>
        </div>
        <List>
          {listCountry.map((count) => (
            <ListItem key={count.id} onClick={() => onChangeCountry(count.id)}>
              <ListItemText primary={count.textShow} className="text-center" />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openLanguage}
        onClose={() => setOpenLanguage(!openLanguage)}
      >
        <div className="top-0 border-b border-solid px-6 py-5 bg-white z-10">
          <div
            className="flex justify-end gap-4"
            onClick={() => setOpenLanguage(!openLanguage)}
          >
            <IoMdClose className="w-8 h-8" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-[24px] font-bold">LANGUAGE</span>
          </div>
        </div>
        <ul className="text-center">
          {listLanguage.map((lang) => (
            <li
              key={lang.id}
              onClick={() => onChangeLang(lang.id)}
              className="py-3 px-4 hover:bg-gray-200 cursor-pointer text-center relative"
            >
              <span>{lang.text}</span>
              {lang.id === managementGeneralState.language && (
                <FaCheck className="h-3 w-3 absolute left-[60vw] top-5" />
              )}
            </li>
          ))}
        </ul>
      </Drawer>
      <Drawer
        anchor={'right'}
        open={openCart}
        onClose={() => setOpenCart(false)}
      >
        <div className="w-[80vw] md:w-[50vw] lg:w-[35vw] lg2:w-[25vw] h-full relative ">
          <div className="sticky top-0 flex justify-between align-middle items-center border-b border-solid border-black px-6 py-5 bg-white z-10">
            <div className="flex align-middle items-center gap-4">
              <FaShoppingCart className="w-6 h-6" />
              <span className="text-[24px] font-bold">
                {cartSideBar.length} Item
              </span>
            </div>

            <IoMdClose className="w-8 h-8" onClick={() => setOpenCart(false)} />
          </div>
          <div className="px-6 py-5 w-full content-side overflow-x-hidden overflow-y-auto">
            {cartSideBar.map((cart, index) => (
              <div
                key={index}
                className="flex align-top items-start gap-3 w-full mb-8"
              >
                <img
                  src={cart.product?.main_img}
                  alt="image-product"
                  className="w-20 h-20 rounded-md object-contain object-center"
                />
                <div className="w-full">
                  <div className="flex align-middle justify-between items-center w-full">
                    <div>{cart.product?.name}</div>
                    <div>
                      <NumericFormat
                        displayType="text"
                        value={cart.subTotal}
                        thousandSeparator={','}
                        decimalSeparator="."
                        suffix={` ${managementGeneralState.country?.currencyLogo}`}
                      />
                    </div>
                  </div>
                  <div>
                    {cart.size?.size} - {cart.size?.desc}
                  </div>
                  {cart.isCustom && customDetail(cart)}
                  <div className="flex items-center align-middle gap-3">
                    <div className="flex flex-row h-10 w-auto rounded-lg relative bg-transparent mt-1">
                      <button
                        onClick={() => onMinusCart(index)}
                        data-action="decrement"
                        className="h-full w-8 border-y border-l border-solid border-black rounded-l-lg cursor-pointer outline-none"
                      >
                        <span className="m-auto text-2xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        className="focus:outline-none text-center w-14 border-y border-solid border-black font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center  outline-none"
                        name="custom-input-number"
                        value={cart.qty}
                        onChange={(e) =>
                          onChangeCart(index, Number(e.target.value))
                        }
                      />
                      <button
                        onClick={() => onPlusCart(index)}
                        data-action="increment"
                        className="h-full w-8 border-y border-r border-solid border-black rounded-r-lg cursor-pointer"
                      >
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                    <div
                      onClick={() => onRemove(index)}
                      className="cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full px-6 py-5 sticky bottom-0 bg-white">
            <button
              onClick={() => router.push('/checkout')}
              className="w-full text-center py-4 bg-[#ffce07] font-bold tracking-[1.5px] text-[24px]"
            >
              {`${t('checkout')} -`}{' '}
              <span className="text-[22px]">
                {' '}
                <NumericFormat
                  displayType="text"
                  value={grandTotal}
                  thousandSeparator={','}
                  decimalSeparator="."
                  suffix={` ${managementGeneralState.country?.currencyLogo}`}
                />
              </span>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

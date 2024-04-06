import { listCountry } from '@/component/constant';
import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import {
  Badge,
  Collapse,
  MenuItem,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  ICheckoutOrder,
  IFormCheckout,
  IProductCheckoout,
  ICart,
  ICustom,
} from '@/stores/types/orderTypes';
import useGeneral from '@/stores/hooks/general';
import useOrder from '@/stores/hooks/order';
import useSubCategory from '@/stores/hooks/subCategory';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

interface ICartSide extends ICart {
  subTotal: number;
}

const RedditTextField = styled((props: any) => {
  if (props.register) {
    return (
      <TextField
        {...props.register(props?.name, {
          required: `${props.label} is required`,
        })}
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        {...props}
      />
    );
  }
  return (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
})(({ theme, error }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: error ? '#d32f2f' : '#E0E3E7',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: error ? '#d32f2f' : '#000',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: error ? '#d32f2f' : '#000',
    },
  },
}));

const formCheckoutDefault: IFormCheckout = {
  email: '',
  country: '',
  name: '',
  address: '',
  postal_code: '',
  phone: '',
  city: '',
};

export default function checkout() {
  const { t } = useTranslation();
  const [cartSideBar, setCartSideBar] = useState<ICartSide[]>([]);
  const { managementGeneralState } = useGeneral();

  const { managementSubCategoryState } = useSubCategory();

  const { managementOrderState, handleSubmitCheckout } = useOrder();

  const [grandTotal, setGrandTotal] = useState<number>(0);

  const [showOrderSummaryTop, setshowOrderSummaryTop] = useState(false);
  const [showOrderSummaryB, setshowOrderSummaryB] = useState(false);

  let publicKey = process.env.NEXT_PUBLIC_HOME_PRODUCT;

  const router = useRouter();

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

  useEffect(() => {
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

    if (tempCartSideBar.length > 0) {
      let total = 0;
      tempCartSideBar.map((x) => {
        total = total + x.subTotal;
      });
      setGrandTotal(total);
    }

    setCartSideBar(tempCartSideBar);
  }, [managementOrderState.cartList]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
      .required('Email is required.')
      .email('Invalid Email Format'),
    country: Yup.string().required('Country is required.'),
    address: Yup.string().required('Address is required.'),
    postal_code: Yup.string().required('Postal Code is required.'),
    phone: Yup.string().required('Phone Code is required.'),
    city: Yup.string().required('City Code is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCheckout>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const stripe = await loadStripe(`${publicKey}`);

    let products: IProductCheckoout[] = [];
    (managementOrderState.cartList ?? []).map((x: ICart) => {
      let productObj: IProductCheckoout = {
        id: x.product?.id.toString() ?? '',
        qty: Number(x.qty),
        image_custom: '', //boleh null
        image_one: '', //boleh null
        image_two: '', //boleh null
        image_three: '', //boleh null
        image_four: '', //boleh null
        size: JSON.stringify(x.product?.size),
      };

      if (x.product?.is_custom === 1) {
        productObj.image_custom = x.imageCustomFinal;
        productObj.image_one = x.imageCustom1;
        productObj.image_two = x.imageCustom2;
        productObj.image_three = x.imageCustom3;
        productObj.image_four = x.imageCustom4;
      }

      products.push(productObj);
    });

    let bodyForm: ICheckoutOrder = {
      address: data.address,
      city: data.city,
      country: data.country,
      currency: managementGeneralState.country?.currency ?? '',
      email: data.email,
      name: data.name,
      phone: data.phone,
      postal_code: data.postal_code,
      products: products,
      uuid_category: managementSubCategoryState.categoryUUID ?? '',
    };

    handleSubmitCheckout(bodyForm).then((res: any) => {
      if (res && res.url) {
        router.push(res.url);
      }
    });
  };

  type CountryData = {
    [key: string]: {
      currency: string;
      shipping: number;
    };
  };

  let countryDataShipping: CountryData = {
    austria: {
      currency: 'EUR',
      shipping: 12,
    },
    belgium: {
      currency: 'EUR',
      shipping: 12,
    },
    france: {
      currency: 'EUR',
      shipping: 12,
    },
    germany: {
      currency: 'EUR',
      shipping: 12,
    },
    liechtenstein: {
      currency: 'CHF',
      shipping: 7,
    },
    netherlands: {
      currency: 'EUR',
      shipping: 12,
    },
    portugal: {
      currency: 'EUR',
      shipping: 12,
    },
    spain: {
      currency: 'EUR',
      shipping: 12,
    },
    switzerland: {
      currency: 'CHF',
      shipping: 7,
    },
  };
  const countryId = managementGeneralState.country?.id;

  const countryShipping = countryId ? countryDataShipping[countryId] : null;

  return (
    <>
      <Navigation checkout={true} />

      <div className="pt-[135px] w-full h-full">
        <div className="flex items-center flex-col  lg:hidden  bg-[#F5F5F5] p-5 ">
          <div
            className="flex cursor-pointer justify-between w-full  items-center"
            onClick={() => setshowOrderSummaryTop(!showOrderSummaryTop)}
          >
            <b className="text-[20px]">
              {!showOrderSummaryTop ? 'Show' : 'Hide'} Order Summary{' '}
              {showOrderSummaryTop ? <ExpandLess /> : <ExpandMore />}
            </b>
            <div className="font-bold  text-[21px]">
              <NumericFormat
                displayType="text"
                value={grandTotal + Number(countryShipping?.shipping)}
                thousandSeparator={','}
                decimalSeparator="."
                prefix={` ${managementGeneralState.country?.currencyLogo} `}
              />
            </div>
          </div>
          <Collapse
            in={showOrderSummaryTop}
            className="w-full"
            timeout="auto"
            unmountOnExit
          >
            <div className="w-full text-[14px]  h-full pt-5">
              {cartSideBar.map((cart: any, index) => {
                return (
                  <div
                    key={index}
                    className="flex  mb-5 items-start gap-3 w-full  "
                  >
                    <Badge color="secondary" badgeContent={cart.qty} showZero>
                      <img
                        src={cart.product?.main_img}
                        alt="image-product"
                        className="w-[64px] border p-2 h-[64px] rounded-md object-contain object-center"
                      />
                    </Badge>

                    <div className="w-full justify-between flex">
                      <div className="w-[50vw]">
                        <b>{cart.product?.name}</b>
                        {cart.size?.size} - {cart.size?.desc}
                        {cart.isCustom && customDetail(cart)}
                      </div>
                      <div className="text-[16px] text-end">
                        <NumericFormat
                          displayType="text"
                          value={cart.subTotal}
                          thousandSeparator={','}
                          decimalSeparator="."
                          prefix={` ${managementGeneralState.country?.currencyLogo} `}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Collapse>
        </div>
        <div className="w-full flex lg:flex-row gap-2 h-full justify-start items-start overflow-x-hidden overflow-y-auto">
          <div className="w-full  h-full  px-6">
            <form
              className="p-2 flex flex-col my-10 lg:my-4 gap-2 lg:gap-2 lg2:gap-6 allDekstop:pt-10 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>Contact</div>
              <div className="w-full">
                <RedditTextField
                  label="Email"
                  id="email"
                  type="text"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="email"
                  register={register}
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              </div>
              <div>Delivery</div>
              <div className="grid grid-cols-2 gap-5">
                <RedditTextField
                  select
                  label="Country"
                  id="country"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="country"
                  register={register}
                  error={errors.country}
                  helperText={errors.country?.message}
                >
                  {listCountry.map((country) => (
                    <MenuItem value={country.country}>
                      {country.country}
                    </MenuItem>
                  ))}
                </RedditTextField>
                <RedditTextField
                  label="Name"
                  id="name"
                  type="text"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="name"
                  register={register}
                  error={errors.name}
                  helperText={errors.name?.message}
                />
              </div>
              <div className="w-full">
                <RedditTextField
                  label="Address"
                  id="address"
                  type="text"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="address"
                  register={register}
                  error={errors.address}
                  helperText={errors.address?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <RedditTextField
                  label="Postal Code"
                  id="postalCode"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="postal_code"
                  register={register}
                  error={errors.postal_code}
                  helperText={errors.postal_code?.message}
                />
                <RedditTextField
                  label="City"
                  id="city"
                  type="text"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="city"
                  register={register}
                  error={errors.city}
                  helperText={errors.city?.message}
                />
              </div>

              <div className="w-full">
                <RedditTextField
                  label="Phone"
                  id="phone"
                  type="text"
                  variant="filled"
                  style={{ marginTop: 11 }}
                  fullWidth
                  name="phone"
                  register={register}
                  error={errors.phone}
                  helperText={errors.phone?.message}
                />
              </div>
              <div className="block lg:hidden pt-10">
                <div
                  className="flex cursor-pointer justify-between items-center"
                  onClick={() => setshowOrderSummaryB(!showOrderSummaryB)}
                >
                  <b className="text-[20px]">
                    Order Summary ( {cartSideBar.length} )
                  </b>
                  <div className="cursor-pointer text-[16px]">
                    {!showOrderSummaryB ? 'Show' : 'Hide'}
                    {showOrderSummaryB ? <ExpandLess /> : <ExpandMore />}
                  </div>
                </div>
                <Collapse in={showOrderSummaryB} timeout="auto" unmountOnExit>
                  <div className="w-full text-[14px]  h-full pt-5">
                    {cartSideBar.map((cart: any, index) => {
                      return (
                        <div
                          key={index}
                          className="flex align-top mb-5 items-start gap-3 w-full  justify-between"
                        >
                          <Badge
                            color="secondary"
                            badgeContent={cart.qty}
                            showZero
                          >
                            <img
                              src={cart.product?.main_img}
                              alt="image-product"
                              className="w-[64px] border p-2 h-[64px] rounded-md object-contain object-center"
                            />
                          </Badge>

                          <div className="w-full justify-between flex">
                            <div className="w-[50vw]">
                              <b>{cart.product?.name}</b>
                              {cart.size?.size} - {cart.size?.desc}
                              {cart.isCustom && customDetail(cart)}
                            </div>
                            <div className="text-[16px] text-end">
                              <NumericFormat
                                displayType="text"
                                value={cart.subTotal}
                                thousandSeparator={','}
                                decimalSeparator="."
                                prefix={` ${managementGeneralState.country?.currencyLogo} `}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
              </div>
              <div className="flex lg:hidden  pb-5 w-full justify-between">
                <div className="text-[16px]">
                  <div>Subtotal</div>
                  <div>Shipping</div>
                  <b className="text-[21px]">Total</b>
                </div>
                <div className="text-[16px] text-end">
                  <div>
                    {' '}
                    <NumericFormat
                      displayType="text"
                      value={grandTotal}
                      thousandSeparator={','}
                      decimalSeparator="."
                      prefix={` ${managementGeneralState.country?.currencyLogo} `}
                    />
                  </div>
                  <div>
                    <NumericFormat
                      displayType="text"
                      value={countryShipping?.shipping}
                      thousandSeparator={','}
                      decimalSeparator="."
                      prefix={` ${managementGeneralState.country?.currencyLogo} `}
                    />
                  </div>
                  <div className="font-bold  text-[21px]">
                    <NumericFormat
                      displayType="text"
                      value={grandTotal + Number(countryShipping?.shipping)}
                      thousandSeparator={','}
                      decimalSeparator="."
                      prefix={` ${managementGeneralState.country?.currencyLogo} `}
                    />
                  </div>
                </div>
              </div>
              <button
                className="mt-0 sm:mt-5 md:p-3 mb-5 w-full bg-[#ffce07] text-center py-2 sm:py-5 text-2xl font-bold"
                type="submit"
              >
                {t('paynow')}
              </button>
            </form>
          </div>
          <div className="w-full hidden lg:block  h-[100vh] bg-[#F5F5F5] pr-4 lg2:pr-20 pl-6 pt-10 ">
            {cartSideBar.map((cart: any, index) => {
              return (
                <div
                  key={index}
                  className="flex align-top items-start gap-3 w-full mb-8"
                >
                  <Badge color="secondary" badgeContent={cart.qty} showZero>
                    <img
                      src={cart.product?.main_img}
                      alt="image-product"
                      className="w-14 border p-2 h-14 rounded-md object-contain object-center"
                    />
                  </Badge>

                  <div className="w-full  flex">
                    <div className="w-[400px] mr-16">
                      <b>{cart.product?.name}</b>
                      {cart.size?.size} - {cart.size?.desc}
                      {cart.isCustom && customDetail(cart)}
                    </div>
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
                </div>
              );
            })}

            <div className="flex pb-5 w-[600px] justify-between">
              <div className="text-[20px]">
                <div>Subtotal</div>
                <div>Shipping</div>
                <b className="text-[25px]">Total</b>
              </div>
              <div className="text-[20px]">
                <div>
                  {' '}
                  <NumericFormat
                    displayType="text"
                    value={grandTotal}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country?.currencyLogo}`}
                  />
                </div>
                <div>
                  <NumericFormat
                    displayType="text"
                    value={countryShipping?.shipping}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country?.currencyLogo}`}
                  />
                </div>
                <div className="font-bold  text-[30px]">
                  <NumericFormat
                    displayType="text"
                    value={grandTotal + Number(countryShipping?.shipping)}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country?.currencyLogo}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

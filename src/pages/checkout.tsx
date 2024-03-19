import { listCountry } from '@/component/constant';
import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import {
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
} from '@/stores/types/orderTypes';
import useGeneral from '@/stores/hooks/general';
import useOrder from '@/stores/hooks/order';
import useSubCategory from '@/stores/hooks/subCategory';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const router = useRouter();
  const { managementGeneralState } = useGeneral();

  const { managementSubCategoryState } = useSubCategory();

  const { managementOrderState, handleSubmitCheckout } = useOrder();

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

  const onSubmit = (data: any) => {
    let products: IProductCheckoout[] = [];
    (managementOrderState.cartList ?? []).map((x: ICart) => {
      let productObj: IProductCheckoout = {
        id: x.product?.id.toString() ?? '',
        qty: Number(x.qty),
        image_four: '',
        image_three: '',
        image_one: '',
        image_two: '',
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

    handleSubmitCheckout(bodyForm).then((res) => {
      router.push('/');
    });
  };

  return (
    <>
      <Navigation />
      <div className="pt-[135px] w-full">
        <div className="w-full grid grid-cols-2 justify-start items-start overflow-x-hidden overflow-y-auto">
          <div className="w-full h-full block pl-4 lg2:pl-20 pt-10 pr-6 content-layer">
            <form
              className="p-2 flex flex-col my-4 gap-6 allDekstop:pt-10"
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

              <button
                className="mt-5 w-full bg-[#ffce07] text-center py-5 text-2xl font-bold"
                type="submit"
              >
                {t('paynow')}
              </button>
            </form>
          </div>
          <div className="w-full h-full block bg-[#F5F5F5] pr-4 lg2:pr-20 pl-6 pt-10 content-layer">
            <div className="flex justify-between align-middle items-center">
              <div>Subtotal</div>
              <div>38.95</div>
            </div>
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
}

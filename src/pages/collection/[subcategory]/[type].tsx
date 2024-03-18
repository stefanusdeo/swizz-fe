import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import useGeneral from '@/stores/hooks/general';
import { useProduct } from '@/stores/hooks/product';
import useSubCategory from '@/stores/hooks/subCategory';
import {
  Checkbox,
  ClickAwayListener,
  Collapse,
  FormControlLabel,
  FormGroup,
  Slider,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { NumericFormat } from 'react-number-format';
import Filter from '@/component/filter';
import NavProduct from '@/component/navProduct';
import DoneIcon from '@mui/icons-material/Done';
interface SortingRule {
  id: number;
  name: string;
  sortBy: 'name' | 'created_at' | 'price';
  sortOrder: 'asc' | 'desc';
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidSlug, setIsValidSlug] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<number>(0);
  const [slugSub, setSlugSub] = useState<string>('');
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 20]);
  const [filterSelect, setfilterSelect] = React.useState<number[]>([0]);
  const [shotBy, setshotBy] = useState<SortingRule>();
  const [openTooltip, setTooltip] = useState(false);

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

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
      '&::before': {
        backgroundColor: theme.palette.common.white,
        border: '1px solid #999',
      },
    },

    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 11,
      border: '1px solid #999',
    },
  }));

  const shoryArray: Array<SortingRule> = [
    { id: 1, name: 'Alphabetically, A-Z', sortBy: 'name', sortOrder: 'asc' },
    { id: 2, name: 'Alphabetically, Z-A', sortBy: 'name', sortOrder: 'desc' },
    { id: 3, name: 'Date, old to new', sortBy: 'created_at', sortOrder: 'asc' },
    {
      id: 4,
      name: 'Date, new to old',
      sortBy: 'created_at',
      sortOrder: 'desc',
    },
    { id: 5, name: 'Price, low to high', sortBy: 'price', sortOrder: 'asc' },
    { id: 6, name: 'Price, high to low', sortBy: 'price', sortOrder: 'desc' },
  ];

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
              <div className="flex items-center gap-2">
                <div>Sort by</div>
                <ClickAwayListener onClickAway={() => setTooltip(false)}>
                  <div>
                    <LightTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={() => setTooltip(false)}
                      open={openTooltip}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      placement="bottom-start"
                      title={
                        <div className="px-3 py-4 flex flex-col gap-2 text-[17px]">
                          {shoryArray.map((e: SortingRule) => {
                            return (
                              <div className="flex gap-2">
                                <div
                                  className={`${
                                    shotBy?.id === e.id && 'font-bold'
                                  } cursor-pointer `}
                                  onClick={() => {
                                    setTooltip(false);
                                    setshotBy(e);
                                  }}
                                >
                                  {e.name}
                                </div>
                                {shotBy?.id === e.id && (
                                  <DoneIcon
                                    className="text-black font-bold"
                                    fontSize="small"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      }
                      arrow
                    >
                      <div
                        className="cursor-pointer flex items-center"
                        onClick={() => setTooltip(!openTooltip)}
                      >
                        <b>{shotBy?.name}</b>
                        {!openTooltip ? <ExpandMore /> : <ExpandLess />}
                      </div>
                    </LightTooltip>
                  </div>
                </ClickAwayListener>
              </div>
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
                  <div className=" h-full ">
                    <img
                      src={prod.main_img}
                      alt={prod.name}
                      className={`h-[90%] p-7 hover:p-5 w-full  object-contain object-center`}
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

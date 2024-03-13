import Foooter from "@/component/footer";
import Navigation from "@/component/navigation";
import useGeneral from "@/stores/hooks/general";
import { useProduct } from "@/stores/hooks/product";
import useSubCategory from "@/stores/hooks/subCategory";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlockUi from "react-block-ui";
import { NumericFormat } from 'react-number-format';

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isValidSlug, setIsValidSlug] = useState<boolean>(false)
    const [isCustom, setIsCustom] = useState<number>(0)
    const [slugSub, setSlugSub] = useState<string>("")
    const router = useRouter()

    const {
        managementSubCategoryState,
        handleGetSubCategoryDetail
    } = useSubCategory()

    const {
        managementGeneralState
    } = useGeneral()

    const {
        managementProductState,
        handleGetProductList
    } = useProduct()

    useEffect(() => {
        if (isValidSlug === true) {
            handleGetProductList(slugSub, isCustom).then(
                res => {
                    setIsLoading(false)
                }
            )
        }
    }, [isValidSlug]);

    useEffect(() => {
        let query = router.query
        let subSlug = query['subcategory']
        let type = query['type']
        if (subSlug && type) {
            let stringType = type.toString()
            if (stringType === 'classic') {
                setIsCustom(0)
            }
            else if (stringType === 'custom') {
                setIsCustom(1)
            }
            else {
                router.push("/404")
            }
            setSlugSub(subSlug?.toString())
            handleGetSubCategoryDetail(subSlug?.toString())
                .then(res => {
                    if (res.code === 200) {
                       
                        setIsValidSlug(true)
                    }
                    else {
                        router.push("/404")
                    }
                })
                .catch(e => {
                    router.push("/404")
                })
        }
    }, [router]);

    return (
        <BlockUi tag="div" renderChildren={false} blocking={isLoading} loader={<div className="spinner"></div>} >
            <Navigation />
            <div className="pt-[135px] w-full h-full px-8 lg2:px-16 content-layer">
                <div className="mt-16 uppercase font-bold text-xl">
                    {`${managementSubCategoryState.subCategory?.name} ${isCustom ? "Custom": "Classic"}`}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-11">
                    {(managementProductState.productList ?? []).map(prod => (
                        <div onClick={() => router.push(`/product/${prod.slug}`)} key={prod.id} className="cursor-pointer" >
                            <div className="w-full lg:h-[20vw]">
                                <img
                                    src={prod.main_img}
                                    alt={prod.name}
                                    className="h-full w-full object-contain object-center" />
                            </div>
                            <div className="text-center mt-5 text-[18px] lg:text-[24px] font-bold">
                                {prod.name}
                            </div>
                            <div className="text-center mt-2 text-[18px] lg:text-[24px] font-bold">
                                {managementGeneralState.country?.currency === "EUR" && (
                                    <NumericFormat displayType="text" value={prod.price_eur} thousandSeparator={","} decimalSeparator="." suffix={` ${managementGeneralState.country.currencyLogo}`} />
                                )}
                                {managementGeneralState.country?.currency === "CHF" && (
                                    <NumericFormat displayType="text" value={prod.price_chf} thousandSeparator={","} decimalSeparator="." suffix={` ${managementGeneralState.country.currencyLogo}`} />
                                )}
                                {managementGeneralState.country?.currency === "USD" && (
                                    <NumericFormat displayType="text" value={prod.price_dolar} thousandSeparator={","} decimalSeparator="." suffix={` ${managementGeneralState.country.currencyLogo}`} />
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <Foooter />
        </BlockUi>
    );
}

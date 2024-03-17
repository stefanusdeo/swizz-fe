import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import useSubCategory from '@/stores/hooks/subCategory';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slugSub, setSlugSub] = useState<string>('');
  const router = useRouter();
  const { managementSubCategoryState, handleGetSubCategoryDetail } =
    useSubCategory();

  useEffect(() => {
    let query = router.query;
    let subSlug = query['subcategory'];
    if (subSlug) {
      setSlugSub(subSlug?.toString());
      handleGetSubCategoryDetail(subSlug?.toString())
        .then((res) => {
          if (res.code === 200) {
            if (res.data?.subCategoryList) {
              if (res.data?.subCategoryList[0].is_custom === 1) {
                setIsLoading(false);
              } else {
                router.push(`/collection/${subSlug}/classic`);
              }
            } else {
              router.push('/404');
            }
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
      <div className="pt-[135px] h-[100vh] w-full flex items-center justify-center">
        <div className="py-14 flex items-start align-top justify-center gap-10 lg:gap-20 ">
          <div
            onClick={() => router.push(`/collection/${slugSub}/classic`)}
            className="cursor-pointer"
          >
            <div className="uppercase text-center mb-5 lg:mb-10 text-[16px] lg:text-[32px] font-bold">
              {managementSubCategoryState.subCategory?.name}
              <span className="text-[#b2edbd]">CLASSIC</span>
            </div>
            <div className="w-36 h-36 md:w-56 md:h-56 lg:w-96 lg:h-96">
              <img
                src={managementSubCategoryState.subCategory?.image_classic}
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
          <div
            onClick={() => router.push(`/collection/${slugSub}/custom`)}
            className="cursor-pointer"
          >
            <div className="uppercase text-center mb-5 lg:mb-10 text-[16px] lg:text-[32px] font-bold">
              {managementSubCategoryState.subCategory?.name}
              <span className="text-[#b2edbd]">CUSTOM</span>
            </div>
            <div className="w-36 h-36 md:w-56 md:h-56 lg:w-96 lg:h-96">
              <img
                src={managementSubCategoryState.subCategory?.image_custom}
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <Foooter />
    </BlockUi>
  );
}

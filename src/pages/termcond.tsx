import Foooter from "@/component/footer";
import Navigation from "@/component/navigation";

import ShinLogo from "@/assets/shinlogo.png";
import Image from "next/image";
import useGeneral from "@/stores/hooks/general";
import { useEffect, useState } from "react";
import BlockUi from "react-block-ui";

export default function aboutus() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { managementGeneralState, handleGetTermCond } = useGeneral();

  useEffect(() => {
    handleGetTermCond().then((res) => {
      if (res.code === 200) {
        setIsLoading(false);
        console.log(res.data);
        let findContent = res.data?.termCond?.find(
          (x) => x.lang === managementGeneralState.language
        );
        if (findContent) {
          let htmlString = findContent.content;
          const container = document.getElementById("aboutus-content");
          if (container) {
            container.innerHTML = htmlString;
          }
        }
      }
    });
  }, []);

  return (
    <BlockUi
      tag="div"
      renderChildren={false}
      blocking={isLoading}
      loader={<div className="spinner"></div>}
    >
      <Navigation />
      <div className="pt-[135px] w-full h-full px-8 lg2:px-16 content-layer about-us-container">
        <h1 className=" py-10 text-[24px] font-bold">Terms & Condition</h1>
        <div className="flex w-full align-middle items-center gap-6 pb-10">
          <div className="w-full" id="aboutus-content"></div>
        </div>
      </div>
      <Foooter />
    </BlockUi>
  );
}

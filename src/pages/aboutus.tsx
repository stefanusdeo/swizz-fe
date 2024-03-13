import Foooter from "@/component/footer";
import Navigation from "@/component/navigation";

import ShinLogo from "@/assets/shinlogo.png";
import Image from "next/image";
import useGeneral from "@/stores/hooks/general";
import { useEffect, useState } from "react";
import BlockUi from "react-block-ui";

export default function aboutus() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { managementGeneralState, handleGetAboutUs } = useGeneral();

  useEffect(() => {
    handleGetAboutUs().then((res) => {
      if (res.code === 200) {
        setIsLoading(false);
        let findContent = res.data?.aboutUs?.find(
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
        <h1 className=" pt-10 pb-5 text-[24px] font-bold">About us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center w-full align-middle items-center gap-6 pt-10 pb-14">
          <div className="w-1/2" id="aboutus-content"></div>
          <div className="w-1/2 flex items-center align-middle">
            <Image src={ShinLogo} alt="logo" className="w-[80%] m-auto" />
          </div>
        </div>
      </div>
      <Foooter />
    </BlockUi>
  );
}

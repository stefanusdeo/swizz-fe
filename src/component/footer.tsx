import { useTranslation } from "react-i18next";
import ShinLogo from "@/assets/shinlogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import InstagramIcon from "@/assets/icon/instagram.svg";
import Link from "next/link";

export default function Foooter() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  return (
    <footer>
      <div className="grid grid-cols-3 bg-black px-16 py-10">
        <div className="">
          <Link href={"https://www.instagram.com/"} className="text-right flex">
            <span className="cursor-pointer text-[#b2edbd] text-[20px] pr-1">
              Follow us on
            </span>
            <span className=" mt-1">
              <img
                src="data:image/svg+xml; charset=utf-8;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiBpZD0iSW5zdGFncmFtIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSJub25lIj48L2NpcmNsZT48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iYyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTEwNC0xNjNIMjRhMjQuMDcgMjQuMDcgMCAwIDAtMjQgMjR2ODBhMjQuMDcgMjQuMDcgMCAwIDAgMjQgMjRoODBhMjQuMDcgMjQuMDcgMCAwIDAgMjQtMjR2LTgwYTI0LjA3IDI0LjA3IDAgMCAwLTI0LTI0Wm0xNiAxMDRhMTYgMTYgMCAwIDEtMTYgMTZIMjRBMTYgMTYgMCAwIDEgOC01OXYtODBhMTYgMTYgMCAwIDEgMTYtMTZoODBhMTYgMTYgMCAwIDEgMTYgMTZaIj48L3BhdGg+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImUiPjxjaXJjbGUgY3g9IjgyIiBjeT0iMjA5IiByPSI1IiBmaWxsPSJub25lIj48L2NpcmNsZT48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iZyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTY0LTExNWExNiAxNiAwIDAgMC0xNiAxNiAxNiAxNiAwIDAgMCAxNiAxNiAxNiAxNiAwIDAgMCAxNi0xNiAxNiAxNiAwIDAgMC0xNi0xNlptMCAyNGE4IDggMCAwIDEtOC04IDggOCAwIDAgMSA4LTggOCA4IDAgMCAxIDggOCA4IDggMCAwIDEtOCA4WiI+PC9wYXRoPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJoIj48cGF0aCBmaWxsPSJub25lIiBkPSJNODQtNjNINDRhMTYgMTYgMCAwIDEtMTYtMTZ2LTQwYTE2IDE2IDAgMCAxIDE2LTE2aDQwYTE2IDE2IDAgMCAxIDE2IDE2djQwYTE2IDE2IDAgMCAxLTE2IDE2Wm0tNDAtNjRhOCA4IDAgMCAwLTggOHY0MGE4IDggMCAwIDAgOCA4aDQwYTggOCAwIDAgMCA4LTh2LTQwYTggOCAwIDAgMC04LThaIj48L3BhdGg+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImkiPjxjaXJjbGUgY3g9IjgyIiBjeT0iLTExNyIgcj0iNSIgZmlsbD0ibm9uZSI+PC9jaXJjbGU+PC9jbGlwUGF0aD48cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSIyNy41IiBjeT0iMTIxLjUiIHI9IjEzNy41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNzZmZjkwIiBjbGFzcz0ic3RvcENvbG9yZmZkNjc2IHN2Z1NoYXBlIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuMjUiIHN0b3AtY29sb3I9IiM1NGYyNzEiIGNsYXNzPSJzdG9wQ29sb3JmMmE0NTQgc3ZnU2hhcGUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii4zOCIgc3RvcC1jb2xvcj0iIzNjZjA1ZSIgY2xhc3M9InN0b3BDb2xvcmYwNWMzYyBzdmdTaGFwZSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjciIHN0b3AtY29sb3I9IiMyZmMyNGEiIGNsYXNzPSJzdG9wQ29sb3JjMjJmODYgc3ZnU2hhcGUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii45NiIgc3RvcC1jb2xvcj0iIzY2YWQ3MyIgY2xhc3M9InN0b3BDb2xvcjY2NjZhZCBzdmdTaGFwZSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjk5IiBzdG9wLWNvbG9yPSIjNWNiMjZjIiBjbGFzcz0ic3RvcENvbG9yNWM2Y2IyIHN2Z1NoYXBlIj48L3N0b3A+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImQiIGN4PSIyNy41IiBjeT0iLTQxLjUiIHI9IjE0OC41IiB4bGluazpocmVmPSIjYSI+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImYiIGN4PSIxMy44NyIgY3k9IjMwMy4zOCIgcj0iMTg1LjYzIiB4bGluazpocmVmPSIjYSI+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImoiIGN4PSIxMy44NyIgY3k9Ii0yMi42MiIgcj0iMTg1LjYzIiB4bGluazpocmVmPSIjYSI+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2IpIiBmaWxsPSIjMDAwMDAwIiBjbGFzcz0iY29sb3IwMDAwMDAgc3ZnU2hhcGUiPjxjaXJjbGUgY3g9IjI3LjUiIGN5PSIxMjEuNSIgcj0iMTM3LjUiIGZpbGw9InVybCgjYSkiPjwvY2lyY2xlPjwvZz48ZyBjbGlwLXBhdGg9InVybCgjYykiIGZpbGw9IiMwMDAwMDAiIGNsYXNzPSJjb2xvcjAwMDAwMCBzdmdTaGFwZSI+PGNpcmNsZSBjeD0iMjcuNSIgY3k9Ii00MS41IiByPSIxNDguNSIgZmlsbD0idXJsKCNkKSI+PC9jaXJjbGU+PC9nPjxnIGNsaXAtcGF0aD0idXJsKCNlKSIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9ImNvbG9yMDAwMDAwIHN2Z1NoYXBlIj48Y2lyY2xlIGN4PSIxMy44NyIgY3k9IjMwMy4zOCIgcj0iMTg1LjYzIiBmaWxsPSJ1cmwoI2YpIj48L2NpcmNsZT48L2c+PGcgY2xpcC1wYXRoPSJ1cmwoI2cpIiBmaWxsPSIjMDAwMDAwIiBjbGFzcz0iY29sb3IwMDAwMDAgc3ZnU2hhcGUiPjxjaXJjbGUgY3g9IjI3LjUiIGN5PSItNDEuNSIgcj0iMTQ4LjUiIGZpbGw9InVybCgjZCkiPjwvY2lyY2xlPjwvZz48ZyBjbGlwLXBhdGg9InVybCgjaCkiIGZpbGw9IiMwMDAwMDAiIGNsYXNzPSJjb2xvcjAwMDAwMCBzdmdTaGFwZSI+PGNpcmNsZSBjeD0iMjcuNSIgY3k9Ii00MS41IiByPSIxNDguNSIgZmlsbD0idXJsKCNkKSI+PC9jaXJjbGU+PC9nPjxnIGNsaXAtcGF0aD0idXJsKCNpKSIgZmlsbD0iIzAwMDAwMCIgY2xhc3M9ImNvbG9yMDAwMDAwIHN2Z1NoYXBlIj48Y2lyY2xlIGN4PSIxMy44NyIgY3k9Ii0yMi42MiIgcj0iMTg1LjYzIiBmaWxsPSJ1cmwoI2opIj48L2NpcmNsZT48L2c+PGNpcmNsZSBjeD0iODIiIGN5PSI0NiIgcj0iNSIgZmlsbD0iI2IyZWRiZCIgY2xhc3M9ImNvbG9yZmZmZmZmIHN2Z1NoYXBlIj48L2NpcmNsZT48cGF0aCBmaWxsPSIjYjJlZGJkIiBkPSJNNjQgNDhhMTYgMTYgMCAxIDAgMTYgMTYgMTYgMTYgMCAwIDAtMTYtMTZabTAgMjRhOCA4IDAgMSAxIDgtOCA4IDggMCAwIDEtOCA4WiIgY2xhc3M9ImNvbG9yZmZmZmZmIHN2Z1NoYXBlIj48L3BhdGg+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB4PSIzMiIgeT0iMzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjgiIHJ4PSIxMiIgcnk9IjEyIiBjbGFzcz0iY29sb3JTdHJva2VmZmZmZmYgc3ZnU3Ryb2tlIj48L3JlY3Q+PC9zdmc+"
                alt={"instagram icon"}
                className="w-[20px]"
              />
            </span>
          </Link>
        </div>
        <div className=" flex justify-center">
          <Image
            onClick={() => router.push("/")}
            src={ShinLogo}
            alt={"logo"}
            className="w-[150px] h-[150px]"
          />
        </div>
        <div className="text-right grid">
          <Link
            href={"/contact-us"}
            className="cursor-pointer text-[#b2edbd] text-[20px]"
          >
            {t("contact")}
          </Link>
          <Link
            href={"/aboutus"}
            className="cursor-pointer text-[#b2edbd] text-[20px] mt-3"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href={"/termcond"}
            className="cursor-pointer text-[#b2edbd] text-[20px] mt-3"
          >
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}

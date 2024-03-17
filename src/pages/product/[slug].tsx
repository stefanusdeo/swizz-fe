import Foooter from '@/component/footer';
import Navigation from '@/component/navigation';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Konva from 'konva';
import { FaCheck } from 'react-icons/fa';
import {
  backgroundImageBase64,
  imageFrames,
  logoLeftBlack,
  logoRightBlack,
} from '@/assets/imagesBase64';
import domtoimage from 'dom-to-image';
import UploadImage from '@/component/uploadImage';
import {
  calculatePositionRotate,
  calculatePositionRotateText,
} from '@/component/utils';
import { listColor, listColorLogo } from '@/component/constant';
import { useTranslation } from 'react-i18next';
import { IoIosCloseCircle } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useProduct } from '@/stores/hooks/product';
import useSubCategory from '@/stores/hooks/subCategory';
import useGeneral from '@/stores/hooks/general';
import { NumericFormat } from 'react-number-format';
import { IProductImage, ISize } from '@/stores/types/productTypes';
import { ICart, ICustom } from '@/stores/types/orderTypes';
import localforage from 'localforage';
import useOrder from '@/stores/hooks/order';
import html2canvas from 'html2canvas';
import ImageMagnifier from '@/component/ImageMagnifier';

interface IImageProp {
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  rotate: number;
  x: number;
  y: number;
  xRotate?: number;
  yRotate?: number;
  init: boolean;
}
interface ITextProp {
  width: number;
  height: number;
  size: number;
  fill: string;
  type: string;
  rotate: number;
  x: number;
  y: number;
  xRotate?: number;
  yRotate?: number;
  init: boolean;
  scaleY: number;
  scaleX: number;
}

const defaultText = {
  height: 0,
  fill: '',
  size: 0,
  type: '',
  scaleX: 0,
  scaleY: 0,
  rotate: 0,
  width: 0,
  x: 0,
  y: 0,
  init: false,
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  //product
  const {
    handleGetProductDetail,
    handleGetProductImage,
    managementProductState,
  } = useProduct();

  const { managementGeneralState } = useGeneral();

  const { managementOrderState, handleAddCartList } = useOrder();

  const { managementSubCategoryState, handleGetSubCategoryDetail } =
    useSubCategory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSource, setImageSource] = useState<IProductImage>({
    id: '',
    imageBase64: '',
  });
  const [productSlug, setProductSlug] = useState<string>('');
  const [sizeProduct, setSizeProduct] = useState<string>('');
  const [sizeList, setSizeList] = useState<ISize[]>([]);
  const [orderQty, setOrderQty] = useState<number>(1);
  const [customProcess, setCustomProcess] = useState<boolean>(false);
  //product
  const divRef = useRef<HTMLDivElement>(null);

  const [modalCustom, setModalCustom] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string>('');
  const [stageLayer, setStageLayer] = useState<Konva.Stage | null>(null);
  const [imageBackground, setImageBackground] = useState(backgroundImageBase64);
  const [imageFrame, setImageFrame] = useState(imageFrames);
  const [maskImageBg, setMaskImageBg] = useState<IImageProp>({
    height: 0,
    originalHeight: 0,
    originalWidth: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    xRotate: 0,
    yRotate: 0,
    init: false,
  });

  const [konvaLayer, setKonvaLayer] = useState({
    width: 0,
    height: 0,
  });

  //image

  //image1
  const [propImages1List, setPropImages1List] = useState<IImageProp[]>([]);
  const [image1List, setImage1List] = useState<any[]>([]);
  const [propImages1, setPropImages1] = useState<IImageProp>({
    height: 0,
    originalHeight: 0,
    originalWidth: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [customImages1, setCustomImages1] = useState<any>(null);
  const [actionImage1, setActionImage1] = useState(false);
  const [image1Node, setImage1Node] = useState<Konva.Image | null>(null);
  //image1

  //image2
  const [propImages2List, setPropImages2List] = useState<IImageProp[]>([]);
  const [image2List, setImage2List] = useState<any[]>([]);
  const [propImages2, setPropImages2] = useState<IImageProp>({
    height: 0,
    originalHeight: 0,
    originalWidth: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [customImages2, setCustomImages2] = useState<any>(null);
  const [actionImage2, setActionImage2] = useState(false);
  const [image2Node, setImage2Node] = useState<Konva.Image | null>(null);
  //image2

  //image3
  const [propImages3List, setPropImages3List] = useState<IImageProp[]>([]);
  const [image3List, setImage3List] = useState<any[]>([]);
  const [propImages3, setPropImages3] = useState<IImageProp>({
    height: 0,
    originalHeight: 0,
    originalWidth: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [customImages3, setCustomImages3] = useState<any>(null);
  const [actionImage3, setActionImage3] = useState(false);
  const [image3Node, setImage3Node] = useState<Konva.Image | null>(null);
  //image3

  //image4
  const [propImages4List, setPropImages4List] = useState<IImageProp[]>([]);
  const [image4List, setImage4List] = useState<any[]>([]);
  const [propImages4, setPropImages4] = useState<IImageProp>({
    height: 0,
    originalHeight: 0,
    originalWidth: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [customImages4, setCustomImages4] = useState<any>(null);
  const [actionImage4, setActionImage4] = useState(false);
  const [image4Node, setImage4Node] = useState<Konva.Image | null>(null);
  //image4

  //image

  //text
  //right text
  const [rightTextNode, setRightTextNode] = useState<Konva.Text | null>(null);
  const [rightText, setRightText] = useState<string>('');
  const [rightTextColor, setRightTextColor] = useState<string>('#000000');
  const [rightTextShadow, setRightTextShadow] = useState<number>(0);
  const [rightTextFont, setRightTextFont] = useState<string>('thin');
  const [propRightText, setPropRightText] = useState<ITextProp>({
    height: 0,
    fill: '',
    size: 0,
    type: '',
    scaleX: 0,
    scaleY: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [actionRightText, setActionRightText] = useState(false);
  const [rightTextCustom, setRightTextCustom] = useState<ICustom[]>([]);
  //right text

  //left text
  const [leftTextNode, setLeftTextNode] = useState<Konva.Text | null>(null);
  const [leftText, setLeftText] = useState<string>('');
  const [leftTextColor, setLeftTextColor] = useState<string>('#000000');
  const [leftTextShadow, setLeftTextShadow] = useState<number>(0);
  const [leftTextFont, setLeftTextFont] = useState<string>('thin');
  const [propLeftText, setPropLeftText] = useState<ITextProp>({
    height: 0,
    fill: '',
    size: 0,
    type: '',
    scaleX: 0,
    scaleY: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [actionLeftText, setActionLeftText] = useState(false);
  const [leftTextCustom, setLeftTextCustom] = useState<ICustom[]>([]);
  //left text
  //text

  //number
  //right number
  const [rightNumberNode, setRightNumberNode] = useState<Konva.Text | null>(
    null
  );
  const [rightNumber, setRightNumber] = useState<string>('');
  const [rightNumberColor, setRightNumberColor] = useState<string>('#000000');
  const [rightNumberShadow, setRightNumberShadow] = useState<number>(0);
  const [rightNumberFont, setRightNumberFont] = useState<string>('thin');
  const [propRightNumber, setPropRightNumber] = useState<ITextProp>({
    height: 0,
    fill: '',
    size: 0,
    type: '',
    scaleX: 0,
    scaleY: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [actionRightNumber, setActionRightNumber] = useState(false);
  const [rightNumberCustom, setRightNumberCustom] = useState<ICustom[]>([]);
  //right number

  //left number
  const [leftNumberNode, setLeftNumberNode] = useState<Konva.Text | null>(null);
  const [leftNumber, setLeftNumber] = useState<string>('');
  const [leftNumberColor, setLeftNumberColor] = useState<string>('#000000');
  const [leftNumberShadow, setLeftNumberShadow] = useState<number>(0);
  const [leftNumberFont, setLeftNumberFont] = useState<string>('thin');
  const [propLeftNumber, setPropLeftNumber] = useState<ITextProp>({
    height: 0,
    fill: '',
    size: 0,
    type: '',
    scaleX: 0,
    scaleY: 0,
    rotate: 0,
    width: 0,
    x: 0,
    y: 0,
    init: false,
  });
  const [actionLeftNumber, setActionLeftNumber] = useState(false);
  const [leftNumberCustom, setLeftNumberCustom] = useState<ICustom[]>([]);
  //left number
  //number

  //background
  const [colorProduct, setColorProduct] = useState<string>('');
  const [colorProductCustom, setColorProductCustom] = useState<ICustom>({
    customProperty: 'Background',
    customValue: '',
  });
  //background

  //logo
  const [leftLogo, setLeftLogo] = useState<string>('');
  const [rightLogo, setRightLogo] = useState<string>('');
  const [shadowLeftLogo, setShadowLeftLogo] = useState<boolean>(false);
  const [shadowRightLogo, setShadowRightLogo] = useState<boolean>(false);
  const [leftLogoCustom, setLeftLogoCustom] = useState<ICustom[]>([]);
  const [rightLogoCustom, setRightLogoCustom] = useState<ICustom[]>([]);
  //logo

  //product
  useEffect(() => {
    if (router) {
      let query = router.query;
      let slug = query['slug'];
      if (slug?.toString()) {
        setProductSlug(slug.toString());
        handleGetProductDetail(slug.toString()).then((res) => {
          if (res.data?.productDetail) {
            handleGetProductImage(
              res.data?.productDetail?.id ?? 1,
              res.data?.productDetail
            ).then((img) => {
              if (
                img.data?.productDetail?.productImage &&
                img.data?.productDetail?.productImage.length > 0
              ) {
                setImageSource(img.data?.productDetail?.productImage[0]);
              }
            });
            setSizeList(res.data?.productDetail?.size ?? []);
            if (
              res.data?.productDetail?.size &&
              res.data?.productDetail?.size.length > 0
            ) {
              setSizeProduct(res.data?.productDetail?.size[0].size);
            }
            if (!managementSubCategoryState.subCategory) {
              handleGetSubCategoryDetail(
                res.data?.productDetail?.slug_sub_category ?? ''
              );
            }
          }
        });
      }
    }
  }, [router]);

  useEffect(() => {
    if (orderQty <= 0) {
      setOrderQty(1);
    }
  }, [orderQty]);

  const addToCartBasic = async () => {
    let findSize = sizeList.find((x) => x.size === sizeProduct);
    let addToCart: ICart = {
      product: managementProductState.productDetail,
      qty: orderQty,
      size: findSize,
      isCustom: true,
    };

    handleAddCartList(addToCart);
  };

  const addToCartCustom = async () => {
    setCustomProcess(true);
  };
  useEffect(() => {
    if (customProcess === true) {
      sumbitCustomProduct();
    }
  }, [customProcess]);
  //product

  const sumbitCustomProduct = async () => {
    let findSize = sizeList.find((x) => x.size === sizeProduct);

    let addToCart: ICart = {
      product: managementProductState.productDetail,
      qty: orderQty,
      size: findSize,
      isCustom: true,
    };

    let customImage = '';
    if (divRef.current) {
      customImage = await domtoimage.toPng(divRef.current, {
        width: divRef.current.clientWidth * 2,
        height: divRef.current.clientHeight * 2,
        style: {
          transform: 'scale(' + 2 + ')',
          transformOrigin: 'top left',
        },
      });
    }
    addToCart.imageCustomFinal = customImage;

    let customList: ICustom[] = [];
    if (customImages1) {
      let custom1Base64 = await convertToBase64(customImages1);
      let objCustom1: ICustom = {
        customProperty: 'File 1',
        customValue: custom1Base64 ?? '',
      };
      customList.push(objCustom1);
      addToCart.imageCustom1 = custom1Base64 ?? '';
    }
    if (customImages2) {
      let custom2Base64 = await convertToBase64(customImages2);
      let objCustom2: ICustom = {
        customProperty: 'File 1',
        customValue: custom2Base64 ?? '',
      };
      customList.push(objCustom2);
      addToCart.imageCustom2 = custom2Base64 ?? '';
    }
    if (customImages3) {
      let custom3Base64 = await convertToBase64(customImages3);
      let objCustom3: ICustom = {
        customProperty: 'File 1',
        customValue: custom3Base64 ?? '',
      };
      customList.push(objCustom3);
      addToCart.imageCustom3 = custom3Base64 ?? '';
    }
    if (customImages4) {
      let custom4Base64 = await convertToBase64(customImages4);
      let objCustom4: ICustom = {
        customProperty: 'File 1',
        customValue: custom4Base64 ?? '',
      };
      customList.push(objCustom4);
      addToCart.imageCustom4 = custom4Base64 ?? '';
    }

    customList = customList.concat(rightTextCustom);
    customList = customList.concat(leftTextCustom);
    customList = customList.concat(rightNumberCustom);
    customList = customList.concat(leftNumberCustom);
    customList = customList.concat(rightLogoCustom);
    customList = customList.concat(leftLogoCustom);

    if (colorProductCustom.customValue !== '') {
      customList.push(colorProductCustom);
    }

    addToCart.customList = customList;

    handleAddCartList(addToCart);
  };

  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string | null;
        resolve(base64String);
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (modalCustom === true) {
      detectionKonvaCanvas();
    }
  }, [modalCustom]);

  const detectionKonvaCanvas = () => {
    let isAvailable = document.getElementById('container-customize');

    if (modalCustom === true && !isAvailable) {
      const timeoutId = setTimeout(() => {
        detectionKonvaCanvas();
        clearTimeout(timeoutId);
      }, 500);
    }
    if (modalCustom === true && isAvailable) {
      konvaInit();
    }
  };

  const konvaInit = () => {
    let container = document.getElementById('container-customize');
    let width = container?.offsetWidth ?? 0;
    let height = container?.offsetHeight ?? 0;

    setKonvaLayer({
      width: width ?? 0,
      height: height ?? 0,
    });

    let stage: Konva.Stage = new Konva.Stage({
      container: 'container-customize',
      width: width,
      height: height,
    });

    setStageLayer(stage);
    let layer = new Konva.Layer();
    let isWidth = false;
    if (width > height) {
      isWidth = true;
    }

    let imageCut = new Image();
    let imgCut = imageFrame;
    imageCut.src = imgCut;
    imageCut.crossOrigin = 'anonymous';

    let imageBg = new Image();
    let imgBg = imageBackground;
    imageBg.src = imgBg;
    imageBg.crossOrigin = 'anonymous';
    imageCut.onload = (e: any) => {
      let imgWidth = imageCut.width;
      let imgHeight = imageCut.height;
      let x = 0;
      let y = 0;

      if (imgWidth > width || imgHeight > height) {
        let divideWidth = imgWidth / width;
        let divideHeight = imgHeight / height;

        let divideAll = divideWidth;
        if (divideHeight > divideWidth) {
          divideAll = divideHeight;
        }

        divideAll = divideAll + 0.1;

        imgWidth = imgWidth / divideAll;
        imgHeight = imgHeight / divideAll;
      }

      x = width / 2 - imgWidth / 2;
      y = height / 2 - imgHeight / 2;
      setMaskImageBg({
        ...maskImageBg,
        x: x,
        y: y,
        width: imgWidth,
        height: imgHeight,
        originalHeight: imageCut.height,
        originalWidth: imageCut.width,
      });
      const cut = new Konva.Image({
        image: imageCut,
        x: x,
        y: y,
        width: imgWidth,
        height: imgHeight,
        id: 'imgCut',
        opacity: 0,
      });

      const bg = new Konva.Image({
        image: imageBg,
        x: x,
        y: y,
        width: imgWidth,
        height: imgHeight,
        id: 'imgBg',
        opacity: 0,
      });

      layer.add(bg);
      layer.add(cut);

      stage.add(layer);
      setStageLayer(stage);
    };
  };

  //images
  //images 1
  useEffect(() => {
    if (propImages1.init === false && stageLayer) {
      modifyImage1Props(customImages1);
    }
  }, [customImages1]);

  const deleteImage1 = (index: number) => {
    let image1 = image1List;
    let imge1Prop = propImages1List;
    if (image1.length === 1 && stageLayer) {
      image1.splice(index, 1);
      setCustomImages1(null);
      let imagesProps: IImageProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        originalHeight: 0,
        originalWidth: 0,
        init: false,
      };
      setPropImages1(imagesProps);
      image1Node?.destroy();
      setImage1Node(null);
      var transformerToRemove = stageLayer.find(
        '#' + 'image1-custom-transform'
      )[0];
      transformerToRemove?.destroy();
    } else {
      if (image1[index] === customImages1) {
        image1.splice(index, 1);
        setCustomImages1(image1[0]);
      }
    }
    imge1Prop.splice(index, 1);
    setPropImages1List(imge1Prop);
    setImage1List(image1);
  };

  const handlesetPropImages1List = (
    imageWidth: number,
    imagesHeight: number,
    file: any
  ) => {
    let img1List = image1List;
    let checkedFile = img1List.find((x) => x.name === file.name);
    if (checkedFile) {
    } else {
      img1List.push(file);

      setImage1List(img1List);

      let initImage = initImage1(imageWidth, imagesHeight);
      let imgPropList = propImages1List;
      imgPropList.push(initImage);

      if (imgPropList.length === 1) {
        setPropImages1(initImage);
        addImageProps1(initImage, file);
      }

      setCustomImages1(file);

      setPropImages1List(imgPropList);
    }
  };

  const initImage1 = (width: number, height: number) => {
    let imageWidth = width;
    let imagesHeight = height;
    let imagesProps: IImageProp = {
      height: 0,
      rotate: 0,
      width: 0,
      x: 0,
      y: 0,
      originalHeight: imagesHeight,
      originalWidth: imageWidth,
      init: false,
    };

    if (imageWidth > konvaLayer.width / 2) {
      let halfLayer = konvaLayer.width / 2;
      let multipleImages = imageWidth / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.width = imageWidth / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.x = position;
    } else {
      imagesProps.width = imageWidth;
      let position = konvaLayer.width / 2 - imagesProps.width / 2;
      imagesProps.x = position;
    }

    if (imagesHeight > konvaLayer.height / 2) {
      let halfLayer = konvaLayer.height / 2;
      let multipleImages = imagesHeight / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.height = imagesHeight / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    } else {
      imagesProps.height = imagesHeight;
      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    }

    return imagesProps;
  };

  const addImageProps1 = (propImages: IImageProp, file: any) => {
    if (stageLayer) {
      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var imgBg = stage.find('#imgBg')[0];
      // Create a clipping box
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      const imageCustom1 = new Konva.Image({
        image: imgCustom,
        x: propImages.x,
        y: propImages.y,
        width: propImages.width,
        height: propImages.height,
        draggable: true,
        opacity: 0,
        id: 'image1-custom',
      });

      setImage1Node(imageCustom1);
      // imageCustom1
      layer.add(imageCustom1);

      const trasnformImage1 = new Konva.Transformer({
        nodes: [imageCustom1],
        flipEnabled: false,
        id: 'image1-custom-transform',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          const postX = trasnformImage1.x();
          const postY = trasnformImage1.y();
          let getPostRect = trasnformImage1.getTransform().point({
            x: trasnformImage1.width() / 2,
            y: trasnformImage1.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (trasnformImage1.getActiveAnchor() === 'rotater') {
            setPropImages1({
              ...propImages,
              width: trasnformImage1.width(),
              height: trasnformImage1.height(),
              rotate: trasnformImage1.rotation(),
              x: trasnformImage1.x(),
              y: trasnformImage1.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropImages1({
              ...propImages,
              width: trasnformImage1.width(),
              height: trasnformImage1.height(),
              rotate: trasnformImage1.rotation(),
              x: trasnformImage1.x(),
              y: trasnformImage1.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropImages1({
            ...propImages,
            width: trasnformImage1.width(),
            height: trasnformImage1.height(),
            rotate: trasnformImage1.rotation(),
            x: trasnformImage1.x(),
            y: trasnformImage1.y(),
            xRotate: xRotate,
            yRotate: yRotate,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });

      layer.add(trasnformImage1);
      stage.add(layer);

      setStageLayer(stage);
      trasnformImage1.on('dragend', () => {
        const postX = trasnformImage1.x();
        const postY = trasnformImage1.y();
        let getPostRect = trasnformImage1.getTransform().point({
          x: trasnformImage1.width() / 2,
          y: trasnformImage1.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionImage1(false);
        imageCustom1.opacity(0);
        setPropImages1({
          ...propImages,
          width: trasnformImage1.width(),
          height: trasnformImage1.height(),
          rotate: trasnformImage1.rotation(),
          x: trasnformImage1.x(),
          y: trasnformImage1.y(),
          xRotate: xRotate,
          yRotate: yRotate,
        });
      });
      trasnformImage1.on('dragstart', function () {
        imageCustom1.opacity(0.5);
        setActionImage1(true);
      });
      trasnformImage1.on('transformstart', function () {
        imageCustom1.opacity(0.5);
        setActionImage1(true);
      });

      trasnformImage1.on('transformend', function () {
        imageCustom1.opacity(0);
        setActionImage1(false);
      });
    }
  };

  const modifyImage1Props = (file: any) => {
    if (stageLayer && image1Node) {
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      image1Node.image(imgCustom);
    }
  };

  const imageStyle1 = () => {
    let xPost = propImages1.x - maskImageBg.x;
    let yPost = propImages1.y - maskImageBg.y;

    if (propImages1.rotate != 0) {
      xPost = xPost - propImages1.width / 2 - (propImages1.xRotate ?? 0);
      yPost = yPost - propImages1.height / 2 - (propImages1.yRotate ?? 0);
      let rotate = calculatePositionRotate(
        xPost,
        yPost,
        propImages1.width,
        propImages1.height,
        propImages1.rotate
      );
      xPost = rotate.x;
      yPost = rotate.y;
    }

    return {
      width: propImages1.width,
      height: propImages1.height,
      transform: `translate(${xPost}px, ${yPost}px) rotate(${propImages1.rotate}deg)`,
    };
  };
  //images 1

  //images 2
  useEffect(() => {
    if (propImages2.init === false && stageLayer) {
      modifyImage2Props(customImages2);
    }
  }, [customImages2]);

  const deleteImage2 = (index: number) => {
    let image2 = image2List;
    let imge2Prop = propImages2List;
    if (image2.length === 2 && stageLayer) {
      image2.splice(index, 2);
      setCustomImages2(null);
      let imagesProps: IImageProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        originalHeight: 0,
        originalWidth: 0,
        init: false,
      };
      setPropImages2(imagesProps);
      image2Node?.destroy();
      setImage2Node(null);
      var transformerToRemove = stageLayer.find(
        '#' + 'image2-custom-transform'
      )[0];
      transformerToRemove?.destroy();
    } else {
      if (image2[index] === customImages2) {
        image2.splice(index, 2);
        setCustomImages2(image2[0]);
      }
    }
    imge2Prop.splice(index, 2);
    setPropImages2List(imge2Prop);
    setImage2List(image2);
  };

  const handlesetPropImages2List = (
    imageWidth: number,
    imagesHeight: number,
    file: any
  ) => {
    let img2List = image2List;
    let checkedFile = img2List.find((x) => x.name === file.name);
    if (checkedFile) {
    } else {
      img2List.push(file);

      setImage2List(img2List);

      let initImage = initImage2(imageWidth, imageWidth);
      let imgPropList = propImages2List;
      imgPropList.push(initImage);

      if (imgPropList.length === 1) {
        setPropImages2(initImage);
        addImageProps2(initImage, file);
      }

      setCustomImages2(file);

      setPropImages2List(imgPropList);
    }
  };

  const initImage2 = (width: number, height: number) => {
    let imageWidth = width;
    let imagesHeight = height;
    let imagesProps: IImageProp = {
      height: 0,
      rotate: 0,
      width: 0,
      x: 0,
      y: 0,
      originalHeight: imagesHeight,
      originalWidth: imageWidth,
      init: false,
    };

    if (imageWidth > konvaLayer.width / 2) {
      let halfLayer = konvaLayer.width / 2;
      let multipleImages = imageWidth / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.width = imageWidth / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.x = position;
    } else {
      imagesProps.width = imageWidth;
      let position = konvaLayer.width / 2 - imagesProps.width / 2;
      imagesProps.x = position;
    }

    if (imagesHeight > konvaLayer.height / 2) {
      let halfLayer = konvaLayer.height / 2;
      let multipleImages = imagesHeight / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.height = imagesHeight / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    } else {
      imagesProps.height = imagesHeight;
      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    }

    return imagesProps;
  };

  const addImageProps2 = (propImages: IImageProp, file: any) => {
    if (stageLayer) {
      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var imgBg = stage.find('#imgBg')[0];
      // Create a clipping box
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      const imageCustom2 = new Konva.Image({
        image: imgCustom,
        x: propImages.x,
        y: propImages.y,
        width: propImages.width,
        height: propImages.height,
        draggable: true,
        opacity: 0,
        id: 'image2-custom',
      });

      setImage2Node(imageCustom2);
      // imageCustom2
      layer.add(imageCustom2);

      const trasnformImage2 = new Konva.Transformer({
        nodes: [imageCustom2],
        flipEnabled: false,
        id: 'image2-custom-transform',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          const postX = trasnformImage2.x();
          const postY = trasnformImage2.y();
          let getPostRect = trasnformImage2.getTransform().point({
            x: trasnformImage2.width() / 2,
            y: trasnformImage2.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (trasnformImage2.getActiveAnchor() === 'rotater') {
            setPropImages2({
              ...propImages,
              width: trasnformImage2.width(),
              height: trasnformImage2.height(),
              rotate: trasnformImage2.rotation(),
              x: trasnformImage2.x(),
              y: trasnformImage2.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropImages2({
              ...propImages,
              width: trasnformImage2.width(),
              height: trasnformImage2.height(),
              rotate: trasnformImage2.rotation(),
              x: trasnformImage2.x(),
              y: trasnformImage2.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropImages2({
            ...propImages,
            width: trasnformImage2.width(),
            height: trasnformImage2.height(),
            rotate: trasnformImage2.rotation(),
            x: trasnformImage2.x(),
            y: trasnformImage2.y(),
            xRotate: xRotate,
            yRotate: yRotate,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });

      layer.add(trasnformImage2);
      stage.add(layer);

      setStageLayer(stage);
      trasnformImage2.on('dragend', () => {
        const postX = trasnformImage2.x();
        const postY = trasnformImage2.y();
        let getPostRect = trasnformImage2.getTransform().point({
          x: trasnformImage2.width() / 2,
          y: trasnformImage2.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionImage2(false);
        imageCustom2.opacity(0);
        setPropImages2({
          ...propImages,
          width: trasnformImage2.width(),
          height: trasnformImage2.height(),
          rotate: trasnformImage2.rotation(),
          x: trasnformImage2.x(),
          y: trasnformImage2.y(),
          xRotate: xRotate,
          yRotate: yRotate,
        });
      });
      trasnformImage2.on('dragstart', function () {
        imageCustom2.opacity(0.5);
        setActionImage2(true);
      });
      trasnformImage2.on('transformstart', function () {
        imageCustom2.opacity(0.5);
        setActionImage2(true);
      });

      trasnformImage2.on('transformend', function () {
        imageCustom2.opacity(0);
        setActionImage2(false);
      });
    }
  };

  const modifyImage2Props = (file: any) => {
    if (stageLayer && image2Node) {
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      image2Node.image(imgCustom);
    }
  };

  const imageStyle2 = () => {
    let xPost = propImages2.x - maskImageBg.x;
    let yPost = propImages2.y - maskImageBg.y;

    if (propImages2.rotate != 0) {
      xPost = xPost - propImages2.width / 2 - (propImages2.xRotate ?? 0);
      yPost = yPost - propImages2.height / 2 - (propImages2.yRotate ?? 0);
      let rotate = calculatePositionRotate(
        xPost,
        yPost,
        propImages2.width,
        propImages2.height,
        propImages2.rotate
      );
      xPost = rotate.x;
      yPost = rotate.y;
    }

    return {
      width: propImages2.width,
      height: propImages2.height,
      transform: `translate(${xPost}px, ${yPost}px) rotate(${propImages2.rotate}deg)`,
    };
  };
  //images 2

  //images 3
  useEffect(() => {
    if (propImages3.init === false && stageLayer) {
      modifyImage3Props(customImages3);
    }
  }, [customImages3]);

  const handlesetPropImages3List = (
    imageWidth: number,
    imagesHeight: number,
    file: any
  ) => {
    let img3List = image3List;
    let checkedFile = img3List.find((x) => x.name === file.name);
    if (checkedFile) {
    } else {
      img3List.push(file);

      setImage3List(img3List);

      let initImage = initImage3(imageWidth, imageWidth);
      let imgPropList = propImages3List;
      imgPropList.push(initImage);

      if (imgPropList.length === 1) {
        setPropImages3(initImage);
        addImageProps3(initImage, file);
      }
      setCustomImages3(file);
      setPropImages3List(imgPropList);
    }
  };

  const deleteImage3 = (index: number) => {
    let image3 = image3List;
    let imge3Prop = propImages3List;
    if (image3.length === 3 && stageLayer) {
      image3.splice(index, 3);
      setCustomImages3(null);
      let imagesProps: IImageProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        originalHeight: 0,
        originalWidth: 0,
        init: false,
      };
      setPropImages3(imagesProps);
      image3Node?.destroy();
      setImage3Node(null);
      var transformerToRemove = stageLayer.find(
        '#' + 'image3-custom-transform'
      )[0];
      transformerToRemove?.destroy();
    } else {
      if (image3[index] === customImages3) {
        image3.splice(index, 3);
        setCustomImages3(image3[0]);
      }
    }
    imge3Prop.splice(index, 3);
    setPropImages3List(imge3Prop);
    setImage3List(image3);
  };

  const initImage3 = (width: number, height: number) => {
    let imageWidth = width;
    let imagesHeight = height;
    let imagesProps: IImageProp = {
      height: 0,
      rotate: 0,
      width: 0,
      x: 0,
      y: 0,
      originalHeight: imagesHeight,
      originalWidth: imageWidth,
      init: false,
    };

    if (imageWidth > konvaLayer.width / 2) {
      let halfLayer = konvaLayer.width / 2;
      let multipleImages = imageWidth / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.width = imageWidth / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.x = position;
    } else {
      imagesProps.width = imageWidth;
      let position = konvaLayer.width / 2 - imagesProps.width / 2;
      imagesProps.x = position;
    }

    if (imagesHeight > konvaLayer.height / 2) {
      let halfLayer = konvaLayer.height / 2;
      let multipleImages = imagesHeight / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.height = imagesHeight / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    } else {
      imagesProps.height = imagesHeight;
      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    }

    return imagesProps;
  };

  const addImageProps3 = (propImages: IImageProp, file: any) => {
    if (stageLayer) {
      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var imgBg = stage.find('#imgBg')[0];
      // Create a clipping box
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      const imageCustom3 = new Konva.Image({
        image: imgCustom,
        x: propImages.x,
        y: propImages.y,
        width: propImages.width,
        height: propImages.height,
        draggable: true,
        opacity: 0,
        id: 'image3-custom',
      });

      setImage3Node(imageCustom3);
      // imageCustom3
      layer.add(imageCustom3);

      const trasnformImage3 = new Konva.Transformer({
        nodes: [imageCustom3],
        flipEnabled: false,
        id: 'image3-custom-transform',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          const postX = trasnformImage3.x();
          const postY = trasnformImage3.y();
          let getPostRect = trasnformImage3.getTransform().point({
            x: trasnformImage3.width() / 2,
            y: trasnformImage3.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (trasnformImage3.getActiveAnchor() === 'rotater') {
            setPropImages3({
              ...propImages,
              width: trasnformImage3.width(),
              height: trasnformImage3.height(),
              rotate: trasnformImage3.rotation(),
              x: trasnformImage3.x(),
              y: trasnformImage3.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropImages3({
              ...propImages,
              width: trasnformImage3.width(),
              height: trasnformImage3.height(),
              rotate: trasnformImage3.rotation(),
              x: trasnformImage3.x(),
              y: trasnformImage3.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropImages3({
            ...propImages,
            width: trasnformImage3.width(),
            height: trasnformImage3.height(),
            rotate: trasnformImage3.rotation(),
            x: trasnformImage3.x(),
            y: trasnformImage3.y(),
            xRotate: xRotate,
            yRotate: yRotate,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });

      layer.add(trasnformImage3);
      stage.add(layer);

      setStageLayer(stage);
      trasnformImage3.on('dragend', () => {
        const postX = trasnformImage3.x();
        const postY = trasnformImage3.y();
        let getPostRect = trasnformImage3.getTransform().point({
          x: trasnformImage3.width() / 2,
          y: trasnformImage3.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionImage3(false);
        imageCustom3.opacity(0);
        setPropImages3({
          ...propImages,
          width: trasnformImage3.width(),
          height: trasnformImage3.height(),
          rotate: trasnformImage3.rotation(),
          x: trasnformImage3.x(),
          y: trasnformImage3.y(),
          xRotate: xRotate,
          yRotate: yRotate,
        });
      });
      trasnformImage3.on('dragstart', function () {
        imageCustom3.opacity(0.5);
        setActionImage3(true);
      });
      trasnformImage3.on('transformstart', function () {
        imageCustom3.opacity(0.5);
        setActionImage3(true);
      });

      trasnformImage3.on('transformend', function () {
        imageCustom3.opacity(0);
        setActionImage3(false);
      });
    }
  };

  const modifyImage3Props = (file: any) => {
    if (stageLayer && image3Node) {
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      image3Node.image(imgCustom);
    }
  };

  const imageStyle3 = () => {
    let xPost = propImages3.x - maskImageBg.x;
    let yPost = propImages3.y - maskImageBg.y;

    if (propImages3.rotate != 0) {
      xPost = xPost - propImages3.width / 2 - (propImages3.xRotate ?? 0);
      yPost = yPost - propImages3.height / 2 - (propImages3.yRotate ?? 0);
      let rotate = calculatePositionRotate(
        xPost,
        yPost,
        propImages3.width,
        propImages3.height,
        propImages3.rotate
      );
      xPost = rotate.x;
      yPost = rotate.y;
    }

    return {
      width: propImages3.width,
      height: propImages3.height,
      transform: `translate(${xPost}px, ${yPost}px) rotate(${propImages3.rotate}deg)`,
    };
  };
  //images 3

  //images 4
  useEffect(() => {
    if (propImages4.init === false && stageLayer) {
      modifyImage4Props(customImages4);
    }
  }, [customImages4]);

  const handlesetPropImages4List = (
    imageWidth: number,
    imagesHeight: number,
    file: any
  ) => {
    let img4List = image4List;
    let checkedFile = img4List.find((x) => x.name === file.name);
    if (checkedFile) {
    } else {
      img4List.push(file);

      setImage4List(img4List);

      let initImage = initImage4(imageWidth, imageWidth);
      let imgPropList = propImages4List;
      imgPropList.push(initImage);

      if (imgPropList.length === 1) {
        setPropImages4(initImage);
        addImageProps4(initImage, file);
      }
      setCustomImages4(file);
      setPropImages4List(imgPropList);
    }
  };

  const deleteImage4 = (index: number) => {
    let image4 = image4List;
    let imge4Prop = propImages4List;
    if (image4.length === 4 && stageLayer) {
      image4.splice(index, 4);
      setCustomImages4(null);
      let imagesProps: IImageProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        originalHeight: 0,
        originalWidth: 0,
        init: false,
      };
      setPropImages4(imagesProps);
      image4Node?.destroy();
      setImage4Node(null);
      var transformerToRemove = stageLayer.find(
        '#' + 'image4-custom-transform'
      )[0];
      transformerToRemove?.destroy();
    } else {
      if (image4[index] === customImages4) {
        image4.splice(index, 4);
        setCustomImages4(image4[0]);
      }
    }
    imge4Prop.splice(index, 4);
    setPropImages4List(imge4Prop);
    setImage4List(image4);
  };

  const initImage4 = (width: number, height: number) => {
    let imageWidth = width;
    let imagesHeight = height;
    let imagesProps: IImageProp = {
      height: 0,
      rotate: 0,
      width: 0,
      x: 0,
      y: 0,
      originalHeight: imagesHeight,
      originalWidth: imageWidth,
      init: false,
    };

    if (imageWidth > konvaLayer.width / 2) {
      let halfLayer = konvaLayer.width / 2;
      let multipleImages = imageWidth / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.width = imageWidth / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.x = position;
    } else {
      imagesProps.width = imageWidth;
      let position = konvaLayer.width / 2 - imagesProps.width / 2;
      imagesProps.x = position;
    }

    if (imagesHeight > konvaLayer.height / 2) {
      let halfLayer = konvaLayer.height / 2;
      let multipleImages = imagesHeight / halfLayer;
      multipleImages = Math.floor(multipleImages) + 1;

      imagesProps.height = imagesHeight / multipleImages;

      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    } else {
      imagesProps.height = imagesHeight;
      let position = konvaLayer.height / 2 - imagesProps.height / 2;
      imagesProps.y = position;
    }

    return imagesProps;
  };

  const addImageProps4 = (propImages: IImageProp, file: any) => {
    if (stageLayer) {
      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var imgBg = stage.find('#imgBg')[0];
      // Create a clipping box
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      const imageCustom4 = new Konva.Image({
        image: imgCustom,
        x: propImages.x,
        y: propImages.y,
        width: propImages.width,
        height: propImages.height,
        draggable: true,
        opacity: 0,
        id: 'image4-custom',
      });

      setImage4Node(imageCustom4);
      // imageCustom4
      layer.add(imageCustom4);

      const trasnformImage4 = new Konva.Transformer({
        nodes: [imageCustom4],
        flipEnabled: false,
        id: 'image4-custom-transform',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          const postX = trasnformImage4.x();
          const postY = trasnformImage4.y();
          let getPostRect = trasnformImage4.getTransform().point({
            x: trasnformImage4.width() / 2,
            y: trasnformImage4.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (trasnformImage4.getActiveAnchor() === 'rotater') {
            setPropImages4({
              ...propImages,
              width: trasnformImage4.width(),
              height: trasnformImage4.height(),
              rotate: trasnformImage4.rotation(),
              x: trasnformImage4.x(),
              y: trasnformImage4.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropImages4({
              ...propImages,
              width: trasnformImage4.width(),
              height: trasnformImage4.height(),
              rotate: trasnformImage4.rotation(),
              x: trasnformImage4.x(),
              y: trasnformImage4.y(),
              xRotate: xRotate,
              yRotate: yRotate,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropImages4({
            ...propImages,
            width: trasnformImage4.width(),
            height: trasnformImage4.height(),
            rotate: trasnformImage4.rotation(),
            x: trasnformImage4.x(),
            y: trasnformImage4.y(),
            xRotate: xRotate,
            yRotate: yRotate,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });

      layer.add(trasnformImage4);
      stage.add(layer);

      setStageLayer(stage);
      trasnformImage4.on('dragend', () => {
        const postX = trasnformImage4.x();
        const postY = trasnformImage4.y();
        let getPostRect = trasnformImage4.getTransform().point({
          x: trasnformImage4.width() / 2,
          y: trasnformImage4.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionImage4(false);
        imageCustom4.opacity(0);
        setPropImages4({
          ...propImages,
          width: trasnformImage4.width(),
          height: trasnformImage4.height(),
          rotate: trasnformImage4.rotation(),
          x: trasnformImage4.x(),
          y: trasnformImage4.y(),
          xRotate: xRotate,
          yRotate: yRotate,
        });
      });
      trasnformImage4.on('dragstart', function () {
        imageCustom4.opacity(0.5);
        setActionImage4(true);
      });
      trasnformImage4.on('transformstart', function () {
        imageCustom4.opacity(0.5);
        setActionImage4(true);
      });

      trasnformImage4.on('transformend', function () {
        imageCustom4.opacity(0);
        setActionImage4(false);
      });
    }
  };

  const modifyImage4Props = (file: any) => {
    if (stageLayer && image4Node) {
      let imgCustom = new Image();
      let imageCustom = file?.preview ?? '';
      imgCustom.src = imageCustom;
      imgCustom.crossOrigin = 'anonymous';
      image4Node.image(imgCustom);
    }
  };

  const imageStyle4 = () => {
    let xPost = propImages4.x - maskImageBg.x;
    let yPost = propImages4.y - maskImageBg.y;

    if (propImages4.rotate != 0) {
      xPost = xPost - propImages4.width / 2 - (propImages4.xRotate ?? 0);
      yPost = yPost - propImages4.height / 2 - (propImages4.yRotate ?? 0);
      let rotate = calculatePositionRotate(
        xPost,
        yPost,
        propImages4.width,
        propImages4.height,
        propImages4.rotate
      );
      xPost = rotate.x;
      yPost = rotate.y;
    }

    return {
      width: propImages4.width,
      height: propImages4.height,
      transform: `translate(${xPost}px, ${yPost}px) rotate(${propImages4.rotate}deg)`,
    };
  };
  //images 4

  //images

  //text
  //right
  useEffect(() => {
    if (propRightText.init === false && rightText !== '') {
      addRightText();
    }
    if (propRightText.init === true && rightText !== '') {
      modifyRightText();
    }
    if (rightText === '' && rightTextNode && stageLayer) {
      var transformerToRemove = stageLayer.find('#' + 'transformRightText')[0];
      transformerToRemove?.destroy();
      rightTextNode.destroy();
      setRightTextNode(null);
      setPropRightText(defaultText);
    }
    if (rightText === '') {
      setRightTextCustom([]);
    }
    if (rightText !== '') {
      let rightTextCustomList: ICustom[] = [];
      let objCustomText: ICustom = {
        customProperty: 'Right text',
        customValue: rightText,
      };
      rightTextCustomList.push(objCustomText);

      let color = listColor.find((x) => x.colorCode === rightTextColor);
      let objCustomColor: ICustom = {
        customProperty: 'Color',
        customValue: color?.name ?? '',
      };
      rightTextCustomList.push(objCustomColor);

      let objCustomFont: ICustom = {
        customProperty: 'Font',
        customValue: rightTextFont === 'thin' ? 'Thin' : 'Bold',
      };
      rightTextCustomList.push(objCustomFont);

      let objCustomShadow: ICustom = {
        customProperty: 'Shadow',
        customValue: rightNumberShadow === 1 ? 'True' : 'False',
      };
      rightTextCustomList.push(objCustomShadow);

      setRightTextCustom(rightTextCustomList);
    }
  }, [rightText, rightTextColor, rightTextShadow, rightTextFont]);

  const addRightText = () => {
    if (stageLayer) {
      let propRightText: ITextProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        fill: rightTextColor === '' ? '#000000' : rightTextColor,
        size: 24,
        type: rightTextFont === 'bold' ? 'bold' : 'normal',
        init: true,
        scaleX: 0,
        scaleY: 0,
      };

      setPropRightText(propRightText);

      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var text = new Konva.Text({
        x: stage.width() * 0.6,
        y: stage.height() * 0.3,
        text: rightText,
        fontSize: 24,
        fill: rightTextColor === '' ? '#000000' : rightTextColor,
        draggable: true,
        opacity: 1,
        id: 'rightText',
        fontFamily: 'agency',
        scaleX: 1,
        scaleY: 1,
        fontStyle: 'normal',
      });

      setRightTextNode(text);

      layer.add(text);
      const transformText = new Konva.Transformer({
        nodes: [text],
        flipEnabled: false,
        id: 'transformRightText',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // console.log(text.scale())
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          let scale = text.scale();
          const postX = transformText.x();
          const postY = transformText.y();
          let getPostRect = transformText.getTransform().point({
            x: transformText.width() / 2,
            y: transformText.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (transformText.getActiveAnchor() === 'rotater') {
            setPropRightText({
              ...propRightText,
              width: transformText.width(),
              height: transformText.height(),
              rotate: transformText.rotation(),
              x: transformText.x(),
              y: transformText.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropRightText({
              ...propRightText,
              width: transformText.width(),
              height: transformText.height(),
              rotate: transformText.rotation(),
              x: transformText.x(),
              y: transformText.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropRightText({
            ...propRightText,
            width: transformText.width(),
            height: transformText.height(),
            rotate: transformText.rotation(),
            x: transformText.x(),
            y: transformText.y(),
            xRotate: xRotate,
            yRotate: yRotate,
            size: text.fontSize(),
            scaleX: scale?.x ?? 0,
            scaleY: scale?.y ?? 0,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });
      layer.add(transformText);
      stage.add(layer);

      setStageLayer(stage);
      transformText.on('dragend', () => {
        const postX = transformText.x();
        const postY = transformText.y();
        let getPostRect = transformText.getTransform().point({
          x: transformText.width() / 2,
          y: transformText.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionRightText(false);
        text.opacity(0);

        let scale = text.scale();
        setPropRightText({
          ...propRightText,
          width: transformText.width(),
          height: transformText.height(),
          rotate: transformText.rotation(),
          x: transformText.x(),
          y: transformText.y(),
          xRotate: xRotate,
          yRotate: yRotate,
          size: text.fontSize(),
          scaleX: scale?.x ?? 0,
          scaleY: scale?.y ?? 0,
        });
      });
      transformText.on('dragstart', function () {
        text.opacity(0.5);
        setActionRightText(true);
      });
      transformText.on('transformstart', function () {
        text.opacity(0.5);
        setActionRightText(true);
      });

      transformText.on('transformend', function () {
        text.opacity(0);
        setActionRightText(false);
      });
    }
  };

  const modifyRightText = () => {
    if (stageLayer && rightTextNode) {
      rightTextNode.text(rightText);
      rightTextNode.fill(rightTextColor === '' ? '#000000' : rightTextColor);
      if (rightTextShadow === 1) {
        rightTextNode.strokeEnabled(true);
        rightTextNode.stroke('#000000');
        rightTextNode.strokeWidth(0.3);
      }
      if (rightTextShadow === 0) {
        rightTextNode.strokeEnabled(false);
      }
      rightTextNode.moveToTop();
      rightTextNode.fontStyle(rightTextFont === 'bold' ? 'bold' : 'normal');
    }
  };

  const rightTextStyle = () => {
    let xPost = propRightText.x - maskImageBg.x;
    let yPost = propRightText.y - maskImageBg.y;

    yPost = yPost - propRightText.height / 4 - propRightText.scaleY;
    let transX = 0;
    let transY = 0;
    if (propRightText.rotate !== 0) {
      let rotate = calculatePositionRotateText(
        xPost,
        yPost,
        propRightText.width,
        propRightText.height,
        propRightText.rotate,
        propRightText.scaleX,
        propRightText.scaleY
      );
      transX = rotate.x;
      transY = rotate.y;
    }

    return {
      transform: `scale(${propRightText.scaleX}, ${propRightText.scaleY}) rotate(${propRightText.rotate}deg)  translate(${transX}%, ${transY}%)`,
      top: yPost,
      left: xPost,
      transformOrigin: 'top left',
      color: rightTextColor === '' ? '#000000' : rightTextColor,
      fontWeight: rightTextFont === 'bold' ? 'bold' : 'normal',
    };
  };
  //right

  //left
  useEffect(() => {
    if (propLeftText.init === false && leftText !== '') {
      addLeftText();
    }
    if (propLeftText.init === true && leftText !== '') {
      modifyLeftText();
    }
    if (leftText === '' && leftTextNode && stageLayer) {
      var transformerToRemove = stageLayer.find('#' + 'transformLeftText')[0];
      transformerToRemove?.destroy();
      leftTextNode.destroy();
      setLeftTextNode(null);
      setPropLeftText(defaultText);
    }
    if (leftText === '') {
      setLeftTextCustom([]);
    }
    if (leftText !== '') {
      let leftTextCustomList: ICustom[] = [];
      let objCustomText: ICustom = {
        customProperty: 'Left text',
        customValue: leftText,
      };
      leftTextCustomList.push(objCustomText);

      let color = listColor.find((x) => x.colorCode === leftTextColor);
      let objCustomColor: ICustom = {
        customProperty: 'Color',
        customValue: color?.name ?? '',
      };
      leftTextCustomList.push(objCustomColor);

      let objCustomFont: ICustom = {
        customProperty: 'Font',
        customValue: leftTextFont === 'thin' ? 'Thin' : 'Bold',
      };
      leftTextCustomList.push(objCustomFont);

      let objCustomShadow: ICustom = {
        customProperty: 'Shadow',
        customValue: leftNumberShadow === 1 ? 'True' : 'False',
      };
      leftTextCustomList.push(objCustomShadow);

      setLeftTextCustom(leftTextCustomList);
    }
  }, [leftText, leftTextColor, leftTextShadow, leftTextFont]);

  const addLeftText = () => {
    if (stageLayer) {
      let propLeftText: ITextProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        fill: leftTextColor === '' ? '#000000' : leftTextColor,
        size: 24,
        type: leftTextFont === 'bold' ? 'bold' : 'normal',
        init: true,
        scaleX: 0,
        scaleY: 0,
      };

      setPropLeftText(propLeftText);

      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var text = new Konva.Text({
        x: (stage.width() * 1) / 4,
        y: stage.height() * 0.3,
        text: leftText,
        fontSize: 24,
        fill: leftTextColor === '' ? '#000000' : leftTextColor,
        draggable: true,
        opacity: 1,
        id: 'leftText',
        fontFamily: 'agency',
        scaleX: 1,
        scaleY: 1,
        fontStyle: 'normal',
      });

      setLeftTextNode(text);

      layer.add(text);
      const transformText = new Konva.Transformer({
        nodes: [text],
        flipEnabled: false,
        id: 'transformLeftText',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // console.log(text.scale())
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          let scale = text.scale();
          const postX = transformText.x();
          const postY = transformText.y();
          let getPostRect = transformText.getTransform().point({
            x: transformText.width() / 2,
            y: transformText.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (transformText.getActiveAnchor() === 'rotater') {
            setPropLeftText({
              ...propLeftText,
              width: transformText.width(),
              height: transformText.height(),
              rotate: transformText.rotation(),
              x: transformText.x(),
              y: transformText.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropLeftText({
              ...propLeftText,
              width: transformText.width(),
              height: transformText.height(),
              rotate: transformText.rotation(),
              x: transformText.x(),
              y: transformText.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropLeftText({
            ...propLeftText,
            width: transformText.width(),
            height: transformText.height(),
            rotate: transformText.rotation(),
            x: transformText.x(),
            y: transformText.y(),
            xRotate: xRotate,
            yRotate: yRotate,
            size: text.fontSize(),
            scaleX: scale?.x ?? 0,
            scaleY: scale?.y ?? 0,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });
      layer.add(transformText);
      stage.add(layer);

      setStageLayer(stage);
      transformText.on('dragend', () => {
        const postX = transformText.x();
        const postY = transformText.y();
        let getPostRect = transformText.getTransform().point({
          x: transformText.width() / 2,
          y: transformText.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionLeftText(false);
        text.opacity(0);
        let scale = text.scale();
        setPropLeftText({
          ...propLeftText,
          width: transformText.width(),
          height: transformText.height(),
          rotate: transformText.rotation(),
          x: transformText.x(),
          y: transformText.y(),
          xRotate: xRotate,
          yRotate: yRotate,
          size: text.fontSize(),
          scaleX: scale?.x ?? 0,
          scaleY: scale?.y ?? 0,
        });
      });
      transformText.on('dragstart', function () {
        text.opacity(0.5);
        setActionLeftText(true);
      });
      transformText.on('transformstart', function () {
        text.opacity(0.5);
        setActionLeftText(true);
      });

      transformText.on('transformend', function () {
        text.opacity(0);
        setActionLeftText(false);
      });
    }
  };

  const modifyLeftText = () => {
    if (stageLayer && leftTextNode) {
      leftTextNode.text(leftText);
      leftTextNode.fill(leftTextColor === '' ? '#000000' : leftTextColor);
      if (leftTextShadow === 1) {
        leftTextNode.strokeEnabled(true);
        leftTextNode.stroke('#000000');
        leftTextNode.strokeWidth(0.3);
      }
      if (leftTextShadow === 0) {
        leftTextNode.strokeEnabled(false);
      }
      leftTextNode.moveToTop();
      leftTextNode.fontStyle(leftTextFont === 'bold' ? 'bold' : 'normal');
    }
  };

  const leftTextStyle = () => {
    let xPost = propLeftText.x - maskImageBg.x;
    let yPost = propLeftText.y - maskImageBg.y;

    yPost = yPost - propLeftText.height / 4 - propLeftText.scaleY;
    let transX = 0;
    let transY = 0;
    if (propLeftText.rotate !== 0) {
      let rotate = calculatePositionRotateText(
        xPost,
        yPost,
        propLeftText.width,
        propLeftText.height,
        propLeftText.rotate,
        propLeftText.scaleX,
        propLeftText.scaleY
      );
      transX = rotate.x;
      transY = rotate.y;
    }

    return {
      transform: `scale(${propLeftText.scaleX}, ${propLeftText.scaleY}) rotate(${propLeftText.rotate}deg)  translate(${transX}%, ${transY}%)`,
      top: yPost,
      left: xPost,
      transformOrigin: 'top left',
      color: leftTextColor === '' ? '#000000' : leftTextColor,
      fontWeight: leftTextFont === 'bold' ? 'bold' : 'normal',
    };
  };
  //left
  //text

  //number
  //right
  useEffect(() => {
    if (propRightNumber.init === false && rightNumber !== '') {
      addRightNumber();
    }
    if (propRightNumber.init === true && rightNumber !== '') {
      modifyRightNumber();
    }
    if (rightNumber === '' && rightNumberNode && stageLayer) {
      var transformerToRemove = stageLayer.find(
        '#' + 'transformRightNumber'
      )[0];
      transformerToRemove?.destroy();
      rightNumberNode.destroy();
      setRightNumberNode(null);
      setPropRightNumber(defaultText);
    }
    if (rightNumber === '') {
      setRightNumberCustom([]);
    }
    if (rightNumber !== '') {
      let rightNumberCustomList: ICustom[] = [];
      let objCustomNumber: ICustom = {
        customProperty: 'Right number',
        customValue: rightNumber,
      };
      rightNumberCustomList.push(objCustomNumber);

      let color = listColor.find((x) => x.colorCode === rightNumberColor);
      let objCustomColor: ICustom = {
        customProperty: 'Color',
        customValue: color?.name ?? '',
      };
      rightNumberCustomList.push(objCustomColor);

      let objCustomFont: ICustom = {
        customProperty: 'Font',
        customValue: rightNumberFont === 'thin' ? 'Thin' : 'Bold',
      };
      rightNumberCustomList.push(objCustomFont);

      let objCustomShadow: ICustom = {
        customProperty: 'Shadow',
        customValue: rightNumberShadow === 1 ? 'True' : 'False',
      };
      rightNumberCustomList.push(objCustomShadow);

      setRightNumberCustom(rightNumberCustomList);
    }
  }, [rightNumber, rightNumberColor, rightNumberShadow, rightNumberFont]);

  const addRightNumber = () => {
    if (stageLayer) {
      let propRightNumber: ITextProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        fill: rightNumberColor === '' ? '#000000' : rightNumberColor,
        size: 24,
        type: rightNumberFont === 'bold' ? 'bold' : 'normal',
        init: true,
        scaleX: 0,
        scaleY: 0,
      };

      setPropRightNumber(propRightNumber);

      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var text = new Konva.Text({
        x: stage.width() * 0.6,
        y: stage.height() * 0.3,
        text: rightNumber,
        fontSize: 24,
        fill: rightNumberColor === '' ? '#000000' : rightNumberColor,
        draggable: true,
        opacity: 1,
        id: 'rightNumber',
        fontFamily: 'agency',
        scaleX: 1,
        scaleY: 1,
        fontStyle: 'normal',
      });

      setRightNumberNode(text);

      layer.add(text);
      const transformNumber = new Konva.Transformer({
        nodes: [text],
        flipEnabled: false,
        id: 'transformRightNumber',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // console.log(text.scale())
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          let scale = text.scale();
          const postX = transformNumber.x();
          const postY = transformNumber.y();
          let getPostRect = transformNumber.getTransform().point({
            x: transformNumber.width() / 2,
            y: transformNumber.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (transformNumber.getActiveAnchor() === 'rotater') {
            setPropRightNumber({
              ...propRightNumber,
              width: transformNumber.width(),
              height: transformNumber.height(),
              rotate: transformNumber.rotation(),
              x: transformNumber.x(),
              y: transformNumber.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropRightNumber({
              ...propRightNumber,
              width: transformNumber.width(),
              height: transformNumber.height(),
              rotate: transformNumber.rotation(),
              x: transformNumber.x(),
              y: transformNumber.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropRightNumber({
            ...propRightNumber,
            width: transformNumber.width(),
            height: transformNumber.height(),
            rotate: transformNumber.rotation(),
            x: transformNumber.x(),
            y: transformNumber.y(),
            xRotate: xRotate,
            yRotate: yRotate,
            size: text.fontSize(),
            scaleX: scale?.x ?? 0,
            scaleY: scale?.y ?? 0,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });
      layer.add(transformNumber);
      stage.add(layer);

      setStageLayer(stage);
      transformNumber.on('dragend', () => {
        const postX = transformNumber.x();
        const postY = transformNumber.y();
        let getPostRect = transformNumber.getTransform().point({
          x: transformNumber.width() / 2,
          y: transformNumber.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionRightNumber(false);
        text.opacity(0);
        let scale = text.scale();
        setPropRightNumber({
          ...propRightNumber,
          width: transformNumber.width(),
          height: transformNumber.height(),
          rotate: transformNumber.rotation(),
          x: transformNumber.x(),
          y: transformNumber.y(),
          xRotate: xRotate,
          yRotate: yRotate,
          size: text.fontSize(),
          scaleX: scale?.x ?? 0,
          scaleY: scale?.y ?? 0,
        });
      });
      transformNumber.on('dragstart', function () {
        text.opacity(0.5);
        setActionRightNumber(true);
      });
      transformNumber.on('transformstart', function () {
        text.opacity(0.5);
        setActionRightNumber(true);
      });

      transformNumber.on('transformend', function () {
        text.opacity(0);
        setActionRightNumber(false);
      });
    }
  };

  const modifyRightNumber = () => {
    if (stageLayer && rightNumberNode) {
      rightNumberNode.text(rightNumber);
      rightNumberNode.fill(
        rightNumberColor === '' ? '#000000' : rightNumberColor
      );
      if (rightNumberShadow === 1) {
        rightNumberNode.strokeEnabled(true);
        rightNumberNode.stroke('#000000');
        rightNumberNode.strokeWidth(0.3);
      }
      if (rightNumberShadow === 0) {
        rightNumberNode.strokeEnabled(false);
      }
      rightNumberNode.moveToTop();
      rightNumberNode.fontStyle(rightNumberFont === 'bold' ? 'bold' : 'normal');
    }
  };

  const rightNumberStyle = () => {
    let xPost = propRightNumber.x - maskImageBg.x;
    let yPost = propRightNumber.y - maskImageBg.y;

    yPost = yPost - propRightNumber.height / 4 - propRightNumber.scaleY;
    let transX = 0;
    let transY = 0;
    if (propRightNumber.rotate !== 0) {
      let rotate = calculatePositionRotateText(
        xPost,
        yPost,
        propRightNumber.width,
        propRightNumber.height,
        propRightNumber.rotate,
        propRightNumber.scaleX,
        propRightNumber.scaleY
      );
      transX = rotate.x;
      transY = rotate.y;
    }

    return {
      transform: `scale(${propRightNumber.scaleX}, ${propRightNumber.scaleY}) rotate(${propRightNumber.rotate}deg)  translate(${transX}%, ${transY}%)`,
      top: yPost,
      left: xPost,
      transformOrigin: 'top left',
      color: rightNumberColor === '' ? '#000000' : rightNumberColor,
      fontWeight: rightNumberFont === 'bold' ? 'bold' : 'normal',
    };
  };
  //right

  //left
  useEffect(() => {
    if (propLeftNumber.init === false && leftNumber !== '') {
      addLeftNumber();
    }
    if (propLeftNumber.init === true && leftNumber !== '') {
      modifyLeftNumber();
    }
    if (leftNumber === '') {
      setLeftNumberCustom([]);
    }

    if (leftNumber === '' && leftNumberNode && stageLayer) {
      var transformerToRemove = stageLayer.find('#' + 'transformLeftNumber')[0];
      transformerToRemove?.destroy();
      leftNumberNode.destroy();
      setLeftNumberNode(null);
      setPropLeftNumber(defaultText);
    }
    if (leftNumber !== '') {
      let leftNumberCustomList: ICustom[] = [];
      let objCustomNumber: ICustom = {
        customProperty: 'Left number',
        customValue: leftNumber,
      };
      leftNumberCustomList.push(objCustomNumber);

      let color = listColor.find((x) => x.colorCode === leftNumberColor);
      let objCustomColor: ICustom = {
        customProperty: 'Color',
        customValue: color?.name ?? '',
      };
      leftNumberCustomList.push(objCustomColor);

      let objCustomFont: ICustom = {
        customProperty: 'Font',
        customValue: leftNumberFont === 'thin' ? 'Thin' : 'Bold',
      };
      leftNumberCustomList.push(objCustomFont);

      let objCustomShadow: ICustom = {
        customProperty: 'Shadow',
        customValue: leftNumberShadow === 1 ? 'True' : 'False',
      };
      leftNumberCustomList.push(objCustomShadow);

      setLeftNumberCustom(leftNumberCustomList);
    }
  }, [leftNumber, leftNumberColor, leftNumberShadow, leftNumberFont]);

  const addLeftNumber = () => {
    if (stageLayer) {
      let propLeftNumber: ITextProp = {
        height: 0,
        rotate: 0,
        width: 0,
        x: 0,
        y: 0,
        fill: leftNumberColor === '' ? '#000000' : leftNumberColor,
        size: 24,
        type: leftNumberFont === 'bold' ? 'bold' : 'normal',
        init: true,
        scaleX: 0,
        scaleY: 0,
      };

      setPropLeftNumber(propLeftNumber);

      let stage = stageLayer;
      let layers = stage.getLayers();
      let layer = layers.length > 0 ? layers[0] : new Konva.Layer();
      const xSnaps = Math.round(stage.width() / 100);
      const ySnaps = Math.round(stage.height() / 100);
      const cellWidth = stage.width() / xSnaps;
      const cellHeight = stage.height() / ySnaps;

      var text = new Konva.Text({
        x: (stage.width() * 1) / 4,
        y: stage.height() * 0.3,
        text: leftNumber,
        fontSize: 24,
        fill: leftNumberColor === '' ? '#000000' : leftNumberColor,
        draggable: true,
        opacity: 1,
        id: 'leftNumber',
        fontFamily: 'agency',
        scaleX: 1,
        scaleY: 1,
        fontStyle: 'normal',
      });

      setLeftNumberNode(text);

      layer.add(text);
      const transformNumber = new Konva.Transformer({
        nodes: [text],
        flipEnabled: false,
        id: 'transformLeftNumber',
        anchorDragBoundFunc: function (oldPos, newPos, event) {
          // console.log(text.scale())
          // oldPos - is old absolute position of the anchor
          // newPos - is a new (possible) absolute position of the anchor based on pointer position
          // it is possible that anchor will have a different absolute position after this function
          // because every anchor has its own limits on position, based on resizing logic
          // do not snap rotating point
          let scale = text.scale();
          const postX = transformNumber.x();
          const postY = transformNumber.y();
          let getPostRect = transformNumber.getTransform().point({
            x: transformNumber.width() / 2,
            y: transformNumber.height() / 2,
          });

          let yRotate = getPostRect.y - postY;
          let xRotate = getPostRect.x - postX;
          if (transformNumber.getActiveAnchor() === 'rotater') {
            setPropLeftNumber({
              ...propLeftNumber,
              width: transformNumber.width(),
              height: transformNumber.height(),
              rotate: transformNumber.rotation(),
              x: transformNumber.x(),
              y: transformNumber.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const dist = Math.sqrt(
            Math.pow(newPos.x - oldPos.x, 2) + Math.pow(newPos.y - oldPos.y, 2)
          );

          // do not do any snapping with new absolute position (pointer position)
          // is too far away from old position

          if (dist > 10) {
            setPropLeftNumber({
              ...propLeftNumber,
              width: transformNumber.width(),
              height: transformNumber.height(),
              rotate: transformNumber.rotation(),
              x: transformNumber.x(),
              y: transformNumber.y(),
              xRotate: xRotate,
              yRotate: yRotate,
              size: text.fontSize(),
              scaleX: scale?.x ?? 0,
              scaleY: scale?.y ?? 0,
            });
            return newPos;
          }

          const closestX = Math.round(newPos.x / cellWidth) * cellWidth;
          const diffX = Math.abs(newPos.x - closestX);

          const closestY = Math.round(newPos.y / cellHeight) * cellHeight;
          const diffY = Math.abs(newPos.y - closestY);

          const snappedX = diffX < 10;
          const snappedY = diffY < 10;
          setPropLeftNumber({
            ...propLeftNumber,
            width: transformNumber.width(),
            height: transformNumber.height(),
            rotate: transformNumber.rotation(),
            x: transformNumber.x(),
            y: transformNumber.y(),
            xRotate: xRotate,
            yRotate: yRotate,
            size: text.fontSize(),
            scaleX: scale?.x ?? 0,
            scaleY: scale?.y ?? 0,
          });
          // a bit different snap strategies based on snap direction
          // we need to reuse old position for better UX
          if (snappedX && !snappedY) {
            return {
              x: closestX,
              y: oldPos.y,
            };
          } else if (snappedY && !snappedX) {
            return {
              x: oldPos.x,
              y: closestY,
            };
          } else if (snappedX && snappedY) {
            return {
              x: closestX,
              y: closestY,
            };
          }

          return newPos;
        },
      });
      layer.add(transformNumber);
      stage.add(layer);

      setStageLayer(stage);
      transformNumber.on('dragend', () => {
        const postX = transformNumber.x();
        const postY = transformNumber.y();
        let getPostRect = transformNumber.getTransform().point({
          x: transformNumber.width() / 2,
          y: transformNumber.height() / 2,
        });

        let yRotate = getPostRect.y - postY;
        let xRotate = getPostRect.x - postX;
        setActionLeftNumber(false);
        text.opacity(0);
        let scale = text.scale();
        setPropLeftNumber({
          ...propLeftNumber,
          width: transformNumber.width(),
          height: transformNumber.height(),
          rotate: transformNumber.rotation(),
          x: transformNumber.x(),
          y: transformNumber.y(),
          xRotate: xRotate,
          yRotate: yRotate,
          size: text.fontSize(),
          scaleX: scale?.x ?? 0,
          scaleY: scale?.y ?? 0,
        });
      });
      transformNumber.on('dragstart', function () {
        text.opacity(0.5);
        setActionLeftNumber(true);
      });
      transformNumber.on('transformstart', function () {
        text.opacity(0.5);
        setActionLeftNumber(true);
      });

      transformNumber.on('transformend', function () {
        text.opacity(0);
        setActionLeftNumber(false);
      });
    }
  };

  const modifyLeftNumber = () => {
    if (stageLayer && leftNumberNode) {
      leftNumberNode.text(leftNumber);
      leftNumberNode.fill(leftNumberColor === '' ? '#000000' : leftNumberColor);
      if (leftNumberShadow === 1) {
        leftNumberNode.strokeEnabled(true);
        leftNumberNode.stroke('#000000');
        leftNumberNode.strokeWidth(0.3);
      }
      if (leftNumberShadow === 0) {
        leftNumberNode.strokeEnabled(false);
      }
      leftNumberNode.moveToTop();
      leftNumberNode.fontStyle(leftNumberFont === 'bold' ? 'bold' : 'normal');
    }
  };

  const leftNumberStyle = () => {
    let xPost = propLeftNumber.x - maskImageBg.x;
    let yPost = propLeftNumber.y - maskImageBg.y;

    yPost = yPost - propLeftNumber.height / 4 - propLeftNumber.scaleY;
    let transX = 0;
    let transY = 0;
    if (propLeftNumber.rotate !== 0) {
      let rotate = calculatePositionRotateText(
        xPost,
        yPost,
        propLeftNumber.width,
        propLeftNumber.height,
        propLeftNumber.rotate,
        propLeftNumber.scaleX,
        propLeftNumber.scaleY
      );
      transX = rotate.x;
      transY = rotate.y;
    }

    return {
      transform: `scale(${propLeftNumber.scaleX}, ${propLeftNumber.scaleY}) rotate(${propLeftNumber.rotate}deg)  translate(${transX}%, ${transY}%)`,
      top: yPost,
      left: xPost,
      transformOrigin: 'top left',
      color: leftNumberColor === '' ? '#000000' : leftNumberColor,
      fontWeight: leftNumberFont === 'bold' ? 'bold' : 'normal',
    };
  };
  //left
  //number

  //ColorProduct
  useEffect(() => {
    if (colorProduct !== '') {
      let findColorProd = listColor.find((x) => x.colorCode === colorProduct);
      if (findColorProd) {
        setColorProductCustom({
          ...colorProductCustom,
          customValue: findColorProd.name,
        });
      }
    }
  }, [colorProduct]);
  //ColorProduct

  //logo
  useEffect(() => {
    if (leftLogo !== '') {
      let findColor = listColorLogo.find((x) => x.id === leftLogo);
      if (findColor) {
        let leftCustom: ICustom[] = [
          {
            customProperty: 'Left Logo',
            customValue: findColor.name,
          },
          {
            customProperty: 'Shadow',
            customValue: shadowLeftLogo === true ? 'True' : 'False',
          },
        ];
        setLeftLogoCustom(leftCustom);
      }
    }
    if (rightLogo !== '') {
      let findColor = listColorLogo.find((x) => x.id === rightLogo);
      if (findColor) {
        let rightColor: ICustom[] = [
          {
            customProperty: 'Left Logo',
            customValue: findColor.name,
          },
          {
            customProperty: 'Shadow',
            customValue: shadowLeftLogo === true ? 'True' : 'False',
          },
        ];
        setRightLogoCustom(rightColor);
      }
    }
  }, [leftLogo, shadowLeftLogo, rightLogo, shadowRightLogo]);

  //logo

  const textCondition = () => {
    let text = '';
    if (rightTextCustom.length > 0) {
      rightTextCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== rightTextCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    if (leftTextCustom.length > 0) {
      if (text !== '') {
        text = text + ' + ';
      }
      leftTextCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== leftTextCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    return text;
  };

  const numberCondition = () => {
    let text = '';
    if (rightNumberCustom.length > 0) {
      rightNumberCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== rightNumberCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    if (leftNumberCustom.length > 0) {
      if (text !== '') {
        text = text + ' + ';
      }
      leftNumberCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== leftNumberCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    return text;
  };

  const logoCondition = () => {
    let text = '';
    if (rightLogoCustom.length > 0) {
      rightLogoCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== rightLogoCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    if (leftLogoCustom.length > 0) {
      if (text !== '') {
        text = text + ' + ';
      }
      leftLogoCustom.map((x, index) => {
        text = text + ' ' + x.customValue;
        if (index !== leftLogoCustom.length - 1) {
          text = text + ' + ';
        }
      });
    }
    return text;
  };

  const imageCondition = () => {
    let text = '';
    if (customImages1) {
      text = text + customImages1.name;
    }
    if (customImages2) {
      if (text !== '') {
        text = text + ' + ';
      }
      text = text + customImages2.name;
    }
    if (customImages3) {
      if (text !== '') {
        text = text + ' + ';
      }
      text = text + customImages3.name;
    }
    if (customImages4) {
      if (text !== '') {
        text = text + ' + ';
      }
      text = text + customImages4.name;
    }
    return text;
  };

  return (
    <Fragment>
      <div className="">
        <Navigation />
        <div className="pt-[135px] w-full h-full px-8 lg2:px-16">
          <div className="mt-16">
            {managementSubCategoryState.subCategory?.name}/
            {managementProductState.productDetail?.is_custom === 0
              ? 'Classic'
              : 'Custom'}
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start align-top gap-16 py-16">
            <div className="w-full lg:w-1/2">
              <div className="w-full h-[50vh] lg:h-[25vw] lg2:h-[26vw] ">
                <ImageMagnifier
                  magnifieWidth={300}
                  magnifierHeight={300}
                  // width={"200px"}
                  src={imageSource.imageBase64}
                  className="h-full w-full cursor-zoom-in object-contain object-center"
                />
                {/* <img
                  src={imageSource.imageBase64}
                  alt="image-product"
                  className="h-full w-full  object-contain object-center"
                /> */}
              </div>
              <div className="inline-flex w-full gap-4 align-middle items-center mt-5 pb-5">
                {(managementProductState.productDetail?.productImage ?? []).map(
                  (prodImage: IProductImage) => (
                    <div
                      onClick={() => setImageSource(prodImage)}
                      className={`cursor-pointer ${
                        prodImage.id === imageSource.id
                          ? 'border border-solid rounded-lg p-1 border-black'
                          : ''
                      } `}
                    >
                      <img
                        src={prodImage.imageBase64}
                        alt="image-product"
                        className="max-w-none w-[50px] h-[50px] object-cover object-center"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="mt-10 lg:mt-0 text-[32px] font-bold mb-3">
                {managementProductState.productDetail?.name}
              </h1>
              <h2 className="text-[38px] font-bold mb-5">
                {managementGeneralState.country?.currency === 'EUR' && (
                  <NumericFormat
                    displayType="text"
                    value={managementProductState.productDetail?.price_eur}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country.currencyLogo}`}
                  />
                )}
                {managementGeneralState.country?.currency === 'CHF' && (
                  <NumericFormat
                    displayType="text"
                    value={managementProductState.productDetail?.price_chf}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country.currencyLogo}`}
                  />
                )}
                {managementGeneralState.country?.currency === 'USD' && (
                  <NumericFormat
                    displayType="text"
                    value={managementProductState.productDetail?.price_dolar}
                    thousandSeparator={','}
                    decimalSeparator="."
                    suffix={` ${managementGeneralState.country.currencyLogo}`}
                  />
                )}
              </h2>
              <div className="flex gap-3 mb-5">
                {sizeList.map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setSizeProduct(item.size)}
                    className={`text-center text-lg font-medium py-4 px-5 border border-solid border-black rounded-lg ${
                      sizeProduct === item.size ? 'bg-black text-[#b2edbd]' : ''
                    }`}
                  >
                    {item.size} - {item.desc}
                  </button>
                ))}
              </div>
              <div className="mb-4">Desctiion Product Here</div>
              <div className="flex gap-5 align-middle items-center my-6">
                <div className="text-[18px]">Quantity</div>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    onClick={() => setOrderQty(orderQty - 1)}
                    data-action="decrement"
                    className="h-full w-8 border-y border-l border-solid border-black rounded-l-lg cursor-pointer outline-none"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none text-center w-14 border-y border-solid border-black font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center  outline-none"
                    name="custom-input-number"
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value))}
                  />
                  <button
                    onClick={() => setOrderQty(orderQty + 1)}
                    data-action="increment"
                    className="h-full w-8 border-y border-r border-solid border-black rounded-r-lg cursor-pointer"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              {managementProductState.productDetail?.is_custom === 1 ? (
                <button
                  onClick={() => setModalCustom(true)}
                  className="w-full bg-[#e4cc00] text-[20px] font-bold py-3 rounded-lg mt-5"
                >
                  Customize
                </button>
              ) : (
                <button
                  onClick={() => addToCartBasic()}
                  className="w-full bg-[#e4cc00] text-[20px] font-bold py-3 rounded-lg mt-5"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Foooter />
      </div>

      <Dialog
        onClose={() => setModalCustom(false)}
        open={modalCustom}
        fullScreen={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>Customize</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setModalCustom(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <IoMdCloseCircleOutline />
        </IconButton>
        <DialogContent dividers sx={{ padding: 0 }}>
          <div className="flex flex-col lg:flex-row gap-5 w-full h-full">
            <div
              ref={divRef}
              className="w-[-webkit-fill-available] h-[-webkit-fill-available] relative"
            >
              <div
                className={`w-full h-full overflow-hidden absolute ${
                  customProcess === true ? '' : 'z-20'
                }`}
                id="container-customize"
              ></div>
              <div
                className="overflow-hidden"
                style={{
                  maskImage: `url(${imageBackground})`,
                  height: maskImageBg.height,
                  width: maskImageBg.width,
                  // top: 0,
                  // left: 0,
                  top: maskImageBg.y,
                  left: maskImageBg.x,
                  backgroundColor:
                    colorProduct !== '' ? colorProduct : '#FFFFFF',
                  maskSize: 'contain',
                  maskPosition: 'center center',
                  WebkitMaskSize: 'contain',
                  position: 'absolute',
                }}
              >
                {rightLogo !== 'white' && (
                  <img
                    src={logoRightBlack}
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: rightLogo === 'black' ? 30 : 10,
                    }}
                  />
                )}

                {rightLogo === 'white' && (
                  <img
                    src={
                      'https://cdnv2.mycustomizer.com/fearlesscustom/1536x864/65a150fbb6952daf9b8b5cfe.png'
                    }
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: 30,
                    }}
                  />
                )}

                {shadowRightLogo === true && (
                  <img
                    src={logoRightBlack}
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: rightLogo !== '' ? 25 : 15,
                      marginLeft: 4,
                      marginTop: 5,
                      opacity: 0.2,
                    }}
                  />
                )}

                {leftLogo !== 'white' && (
                  <img
                    src={logoLeftBlack}
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: leftLogo === 'black' ? 30 : 10,
                    }}
                  />
                )}

                {leftLogo === 'white' && (
                  <img
                    src={
                      'https://cdnv2.mycustomizer.com/fearlesscustom/1536x864/65a1510cc673855618a0137e.png'
                    }
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: 30,
                    }}
                  />
                )}

                {shadowLeftLogo === true && (
                  <img
                    src={logoLeftBlack}
                    style={{
                      position: 'absolute',
                      width: maskImageBg.width,
                      height: maskImageBg.height,
                      zIndex: leftLogo !== '' ? 25 : 15,
                      marginLeft: 4,
                      marginTop: 5,
                      opacity: 0.2,
                    }}
                  />
                )}

                {customImages1 && (
                  <img
                    src={customImages1.preview ?? ''}
                    alt="Cinque Terre"
                    className={`z-10 absolute ${
                      actionImage1 === false ? 'visible' : 'invisible'
                    }`}
                    style={imageStyle1()}
                  />
                )}

                {customImages2 && (
                  <img
                    src={customImages2.preview ?? ''}
                    alt="Cinque Terre"
                    className={`z-10 absolute ${
                      actionImage2 === false ? 'visible' : 'invisible'
                    }`}
                    style={imageStyle2()}
                  />
                )}

                {customImages3 && (
                  <img
                    src={customImages3.preview ?? ''}
                    alt="Cinque Terre"
                    className={`z-10 absolute ${
                      actionImage3 === false ? 'visible' : 'invisible'
                    }`}
                    style={imageStyle3()}
                  />
                )}

                {customImages4 && (
                  <img
                    src={customImages4.preview ?? ''}
                    alt="Cinque Terre"
                    className={`z-10 absolute ${
                      actionImage4 === false ? 'visible' : 'invisible'
                    }`}
                    style={imageStyle4()}
                  />
                )}

                {rightText !== '' && (
                  <div
                    style={rightTextStyle()}
                    className={`z-20 text-[24px] absolute ${
                      rightTextShadow === 1 ? 'text-stroke-border' : ''
                    } ${actionRightText === false ? 'visible' : 'invisible'}`}
                  >
                    {rightText}
                  </div>
                )}

                {leftText !== '' && (
                  <div
                    style={leftTextStyle()}
                    className={`z-20 text-[24px] absolute ${
                      leftTextShadow === 1 ? 'text-stroke-border' : ''
                    } ${actionLeftText === false ? 'visible' : 'invisible'}`}
                  >
                    {leftText}
                  </div>
                )}

                {rightNumber !== '' && (
                  <div
                    style={rightNumberStyle()}
                    className={`z-20 text-[24px] absolute ${
                      rightNumberShadow === 1 ? 'text-stroke-border' : ''
                    } ${actionRightNumber === false ? 'visible' : 'invisible'}`}
                  >
                    {rightNumber}
                  </div>
                )}

                {leftNumber !== '' && (
                  <div
                    style={leftNumberStyle()}
                    className={`z-20 text-[24px] absolute ${
                      leftNumberShadow === 1 ? 'text-stroke-border' : ''
                    } ${actionLeftNumber === false ? 'visible' : 'invisible'}`}
                  >
                    {leftNumber}
                  </div>
                )}
              </div>
              <div
                className="overflow-hidden absolute z-10"
                style={{
                  height: maskImageBg.height,
                  width: maskImageBg.width,
                  top: maskImageBg.y,
                  left: maskImageBg.x,
                }}
              >
                <img
                  src={imageFrame}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full h-full lg:w-[400px] shadow-left shadow-lg overflow-hidden z-40">
              <div
                className={`lg:block hidden w-full py-4 px-3 bg-[#ffce07] text-[20px] font-semibold leading-9`}
              >
                PRODUCT NAME
              </div>
              {expanded === '' && (
                <div
                  className="w-full overflow-y-auto"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    onClick={() => setExpanded('size')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Size
                  </div>
                  <div
                    onClick={() => setExpanded('image')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in flex align-middle items-center w-full`}
                  >
                    <div className="w-1/2">Add image</div>
                    <div className="w-1/2 text-right font-bold text-[#ffce07] limited-lines">
                      {imageCondition()}
                    </div>
                  </div>
                  <div
                    onClick={() => setExpanded('text')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in flex align-middle items-center w-full`}
                  >
                    <div className="w-1/2">Add text</div>
                    <div className="w-1/2 text-right font-bold text-[#ffce07] limited-lines">
                      {textCondition()}
                    </div>
                  </div>
                  <div
                    onClick={() => setExpanded('number')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in flex align-middle items-center w-full`}
                  >
                    <div className="w-1/2">Add number</div>
                    <div className="w-1/2 text-right font-bold text-[#ffce07] limited-lines">
                      {numberCondition()}
                    </div>
                  </div>
                  <div
                    onClick={() => setExpanded('logo')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in flex align-middle items-center w-full`}
                  >
                    <div className="w-1/2">Logo</div>
                    <div className="w-1/2 text-right font-bold text-[#ffce07] limited-lines">
                      {logoCondition()}
                    </div>
                  </div>
                  <div
                    onClick={() => setExpanded('background')}
                    className={`cursor-pointer py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in flex align-middle items-center w-full`}
                  >
                    <div className="w-1/2">Background</div>
                    <div className="w-1/2 text-right font-bold text-[#ffce07] limited-lines">
                      {colorProductCustom.customValue !== '' &&
                        colorProductCustom.customValue}
                    </div>
                  </div>
                </div>
              )}

              {/* size */}
              {expanded === 'size' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Size
                  </div>
                  <div
                    className="w-full mt-10 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={sizeProduct}
                        name="radio-buttons-group"
                        onChange={(e) => setSizeProduct(e.target.value)}
                      >
                        {sizeList.map((item) => (
                          <FormControlLabel
                            key={item.size}
                            value={item.size}
                            control={<Radio />}
                            label={`${item.size} - ${item.desc}`}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              )}
              {/* size */}

              {/* image */}
              {expanded === 'image' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Add image
                  </div>
                  <div
                    className="w-full mt-10 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <h1 className="text-[16px] font-bold mb-5">File -1</h1>
                    <div className="w-full px-3 mb-10">
                      <UploadImage
                        getImageProperty={handlesetPropImages1List}
                      />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                      {image1List.map((image1, index) => (
                        <div className="relative" key={index}>
                          <IoIosCloseCircle
                            onClick={() => deleteImage1(index)}
                            className="hover:text-red-800 text-[30px] absolute top-0 right-0 cursor-pointer"
                          />
                          <img
                            onClick={() => setCustomImages1(image1)}
                            src={image1.preview}
                            className={`mr-6 mt-6 object-cover object-left w-[60px] h-[60px] rounded-[30px] ${
                              image1.name === customImages1?.name
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <h1 className="text-[16px] font-bold mb-5">File -2</h1>
                    <div className="w-full px-3 mb-10">
                      <UploadImage
                        getImageProperty={handlesetPropImages2List}
                      />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                      {image2List.map((image2, index) => (
                        <div className="relative" key={index}>
                          <IoIosCloseCircle
                            onClick={() => deleteImage2(index)}
                            className="hover:text-red-800 text-[30px] absolute top-0 right-0 cursor-pointer"
                          />
                          <img
                            onClick={() => setCustomImages2(image2)}
                            src={image2.preview}
                            className={`mr-6 mt-6 object-cover object-left w-[60px] h-[60px] rounded-[30px] ${
                              image2.name === customImages2?.name
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <h1 className="text-[16px] font-bold mb-5">File -3</h1>
                    <div className="w-full px-3 mb-10">
                      <UploadImage
                        getImageProperty={handlesetPropImages3List}
                      />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                      {image3List.map((image3, index) => (
                        <div className="relative" key={index}>
                          <IoIosCloseCircle
                            onClick={() => deleteImage3(index)}
                            className="hover:text-red-800 text-[30px] absolute top-0 right-0 cursor-pointer"
                          />
                          <img
                            onClick={() => setCustomImages3(image3)}
                            src={image3.preview}
                            className={`mr-6 mt-6 object-cover object-left w-[60px] h-[60px] rounded-[30px] ${
                              image3.name === customImages3?.name
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <h1 className="text-[16px] font-bold mb-5">File -4</h1>
                    <div className="w-full px-3 mb-10">
                      <UploadImage
                        getImageProperty={handlesetPropImages4List}
                      />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                      {image4List.map((image4, index) => (
                        <div className="relative" key={index}>
                          <IoIosCloseCircle
                            onClick={() => deleteImage1(index)}
                            className="hover:text-red-800 text-[30px] absolute top-0 right-0 cursor-pointer"
                          />
                          <img
                            onClick={() => setCustomImages4(image4)}
                            src={image4.preview}
                            className={`mr-6 mt-6 object-cover object-left w-[60px] h-[60px] rounded-[30px] ${
                              image4.name === customImages4?.name
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* image */}

              {/* text */}
              {expanded === 'text' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Add Text
                  </div>
                  <div
                    className="w-full mt-5 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <div>
                      <h1 className="text-[16px] font-bold mb-5">Right Text</h1>
                      <div className="w-full">
                        <TextField
                          value={rightText}
                          onChange={(e) => setRightText(e.target.value)}
                          variant="outlined"
                          rows={4}
                          aria-label="Right Text"
                          multiline
                          fullWidth
                        />
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Right Text - Color
                      </h1>

                      <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        {listColor.map((color) => (
                          <div
                            onClick={() => setRightTextColor(color.colorCode)}
                            key={color.id}
                            className="text-center"
                          >
                            <div
                              className={`w-[60px] h-[60px] rounded-[30px] ${
                                color.colorCode === rightTextColor
                                  ? 'border-4 border-solid border-[#ffce07]'
                                  : 'border border-solid border-black'
                              }`}
                              style={{
                                backgroundColor: color.colorCode,
                              }}
                            ></div>
                            <h1 className="text-[12px] font-bold mt-3">
                              {t(color.name)}
                            </h1>
                          </div>
                        ))}
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Right Text - Shadow
                      </h1>
                      <div className="mb-5">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={rightTextShadow}
                            name="radio-buttons-group"
                            onChange={(e) =>
                              setRightTextShadow(Number(e.target.value))
                            }
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={'Yes'}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label={'No'}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <h1 className="text-[16px] font-bold my-5">
                        Right Text - Font
                      </h1>
                      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        <div
                          onClick={() => setRightTextFont('thin')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            rightTextFont === 'thin'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md`}
                        >
                          Thin
                        </div>
                        <div
                          onClick={() => setRightTextFont('bold')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            rightTextFont === 'bold'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md font-bold`}
                        >
                          Bold
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h1 className="text-[16px] font-bold mb-5">Left Text</h1>
                      <div className="w-full">
                        <TextField
                          value={leftText}
                          onChange={(e) => setLeftText(e.target.value)}
                          variant="outlined"
                          rows={4}
                          aria-label="Left Text"
                          multiline
                          fullWidth
                        />
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Left Text - Color
                      </h1>

                      <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        {listColor.map((color) => (
                          <div
                            onClick={() => setLeftTextColor(color.colorCode)}
                            key={color.id}
                            className="text-center"
                          >
                            <div
                              className={`w-[60px] h-[60px] rounded-[30px] ${
                                color.colorCode === leftTextColor
                                  ? 'border-4 border-solid border-[#ffce07]'
                                  : 'border border-solid border-black'
                              }`}
                              style={{
                                backgroundColor: color.colorCode,
                              }}
                            ></div>
                            <h1 className="text-[12px] font-bold mt-3">
                              {t(color.name)}
                            </h1>
                          </div>
                        ))}
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Left Text - Shadow
                      </h1>
                      <div className="mb-5">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={leftTextShadow}
                            name="radio-buttons-group"
                            onChange={(e) =>
                              setLeftTextShadow(Number(e.target.value))
                            }
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={'Yes'}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label={'No'}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <h1 className="text-[16px] font-bold my-5">
                        Left Text - Font
                      </h1>
                      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        <div
                          onClick={() => setLeftTextFont('thin')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            leftTextFont === 'thin'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md`}
                        >
                          Thin
                        </div>
                        <div
                          onClick={() => setLeftTextFont('bold')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            leftTextFont === 'bold'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md font-bold`}
                        >
                          Bold
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* text */}

              {/* number */}
              {expanded === 'number' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Add Number
                  </div>
                  <div
                    className="w-full mt-5 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <div>
                      <h1 className="text-[16px] font-bold mb-5">
                        Right Number
                      </h1>
                      <div className="w-full">
                        <TextField
                          value={rightNumber}
                          onChange={(e) => setRightNumber(e.target.value)}
                          variant="outlined"
                          rows={4}
                          aria-label="Right Number"
                          multiline
                          fullWidth
                        />
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Right Number - Color
                      </h1>

                      <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        {listColor.map((color) => (
                          <div
                            onClick={() => setRightNumberColor(color.colorCode)}
                            key={color.id}
                            className="text-center"
                          >
                            <div
                              className={`w-[60px] h-[60px] rounded-[30px] ${
                                color.colorCode === rightNumberColor
                                  ? 'border-4 border-solid border-[#ffce07]'
                                  : 'border border-solid border-black'
                              }`}
                              style={{
                                backgroundColor: color.colorCode,
                              }}
                            ></div>
                            <h1 className="text-[12px] font-bold mt-3">
                              {t(color.name)}
                            </h1>
                          </div>
                        ))}
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Right Number - Shadow
                      </h1>
                      <div className="mb-5">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={rightNumberShadow}
                            name="radio-buttons-group"
                            onChange={(e) =>
                              setRightNumberShadow(Number(e.target.value))
                            }
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={'Yes'}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label={'No'}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <h1 className="text-[16px] font-bold my-5">
                        Right Number - Font
                      </h1>
                      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        <div
                          onClick={() => setRightNumberFont('thin')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            rightNumberFont === 'thin'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md`}
                        >
                          Thin
                        </div>
                        <div
                          onClick={() => setRightNumberFont('bold')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            rightNumberFont === 'bold'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md font-bold`}
                        >
                          Bold
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h1 className="text-[16px] font-bold mb-5">
                        Left Number
                      </h1>
                      <div className="w-full">
                        <TextField
                          value={leftNumber}
                          onChange={(e) => setLeftNumber(e.target.value)}
                          variant="outlined"
                          rows={4}
                          aria-label="Left Number"
                          multiline
                          fullWidth
                        />
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Left Number - Color
                      </h1>

                      <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        {listColor.map((color) => (
                          <div
                            onClick={() => setLeftNumberColor(color.colorCode)}
                            key={color.id}
                            className="text-center"
                          >
                            <div
                              className={`w-[60px] h-[60px] rounded-[30px] ${
                                color.colorCode === leftNumberColor
                                  ? 'border-4 border-solid border-[#ffce07]'
                                  : 'border border-solid border-black'
                              }`}
                              style={{
                                backgroundColor: color.colorCode,
                              }}
                            ></div>
                            <h1 className="text-[12px] font-bold mt-3">
                              {t(color.name)}
                            </h1>
                          </div>
                        ))}
                      </div>

                      <h1 className="text-[16px] font-bold my-5">
                        Left Number - Shadow
                      </h1>
                      <div className="mb-5">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={leftNumberShadow}
                            name="radio-buttons-group"
                            onChange={(e) =>
                              setLeftNumberShadow(Number(e.target.value))
                            }
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={'Yes'}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label={'No'}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <h1 className="text-[16px] font-bold my-5">
                        Left Number - Font
                      </h1>
                      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 mb-5">
                        <div
                          onClick={() => setLeftNumberFont('thin')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            leftNumberFont === 'thin'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md`}
                        >
                          Thin
                        </div>
                        <div
                          onClick={() => setLeftNumberFont('bold')}
                          className={`cursor-pointer text-center w-5/12 p-3 ${
                            leftNumberFont === 'bold'
                              ? 'border-2 border-solid border-[#ffce07]'
                              : 'border border-solid border-[#e5e7eb]'
                          } rounded-md font-bold`}
                        >
                          Bold
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* number */}

              {/* logo */}
              {expanded === 'logo' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Logo
                  </div>
                  <div
                    className="w-full mt-5 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <h1 className="text-[16px] font-bold mb-5">Left Logo</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 my-5">
                      {listColorLogo.map((color) => (
                        <div
                          onClick={() => setLeftLogo(color.id)}
                          key={color.id}
                          className="text-center"
                        >
                          <div
                            className={`w-[60px] h-[60px] rounded-[30px] ${
                              color.id === leftLogo
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                            style={{
                              backgroundColor: color.colorCode,
                            }}
                          ></div>
                          <h1 className="text-[12px] font-bold mt-3">
                            {t(color.name)}
                          </h1>
                        </div>
                      ))}
                    </div>
                    <h1 className="text-[16px] font-bold mb-5">Right Logo</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-6 my-5">
                      {listColorLogo.map((color) => (
                        <div
                          onClick={() => setRightLogo(color.id)}
                          key={color.id}
                          className="text-center"
                        >
                          <div
                            className={`w-[60px] h-[60px] rounded-[30px] ${
                              color.id === rightLogo
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                            style={{
                              backgroundColor: color.colorCode,
                            }}
                          ></div>
                          <h1 className="text-[12px] font-bold mt-3">
                            {t(color.name)}
                          </h1>
                        </div>
                      ))}
                    </div>

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={shadowLeftLogo}
                          onChange={(e) => setShadowLeftLogo(e.target.checked)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label={'Left Shadow'}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={shadowRightLogo}
                          onChange={(e) => setShadowRightLogo(e.target.checked)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label={'Right Shadow'}
                    />
                  </div>
                </div>
              )}
              {/* logo */}

              {/* background */}
              {expanded === 'background' && (
                <div
                  className="w-full pb-10"
                  style={{
                    height: 'calc(100% - 131px)',
                  }}
                >
                  <div
                    className={`py-4 px-3 border-b-4 border-[#ffce07] text-[18px] font-medium transition duration-1000 ease-in`}
                  >
                    Background
                  </div>
                  <div
                    className="w-full mt-5 px-5 overflow-y-auto"
                    style={{
                      height: 'calc(100% - 63px)',
                    }}
                  >
                    <div className="flex flex-wrap gap-x-4 gap-y-6 mb-5">
                      {listColor.map((color) => (
                        <div
                          onClick={() => setColorProduct(color.colorCode)}
                          key={color.id}
                          className="text-center"
                        >
                          <div
                            className={`w-[60px] h-[60px] rounded-[30px] ${
                              color.colorCode === colorProduct
                                ? 'border-4 border-solid border-[#ffce07]'
                                : 'border border-solid border-black'
                            }`}
                            style={{
                              backgroundColor: color.colorCode,
                            }}
                          ></div>
                          <h1 className="text-[12px] font-bold mt-3">
                            {t(color.name)}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* background */}

              {expanded === '' ? (
                <button
                  onClick={() => addToCartCustom()}
                  className="z-50 relative h-[63px] flex align-middle justify-center items-center w-full py-3 text-[26px] bg-black text-center text-white"
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  onClick={() => setExpanded('')}
                  className="z-50 relative h-[63px] flex align-middle justify-center items-center w-full py-3 text-[30px] bg-black text-center text-white"
                >
                  <FaCheck />
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { listLanguage } from '@/translation/i18n';
import { useTranslation } from 'react-i18next';
import BlockUi from 'react-block-ui';
import { wrapper, store } from '@/stores';
import { Provider } from 'react-redux';
import useGeneral from '@/stores/hooks/general';
import useSubCategory from '@/stores/hooks/subCategory';
import '@/styles/globals.css';
import '@/styles/block-ui.css';
import '@/translation/i18n';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import localFont from 'next/font/local';
import useOrder from '@/stores/hooks/order';
import '@/styles/content.scss';
import Head from 'next/head';
const Agency = localFont({ src: './../assets/fonts/agencyfb_reg.ttf' });

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { t, i18n } = useTranslation();
  const { handleSetLanguage, handleSetCountry } = useGeneral();

  const { handleGetSubCategory, handleSetCategory } = useSubCategory();
  const { handleSetInitCartList } = useOrder();

  // const theme = createTheme({
  //   components: {
  //     MuiCheckbox: {
  //       styleOverrides: {
  //         root: {
  //           fontWeight: 'bold',
  //           fontFamily: 'agency', // Replace 'YourDesiredFont' with the actual font family
  //         },
  //       },
  //     },
  //   },
  // })
  useEffect(() => {
    const getSubCat = async (cat: string) => {
      await handleSetCategory(cat);
      await handleGetSubCategory(cat);
    };
    const setCountry = async (country: string) => {
      await handleSetCountry(country);
    };
    let currentLang = localStorage.getItem('language');
    let currentCountry = localStorage.getItem('country');

    let language = 'en';
    if (currentLang) {
      let currentLangValid = listLanguage.find((x) => x.id === currentLang);
      if (currentLangValid) {
        language = currentLangValid.id;
      }
      i18n.changeLanguage(language);
    } else {
      localStorage.setItem('language', 'en');
      i18n.changeLanguage(language);
    }
    handleSetLanguage(language);

    let cat = process.env.NEXT_PUBLIC_UUID_CATEGORY;
    getSubCat(cat ?? '');
    handleSetCountry(currentCountry ?? '');
    handleSetInitCartList();
    setLoading(false);
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <>
      <Head>
        <title>Shinpro.com</title>
      </Head>
      <Provider store={store}>
        <BlockUi
          tag="div"
          renderChildren={false}
          blocking={loading}
          loader={<div className="spinner"></div>}
        >
          <Component {...pageProps} />
        </BlockUi>
      </Provider>
    </>
    // </ThemeProvider>
  );
}

export default wrapper.withRedux(App);

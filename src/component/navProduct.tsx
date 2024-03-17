import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Drawer } from '@mui/material';
import React from 'react';
import { Availability, PriceRange } from './filter';
import CloseIcon from '@mui/icons-material/Close';

const NavProduct = ({
  filterSelect,
  handleChangeRange,
  priceRange,
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
  handleChangeRange: any;
  priceRange: Array<number>;
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const FilterCard = () => {
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
    return (
      <>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <div className="flex flex-col gap-3 px-4 h-[92vh]">
              <div>
                <div className="flex my-3 justify-between items-center">
                  <b className="text-[30px]">FILTERS</b>
                  <CloseIcon onClick={toggleDrawer(false)} />
                </div>
                <hr />
              </div>

              <Availability {...{ filterSelect }} />
              <hr />
              <PriceRange
                {...{ filterSelect, handleChangeRange, priceRange }}
              />
            </div>
            <div className="bottom-0  px-4">
              <Button
                sx={{
                  backgroundColor: '#f5dc00',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#cfbd1b',
                  },
                }}
                fullWidth
                variant="contained"
              >
                VIEW RESULT
              </Button>{' '}
            </div>
          </Box>
        </Drawer>
      </>
    );
  };
  return (
    <>
      <FilterCard />
      <div className="fixed lg:hidden md:hidden lg2:hidden w-full mt-[130px]  bg-white border  z-10">
        <div className="flex  justify-between w-full text-center">
          <b className="border p-2 w-1/2" onClick={toggleDrawer(true)}>
            Filters
          </b>
          <b className=" border p-2 w-1/2">
            Sort by <ExpandMore />
          </b>
        </div>
      </div>
    </>
  );
};

export default NavProduct;

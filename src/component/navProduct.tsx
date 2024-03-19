import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Drawer } from '@mui/material';
import React from 'react';
import { Availability, PriceRange } from './filter';
import CloseIcon from '@mui/icons-material/Close';

interface SortingRule {
  id: number;
  name: string;
  sortBy: 'name' | 'created_at' | 'price';
  sortOrder: 'asc' | 'desc';
}

const NavProduct = ({
  filterSelect,
  handleChangeRange,
  priceRange,
  handleCommitRange,
  shoryArray,
  shotBy,
  setshotBy,
  handleSubmitFilter,
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
  handleChangeRange: any;
  priceRange: Array<number>;
  handleCommitRange: any;
  shoryArray: any;
  shotBy: any;
  setshotBy: any;
  handleSubmitFilter: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openSort, setOpenSort] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
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
              {...{
                filterSelect,
                handleChangeRange,
                priceRange,
                handleCommitRange,
              }}
              mobile={true}
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
              onClick={() => {
                handleSubmitFilter();
                setOpen(false);
              }}
              fullWidth
              variant="contained"
            >
              VIEW RESULT
            </Button>{' '}
          </div>
        </Box>
      </Drawer>

      <Drawer
        anchor={'bottom'}
        open={openSort}
        onClose={() => setOpenSort(false)}
        className="drawer cursor-pointer"
      >
        <div className="p-5 text-center text-[20px] flex flex-col gap-3">
          <div className="text-[25px] pl-6 items-center justify-center font-bold">
            SORT BY
            <div className="float-end -mt-1" onClick={() => setOpenSort(false)}>
              <CloseIcon />
            </div>
          </div>
          <hr />

          {shoryArray.map((e: SortingRule) => {
            return (
              <>
                <div
                  className={`${
                    shotBy?.id === e.id && 'font-bold'
                  } cursor-pointer  `}
                  onClick={() => {
                    setOpenSort(false);
                    setshotBy(e);
                  }}
                >
                  {e.name}
                </div>
              </>
            );
          })}
        </div>
      </Drawer>
      <div className="fixed lg:hidden md:hidden lg2:hidden w-full mt-[130px]  bg-white border  z-10">
        <div className="flex  justify-between w-full text-center">
          <b className="border p-2 w-1/2" onClick={toggleDrawer(true)}>
            Filters
          </b>
          <b
            className=" border p-2 w-1/2"
            onClick={() => setOpenSort(!openSort)}
          >
            Sort by <ExpandMore />
          </b>
        </div>
      </div>
    </>
  );
};

export default NavProduct;

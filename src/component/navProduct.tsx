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
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
  handleChangeRange: any;
  priceRange: Array<number>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openSort, setOpenSort] = React.useState(false);
  const [shotBy, setshotBy] = React.useState<SortingRule>();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
            <PriceRange {...{ filterSelect, handleChangeRange, priceRange }} />
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

          {shoryArray.map((e) => {
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

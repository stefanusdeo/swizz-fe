import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Slider,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useGeneral from '@/stores/hooks/general';

const FilterList = ({
  name,
  id,
  filterSelect,
  children,
}: {
  id: number;
  name: string;
  filterSelect: any;
  children: any;
}) => {
  const handleSelect = () => {
    filterSelect.set((prevState: any) => {
      if (prevState.includes(id)) {
        return prevState.filter((item: any) => item !== id); // Hapus ID jika sudah ada
      } else {
        return [...prevState, id]; // Tambahkan ID jika belum ada
      }
    });
  };

  return (
    <div>
      <div
        className="flex cursor-pointer justify-between items-center"
        onClick={handleSelect}
      >
        <h3 className="cursor-pointer">{name}</h3>
        <div className="cursor-pointer">
          {filterSelect.val.includes(id) ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      <Collapse in={filterSelect.val.includes(id)} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
};

export const Availability = ({
  filterSelect,
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
}) => {
  return (
    <FilterList filterSelect={filterSelect} name="Availability" id={1}>
      <div className="flex flex-col px-5  justify-start">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="in"
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: 'black',
                  },
                }}
              />
            }
            label="In Stock"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="out"
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: 'black',
                  },
                }}
              />
            }
            label="Out of Stock"
          />
        </FormGroup>
      </div>
    </FilterList>
  );
};

export const PriceRange = ({
  filterSelect,
  priceRange,
  handleChangeRange,
  handleCommitRange,
  mobile,
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
  handleChangeRange: any;
  priceRange: Array<number>;
  handleCommitRange: any;
  mobile?: boolean;
}) => {
  const { managementGeneralState } = useGeneral();

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <FilterList filterSelect={filterSelect} name="Price" id={2}>
      <div className="flex  flex-col px-2 justify-start">
        <Slider
          getAriaLabel={() => 'Price range'}
          value={priceRange}
          sx={{
            color: 'black',
          }}
          // min={10}
          // max={20}
          size="medium"
          onChange={handleChangeRange}
          onChangeCommitted={!mobile && handleCommitRange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <div className="flex text-[18px]  w-full items-center justify-between my-5 gap-3">
          <div className=" border-2 w-[90px] p-2 flex justify-between">
            <div>{managementGeneralState.country?.currency}</div>
            <div>{priceRange[0]}</div>
          </div>
          <p>to</p>
          <div className=" border-2 w-[90px] p-2 flex justify-between">
            <div>{managementGeneralState.country?.currency}</div>
            <div>{priceRange[1]}</div>
          </div>
        </div>
      </div>
    </FilterList>
  );
};

const Filter = ({
  filterSelect,
  handleChangeRange,
  handleCommitRange,
  priceRange,
}: {
  filterSelect: {
    val: Array<number>;
    set: React.Dispatch<React.SetStateAction<number[]>>;
  };
  handleChangeRange: any;
  handleCommitRange: any;
  priceRange: Array<number>;
}) => {
  return (
    <div className="r  hidden md:flex lg:flex lg2:flex w-[33%] md:w-[50%] lg:w-[32%] lg2:w-[28%] text-[25px] p-4 px-10  flex-col gap-3">
      <b>FILTERS</b>
      <hr />
      <Availability filterSelect={filterSelect} />
      <hr />
      <PriceRange
        {...{ filterSelect, handleChangeRange, priceRange, handleCommitRange }}
      />
    </div>
  );
};

export default Filter;

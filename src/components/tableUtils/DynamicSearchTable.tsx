import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  // FormLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface SearchProps {
  searchText: string;
  setSearchText: (value: string) => void;
  searchBy: string;
  setSearchBy: (value: string) => void;
}

const SearchBy: React.FC<SearchProps> = ({
  searchText,
  setSearchText,
  searchBy,
  setSearchBy,
}) => {
  const handleSearchByChange = (event: SelectChangeEvent<string>) => {
    setSearchBy(event.target.value);
    setSearchText("");
  };

  return (
    <>
      <FormControl
        variant="outlined"
        size="small"
        style={{ marginRight: "10px", minWidth: "150px" }}
      >
        <InputLabel id="search-by-label-id">
          {t("applicationList.searchBy")}
        </InputLabel>
        <Select
          value={searchBy}
          onChange={handleSearchByChange}
          labelId="search-by-label-id"
          id="search-by"
          label="Search By"
        >
          <MenuItem value="email">{t("applicationList.email")}</MenuItem>
          <MenuItem value="firstName">
            {t("applicationList.firstName")}
          </MenuItem>
          <MenuItem value="lastName">{t("applicationList.lastName")}</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={t("searchBar.label")}
        variant="outlined"
        size="small"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearchByChange;
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBy;

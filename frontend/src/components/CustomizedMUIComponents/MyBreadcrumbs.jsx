import React from "react";
import PropTypes from "prop-types";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";

export default function MyBreadcrumbs({ pathnames }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>

      {pathnames.map((pathName, idx) => (
        <Link
          underline="hover"
          color="text.primary"
          href={pathName}
          aria-current="page"
          key={idx}
        >
          {CapitalizeFirstLetter(pathName)}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
MyBreadcrumbs.propTypes = {
  pathnames: PropTypes.array,
};

import { Fragment } from "react";

import MainHeader from "./MainHeader";
import Image from "./Image";

const Header = (props) => {
  return (
    <Fragment>
      <MainHeader onShow={props.onShowCart} />
      <Image />
    </Fragment>
  );
};

export default Header;

import Header from "./Header";
import React from "react";

const headerWrapper = (Component) => {
    return <>
        <Header/>
        <Component/>
    </>
}
export default headerWrapper
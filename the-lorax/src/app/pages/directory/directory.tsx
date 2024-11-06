

import { useEffect, useRef, useState } from "react";
import './directory.css';
import Header from '../../components/header'
import Filter from './components/filter'
import DisplayFilter from "./components/displayFilter";


export default function Directory() {

    return (
        <div className="directory">
            <Header/>
            <div className="directory-body">
                <DisplayFilter />
            </div>
        </div>
    )
}

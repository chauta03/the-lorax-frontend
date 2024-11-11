

import { useEffect, useRef, useState } from "react";
import './directory.css';
import Header from '../../components/header'
import Filter from './components/sort'
import DisplayFilter from "./components/displaySort";


export default function Directory() {

    return (
        <div className="directory">
            <Header />
            <div className="directory-body">
                <DisplayFilter />
            </div>
        </div>
    )
}

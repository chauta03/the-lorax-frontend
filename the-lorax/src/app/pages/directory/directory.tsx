

import { useEffect, useRef, useState } from "react";
import './directory.css';
import Header from '../../components/header'
import Filter from './components/sort'
import Display from "./components/display";


export default function Directory() {

    return (
        <div className="directory">
            <Header />
            <div className="directory-body">
                <Display />
            </div>
        </div>
    )
}

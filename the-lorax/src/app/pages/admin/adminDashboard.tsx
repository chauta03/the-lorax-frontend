

import { useEffect, useRef, useState } from "react";
import './adminDashboard.css';
import Header from '../../components/header'
import DisplayFilter from "./components/adminFilter";


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

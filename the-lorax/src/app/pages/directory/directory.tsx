

import { useEffect, useRef, useState } from "react";
import './directory.css';
import Header from '../../components/header'
import Filter from './components/filter'


export default function Directory() {

    return (
        <div className="directory">
            <Header/>
            <Filter/>
        </div>
    )
}

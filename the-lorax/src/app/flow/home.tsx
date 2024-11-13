import { useEffect, useRef, useState } from "react";
import BackgroundComponent from "../pages/landing/landing_page";
import ActionButton from "../pages/action/action_page";
import Directory from "../pages/directory/directory";


export default function Home() {

    return (
        <div className="home">
            <BackgroundComponent/>
            <ActionButton/>
            <Directory/>
        </div>
    )
}

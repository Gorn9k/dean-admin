import styles from './Preloader.module.css';
import {CSSProperties, FC} from "react";

type PreloaderType = {
    additionalSvgStyle?: CSSProperties
}

const Preloader: FC<PreloaderType> = ({additionalSvgStyle}) => {

    return (
        <div className={styles.loader} id={'preloaderContainer'}>
            <svg id={'preloaderSvg'} style={additionalSvgStyle} viewBox="-2000 -1000 4000 2000">
                <path id="preloaderPath" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"></path>
                <use id={'preloaderUse'} xlinkHref="#preloaderPath" strokeDasharray="1570 5143" strokeDashoffset="6713px"></use>
            </svg>
        </div>
    )
}

export default Preloader;

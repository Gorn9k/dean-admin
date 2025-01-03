import {FC, ReactNode, useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import styles from "../modals/StudentInfoModalContainer/StudentInfoModalContainer.module.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";

type ImgType = {
    url?: string | null
    children?: ReactNode
}

export const Image: FC<ImgType> = ({url, children}) => {

    const [isLoadingImage, setIsLoadingImage] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setIsLoadingImage(true)
    }, [dispatch, url]);

    return <div id={'imageContainer'} className={styles.picture}>
        {isLoadingImage && <Preloader/>}
        <img src={url ? `${url.startsWith('blob') ? '' : '/dean'}${url}` : undefined}
             alt={'Фото студента'}
             onError={() => console.error('Ошибка загрузки изображения')}
             onLoad={() => setIsLoadingImage(false)}
             style={!isLoadingImage ? undefined : {visibility: 'hidden'}}
             id={'image'}
        />
        {children}
    </div>
}
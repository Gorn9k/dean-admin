import React from "react";
import Select, {MultiValue, Props, SingleValue} from "react-select";
import Preloader from "../../Preloader/Preloader";
import {Option} from "../../../redux/selectorsSlice";

export function CustomSelect<IsMulti extends boolean>(props: Props<IsMulti extends true ? MultiValue<Option> : SingleValue<Option>, IsMulti>) {
    return <Select {...props}
                   isClearable={props.isClearable ?? true}
                   styles={props.styles ?? {
                       menu: (base: any) => ({
                           ...base,
                           zIndex: 3
                       }),
                       container: (base: any) => ({
                           ...base,
                           width: '260px'
                       })
                   }}
                   noOptionsMessage={props.noOptionsMessage ?? (() => 'Нет данных')}
                   components={props.components ?? ({
                       LoadingIndicator: () => null,
                       LoadingMessage: () => <Preloader additionalSvgStyle={{'maxWidth': '5em'}}/>
                   })}/>
}
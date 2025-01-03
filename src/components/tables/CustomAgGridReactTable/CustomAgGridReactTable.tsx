import React, {FC, useCallback} from "react";
import {GridOptions, RowClassParams} from "ag-grid-community";
import Preloader from "../../Preloader/Preloader";
import {AgGridReact} from "ag-grid-react";

export const CustomAgGridReactTable: FC<GridOptions> = (props) => {

    const getRowStyle = useCallback((p: RowClassParams) => {
        if (p.data && Object.entries(p.data).some(value => value[0] === 'status' && value[1] !== 'ACTIVE'))
            return {backgroundColor: 'rgb(255, 132, 132)'}
        return undefined
    }, [])

    return <AgGridReact
        {...props}
        rowData={props.rowData}
        columnDefs={props.columnDefs}
        defaultColDef={props.defaultColDef ?? {
            flex: 1
        }}
        animateRows={props.animateRows ?? true}
        noRowsOverlayComponent={props.noRowsOverlayComponent ?? (() => 'Нет данных')}
        loadingOverlayComponent={props.loadingOverlayComponent ?? (() => <Preloader/>)}
        getRowStyle={props.getRowStyle ?? (params => getRowStyle(params))}
    />
}
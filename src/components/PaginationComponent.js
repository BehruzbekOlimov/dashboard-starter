import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import axios from "axios";
import {SERVER_URL} from "../utills/constants";
import {Pagination} from "@mui/material";

const PaginationComponent = ({show = false, refresh, setData, setLoading, pageable}) => {
    console.log(pageable)
    const [page, setPage] = useState((pageable && pageable.page)?pageable.page:0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState((pageable && pageable.size)?pageable.size:20);
    const [orderBy, setOrderBy] = useState((pageable && pageable.sort && pageable.sort.options)?pageable.sort.options[0].value:"id");
    const [desc, setDesc] = useState((pageable && pageable.sort)?pageable.sort.desc:false);
    useEffect(() => {
        if (pageable) {
            setLoading(true)
            axios.get(`${SERVER_URL}${pageable.fetchLink}?page=${page}&size=${size}&orderBy=${orderBy}&desc=${desc}`).then(r => {
                setData(r.data.data)
                setTotalElements(r.data.totalElements)
            }).catch(() => {

            })
        }
    }, [pageable, refresh, page, size]);
    return (
        <>
            {show && <>
                <Pagination count={11} defaultPage={6} boundaryCount={2} />
            </>}
            <Outlet/>
            {show && <p>&&&</p>}
        </>
    );
};

export default PaginationComponent;

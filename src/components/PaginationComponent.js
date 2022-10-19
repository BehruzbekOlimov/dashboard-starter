import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {Pagination, TablePagination} from "@mui/material";
import axiosClient from "../utills/axiosClient";

const PaginationComponent = ({show = false, loading, refresh, setData, setLoading, pageable}) => {
    const [page, setPage] = useState((pageable && pageable.page) ? pageable.page : 0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState((pageable && pageable.size) ? pageable.size : 25);
    const [orderBy, setOrderBy] = useState((pageable && pageable.sort && pageable.sort.options) ? pageable.sort.options[0].value : "id");
    const [desc, setDesc] = useState((pageable && pageable.sort) ? pageable.sort.desc : false);

    useEffect(() => {
        if (pageable) {
            setPage((pageable.page) ? pageable.page : 0)
            setSize((pageable.size) ? pageable.size : 20)
            setOrderBy((pageable.sort && pageable.sort.options) ? pageable.sort.options[0].value:"id")
            setDesc(pageable.sort?pageable.sort.desc:false)
            setLoading(true)
            axiosClient.get(`${pageable.fetchLink}?page=${page}&size=${size}&orderBy=${orderBy}&desc=${desc}`).then(r => {
                setData(r.data.data)
                if (size<r.data.totalElements)
                    setSize(r.data.totalElements)
                setTotalElements(r.data.totalElements)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    }, [pageable]);

    useEffect(() => {
        if (pageable) {
            setLoading(true)
            axiosClient.get(`${pageable.fetchLink}?page=${page}&size=${size}&orderBy=${orderBy}&desc=${desc}`).then(r => {
                setData(r.data.data)
                if (size<r.data.totalElements)
                    setSize(r.data.totalElements)
                setTotalElements(r.data.totalElements)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    }, [refresh, page, size]);

    return (
        <>
            {show && <>
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={(e, val) => {
                        setPage(val)
                    }
                    }
                    rowsPerPageOptions={[5,10,20,25,50,100,150,200]}
                    rowsPerPage={size}
                    onRowsPerPageChange={e => {
                        setSize(e.target.value)
                    }}
                />

            </>}
            <Outlet/>
            {(show || (totalElements/size)>1) && <>
                <Pagination variant="text"  color="secondary" shape="rounded" disabled={loading} count={Math.ceil(totalElements/size)} defaultPage={page+1} boundaryCount={3} onChange={(e,val) => {
                setPage(val)
                }
                }/>
            </>}
        </>
    );
};

export default PaginationComponent;

import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardBody, CardHeader } from "reactstrap";
import { Table, Layout, DatePicker, Col, Select } from 'antd';
import Http from '../../../security/Http';
import { errorResponse, statusList, currencyList } from "../../../helpers/response";
import url from "../../../../Development.json";
import dayjs from 'dayjs'

const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [status, setStatus] = useState('');
    const [currency, setCurrency] = useState('');
    const { Content } = Layout;
    let currentFilterText = '';


    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    const [dates, setDates] = useState()
    const [dateValue, setDateValue] = useState(null);

    const onChangeDateFilter = (e) => {
        if (e) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateValue, status, currency]);

    //  Start here crud related function

    const getData = async (page = 1, perPage = 10, sortField = 'createdAt', sortDirection = 'desc') => {
        let options = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        if (dateValue) {
            let to_date = dateValue[1]._d
            options = options + `&from_date=${dayjs(dateValue[0]._d).format('YYYY-MM-DD')}&to_date=${dayjs(to_date).format('YYYY-MM-DD')}`
        }
        if (status) {
            options = options + `&status=${status}`
        }
        if (currency) {
            options = options + `&currency=${currency}`
        }
        console.log(options)
        await Http.get(process.env.REACT_APP_BASE_URL + url.invoice_get + options)
            .then((response) => {
                setLoading(false);
                setDataTableData(response.data.data.docs);
                setTotalRows(response.data.data.total);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }

    const columnsAnt = [
        {
            title: 'Reference',
            dataIndex: 'reference',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            render: (text, row) => {
                return (
                    statusList(row.status)
                )
            },
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoice_date',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Invoice Amount',
            dataIndex: 'invoice_amount',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Amount Due',
            dataIndex: 'amount_due',
            sorter: true,
            sortDirections: ["ascend", "descend", "ascend"],
        },
        // {
        //     title: 'currencysss',
        //     dataIndex: 'currency',
        //     sorter: true,
        //     render: (text, row) => {
        //         return (
        //             currencyList(row.currency)
        //         );
        //     },
        //     filters: [
        //         {
        //             text: 'GBP',
        //             value: "1",
        //         },
        //         {
        //             text: 'AUD',
        //             value: "2",
        //         },
        //         {
        //             text: 'INR',
        //             value: "3",
        //         },
        //     ],
        //     filterMode: 'tree',
        //     filterSearch: true,
        //     onFilter: (value, record) => record.currency === value ?? record.currency,
        //     sortDirections: ["ascend", "descend", "ascend"],
        // },

        {
            title: 'Currency',
            dataIndex: 'currency',
            sorter: true,
            render: (text, row) => {
                return (
                    currencyList(row.currency)
                )
            },
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, row) => {
                return (
                    <div className='action-btn my-theme-color-button'>
                        --
                    </div>
                );
            },
        },
    ];

    const filterComponentHandleChange = (event) => {
        currentFilterText = event.target.value;
        setFilterText(currentFilterText);
        getData();
    }

    const onChange = (pagination, filters, sorter, extra) => {
        getData(pagination.current, pagination.pageSize, sorter.field, sorter.order)
    }

    //  End here crud related function

    const handleChangeStatus = async (value) => {
        setStatus(value);
    };

    const handleChangeCurrency = async (value) => {
        setCurrency(value);
    };

    return (
        <Fragment>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}>

                <div className="page-card-view">
                    <Card>
                        <CardHeader className="card-header-part">
                            <h5>Invoice List</h5>
                            <div className="card-header-action ml-3">
                                <Col span={12}>
                                    <div className="d-flex">
                                        <Col span={12} lg={12} className="d-flex align-center me-2">
                                            <Select
                                                value={(status) ? status : 'Select Status'}
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={handleChangeStatus}
                                                options={[
                                                    {
                                                        value: 1,
                                                        label: 'Not scheduled',
                                                    },

                                                    {
                                                        value: 2,
                                                        label: 'Pending submission',
                                                    },
                                                    {
                                                        value: 3,
                                                        label: 'Pending customer approval',
                                                    },
                                                    {
                                                        value: 4,
                                                        label: 'Collating',
                                                    },
                                                    {
                                                        value: 5,
                                                        label: 'Paid Out',
                                                    },
                                                    {
                                                        value: 6,
                                                        label: 'Cancelled',
                                                    }, {
                                                        value: 7,
                                                        label: 'Installment n of paid',
                                                    },
                                                    {
                                                        value: 8,
                                                        label: 'Installment schedule cancelled',
                                                    },
                                                    {
                                                        value: 9,
                                                        label: 'Installment creation failed',
                                                    },
                                                    {
                                                        value: 10,
                                                        label: 'Failed',
                                                    },
                                                    {
                                                        value: 11,
                                                        label: 'Need attention',
                                                    },
                                                ]}
                                                bordered={false}
                                                className='form-control p-0 m-1'
                                            />
                                        </Col>
                                        <Col span={12} lg={12} className="d-flex align-center">
                                            <Select
                                                value={(currency) ? currency : 'Select Currency'}
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={handleChangeCurrency}
                                                options={[
                                                    {
                                                        value: 1,
                                                        label: 'GBP',
                                                    },
                                                    {
                                                        value: 2,
                                                        label: 'AUD',
                                                    },
                                                    {
                                                        value: 3,
                                                        label: 'INR',
                                                    },
                                                ]}
                                                bordered={false}
                                                className='form-control p-0 m-1'
                                            />
                                        </Col>
                                        <Col span={12} lg={12} className="d-flex align-center">
                                            <RangePicker
                                                value={dates || dateValue}
                                                onCalendarChange={(val) => setDates(val)}
                                                onChange={(val) => setDateValue(val)}
                                                format={dateFormat}
                                                onOpenChange={(e) => onChangeDateFilter(e)}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                                <div className="d-flex justify-content-end">
                                    <div className="form-group mb-0 mr-3">
                                        <input type="text"
                                            className="form-control"
                                            id="search"
                                            placeholder="Search"
                                            value={filterText}
                                            onChange={(event) => filterComponentHandleChange(event)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>

                            <div className="table-part table-style-1">
                                <div className="table-responsive">
                                    <Table
                                        columns={columnsAnt}
                                        dataSource={dataTableData}
                                        rowKey={"_id"}
                                        loading={loading}
                                        pagination={{
                                            total: totalRows,
                                            showSizeChanger: true
                                        }}
                                        onChange={onChange}
                                        exportableProps={{ showColumnPicker: true }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Content>
        </Fragment >
    );
}

export default Index;

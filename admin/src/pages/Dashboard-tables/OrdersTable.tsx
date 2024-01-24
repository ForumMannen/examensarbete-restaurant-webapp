import { useEffect } from "react";
import { Table, Tag } from 'antd';
import { IOrder, useOrdersData } from "../../hooks/fetchOrdersData";
import type { ColumnsType } from "antd/es/table";

const OrdersTable = () => {
    const { orderData } = useOrdersData();

    useEffect(() => {
        // console.log("OrdersTable component: ", orderData);
    }, [orderData]);

    if(!orderData){
        return <p>Loading...</p>
    }

    const columns: ColumnsType<IOrder> = [
        {
          title: 'Kund',
          dataIndex: 'customer',
          key: 'customer',
          render: (_, { customer }) => {
            console.log("Customer", customer);
            
            return <span>{customer && customer.length > 0 && customer[0].name}</span>
          }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_, { customer }) => {
              console.log("Customer", customer);
              
              return <span>{customer && customer.length > 0 && customer[0].email}</span>
            }
          },
        {
          title: 'Produkter',
          dataIndex: 'orderItems',
          key: 'orderItems',
          render: (_, { orderItems }) => (
                <>
                    {orderItems.map((orderItem, index) => (
                        <Tag key={index}>
                            {orderItem.product}
                        </Tag>
                    ))}
            </>
          )
        },
        {
          title: 'Betalning',
          key: 'paymentStatus',
          dataIndex: 'paymentStatus',
          render: (_, { paymentStatus }) => {
            let tagColor = '';

            if (paymentStatus === 'paid'){
                tagColor = 'green';
            } else if (paymentStatus === 'pending'){
                tagColor = 'orange';
            } else {
                tagColor = 'red';
            }

            return (
                <Tag color={tagColor}>
                    {paymentStatus}
                 </Tag>
            )
          }
        },
        {
          title: 'Skapad',
          dataIndex: 'createdAt',
          key: 'createdAd',
          render: (_, { createdAt }) => {
                const formattedDate = createdAt.toString().replace('T', ' ').split('.')[0];
                return <span>{formattedDate}</span>
            }
        },
        {
            title: 'Totalpris',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, { totalPrice }) => {
                return <span>{totalPrice} SEK</span>
            }
        },
        // {
        //   title: 'Uppdatera / Radera recept',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="small">
        //       <a><EditOutlined /></a>
        //       <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        //     </Space>
        //   ),
        // },
      ];

      return <Table rowKey="_id" columns={columns} dataSource={orderData}/>;
}

export default OrdersTable;
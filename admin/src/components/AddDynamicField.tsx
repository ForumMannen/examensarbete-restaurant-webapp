import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

interface AddDynamicFieldProps {
    names: string[];
    onAddField: (value: string, index: number) => void;
    onRemoveField: (name: string) => void;
    onAddFieldClick?: () => void;
    label: string;
    placeholder: string;
}

const AddDynamicField: React.FC<AddDynamicFieldProps> = ({ names, onAddField, onRemoveField, onAddFieldClick, label, placeholder }) => {
  return (
    <div>
        {names.map((name, index) => (
            <Form.Item
            key={index}
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? label : ''}
            required={false}
            >
                <Input 
                value={name}
                onChange={(e) => onAddField(e.target.value, index)}
                placeholder={placeholder}
                style={{ width: '60%'}} />
                {names.length > 1 ? (
                    <MinusCircleOutlined 
                    className='dynamic-delete-button'
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        onRemoveField(name)
                    }} 
                    />
                ) : null}
            </Form.Item>
        ))}
        <Form.Item>
            <Button
            type='dashed' 
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                if(onAddFieldClick){
                    onAddFieldClick();
                }
            }}
            // onClick={() => onAddField('', names.length)}
            style={{ width: '60%' }} 
            icon={<PlusOutlined />}> 
                Lägg till {label.toLowerCase()}
            </Button>
        </Form.Item>
    </div>
  );
};

export default AddDynamicField;
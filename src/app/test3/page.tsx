// app/test3/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Radio, Button, Table, Space, Pagination, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addPerson, updatePerson, deletePersons, Person } from '../../store/personSlice';
import styles from './page.module.scss';
import dayjs from 'dayjs';

const { Option } = Select;

export default function Test3() {
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [mounted, setMounted] = useState(false); // เพิ่มบรรทัดนี้
    const pageSize = 5;

    const persons = useSelector((state: RootState) => state.person.data);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const onFinish = (values: any) => {
        const personData: Person = {
            id: editingId || Date.now().toString(),
            title: values.title,
            firstname: values.firstname,
            lastname: values.lastname,
            birthday: values.birthday?.format('DD/MM/YYYY') || '',
            nationality: values.nationality,
            citizenID: values.citizenID?.replace(/-/g, '') || '',
            gender: values.gender,
            mobilePhone: values.mobilePhone,
            passportNo: values.passportNo || '',
            expectedSalary: values.expectedSalary,
        };

        if (editingId) {
            dispatch(updatePerson(personData));
            message.success('แก้ไขข้อมูลสำเร็จ');
            setEditingId(null);
        } else {
            dispatch(addPerson(personData));
            message.success('เพิ่มข้อมูลสำเร็จ');
        }
        form.resetFields();
    };

    const onEdit = (record: Person) => {
        form.setFieldsValue({
            ...record,
            birthday: record.birthday ? dayjs(record.birthday, 'DD/MM/YYYY') : null,
            citizenID: record.citizenID.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5'),
        });
        setEditingId(record.id);
    };

    const onDelete = (id: string) => {
        dispatch(deletePersons([id]));
        message.success('ลบข้อมูลสำเร็จ');
    };

    const onDeleteSelected = () => {
        if (selectedRowKeys.length === 0) return;
        dispatch(deletePersons(selectedRowKeys));
        setSelectedRowKeys([]);
        message.success('ลบข้อมูลที่เลือกสำเร็จ');
    };

    const columns = [
        { title: 'Name', render: (_: any, record: Person) => `${record.title} ${record.firstname} ${record.lastname}` },
        { title: 'Gender', dataIndex: 'gender' },
        { title: 'Mobile Phone', dataIndex: 'mobilePhone' },
        { title: 'Nationality', dataIndex: 'nationality' },
        {
            title: 'Manage',
            render: (_: any, record: Person) => (
                <Space>
                    <Button size="small" onClick={() => onEdit(record)} icon={<EditOutlined />}>Edit</Button>
                    <Button size="small" danger onClick={() => onDelete(record.id)} icon={<DeleteOutlined />}>Delete</Button>
                </Space>
            ),
        },
    ];

    const dataSource = persons
        .slice((page - 1) * pageSize, page * pageSize)
        .map(p => ({ ...p, key: p.id }));

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Form & Table</h1>

            <div className={styles.formCard}>
                <Form form={form} layout="vertical" onFinish={onFinish} className={styles.formGrid}>

                    {/* แถว 1: Title + Firstname + Lastname */}
                    <div className={styles.row}>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Select placeholder="คำนำหน้า" style={{ width: '100%' }}>
                                <Option value="นาย">นาย</Option>
                                <Option value="นาง">นาง</Option>
                                <Option value="นางสาว">นางสาว</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]}>
                            <Input placeholder="ชื่อ" />
                        </Form.Item>

                        <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]}>
                            <Input placeholder="นามสกุล" />
                        </Form.Item>
                    </div>

                    {/* แถว 2 */}
                    <div className={styles.row}>
                        <Form.Item name="birthday" label="Birthday">
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
                            <Select placeholder="สัญชาติ">
                                <Option value="Thai">ไทย</Option>
                                <Option value="อื่นๆ">อื่นๆ</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    {/* แถว 3: Citizen ID ช่องเดียวเต็ม */}
                    <div className={styles.row}>
                        <Form.Item name="citizenID" label="Citizen ID" className={styles.fullWidth}>
                            <Input placeholder="เลขบัตรประชาชน 13 หลัก" maxLength={13} />
                        </Form.Item>
                    </div>

                    {/* แถว 4: Gender */}
                    <div className={styles.row}>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]} className={styles.fullWidth}>
                            <Radio.Group>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Unsex">Unsex</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    {/* แถว 5 */}
                    <div className={styles.row}>
                        <Form.Item name="mobilePhone" label="Mobile Phone" rules={[{ required: true }]}>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input defaultValue="+66" disabled style={{ width: 80 }} />
                                <Input maxLength={9} placeholder="812345678" />
                            </Space.Compact>
                        </Form.Item>

                        <Form.Item name="passportNo" label="Passport No">
                            <Input />
                        </Form.Item>
                    </div>

                    {/* แถว 6 */}
                    <div className={styles.row}>
                        <Form.Item name="expectedSalary" label="Expected Salary" rules={[{ required: true }]} className={styles.fullWidth}>
                            <Input placeholder="บาท" />
                        </Form.Item>
                    </div>

                    {/* ปุ่ม */}
                    <Form.Item className={styles.buttonRow}>
                        <Space size={24}>
                            <Button size="large" onClick={() => { form.resetFields(); setEditingId(null); }}>
                                Reset
                            </Button>
                            <Button size="large" type="primary" htmlType="submit">
                                {editingId ? 'Update' : 'Submit'}
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </div>

            <div className={styles.tableSection}>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={onDeleteSelected} danger disabled={selectedRowKeys.length === 0}>
                        Delete Selected
                    </Button>
                </Space>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (keys: any) => setSelectedRowKeys(keys as string[]),
                    }}
                />

                <Pagination
                    current={page}
                    total={persons.length}
                    pageSize={pageSize}
                    onChange={setPage}
                    style={{ marginTop: 20, textAlign: 'center' }}
                />
            </div>
        </div>
    );
}
// app/components/LanguageSwitcher.tsx
'use client';

import { Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'th',
    label: 'ไทย',
    icon: <span style={{ marginRight: 8 }}>🇹🇭</span>,
  },
  {
    key: 'en',
    label: 'English',
    icon: <span style={{ marginRight: 8 }}>🇺🇸</span>,
  },
];

export default function LanguageSwitcher() {
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <GlobalOutlined style={{ fontSize: 20 }} />
          <span style={{ fontSize: '16px', fontWeight: 500 }}>TH</span>
        </Space>
      </a>
    </Dropdown>
  );
}
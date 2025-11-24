// app/test1/page.tsx
'use client';

import { useState } from 'react';
import { Card, Button, Space } from 'antd';
import {
//   CaretLeftFilled,
//   CaretRightFilled,
//   ArrowUpOutlined,
//   ArrowDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import styles from './page.module.scss';

const shapes = [
  { id: 1, name: 'square', label: 'สี่เหลี่ยมจัตุรัส' },
  { id: 2, name: 'circle', label: 'วงกลม' },
  { id: 3, name: 'ellipse', label: 'วงรี' },
  { id: 4, name: 'trapezoid', label: 'สี่เหลี่ยมคางหมู' },
  { id: 5, name: 'rectangle', label: 'สี่เหลี่ยมผืนผ้า' },
  { id: 6, name: 'parallelogram', label: 'สี่เหลี่ยมด้านขนาน' },
];

export default function Test1() {
  // ลำดับเริ่มต้น 1 2 3 | 4 5 6
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]); // index ใน shapes

  // ฟังก์ชันเลื่อนซ้าย (Move Shape Left)
  const moveLeft = () => {
    setOrder(prev => {
      const newOrder = [...prev];
      const first = newOrder.shift()!;
      newOrder.push(first);
      return newOrder;
    });
  };

  // ฟังก์ชันเลื่อนขวา (Move Shape Right)
  const moveRight = () => {
    setOrder(prev => {
      const newOrder = [...prev];
      const last = newOrder.pop()!;
      newOrder.unshift(last);
      return newOrder;
    });
  };

  // สลับแถวบน-ล่าง (Move Position)
  const swapRows = () => {
    setOrder(prev => {
      const top = prev.slice(0, 3);
      const bottom = prev.slice(3);
      return [...bottom, ...top];
    });
  };

  // สุ่มตำแหน่งใหม่ทั้งหมด
  const randomize = () => {
    const indices = [0, 1, 2, 3, 4, 5];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setOrder(indices);
  };

  const topRow = order.slice(0, 3);
  const bottomRow = order.slice(3);

  return (
    <div className={styles.container}>
      {/* หัวข้อ */}
      <h1 className={styles.title}>Layout & Style</h1>

      {/* ปุ่มควบคุมด้านบน */}
      <div className={styles.controlPanel}>
        <Button
          type="primary"
          size="large"
          className={styles.moveLeftBtn}
        //   icon={<CaretLeftFilled />}
          onClick={moveLeft}
        >
          <CaretLeftOutlined />
          <span>Move Shape</span>
        </Button>

        <Button
          type="primary"
          size="large"
          className={styles.movePositionBtn}
          icon={<CaretUpOutlined />}
          onClick={swapRows}
        >
          {/* <ArrowUpOutlined /> */}
          <span style={{ marginLeft: 12 }}>Move Position</span>
          <CaretDownOutlined />
        </Button>

        <Button
          type="primary"
          size="large"
          className={styles.moveRightBtn}
        //   icon={<CaretRightFilled />}
          onClick={moveRight}
        >
          <span>Move Shape</span>
          <CaretRightOutlined />
        </Button>
      </div>

      {/* Grid รูปทรง */}
      <div className={styles.grid}>
        <div className={styles.row}>
          {topRow.map((idx, i) => (
            <div key={i} className={styles.shapeBox} onClick={randomize}>
              <div className={`${styles.shape} ${styles[shapes[idx].name]}`} />
            </div>
          ))}
        </div>
        <div className={styles.row}>
          {bottomRow.map((idx, i) => (
            <div key={i + 3} className={styles.shapeBox} onClick={randomize}>
              <div className={`${styles.shape} ${styles[shapes[idx].name]}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// src/app/page.tsx
'use client';

import { Card } from 'antd';
import styles from './page.module.scss';
import Link from 'next/link';

const tests = [
  {
    title: 'ทดสอบหนึ่ง',
    subtitle: 'Layout & Style',
    href: '/test1',
  },
  {
    title: 'ทดสอบสอง',
    subtitle: 'Connect API',
    href: '/test2',
  },
  {
    title: 'ทดสอบสาม',
    subtitle: 'Form & Table',
    href: '/test3',
  },
];

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.cardContainer}>
        {tests.map((item) => (
          <Link href={item.href} key={item.href} style={{ textDecoration: 'none' }}>
            <Card hoverable className={styles.testCard}>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardSubtitle}>{item.subtitle}</div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd'],

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app')],
    // ถ้าอยาก quiet หน่อย (ไม่ขึ้น warning เยอะ)
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
// pages/public/[...path].js
'use cl'
import { join } from 'path';
import { existsSync } from 'fs';
import { useRouter } from 'next/navigation';
import { send } from 'micro';

export default async (req, res) => {
  const { query } = useRouter();
  const assetPath = join(process.cwd(), 'public', ...query.path);

  if (existsSync(assetPath)) {
    return send(res, 200, assetPath);
  } else {
    return send(res, 404, 'Not Found');
  }
};

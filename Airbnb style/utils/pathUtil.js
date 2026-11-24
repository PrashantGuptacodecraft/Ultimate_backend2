import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const pathUtil = path.dirname(path.dirname(__filename));

export default pathUtil;
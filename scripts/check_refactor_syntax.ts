
import 'dotenv/config';
// Import files to check for syntax/import errors
import '../server/routes/shop/cart';
import '../server/routes/shop/orders';
import '../server/routes/shop/products';
import '../server/routes/admin/orders';
import '../server/routes/ai/chat';
import '../server/routes/ai/audit';
import '../server/routes/admin/ai/knowledge';

console.log('Syntax check passed for all imported files.');

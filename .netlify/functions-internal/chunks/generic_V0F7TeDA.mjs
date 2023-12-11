export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/generic_14R8kesh.mjs').then(n => n.g);

export { page };

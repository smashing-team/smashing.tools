export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./prerender_B5CntQaz.mjs').then(n => n.r);

export { page };

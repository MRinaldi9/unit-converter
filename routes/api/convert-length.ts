import { convertLength } from '../../server/length.ts';
import { define } from '../../utils.ts';

export const handler = define.handlers({
  POST: async (ctx) => {
    const { value, from, to } = await ctx.req.json();
    const result = convertLength(+value, from, to);

    return Response.json({
      from: {
        value: +value,
        unit: from,
      },
      to: {
        value: result,
        unit: to,
      },
    });
  },
});

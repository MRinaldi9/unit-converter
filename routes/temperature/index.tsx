import { STATUS_CODE } from '@std/http/status';
import { Page } from '../../components/Page.tsx';

import { page } from 'fresh';
import { ResultConversion } from '../../components/ResultConversion.tsx';
import { TemperatureUnit } from '../../models/units.ts';
import { define } from '../../utils.ts';

export const handler = define.handlers({
  async GET(ctx) {
    ctx.state.title = 'Temperature Conversion';
    const data = await fetch(`${ctx.url.origin}/api${ctx.route}`);
    const json = await data.json() as {
      value: TemperatureUnit;
      label: string;
    }[];
    json.unshift({ value: '' as TemperatureUnit, label: 'Select a unit' });
    return {
      data: { message: '', units: json },
    };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const value = form.get('value');
    const fromUnit = form.get('unitFromConvert');
    const toUnit = form.get('unitToConvert');

    if (!value || !fromUnit || !toUnit) {
      return page({
        message:
          'You must select a temperature, a unit to convert from, and a unit to convert to.',
        units: [],
      }, { status: STATUS_CODE.BadRequest });
    }
    const data = await fetch(`${ctx.url.origin}/api/convert-temperature`, {
      method: 'POST',
      body: JSON.stringify({
        value,
        from: fromUnit,
        to: toUnit,
      }),
    });
    const result = await data.json();

    return ctx.render(
      <ResultConversion {...result} backUrl='/temperature' />,
    );
  },
});

export default define.page<typeof handler>(Page);

type ResultConversionProps = {
  from: {
    value: number;
    unit: string;
  };
  to: {
    value: number;
    unit: string;
  };
  backUrl?: string;
};

export function ResultConversion({ from, to, backUrl }: ResultConversionProps) {
  return (
    <section class='flex flex-col gap-4 p-4 bg-base-200 rounded-lg items-center prose-headings:prose-stone'>
      <h1 class='prose prose-2xl'>Result of your calculation</h1>
      <div class='flex items-center gap-2'>
        <h3 class='prose prose-xl font-bold'>{from.value}{from.unit}</h3>
        <span>=</span>
        <h3 class='prose prose-xl font-bold'>{to.value}{to.unit}</h3>
      </div>
      <a href={backUrl ?? '/'} class='btn btn-secondary'>Reset</a>
    </section>
  );
}

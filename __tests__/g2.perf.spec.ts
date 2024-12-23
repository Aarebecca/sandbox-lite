import { createChart } from '@antv/g2-ssr';
import { writeFileSync } from 'fs';
import { execute } from '../src';

async function measure(cb: Function, name: string) {
  const start = `start-${name}`;
  const end = `end-${name}`;

  performance.mark(start);
  const returns = await cb();
  if (returns) await returns;
  performance.mark(end);
  performance.measure(name, start, end);
  const measure = performance.getEntriesByName(name)[0];
  return measure.duration;
}

async function ssr() {
  const data = [
    { t: 'London', x: 'Jan.', y: 18.9 },
    { t: 'London', x: 'Feb.', y: 28.8 },
    { t: 'London', x: 'Mar.', y: 39.3 },
    { t: 'London', x: 'Apr.', y: 81.4 },
    { t: 'London', x: 'May', y: 47 },
    { t: 'London', x: 'Jun.', y: 20.3 },
    { t: 'Berlin', x: 'Feb.', y: 23.2 },
    { t: 'Berlin', x: 'Mar.', y: 34.5 },
    { t: 'Berlin', x: 'Apr.', y: 99.7 },
    { t: 'Berlin', x: 'May', y: 52.6 },
    { t: 'Berlin', x: 'Jun.', y: 35.5 },
  ];
  const chart = await createChart({
    width: 500,
    height: 300,
    devicePixelRatio: 2,
    type: 'interval',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 't',
    },
    transform: [
      {
        type: 'dodgeX',
      },
    ],
    axis: {
      x: {
        title: 'Time',
      },
      y: {
        title: 'Value',
      },
    },
  });

  writeFileSync(__dirname + '/assets/g2.png', chart.toBuffer());
}

async function ssrVm() {
  const buffer = execute(
    `
import { createChart } from '@antv/g2-ssr';

async function ssr() {
  const data = [
    { t: 'London', x: 'Jan.', y: 18.9 },
    { t: 'London', x: 'Feb.', y: 28.8 },
    { t: 'London', x: 'Mar.', y: 39.3 },
    { t: 'London', x: 'Apr.', y: 81.4 },
    { t: 'London', x: 'May', y: 47 },
    { t: 'London', x: 'Jun.', y: 20.3 },
    { t: 'Berlin', x: 'Feb.', y: 23.2 },
    { t: 'Berlin', x: 'Mar.', y: 34.5 },
    { t: 'Berlin', x: 'Apr.', y: 99.7 },
    { t: 'Berlin', x: 'May', y: 52.6 },
    { t: 'Berlin', x: 'Jun.', y: 35.5 },
  ];
  const chart = await createChart({
    width: 500,
    height: 300,
    devicePixelRatio: 2,
    type: 'interval',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 't',
    },
    transform: [
      {
        type: 'dodgeX',
      },
    ],
    axis: {
      x: {
        title: 'Time',
      },
      y: {
        title: 'Value',
      },
    },
  });
  return chart.toBuffer();
}

ssr()
`,
    {
      allows: {
        dependencies: ['@antv/*', 'fs'],
      },
      denies: {
        dependencies: [],
      },
      context: {
        log: console.log,
        fetch: (url: string) => {
          if (
            url ===
            'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json'
          ) {
            return fetch(url).then((res) => res.json());
          }
        },
      },
    }
  );

  writeFileSync(__dirname + '/assets/g2-vm.png', await buffer);
}

Promise.all([
  measure(ssr, 'ssr').then((d) => {
    console.log('ssr', d);
  }),
  measure(ssrVm, 'vm').then((d) => {
    console.log('vm', d);
  }),
]).then(() => process.exit(0));

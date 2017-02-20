import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './build/src/facility.js',
  dest: './build/facility.js',
  format: 'es',
  moduleName: 'Facility',
  plugins: [
    resolve({
      browser: true,
      jsnext: true,
      main: true
    })
  ],
};

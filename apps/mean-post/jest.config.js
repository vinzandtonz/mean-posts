module.exports = {
  name: 'mean-post',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mean-post',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
